def calculate_view_velocity(
    previous_views: int,
    current_views: int,
    hours: float,
) -> float:

    if hours <= 0:
        return 0.0

    if previous_views <= 0:
        return 0.0

    return (
        current_views
        - previous_views
    ) / hours


def calculate_growth_rate(
    previous_views: int,
    current_views: int,
) -> float:

    if previous_views <= 0:
        return 0.0

    return (
        (
            current_views
            - previous_views
        )
        / previous_views
    ) * 100