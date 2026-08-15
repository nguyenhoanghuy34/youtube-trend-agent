from app.analysis.rising_trends import (
    detect_rising_trends,
)


def test_historical_rising_trend():

    snapshots = [
        {
            "timestamp":
                "2026-08-15T10:00:00+00:00",
            "videos": [
                {
                    "video_id": "a",
                    "title": "AI Video",
                    "views": 100_000,
                    "likes": 5_000,
                    "comments": 500,
                }
            ],
        },
        {
            "timestamp":
                "2026-08-15T11:00:00+00:00",
            "videos": [
                {
                    "video_id": "a",
                    "title": "AI Video",
                    "views": 120_000,
                    "likes": 6_000,
                    "comments": 600,
                }
            ],
        },
        {
            "timestamp":
                "2026-08-15T12:00:00+00:00",
            "videos": [
                {
                    "video_id": "a",
                    "title": "AI Video",
                    "views": 150_000,
                    "likes": 8_000,
                    "comments": 800,
                }
            ],
        },
        {
            "timestamp":
                "2026-08-15T13:00:00+00:00",
            "videos": [
                {
                    "video_id": "a",
                    "title": "AI Video",
                    "views": 200_000,
                    "likes": 11_000,
                    "comments": 1_000,
                }
            ],
        },
    ]

    result = detect_rising_trends(
        snapshots,
        top_n=10,
    )

    assert len(result) == 1

    video = result[0]

    assert video["snapshot_count"] == 4

    assert video["first_views"] == 100_000

    assert video["latest_views"] == 200_000

    assert video["total_growth"] == 100_000

    assert video["growth_rate"] == 100.0

    assert video["recent_velocity"] > 0

    assert video["growth_consistency"] == 1.0

    assert video["rising_score"] > 0