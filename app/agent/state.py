from typing import TypedDict


class AgentState(TypedDict):
    user_message: str
    route: str
    trend_data: list
    response: str