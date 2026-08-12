from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langgraph.graph import StateGraph, START, END

from app.agent.state import AgentState
from app.agent.prompts import (
    ROUTER_PROMPT,
    ANSWER_PROMPT,
)
from app.services.youtube_service import (
    get_top_10_trending_videos,
    format_trending_videos,
)
from app.config.settings import settings


llm = ChatGoogleGenerativeAI(
    model=settings.GEMINI_MODEL,
    google_api_key=settings.GEMINI_API_KEY,
    temperature=0,
)


def get_text_content(result) -> str:

    content = result.content

    if isinstance(content, str):
        return content

    if isinstance(content, list):
        texts = []

        for item in content:
            if isinstance(item, dict):
                if item.get("type") == "text":
                    texts.append(
                        item.get("text", "")
                    )
            else:
                texts.append(str(item))

        return "".join(texts)

    return str(content)


def router_node(
    state: AgentState,
) -> AgentState:

    prompt = ChatPromptTemplate.from_template(
        ROUTER_PROMPT
    )

    chain = prompt | llm

    result = chain.invoke(
        {
            "user_message":
                state["user_message"]
        }
    )

    route = (
        get_text_content(result)
        .strip()
        .upper()
    )

    if "YOUTUBE" in route:
        route = "YOUTUBE"
    else:
        route = "MODEL"

    print(
        f"[Router] "
        f"{state['user_message']}"
    )

    print(
        f"[Router] → {route}"
    )

    return {
        **state,
        "route": route,
    }


def model_node(
    state: AgentState,
) -> AgentState:

    return {
        **state,
        "response": "Đây là General",
    }


def youtube_node(
    state: AgentState,
) -> AgentState:

    print("[YouTube] Fetching trends...")

    videos = get_top_10_trending_videos(
        region_code="VN"
    )

    response = format_trending_videos(
        videos
    )

    print(
        f"[YouTube] "
        f"Fetched {len(videos)} videos"
    )

    return {
        **state,
        "trend_data": videos,
        "response": response,
    }


def route_after_router(
    state: AgentState,
) -> str:

    if state["route"] == "YOUTUBE":
        return "youtube"

    return "model"


def build_graph():

    graph = StateGraph(
        AgentState
    )

    graph.add_node(
        "router",
        router_node,
    )

    graph.add_node(
        "model",
        model_node,
    )

    graph.add_node(
        "youtube",
        youtube_node,
    )

    graph.add_edge(
        START,
        "router",
    )

    graph.add_conditional_edges(
        "router",
        route_after_router,
        {
            "model": "model",
            "youtube": "youtube",
        },
    )

    graph.add_edge(
        "model",
        END,
    )

    graph.add_edge(
        "youtube",
        END,
    )

    return graph.compile()


agent_graph = build_graph()