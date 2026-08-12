from app.analysis.rising_trends import (
    calculate_video_growth,
    detect_rising_trends,
)


def make_snapshot(
    timestamp,
    views,
):
    return {
        "timestamp": timestamp,
        "videos": [
            {
                "video_id": "video_1",
                "title": "AI Trend",
                "views": views,
                "likes": 5000,
                "comments": 500,
            }
        ],
    }


def test_video_growth():

    previous = make_snapshot(
        "2026-08-12T10:00:00+00:00",
        100_000,
    )

    current = make_snapshot(
        "2026-08-12T11:00:00+00:00",
        150_000,
    )

    result = calculate_video_growth(
        previous,
        current,
    )

    assert len(result) == 1

    assert result[0][
        "view_growth"
    ] == 50_000

    assert result[0][
        "growth_rate"
    ] == 50.0

    assert result[0][
        "view_velocity"
    ] == 50_000


def test_rising_trends():

    previous = {
        "timestamp":
            "2026-08-12T10:00:00+00:00",
        "videos": [
            {
                "video_id": "a",
                "title": "Video A",
                "views": 100_000,
                "likes": 5_000,
                "comments": 500,
            },
            {
                "video_id": "b",
                "title": "Video B",
                "views": 100_000,
                "likes": 1_000,
                "comments": 100,
            },
        ],
    }

    current = {
        "timestamp":
            "2026-08-12T11:00:00+00:00",
        "videos": [
            {
                "video_id": "a",
                "title": "Video A",
                "views": 200_000,
                "likes": 10_000,
                "comments": 1_000,
            },
            {
                "video_id": "b",
                "title": "Video B",
                "views": 110_000,
                "likes": 1_100,
                "comments": 110,
            },
        ],
    }

    result = detect_rising_trends(
        previous,
        current,
    )

    assert len(result) == 2

    assert (
        result[0]["video_id"]
        == "a"
    )

    assert (
        result[0]["rising_score"]
        > 0
    )