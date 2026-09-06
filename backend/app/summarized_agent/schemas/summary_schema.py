from typing import Literal

from pydantic import BaseModel


Sentiment = Literal[
    "positive",
    "neutral",
    "negative",
    "mixed"
]

Frequency = Literal[
    "low",
    "medium",
    "high"
]


class Topic(BaseModel):

    name: str

    sentiment: Sentiment

    frequency: Frequency


class BatchSummary(BaseModel):

    summary: str

    sentiment: Sentiment

    topics: list[Topic]

    positive_points: list[str]

    negative_points: list[str]

    audience_insights: list[str]


class FinalTopic(BaseModel):

    name: str

    sentiment: Sentiment

    importance: Frequency


class FinalSummary(BaseModel):

    overall_summary: str

    overall_sentiment: Sentiment

    top_topics: list[FinalTopic]

    positive_points: list[str]

    negative_points: list[str]

    common_complaints: list[str]

    audience_insights: list[str]