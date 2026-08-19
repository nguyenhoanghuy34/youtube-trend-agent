from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import Conversation, Message
from pydantic import BaseModel, Field


router = APIRouter(tags=["Chat"])


class ChatRequest(BaseModel):
    message: str = Field(
        min_length=1,
        max_length=5000,
    )

    conversation_id: int


@router.post("/chat")
def chat(
    request: ChatRequest,
    http_request: Request,
    db: Session = Depends(get_db),
):
    try:
        conversation = (
            db.query(Conversation)
            .filter(Conversation.id == request.conversation_id)
            .first()
        )

        if not conversation:
            raise HTTPException(
                status_code=404,
                detail="Conversation not found",
            )

        user_message = Message(
            conversation_id=conversation.id,
            role="user",
            content=request.message,
        )
        db.add(user_message)
        db.commit()

        agent_graph = http_request.app.state.agent_graph

        config = {
            "configurable": {
                "thread_id": str(request.conversation_id),
            }
        }

        result = agent_graph.invoke(
            {
                "user_message": request.message,
                "route": "",
                "topic": "",
                "trend_data": [],
                "response": "",
                "messages": [],
            },
            config=config,
        )

        assistant_message_text = result.get("response", "")
        assistant_message = Message(
            conversation_id=conversation.id,
            role="assistant",
            content=assistant_message_text,
        )
        db.add(assistant_message)
        conversation.updated_at = datetime.now(timezone.utc)
        db.commit()

        return {
            "response": assistant_message_text,
            "trend_data": result.get(
                "trend_data",
                [],
            ),
        }

    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Agent failed: {exc}",
        )
