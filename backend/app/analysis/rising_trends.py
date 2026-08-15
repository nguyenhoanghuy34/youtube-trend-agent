from datetime import datetime
import math


def _parse_time(timestamp: str) -> datetime:
    return datetime.fromisoformat(
        timestamp.replace("Z", "+00:00")
    )


def _linear_slope(points: list[tuple[float, float]]) -> float:
    """
    Tính slope bằng linear regression đơn giản.

    x = thời gian (giờ)
    y = views
    """

    if len(points) < 2:
        return 0.0

    x = [point[0] for point in points]
    y = [point[1] for point in points]

    x_mean = sum(x) / len(x)
    y_mean = sum(y) / len(y)

    numerator = sum(
        (xi - x_mean) * (yi - y_mean)
        for xi, yi in zip(x, y)
    )

    denominator = sum(
        (xi - x_mean) ** 2
        for xi in x
    )

    if denominator == 0:
        return 0.0

    return numerator / denominator


def calculate_historical_metrics(
    snapshots: list[dict],
    video_id: str,
) -> dict:

    points = []

    video_data = []

    first_time = None

    for snapshot in snapshots:

        timestamp = snapshot.get(
            "timestamp"
        )

        if not timestamp:
            continue

        current_time = _parse_time(
            timestamp
        )

        if first_time is None:
            first_time = current_time

        for video in snapshot.get(
            "videos",
            [],
        ):

            if video.get(
                "video_id"
            ) != video_id:
                continue

            hours = (
                current_time - first_time
            ).total_seconds() / 3600

            views = video.get(
                "views",
                0,
            )

            points.append(
                (
                    hours,
                    views,
                )
            )

            video_data.append(
                video
            )

            break

    if len(points) < 2:
        return {}

    # -----------------------------
    # Basic growth
    # -----------------------------

    first_views = points[0][1]
    last_views = points[-1][1]

    total_growth = (
        last_views - first_views
    )

    if first_views > 0:

        growth_rate = (
            total_growth
            / first_views
        ) * 100

    else:
        growth_rate = 0.0

    # -----------------------------
    # Linear regression
    # -----------------------------

    velocity = _linear_slope(
        points
    )

    # -----------------------------
    # Recent velocity
    # -----------------------------

    recent_points = points[-3:]

    recent_velocity = _linear_slope(
        recent_points
    )

    # -----------------------------
    # Previous velocity
    # -----------------------------

    previous_points = points[:-2]

    if len(previous_points) >= 2:

        previous_velocity = _linear_slope(
            previous_points
        )

    else:

        previous_velocity = 0.0

    # -----------------------------
    # Acceleration
    # -----------------------------

    acceleration = (
        recent_velocity
        - previous_velocity
    )

    # -----------------------------
    # Consistency
    # -----------------------------

    positive_changes = 0
    total_changes = 0

    for i in range(1, len(points)):

        change = (
            points[i][1]
            - points[i - 1][1]
        )

        total_changes += 1

        if change > 0:
            positive_changes += 1

    if total_changes > 0:

        consistency = (
            positive_changes
            / total_changes
        )

    else:

        consistency = 0.0

    latest_video = video_data[-1]

    return {
        **latest_video,
        "first_views": first_views,
        "latest_views": last_views,
        "total_growth": total_growth,
        "growth_rate": round(
            growth_rate,
            2,
        ),
        "view_velocity": round(
            velocity,
            2,
        ),
        "recent_velocity": round(
            recent_velocity,
            2,
        ),
        "acceleration": round(
            acceleration,
            2,
        ),
        "growth_consistency": round(
            consistency,
            2,
        ),
        "snapshot_count": len(points),
    }


def calculate_rising_score(
    video: dict,
) -> float:

    velocity = max(
        video.get(
            "recent_velocity",
            0,
        ),
        0,
    )

    acceleration = max(
        video.get(
            "acceleration",
            0,
        ),
        0,
    )

    consistency = video.get(
        "growth_consistency",
        0,
    )

    growth_rate = max(
        video.get(
            "growth_rate",
            0,
        ),
        0,
    )

    # Log scaling
    velocity_score = min(
        10,
        math.log10(
            max(velocity, 1)
        ) * 1.5,
    )

    acceleration_score = min(
        10,
        math.log10(
            max(acceleration, 1)
        ) * 1.5,
    )

    consistency_score = (
        consistency * 10
    )

    growth_score = min(
        10,
        growth_rate / 10,
    )

    score = (
        0.40 * velocity_score
        + 0.25 * acceleration_score
        + 0.20 * consistency_score
        + 0.15 * growth_score
    )

    return round(
        score,
        2,
    )


def detect_rising_trends(
    snapshots: list[dict],
    top_n: int = 10,
) -> list[dict]:

    if len(snapshots) < 2:
        return []

    # -----------------------------
    # Collect video IDs
    # -----------------------------

    video_ids = set()

    for snapshot in snapshots:

        for video in snapshot.get(
            "videos",
            [],
        ):

            video_id = video.get(
                "video_id"
            )

            if video_id:
                video_ids.add(
                    video_id
                )

    results = []

    # -----------------------------
    # Analyze every video
    # -----------------------------

    for video_id in video_ids:

        metrics = calculate_historical_metrics(
            snapshots,
            video_id,
        )

        if not metrics:
            continue

        metrics[
            "rising_score"
        ] = calculate_rising_score(
            metrics
        )

        results.append(
            metrics
        )

    # -----------------------------
    # Highest rising score first
    # -----------------------------

    results.sort(
        key=lambda x: x[
            "rising_score"
        ],
        reverse=True,
    )

    return results[:top_n]