from app.analysis.trend_scorer import (
    calculate_engagement_rate,
    calculate_trend_score,
    score_videos,
)


def test_engagement_rate():

    rate = calculate_engagement_rate(
        views=100_000,
        likes=5_000,
        comments=1_000,
    )

    assert rate == 0.06


def test_trend_score():

    video = {
        "views": 100_000,
        "likes": 5_000,
        "comments": 1_000,
        "published_at":
            "2026-08-12T10:00:00Z",
    }

    score = calculate_trend_score(
        video
    )

    assert score > 0


def test_score_videos():

    videos = [
        {
            "title": "Video A",
            "views": 100_000,
            "likes": 5_000,
            "comments": 1_000,
            "published_at":
                "2026-08-12T10:00:00Z",
        },
        {
            "title": "Video B",
            "views": 50_000,
            "likes": 1_000,
            "comments": 100,
            "published_at":
                "2026-08-10T10:00:00Z",
        },
    ]

    result = score_videos(
        videos
    )

    assert len(result) == 2

    assert (
        result[0]["trend_score"]
        >= result[1]["trend_score"]
    )
