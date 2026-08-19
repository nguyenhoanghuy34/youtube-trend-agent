import psycopg

from langgraph.checkpoint.postgres import PostgresSaver

from app.config.settings import settings


def create_checkpointer():
    db_url = settings.DATABASE_URL.replace(
        "postgresql+psycopg2://",
        "postgresql://",
    )

    connection = psycopg.connect(
        db_url,
        autocommit=True,
    )

    checkpointer = PostgresSaver(
        connection
    )

    # Tạo các bảng checkpoint nếu chưa tồn tại
    checkpointer.setup()

    return checkpointer
