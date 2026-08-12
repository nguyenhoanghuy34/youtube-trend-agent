from datetime import datetime


def _parse_time(timestamp: str) -> datetime:
    return datetime.fromisoformat(
        timestamp.replace("Z", "+00:00")
    )


def calculate_video_growth(
    previous_snapshot: dict,
    current_snapshot: dict,
) -> list[dict]:

    previous_videos = {
        video["video_id"]: video
        for video in previous_snapshot.get(
            "videos", []
        )
    }

    current_videos = current_snapshot.get(
        "videos", []
    )

    previous_time = _parse_time(
        previous_snapshot["timestamp"]
    )

    current_time = _parse_time(
        current_snapshot["timestamp"]
    )

    hours = (
        current_time - previous_time
    ).total_seconds() / 3600

    if hours <= 0:
        return []

    results = []

    for video in current_videos:

        video_id = video["video_id"]

        if video_id not in previous_videos:
            continue

        previous = previous_videos[video_id]

        previous_views = previous.get(
            "views", 0
        )

        current_views = video.get(
            "views", 0
        )

        previous_likes = previous.get(
            "likes", 0
        )

        current_likes = video.get(
            "likes", 0
        )

        view_growth = (
            current_views
            - previous_views
        )

        like_growth = (
            current_likes
            - previous_likes
        )

        if previous_views > 0:
            growth_rate = (
                view_growth
                / previous_views
            ) * 100
        else:
            growth_rate = 0.0

        view_velocity = (
            view_growth / hours
        )

        like_velocity = (
            like_growth / hours
        )

        results.append(
            {
                **video,
                "view_growth": view_growth,
                "growth_rate": round(
                    growth_rate,
                    2,
                ),
                "view_velocity": round(
                    view_velocity,
                    2,
                ),
                "like_velocity": round(
                    like_velocity,
                    2,
                ),
            }
        )

    return results


def calculate_rising_score(
    video: dict,
) -> float:

    growth_rate = max(
        video.get(
            "growth_rate",
            0,
        ),
        0,
    )

    view_velocity = max(
        video.get(
            "view_velocity",
            0,
        ),
        0,
    )

    engagement = (
        video.get(
            "likes",
            0,
        )
        + video.get(
            "comments",
            0,
        )
    )

    views = max(
        video.get(
            "views",
            1,
        ),
        1,
    )

    engagement_rate = (
        engagement / views
    )

    # Normalize bằng log để tránh
    # video cực lớn áp đảo toàn bộ.
    velocity_score = (
        min(
            10,
            view_velocity / 10000,
        )
    )

    growth_score = min(
        10,
        growth_rate / 10,
    )

    engagement_score = min(
        10,
        engagement_rate * 100,
    )

    score = (
        0.5 * velocity_score
        + 0.3 * growth_score
        + 0.2 * engagement_score
    )

    return round(
        score,
        2,
    )


def detect_rising_trends(
    previous_snapshot: dict,
    current_snapshot: dict,
    top_n: int = 10,
) -> list[dict]:

    videos = calculate_video_growth(
        previous_snapshot,
        current_snapshot,
    )

    for video in videos:
        video["rising_score"] = (
            calculate_rising_score(
                video
            )
        )

    videos.sort(
        key=lambda x: x["rising_score"],
        reverse=True,
    )

    return videos[:top_n]