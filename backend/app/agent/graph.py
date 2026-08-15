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

from app.storage.trend_store import (
    save_snapshot,
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

from app.agent.intent_router import (
    normalize_route,
    route_after_router,
)

from app.services.trend_service import (
    get_rising_trends,
)


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

    route = normalize_route(
        get_text_content(result)
    )

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


def rising_trend_node(
    state: AgentState,
) -> AgentState:

    print(
        "[Rising Trend] "
        "Calculating rising trends..."
    )

    trends = get_rising_trends(
        top_n=10
    )

    if not trends:

        return {
            **state,
            "trend_data": [],
            "response": (
                "Chưa có đủ dữ liệu lịch sử "
                "để xác định trend đang tăng mạnh. "
                "Cần ít nhất 2 snapshot."
            ),
        }

    lines = [
        "Các trend/video đang tăng mạnh:",
        "",
    ]

    for index, video in enumerate(
        trends,
        start=1,
    ):

        lines.append(
            f"#{index} "
            f"{video['title']}"
        )

        lines.append(
            f"Growth: "
            f"{video['growth_rate']}%"
        )

        lines.append(
            f"Velocity: "
            f"{video['view_velocity']:,.0f} "
            f"views/hour"
        )

        lines.append(
            f"Rising Score: "
            f"{video['rising_score']}"
        )

        lines.append(
            f"URL: {video['url']}"
        )

        lines.append("")

    return {
        **state,
        "trend_data": trends,
        "response": "\n".join(lines),
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
# General YouTube Trending
# =========================================================

def youtube_node(
    state: AgentState,
) -> AgentState:

    print(
        "[YouTube] "
        "Fetching general trends..."
    )

    # 1. Get current trending videos
    videos = get_top_10_trending_videos(
        region_code="VN"
    )

    print(
        f"[YouTube] "
        f"Fetched {len(videos)} videos"
    )

    # 2. Calculate trend scores
    videos = score_videos(
        videos
    )

    print(
        "[Trend] "
        "Trend scores calculated"
    )

    # 3. Save historical snapshot
    save_snapshot(
        videos
    )

    print(
        "[Trend] "
        "Snapshot saved"
    )

    # 4. Format data for Gemini
    videos_text = format_trending_videos(
        videos
    )

    # 5. Analyze trends with Gemini
    prompt = ChatPromptTemplate.from_template(
        TREND_ANALYSIS_PROMPT
    )

    chain = prompt | llm

    print(
        "[Trend] "
        "Analyzing videos..."
    )

    result = chain.invoke(
        {
            "videos": videos_text
        }
    )

    analysis = get_text_content(
        result
    )

    print(
        "[Trend] "
        "Analysis completed"
    )

    # 6. Return state
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

    graph.add_node(
        "rising_trend",
        rising_trend_node,
    )

    # START
    graph.add_edge(
        START,
        "router",
    )

    # Router
    graph.add_conditional_edges(
        "router",
        route_after_router,
        {
            "model": "model",
            "trend": "youtube",
            "rising_trend": "rising_trend",
            "topic_trend": "extract_topic",
        },
    )

    # Topic
    graph.add_edge(
        "extract_topic",
        "topic_trend",
    )

    # End
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

    graph.add_edge(
        "rising_trend",
        END,
    )

    return graph.compile()


# =========================================================
# Compiled Agent
# =========================================================

agent_graph = build_graph()
