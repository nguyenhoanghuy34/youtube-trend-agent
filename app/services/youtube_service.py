from googleapiclient.discovery import build

from app.config.settings import settings


def get_youtube_client():
    """
    Create YouTube Data API client.
    """
    return build(
        "youtube",
        "v3",
        developerKey=settings.YOUTUBE_API_KEY,
    )


def get_top_10_trending_videos(region_code: str = "VN"):
    """
    Get top 10 trending YouTube videos.

    Args:
        region_code: YouTube region code. Default: VN.

    Returns:
        List of normalized video dictionaries.
    """

    youtube = get_youtube_client()

    response = (
        youtube.videos()
        .list(
            part="snippet,statistics,contentDetails",
            chart="mostPopular",
            regionCode=region_code,
            maxResults=10,
        )
        .execute()
    )

    videos = []

    for rank, item in enumerate(
        response.get("items", []),
        start=1,
    ):
        snippet = item["snippet"]
        statistics = item.get("statistics", {})
        content_details = item.get("contentDetails", {})

        videos.append(
            {
                "rank": rank,
                "video_id": item["id"],
                "title": snippet.get("title"),
                "channel_id": snippet.get("channelId"),
                "channel": snippet.get("channelTitle"),
                "description": snippet.get("description"),
                "published_at": snippet.get("publishedAt"),
                "category_id": snippet.get("categoryId"),
                "duration": content_details.get("duration"),
                "views": int(
                    statistics.get("viewCount", 0)
                ),
                "likes": int(
                    statistics.get("likeCount", 0)
                ),
                "comments": int(
                    statistics.get("commentCount", 0)
                ),
                "url": (
                    "https://www.youtube.com/watch?v="
                    f"{item['id']}"
                ),
            }
        )

    return videos


def print_trending_videos(
    videos: list[dict],
):
    """
    Print trending videos in a readable format.
    """

    print(
        "\n========== "
        "TOP 10 YOUTUBE TRENDING "
        "==========\n"
    )

    for video in videos:

        print(
            f"#{video['rank']} "
            f"{video['title']}"
        )

        print(
            f"Channel: "
            f"{video['channel']}"
        )

        print(
            f"Views: "
            f"{video['views']:,}"
        )

        print(
            f"Likes: "
            f"{video['likes']:,}"
        )

        print(
            f"Comments: "
            f"{video['comments']:,}"
        )

        print(
            f"Published: "
            f"{video['published_at']}"
        )

        print(
            f"URL: "
            f"{video['url']}"
        )

        print("-" * 70)


if __name__ == "__main__":

    trending_videos = get_top_10_trending_videos(
        region_code="VN"
    )

    print_trending_videos(trending_videos)