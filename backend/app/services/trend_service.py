from app.storage.trend_store import (
    load_snapshots,
)

from app.analysis.rising_trends import (
    detect_rising_trends,
)


def get_rising_trends(
    top_n: int = 10,
):

    snapshots = load_snapshots()

    if len(snapshots) < 2:

        return []

    return detect_rising_trends(
        snapshots=snapshots,
        top_n=top_n,
    )


if __name__ == "__main__":

    trends = get_rising_trends(
        top_n=10
    )

    print(
        "\n========== RISING TRENDS ==========\n"
    )

    for index, video in enumerate(
        trends,
        start=1,
    ):

        print(
            f"#{index} "
            f"{video.get('title', '')}"
        )

        print(
            f"Snapshots: "
            f"{video['snapshot_count']}"
        )

        print(
            f"Views: "
            f"{video['first_views']:,}"
            f" → "
            f"{video['latest_views']:,}"
        )

        print(
            f"Growth: "
            f"{video['growth_rate']}%"
        )

        print(
            f"Velocity: "
            f"{video['recent_velocity']:,.0f}"
            f" views/hour"
        )

        print(
            f"Acceleration: "
            f"{video['acceleration']:,.0f}"
        )

        print(
            f"Consistency: "
            f"{video['growth_consistency']}"
        )

        print(
            f"Rising Score: "
            f"{video['rising_score']}"
        )

        print("-" * 70)
