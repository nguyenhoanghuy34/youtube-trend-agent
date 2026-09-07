from langgraph.graph import StateGraph, START, END

from .state import SummaryState

from .tools.youtube_comments import (
    extract_video_id,
    get_video_title,
    get_comments
)

from .services.comment_cleaner import (
    clean_comments
)

from .services.comment_chunker import (
    chunk_comments
)

from .services.summarizer import (
    summarize_batch,
    summarize_final
)


def get_video(state: SummaryState):

    video_url = state["video_url"]

    video_id = extract_video_id(video_url)

    title = get_video_title(video_id)

    return {
        "video_id": video_id,
        "video_title": title
    }


def collect_comments(state: SummaryState):

    video_id = state["video_id"]

    comments = get_comments(
        video_id,
        max_comments=100
    )

    return {
        "comments": comments
    }


def clean_comment_data(state: SummaryState):

    comments = state["comments"]

    cleaned = clean_comments(comments)

    return {
        "comments": cleaned
    }


def summarize_comments(state: SummaryState):

    comments = state["comments"]

    batches = chunk_comments(
        comments,
        batch_size=20
    )

    summaries = []

    total = len(batches)

    for i, batch in enumerate(batches, start=1):

        print(
            f"[LLM] Processing batch "
            f"{i}/{total} "
            f"({len(batch)} comments)"
        )

        summary = summarize_batch(batch)

        summaries.append(summary)

    return {
        "batch_summaries": summaries
    }


def generate_final_summary(state: SummaryState):

    summaries = state["batch_summaries"]

    print("[LLM] Generating final summary...")

    final_summary = summarize_final(
        summaries
    )

    return {
        "final_summary": final_summary
    }


def build_agent():

    graph = StateGraph(SummaryState)

    graph.add_node(
        "get_video",
        get_video
    )

    graph.add_node(
        "collect_comments",
        collect_comments
    )

    graph.add_node(
        "clean_comments",
        clean_comment_data
    )

    graph.add_node(
        "summarize_comments",
        summarize_comments
    )

    graph.add_node(
        "final_summary",
        generate_final_summary
    )

    graph.add_edge(
        START,
        "get_video"
    )

    graph.add_edge(
        "get_video",
        "collect_comments"
    )

    graph.add_edge(
        "collect_comments",
        "clean_comments"
    )

    graph.add_edge(
        "clean_comments",
        "summarize_comments"
    )

    graph.add_edge(
        "summarize_comments",
        "final_summary"
    )

    graph.add_edge(
        "final_summary",
        END
    )

    return graph.compile()
