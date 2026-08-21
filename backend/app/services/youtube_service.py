from googleapiclient.discovery import build

from app.config.settings import settings


def get_youtube_client():
    return build(
        "youtube",
        "v3",
        developerKey=settings.YOUTUBE_API_KEY,
    )


def get_top_trending_videos(
    region_code: str = "VN",
    max_results: int = 10,
):
    youtube = get_youtube_client()

    max_results = max(
        1,
        min(int(max_results), 50),
    )

    response = (
        youtube.videos()
        .list(
            part="snippet,statistics,contentDetails",
            chart="mostPopular",
            regionCode=region_code,
            maxResults=max_results,
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
        content_details = item.get(
            "contentDetails",
            {},
        )

        videos.append(
            {
                "rank": rank,
                "video_id": item["id"],
                "title": snippet.get("title"),
                "channel_id": snippet.get(
                    "channelId"
                ),
                "channel": snippet.get(
                    "channelTitle"
                ),
                "description": snippet.get(
                    "description"
                ),
                "published_at": snippet.get(
                    "publishedAt"
                ),
                "category_id": snippet.get(
                    "categoryId"
                ),
                "duration": content_details.get(
                    "duration"
                ),
                "views": int(
                    statistics.get(
                        "viewCount",
                        0,
                    )
                ),
                "likes": int(
                    statistics.get(
                        "likeCount",
                        0,
                    )
                ),
                "comments": int(
                    statistics.get(
                        "commentCount",
                        0,
                    )
                ),
                "url": (
                    "https://www.youtube.com/watch?v="
                    f"{item['id']}"
                ),
            }
        )

    return videos


def format_trending_videos(
    videos: list[dict],
) -> str:

    lines = [
        f"Top {len(videos)} YouTube Trending tại Việt Nam:",
        "",
    ]

    for video in videos:
        lines.append(
            f"#{video['rank']} "
            f"{video['title']}"
        )

        lines.append(
            f"Channel: {video['channel']}"
        )

        lines.append(
            f"Views: {video['views']:,}"
        )

        lines.append(
            f"Likes: {video['likes']:,}"
        )

        lines.append(
            f"Comments: {video['comments']:,}"
        )

        lines.append(
            f"URL: {video['url']}"
        )

        lines.append("")

    return "\n".join(lines)


def search_youtube_videos(
    query: str,
    region_code: str = "VN",
    max_results: int = 10,
):
    youtube = get_youtube_client()

    max_results = max(
        1,
        min(int(max_results), 50),
    )

    response = (
        youtube.search()
        .list(
            part="snippet",
            q=query,
            type="video",
            regionCode=region_code,
            relevanceLanguage="vi",
            order="relevance",
            maxResults=max_results,
        )
        .execute()
    )

    video_ids = [
        item["id"]["videoId"]
        for item in response.get("items", [])
    ]

    if not video_ids:
        return []

    statistics_response = (
        youtube.videos()
        .list(
            part="snippet,statistics,contentDetails",
            id=",".join(video_ids),
        )
        .execute()
    )

    videos = []

    for rank, item in enumerate(
        statistics_response.get("items", []),
        start=1,
    ):
        snippet = item["snippet"]
        statistics = item.get("statistics", {})
        content_details = item.get(
            "contentDetails",
            {},
        )

        videos.append(
            {
                "rank": rank,
                "video_id": item["id"],
                "title": snippet.get("title"),
                "channel_id": snippet.get(
                    "channelId"
                ),
                "channel": snippet.get(
                    "channelTitle"
                ),
                "description": snippet.get(
                    "description"
                ),
                "published_at": snippet.get(
                    "publishedAt"
                ),
                "category_id": snippet.get(
                    "categoryId"
                ),
                "duration": content_details.get(
                    "duration"
                ),
                "views": int(
                    statistics.get(
                        "viewCount",
                        0,
                    )
                ),
                "likes": int(
                    statistics.get(
                        "likeCount",
                        0,
                    )
                ),
                "comments": int(
                    statistics.get(
                        "commentCount",
                        0,
                    )
                ),
                "url": (
                    "https://www.youtube.com/watch?v="
                    f"{item['id']}"
                ),
            }
        )

    return videos


def format_search_videos(
    videos: list[dict],
) -> str:

    lines = []

    for video in videos:

        lines.append(
            f"#{video['rank']} "
            f"{video['title']}"
        )

        lines.append(
            f"Channel: {video['channel']}"
        )

        lines.append(
            f"Views: {video['views']:,}"
        )

        lines.append(
            f"Likes: {video['likes']:,}"
        )

        lines.append(
            f"Comments: {video['comments']:,}"
        )

        lines.append(
            f"Published: "
            f"{video['published_at']}"
        )

        lines.append(
            f"URL: {video['url']}"
        )

        lines.append("")

    return "\n".join(lines)


if __name__ == "__main__":

    videos = get_top_trending_videos()

    print(
        format_trending_videos(videos)
    )