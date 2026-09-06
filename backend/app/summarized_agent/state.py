from typing import TypedDict


class SummaryState(TypedDict, total=False):
    video_url: str
    video_id: str
    video_title: str

    comments: list[str]
    batch_summaries: list[dict]

    final_summary: dict

    error: str