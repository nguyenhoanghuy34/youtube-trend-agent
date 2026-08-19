from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.agent.graph import agent_graph

from app.db.database import Base, engine
from app.db.models import User

from app.api.chat import router as chat_router
from app.routes.auth import router as auth_router


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="YouTube Trending Agent API",
    version="1.0.0",
)


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


# AUTH ROUTER
app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"],
)

app.include_router(chat_router)
