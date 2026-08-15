import math
from datetime import datetime, timezone


def calculate_engagement_rate(
    views: int,
    likes: int,
    comments: int,
) -> float:

    if views <= 0:
        return 0.0

    engagement = (
        likes + comments
    ) / views

    return engagement


def calculate_recency_score(
    published_at: str,
) -> float:

    try:
        published_time = datetime.fromisoformat(
            published_at.replace(
                "Z",
                "+00:00",
            )
        )

        now = datetime.now(
            timezone.utc
        )

        hours = (
            now - published_time
        ).total_seconds() / 3600

        if hours < 0:
            hours = 0

        # Exponential decay
        score = math.exp(
            -hours / 72
        )

        return score

    except Exception:
        return 0.0


def calculate_trend_score(
    video: dict,
) -> float:

    views = video.get(
        "views",
        0,
    )

    likes = video.get(
        "likes",
        0,
    )

    comments = video.get(
        "comments",
        0,
    )

    published_at = video.get(
        "published_at"
    )

    engagement_rate = (
        calculate_engagement_rate(
            views,
            likes,
            comments,
        )
    )

    recency_score = (
        calculate_recency_score(
            published_at
        )
        if published_at
        else 0.0
    )

    # Log scale để tránh video cực nhiều view
    # áp đảo hoàn toàn các video khác.
    view_score = (
        math.log10(
            max(views, 1)
        )
        / 10
    )

    score = (
        0.5 * view_score
        + 0.3 * engagement_rate
        + 0.2 * recency_score
    )

    return round(
        score * 100,
        2,
    )


def score_videos(
    videos: list[dict],
) -> list[dict]:

    scored_videos = []

    for video in videos:

        scored_video = {
            **video,
            "engagement_rate": round(
                calculate_engagement_rate(
                    video.get(
                        "views",
                        0,
                    ),
                    video.get(
                        "likes",
                        0,
                    ),
                    video.get(
                        "comments",
                        0,
                    ),
                ),
                6,
            ),
            "recency_score": round(
                calculate_recency_score(
                    video.get(
                        "published_at",
                        "",
                    )
                ),
                4,
            ),
            "trend_score": calculate_trend_score(
                video
            ),
        }

        scored_videos.append(
            scored_video
        )

    return sorted(
        scored_videos,
        key=lambda x: x["trend_score"],
        reverse=True,
    )