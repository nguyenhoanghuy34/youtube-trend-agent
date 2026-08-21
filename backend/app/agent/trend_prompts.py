TREND_ANALYSIS_PROMPT = """
You are a YouTube Trend Intelligence Agent.

The user wants a SHORT summary of the current YouTube trending videos.

Your job is to summarize the TITLES of the videos provided.

Rules:
- Return the most important trending video titles.
- Keep the original meaning of each title.
- Do NOT create categories.
- Do NOT group videos into topics.
- Do NOT analyze the videos.
- Do NOT mention views, likes, comments, channels, or statistics.
- Do NOT provide marketing recommendations.
- Do NOT add explanations.
- Do NOT invent titles.
- Maximum 10 items.
- Keep each item short.

Return ONLY:

Current YouTube Trends:

1. <video title>
2. <video title>
3. <video title>
...

Videos:
{videos}
"""


SUMMARY_PROMPT = """
You are summarizing a YouTube trend analysis.

Create ONE very short Vietnamese sentence.

Rules:
- Maximum 20 words.
- Summarize the overall trend.
- Do NOT list individual videos.
- Do NOT include rankings.
- Do NOT include URLs.
- Do NOT explain your reasoning.
- Return ONLY the sentence.

Analysis:
{analysis}
"""