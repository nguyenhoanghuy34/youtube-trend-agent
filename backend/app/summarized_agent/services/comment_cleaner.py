import re


def clean_comment(comment: str) -> str:
    """
    Basic comment normalization.
    """

    comment = comment.strip()

    # Remove excessive whitespace
    comment = re.sub(r"\s+", " ", comment)

    return comment


def clean_comments(comments: list[str]) -> list[str]:

    cleaned = []

    seen = set()

    for comment in comments:

        comment = clean_comment(comment)

        # Ignore empty comments
        if not comment:
            continue

        # Remove duplicates
        normalized = comment.lower()

        if normalized in seen:
            continue

        seen.add(normalized)

        cleaned.append(comment)

    return cleaned