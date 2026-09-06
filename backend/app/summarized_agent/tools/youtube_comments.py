import re
import os

from googleapiclient.discovery import build
from dotenv import load_dotenv


load_dotenv()

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")


def extract_video_id(url: str) -> str:
    """
    Extract YouTube video ID from common URL formats.
    """

    patterns = [
        r"(?:v=)([A-Za-z0-9_-]{11})",
        r"(?:youtu\.be/)([A-Za-z0-9_-]{11})",
        r"(?:youtube\.com/shorts/)([A-Za-z0-9_-]{11})",
    ]

    for pattern in patterns:
        match = re.search(pattern, url)

        if match:
            return match.group(1)

    raise ValueError("Invalid YouTube URL")


def get_youtube_client():
    if not YOUTUBE_API_KEY:
        raise ValueError("YOUTUBE_API_KEY is missing")

    return build(
        "youtube",
        "v3",
        developerKey=YOUTUBE_API_KEY
    )


def get_video_title(video_id: str) -> str:
    youtube = get_youtube_client()

    response = youtube.videos().list(
        part="snippet",
        id=video_id
    ).execute()

    if not response["items"]:
        raise ValueError("Video not found")

    return response["items"][0]["snippet"]["title"]


def get_comments(
    video_id: str,
    max_comments: int = 10000
) -> list[str]:
    """
    Get YouTube comments using pagination.

    Only one API page is held at a time.
    """

    youtube = get_youtube_client()

    comments = []
    next_page_token = None

    while len(comments) < max_comments:

        response = youtube.commentThreads().list(
            part="snippet",
            videoId=video_id,
            maxResults=100,
            pageToken=next_page_token,
            textFormat="plainText",
            order="relevance"
        ).execute()

        for item in response.get("items", []):

            comment = (
                item["snippet"]
                ["topLevelComment"]
                ["snippet"]
                ["textDisplay"]
            )

            comments.append(comment)

            if len(comments) >= max_comments:
                break

        next_page_token = response.get("nextPageToken")

        if not next_page_token:
            break

    return comments