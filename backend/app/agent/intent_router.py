from app.agent.state import AgentState


VALID_ROUTES = {
    "MODEL",
    "TREND",
    "RISING_TREND",
    "TOPIC_TREND",
}


def normalize_route(
    route: str,
) -> str:

    route = route.strip().upper()

    if route in VALID_ROUTES:
        return route

    return "MODEL"


def route_after_router(
    state: AgentState,
) -> str:

    route = state["route"]

    if route == "TREND":
        return "trend"

    if route == "RISING_TREND":
        return "rising_trend"

    if route == "TOPIC_TREND":
        return "topic_trend"

    return "model"
