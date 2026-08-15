from app.services.trend_service import (
    get_rising_trends,
)


def test_get_rising_trends():

    result = get_rising_trends(
        top_n=10
    )

    assert isinstance(
        result,
        list,
    )
