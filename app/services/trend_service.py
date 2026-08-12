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

    previous = snapshots[-2]
    current = snapshots[-1]

    return detect_rising_trends(
        previous,
        current,
        top_n=top_n,
    )