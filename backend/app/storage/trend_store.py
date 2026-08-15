import json
from pathlib import Path
from datetime import datetime, timezone


DATA_DIR = Path("data/trends")

DATA_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


def save_snapshot(
    videos: list[dict],
):
    timestamp = datetime.now(
        timezone.utc
    ).isoformat()

    snapshot = {
        "timestamp": timestamp,
        "videos": videos,
    }

    filename = (
        DATA_DIR
        / f"snapshot_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    )

    with open(
        filename,
        "w",
        encoding="utf-8",
    ) as f:

        json.dump(
            snapshot,
            f,
            ensure_ascii=False,
            indent=2,
        )

    return filename


def load_snapshots():

    snapshots = []

    for file in sorted(
        DATA_DIR.glob(
            "snapshot_*.json"
        )
    ):

        with open(
            file,
            "r",
            encoding="utf-8",
        ) as f:

            snapshots.append(
                json.load(f)
            )

    return snapshots