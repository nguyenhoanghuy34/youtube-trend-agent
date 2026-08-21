from typing import Annotated, TypedDict

from langchain_core.messages import BaseMessage
from langgraph.graph.message import add_messages


class AgentState(TypedDict):
    user_message: str
    route: str
    top_n: int
    topic: str
    trend_data: list
    response: str
    summary: str

    # Conversation history của LangGraph
    messages: Annotated[
        list[BaseMessage],
        add_messages,
    ]