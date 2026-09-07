def chunk_comments(
    comments: list[str],
    batch_size: int = 20
) -> list[list[str]]:
    """
    Split comments into batches.
    """

    batches = []

    for i in range(0, len(comments), batch_size):

        batch = comments[i:i + batch_size]

        batches.append(batch)

    return batches
