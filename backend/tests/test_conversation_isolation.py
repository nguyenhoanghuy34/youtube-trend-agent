from datetime import datetime, timezone

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.db.database import Base, get_db
from app.db.models import User, Conversation
from app.main import app


# =========================================================
# Test Database
# =========================================================

@pytest.fixture
def db_session():
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )

    TestingSessionLocal = sessionmaker(
        bind=engine,
        autocommit=False,
        autoflush=False,
    )

    Base.metadata.create_all(bind=engine)

    db = TestingSessionLocal()

    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)


# =========================================================
# FastAPI Test Client
# =========================================================

@pytest.fixture
def client(db_session):

    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db

    yield TestClient(app)

    app.dependency_overrides.clear()


# =========================================================
# Test Data
# =========================================================

@pytest.fixture
def users_and_conversations(db_session):

    user_a = User(
        username="user_a",
        email="a@test.com",
        password_hash="hashed_password",
    )

    user_b = User(
        username="user_b",
        email="b@test.com",
        password_hash="hashed_password",
    )

    db_session.add_all([user_a, user_b])
    db_session.commit()

    db_session.refresh(user_a)
    db_session.refresh(user_b)

    conversation_a1 = Conversation(
        title="User A Chat 1",
        user_id=user_a.id,
    )

    conversation_a2 = Conversation(
        title="User A Chat 2",
        user_id=user_a.id,
    )

    conversation_b1 = Conversation(
        title="User B Chat 1",
        user_id=user_b.id,
    )

    db_session.add_all(
        [
            conversation_a1,
            conversation_a2,
            conversation_b1,
        ]
    )

    db_session.commit()

    return {
        "user_a": user_a,
        "user_b": user_b,
        "a1": conversation_a1,
        "a2": conversation_a2,
        "b1": conversation_b1,
    }


# =========================================================
# Tests
# =========================================================

def test_user_a_only_sees_own_conversations(
    client,
    users_and_conversations,
):
    user_a = users_and_conversations["user_a"]

    response = client.get(
        f"/conversations?user_id={user_a.id}"
    )

    assert response.status_code == 200

    conversations = response.json()

    conversation_ids = {
        conversation["id"]
        for conversation in conversations
    }

    assert conversation_ids == {
        users_and_conversations["a1"].id,
        users_and_conversations["a2"].id,
    }

    assert users_and_conversations["b1"].id not in conversation_ids


def test_user_b_only_sees_own_conversations(
    client,
    users_and_conversations,
):
    user_b = users_and_conversations["user_b"]

    response = client.get(
        f"/conversations?user_id={user_b.id}"
    )

    assert response.status_code == 200

    conversations = response.json()

    conversation_ids = {
        conversation["id"]
        for conversation in conversations
    }

    assert conversation_ids == {
        users_and_conversations["b1"].id,
    }

    assert users_and_conversations["a1"].id not in conversation_ids
    assert users_and_conversations["a2"].id not in conversation_ids


def test_get_conversations_without_user_id_returns_all(
    client,
    users_and_conversations,
):
    """
    This test documents the current security/isolation bug.

    Without user_id, the current endpoint returns
    conversations belonging to multiple users.
    """

    response = client.get("/conversations")

    assert response.status_code == 200

    conversations = response.json()

    conversation_ids = {
        conversation["id"]
        for conversation in conversations
    }

    assert conversation_ids == {
        users_and_conversations["a1"].id,
        users_and_conversations["a2"].id,
        users_and_conversations["b1"].id,
    }


def test_user_cannot_access_other_users_conversation(
    client,
    users_and_conversations,
):
    user_a = users_and_conversations["user_a"]
    conversation_b = users_and_conversations["b1"]

    response = client.get(
        f"/conversations/{conversation_b.id}"
        f"?user_id={user_a.id}"
    )

    assert response.status_code == 404


def test_user_can_access_own_conversation(
    client,
    users_and_conversations,
):
    user_a = users_and_conversations["user_a"]
    conversation_a = users_and_conversations["a1"]

    response = client.get(
        f"/conversations/{conversation_a.id}"
        f"?user_id={user_a.id}"
    )

    assert response.status_code == 200

    data = response.json()

    assert data["id"] == conversation_a.id
    assert data["user_id"] == user_a.id