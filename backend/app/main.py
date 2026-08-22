import sys

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.agent.graph import build_graph
from app.agent.checkpointer import create_checkpointer

from app.db.database import Base, engine
from app.db.models import User, Conversation

from app.api.chat import router as chat_router
from app.api.conversation import router as conversation_router
from app.routes.auth import router as auth_router


# =========================================================
# Database
# =========================================================

Base.metadata.create_all(bind=engine)

with engine.begin() as connection:
    connection.exec_driver_sql(
        "ALTER TABLE conversations ADD COLUMN IF NOT EXISTS user_id INTEGER"
    )
    connection.exec_driver_sql(
        "CREATE INDEX IF NOT EXISTS ix_conversations_user_id ON conversations (user_id)"
    )


# =========================================================
# FastAPI
# =========================================================

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

app = FastAPI(
    title="YouTube Trending Agent API",
    version="1.0.0",
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# LangGraph
# =========================================================

checkpointer = create_checkpointer()

agent_graph = build_graph(
    checkpointer=checkpointer
)

app.state.agent_graph = agent_graph


# =========================================================
# Routes
# =========================================================

app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"],
)

app.include_router(
    chat_router
)

app.include_router(
    conversation_router
)
