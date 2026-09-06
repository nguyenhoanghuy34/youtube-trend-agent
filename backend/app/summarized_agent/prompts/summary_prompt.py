BATCH_SUMMARY_PROMPT = """
You are a YouTube comment analyst.

Analyze the following comments from a YouTube video.

Your task:

1. Identify the main opinions.
2. Identify positive opinions.
3. Identify negative opinions.
4. Identify frequently mentioned topics.
5. Determine the overall sentiment.
6. Extract important audience insights.

Return JSON with exactly this structure:

{
    "summary": "short summary",
    "sentiment": "positive | neutral | negative | mixed",
    "topics": [
        {
            "name": "topic name",
            "sentiment": "positive | neutral | negative | mixed",
            "frequency": "low | medium | high"
        }
    ],
    "positive_points": [],
    "negative_points": [],
    "audience_insights": []
}

Comments:

{comments}
"""


FINAL_SUMMARY_PROMPT = """
You are a senior YouTube audience analyst.

You are given summaries generated from multiple batches of comments.

Combine them into one final audience analysis.

Focus on:

1. Overall sentiment
2. Most important topics
3. Positive audience opinions
4. Negative audience opinions
5. Common complaints
6. Audience insights

Do not simply repeat every batch.

Identify patterns across all batches.

Return JSON with exactly this structure:

{
    "overall_summary": "",
    "overall_sentiment": "positive | neutral | negative | mixed",
    "top_topics": [
        {
            "name": "",
            "sentiment": "",
            "importance": "low | medium | high"
        }
    ],
    "positive_points": [],
    "negative_points": [],
    "common_complaints": [],
    "audience_insights": []
}

Batch summaries:

{summaries}
"""