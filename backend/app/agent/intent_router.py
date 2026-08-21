import json

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


def normalize_top_n(
    top_n,
) -> int:

    try:
        top_n = int(top_n)
    except (TypeError, ValueError):
        return 10

    if top_n <= 0:
        return 10

    return top_n


def parse_router_result(
    content: str,
) -> tuple[str, int]:

    content = content.strip()

    try:
        result = json.loads(content)

        route = normalize_route(
            result.get("route", "MODEL")
        )

        top_n = normalize_top_n(
            result.get("top_n", 10)
        )

        return route, top_n

    except (json.JSONDecodeError, TypeError, ValueError):

        return "MODEL", 10


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