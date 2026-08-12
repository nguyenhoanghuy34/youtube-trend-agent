from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langgraph.graph import StateGraph, START, END

from app.agent.state import AgentState
from app.agent.prompts import ROUTER_PROMPT
from app.agent.trend_prompts import TREND_ANALYSIS_PROMPT
from app.agent.topic_prompts import TOPIC_EXTRACTION_PROMPT
from app.agent.topic_analysis_prompts import (
    TOPIC_TREND_ANALYSIS_PROMPT,
)

from app.analysis.trend_scorer import (
    score_videos,
)

from app.services.youtube_service import (
    get_top_10_trending_videos,
    search_youtube_videos,
    format_trending_videos,
    format_search_videos,
)

from app.config.settings import settings


# =========================================================
# LLM
# =========================================================

llm = ChatGoogleGenerativeAI(
    model=settings.GEMINI_MODEL,
    google_api_key=settings.GEMINI_API_KEY,
    temperature=0,
)


# =========================================================
# Helper
# =========================================================

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


# =========================================================
# Router
# =========================================================

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


# =========================================================
# Model
# =========================================================

def model_node(
    state: AgentState,
) -> AgentState:

    return {
        **state,
        "response": "Đây là General",
    }


# =========================================================
# YouTube Query Classification
# =========================================================

def route_youtube_query(
    state: AgentState,
) -> str:

    message = (
        state["user_message"]
        .lower()
    )

    topic_keywords = [
        "về",
        "about",
        "chủ đề",
        "topic",
        "ai",
        "du lịch",
        "thời trang",
        "game",
        "technology",
        "công nghệ",
    ]

    if any(
        keyword in message
        for keyword in topic_keywords
    ):
        print("[YouTube] → TOPIC")

        return "topic"

    print("[YouTube] → GENERAL")

    return "general"


# =========================================================
# General YouTube Trending
# =========================================================

def youtube_node(
    state: AgentState,
) -> AgentState:

    print(
        "[YouTube] "
        "Fetching general trends..."
    )

    videos = get_top_10_trending_videos(
        region_code="VN"
    )

    print(
        f"[YouTube] "
        f"Fetched {len(videos)} videos"
    )

    videos = score_videos(videos)

    videos_text = format_trending_videos(
        videos
    )

    prompt = ChatPromptTemplate.from_template(
        TREND_ANALYSIS_PROMPT
    )

    chain = prompt | llm

    result = chain.invoke(
        {
            "videos": videos_text
        }
    )

    analysis = get_text_content(
        result
    )

    return {
        **state,
        "trend_data": videos,
        "response": analysis,
    }


# =========================================================
# Extract Topic
# =========================================================

def extract_topic_node(
    state: AgentState,
) -> AgentState:

    prompt = ChatPromptTemplate.from_template(
        TOPIC_EXTRACTION_PROMPT
    )

    chain = prompt | llm

    result = chain.invoke(
        {
            "user_message":
                state["user_message"]
        }
    )

    topic = (
        get_text_content(result)
        .strip()
    )

    print(
        f"[Topic] → {topic}"
    )

    return {
        **state,
        "topic": topic,
    }


# =========================================================
# Topic Trend Search + Analysis
# =========================================================

def topic_trend_node(
    state: AgentState,
) -> AgentState:

    topic = state["topic"]

    print(
        f"[YouTube] "
        f"Searching topic: {topic}"
    )

    videos = search_youtube_videos(
        query=topic,
        region_code="VN",
        max_results=10,
    )

    print(
        f"[YouTube] "
        f"Found {len(videos)} videos"
    )

    videos_text = format_search_videos(
        videos
    )

    prompt = ChatPromptTemplate.from_template(
        TOPIC_TREND_ANALYSIS_PROMPT
    )

    chain = prompt | llm

    print(
        "[Trend] "
        "Analyzing topic..."
    )

    result = chain.invoke(
        {
            "topic": topic,
            "videos": videos_text,
        }
    )

    analysis = get_text_content(
        result
    )

    print(
        "[Trend] "
        "Topic analysis completed"
    )

    return {
        **state,
        "trend_data": videos,
        "response": analysis,
    }


# =========================================================
# Router → Next Node
# =========================================================

def route_after_router(
    state: AgentState,
) -> str:

    if state["route"] == "YOUTUBE":
        return "youtube_query"

    return "model"


# =========================================================
# Build LangGraph
# =========================================================

def build_graph():

    graph = StateGraph(
        AgentState
    )

    # Nodes
    graph.add_node(
        "router",
        router_node,
    )

    graph.add_node(
        "model",
        model_node,
    )

    graph.add_node(
        "youtube_query",
        lambda state: state,
    )

    graph.add_node(
        "youtube",
        youtube_node,
    )

    graph.add_node(
        "extract_topic",
        extract_topic_node,
    )

    graph.add_node(
        "topic_trend",
        topic_trend_node,
    )

    # START → Router
    graph.add_edge(
        START,
        "router",
    )

    # Router → MODEL / YOUTUBE
    graph.add_conditional_edges(
        "router",
        route_after_router,
        {
            "model": "model",
            "youtube_query": "youtube_query",
        },
    )

    # YouTube → GENERAL / TOPIC
    graph.add_conditional_edges(
        "youtube_query",
        route_youtube_query,
        {
            "general": "youtube",
            "topic": "extract_topic",
        },
    )

    # Topic → Search
    graph.add_edge(
        "extract_topic",
        "topic_trend",
    )

    # End nodes
    graph.add_edge(
        "model",
        END,
    )

    graph.add_edge(
        "youtube",
        END,
    )

    graph.add_edge(
        "topic_trend",
        END,
    )

    return graph.compile()


# =========================================================
# Compiled Agent
# =========================================================

agent_graph = build_graph()