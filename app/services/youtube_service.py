from googleapiclient.discovery import build

from app.config.settings import settings


def get_top_10_trending_videos():
    youtube = build(
        "youtube",
        "v3",
        developerKey=settings.YOUTUBE_API_KEY,
    )

    request = youtube.videos().list(
        part="snippet,statistics",
        chart="mostPopular",
        regionCode="VN",
        maxResults=10,
    )

    response = request.execute()

    videos = []

    for index, item in enumerate(response.get("items", []), start=1):
        snippet = item["snippet"]
        statistics = item.get("statistics", {})

        video = {
            "rank": index,
            "video_id": item["id"],
            "title": snippet["title"],
            "channel": snippet["channelTitle"],
            "published_at": snippet["publishedAt"],
            "views": int(statistics.get("viewCount", 0)),
            "likes": int(statistics.get("likeCount", 0)),
            "comments": int(statistics.get("commentCount", 0)),
            "url": f"https://www.youtube.com/watch?v={item['id']}",
        }

        videos.append(video)

    return videos


if __name__ == "__main__":
    videos = get_top_10_trending_videos()

    print("\n========== TOP 10 YOUTUBE TRENDING ==========\n")

    for video in videos:
        print(f"#{video['rank']} {video['title']}")
        print(f"Channel: {video['channel']}")
        print(f"Views: {video['views']:,}")
        print(f"Likes: {video['likes']:,}")
        print(f"Comments: {video['comments']:,}")
        print(f"URL: {video['url']}")
        print("-" * 60)