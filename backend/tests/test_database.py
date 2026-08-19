from sqlalchemy import text

from app.db.database import engine


def test_database_connection():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        assert result.scalar() == 1


def test_users_table():
    with engine.connect() as connection:
        result = connection.execute(
            text("""
                SELECT column_name
                FROM information_schema.columns
                WHERE table_name = 'users'
                ORDER BY ordinal_position
            """)
        )

        columns = [row[0] for row in result]

        assert "id" in columns
        assert "username" in columns
        assert "email" in columns
        assert "password_hash" in columns
        assert "is_active" in columns