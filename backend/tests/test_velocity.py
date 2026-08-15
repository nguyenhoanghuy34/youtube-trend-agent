from backend.app.analysis.velocity import (
    calculate_view_velocity,
    calculate_growth_rate,
)


def test_view_velocity():

    velocity = calculate_view_velocity(
        previous_views=100_000,
        current_views=200_000,
        hours=10,
    )

    assert velocity == 10_000


def test_growth_rate():

    growth = calculate_growth_rate(
        previous_views=100_000,
        current_views=150_000,
    )

    assert growth == 50.0


def test_zero_previous_views():

    growth = calculate_growth_rate(
        previous_views=0,
        current_views=100_000,
    )

    assert growth == 0.0