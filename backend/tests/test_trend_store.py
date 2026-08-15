from backend.app.storage.trend_store import (
    save_snapshot,
    load_snapshots,
)


def test_save_snapshot():

    videos = [
        {
            "video_id": "test123",
            "views": 100000,
            "likes": 5000,
            "comments": 1000,
        }
    ]

    file = save_snapshot(
        videos
    )

    assert file.exists()


def test_load_snapshots():

    snapshots = load_snapshots()

    assert len(snapshots) > 0

    assert (
        "timestamp"
        in snapshots[-1]
    )

    assert (
        "videos"
        in snapshots[-1]
    )