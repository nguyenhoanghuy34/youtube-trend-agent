from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langgraph.graph import StateGraph, START, END

from app.agent.state import AgentState
from app.agent.prompts import ROUTER_PROMPT
from app.agent.trend_prompts import (
    TREND_ANALYSIS_PROMPT,
    SUMMARY_PROMPT,
)
from app.agent.topic_prompts import (
    TOPIC_EXTRACTION_PROMPT,
)
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
    get_top_trending_videos,
    search_youtube_videos,
    format_trending_videos,
    format_search_videos,
)

from app.config.settings import settings

from app.agent.intent_router import (
    parse_router_result,
    route_after_router,
)

from app.tools.chart_tool import (
    build_like_view_chart,
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


def wants_chart(user_message: str) -> bool:
    text = user_message.lower()
    keywords = [
        "chart",
        "plot",
        "graph",
        "biểu đồ",
        "ve bieu do",
        "vẽ biểu đồ",
        "vẽ chart",
        "like/view",
        "like view",
        "tỉ lệ",
        "ty le",
        "ratio",
    ]
    return any(keyword in text for keyword in keywords)


def parse_top_n_from_text(user_message: str) -> int:
    import re

    match = re.search(r"\btop\s+(\d+)\b", user_message.lower())
    if match:
        try:
            return max(1, int(match.group(1)))
        except ValueError:
            pass

    match = re.search(r"\b(\d+)\s+(video|videos|mẩu|mục|bài)\b", user_message.lower())
    if match:
        try:
            return max(1, int(match.group(1)))
        except ValueError:
            pass

    return 10


def compute_like_view_ratio(video: dict) -> float:
    views = int(video.get("views", 0))
    likes = int(video.get("likes", 0))
    if views <= 0:
        return 0.0
    return round(likes / views, 6)


def prepare_chart_data(videos: list[dict]) -> list[dict]:
    chart_data = []
    for video in videos:
        chart_data.append(
            {
                **video,
                "like_view_ratio": compute_like_view_ratio(video),
            }
        )
    return chart_data


# =========================================================
# Router
# =========================================================

def router_node(
    state: AgentState,
) -> AgentState:

    chart_requested = wants_chart(
        state["user_message"]
    )

    if chart_requested:
        top_n = parse_top_n_from_text(
            state["user_message"]
        )

        print(
            f"[Router] "
            f"{state['user_message']}"
        )

        print(
            "[Router] → TREND_CHART "
            "(local heuristic)"
        )

        print(
            f"[Router] → top_n={top_n}"
        )

        return {
            **state,
            "route": "TREND_CHART",
            "top_n": top_n,
            "chart_requested": True,
        }

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

    route, top_n = parse_router_result(
        get_text_content(result)
    )

    print(
        f"[Router] "
        f"{state['user_message']}"
    )

    print(
        f"[Router] → {route}"
    )

    print(
        f"[Router] → top_n={top_n}"
    )

    return {
        **state,
        "route": route,
        "top_n": top_n,
        "chart_requested": chart_requested,
    }


# =========================================================
# Rising Trend
# =========================================================

def rising_trend_node(
    state: AgentState,
) -> AgentState:

    top_n = state["top_n"]

    print(
        "[Rising Trend] "
        "Calculating rising trends..."
    )

    trends = get_rising_trends(
        top_n=top_n
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
            "summary": "",
        }

    lines = [
        f"Top {len(trends)} rising trends:",
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

    analysis = "\n".join(lines)

    summary_prompt = ChatPromptTemplate.from_template(
        SUMMARY_PROMPT
    )

    summary_chain = summary_prompt | llm

    summary_result = summary_chain.invoke(
        {
            "analysis": analysis,
        }
    )

    summary = get_text_content(
        summary_result
    ).strip()

    print(
        f"[Summary] {summary}"
    )

    return {
        **state,
        "trend_data": trends,
        "response": analysis,
        "summary": summary,
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
        "summary": "",
    }


# =========================================================
# General YouTube Trending
# =========================================================

def youtube_node(
    state: AgentState,
) -> AgentState:

    top_n = state["top_n"]
    chart_requested = state.get("chart_requested", False)

    print(
        "[YouTube] "
        "Fetching general trends..."
    )

    # 1. Get requested number of trending videos

    videos = get_top_trending_videos(
        region_code="VN",
        max_results=top_n,
    )

    print(
        f"[YouTube] "
        f"Fetched {len(videos)} videos"
    )

    # 2. Calculate trend scores

    videos = score_videos(videos)

    videos = prepare_chart_data(
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

    if chart_requested:
        return {
            **state,
            "trend_data": videos,
            "chart_data": {},
            "response": (
                f"Đã lấy top {len(videos)} video và chuẩn bị dữ liệu để vẽ biểu đồ like/view."
            ),
            "summary": "Đã lấy dữ liệu và sẵn sàng vẽ biểu đồ.",
        }

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

    # 6. Generate short summary

    summary_prompt = ChatPromptTemplate.from_template(
        SUMMARY_PROMPT
    )

    summary_chain = summary_prompt | llm

    summary_result = summary_chain.invoke(
        {
            "analysis": analysis,
        }
    )

    summary = get_text_content(
        summary_result
    ).strip()

    print(
        f"[Summary] {summary}"
    )

    # 7. Return state

    return {
        **state,
        "trend_data": videos,
        "chart_data": {},
        "response": analysis,
        "summary": summary,
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
    top_n = state["top_n"]

    print(
        f"[YouTube] "
        f"Searching topic: {topic}"
    )

    videos = search_youtube_videos(
        query=topic,
        region_code="VN",
        max_results=top_n,
    )

    videos = prepare_chart_data(
        videos
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

    # Generate short summary

    summary_prompt = ChatPromptTemplate.from_template(
        SUMMARY_PROMPT
    )

    summary_chain = summary_prompt | llm

    summary_result = summary_chain.invoke(
        {
            "analysis": analysis,
        }
    )

    summary = get_text_content(
        summary_result
    ).strip()

    print(
        f"[Summary] {summary}"
    )

    return {
        **state,
        "trend_data": videos,
        "chart_data": {},
        "response": analysis,
        "summary": summary,
    }


# =========================================================
# Like/View Chart
# =========================================================

def like_view_chart_node(
    state: AgentState,
) -> AgentState:

    videos = state.get("trend_data", [])
    top_videos = [
        {
            **video,
            "like_view_ratio": compute_like_view_ratio(video),
        }
        for video in videos[: state.get("top_n", 10)]
    ]

    print(
        "[Chart] "
        "Building like/view chart..."
    )

    chart = build_like_view_chart(
        top_videos,
        title="Top trending videos like/view ratio",
    )

    chart_lines = [
        "Like/View ratio chart generated.",
        f"Videos: {len(top_videos)}",
    ]

    for video in top_videos:
        chart_lines.append(
            f"#{video.get('rank')} {video.get('title')} - {video.get('like_view_ratio', 0):.2%}"
        )

    return {
        **state,
        "chart_data": chart,
        "response": "\n".join(chart_lines),
        "summary": "Biểu đồ tỉ lệ like/view đã được tạo.",
    }


# =========================================================
# Build LangGraph
# =========================================================

def build_graph(checkpointer=None):

    graph = StateGraph(
        AgentState
    )

    # =====================================================
    # Nodes
    # =====================================================

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
        "like_view_chart",
        like_view_chart_node,
    )

    graph.add_node(
        "rising_trend",
        rising_trend_node,
    )

    # =====================================================
    # START
    # =====================================================

    graph.add_edge(
        START,
        "router",
    )

    # =====================================================
    # Router
    # =====================================================

    graph.add_conditional_edges(
        "router",
        route_after_router,
        {
            "model": "model",
            "trend": "youtube",
            "trend_chart": "youtube",
            "rising_trend": "rising_trend",
            "topic_trend": "extract_topic",
            "topic_trend_chart": "extract_topic",
        },
    )

    # =====================================================
    # Topic
    # =====================================================

    graph.add_edge(
        "extract_topic",
        "topic_trend",
    )

    # =====================================================
    # END
    # =====================================================

    graph.add_edge(
        "model",
        END,
    )

    graph.add_edge(
        "youtube",
        END,
    )

    graph.add_conditional_edges(
        "youtube",
        lambda state: "like_view_chart"
        if state.get("chart_requested")
        else "end",
        {
            "like_view_chart": "like_view_chart",
            "end": END,
        },
    )

    graph.add_conditional_edges(
        "topic_trend",
        lambda state: "like_view_chart"
        if state.get("chart_requested")
        else "end",
        {
            "like_view_chart": "like_view_chart",
            "end": END,
        },
    )

    graph.add_edge(
        "rising_trend",
        END,
    )

    graph.add_edge(
        "like_view_chart",
        END,
    )

    # =====================================================
    # Compile with LangGraph persistence
    # =====================================================

    return graph.compile(
        checkpointer=checkpointer
    )
