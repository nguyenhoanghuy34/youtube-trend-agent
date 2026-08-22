from datetime import datetime, timezone

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Request,
)

from sqlalchemy.orm import Session

from pydantic import BaseModel, Field

from app.db.database import get_db
from app.db.models import Conversation, Message


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
        # =====================================================
        # Get conversation
        # =====================================================

        conversation = (
            db.query(Conversation)
            .filter(
                Conversation.id
                == request.conversation_id
            )
            .first()
        )

        if not conversation:
            raise HTTPException(
                status_code=404,
                detail="Conversation not found",
            )

        # =====================================================
        # Save user message
        # =====================================================

        user_message = Message(
            conversation_id=conversation.id,
            role="user",
            content=request.message,
        )

        db.add(user_message)
        db.commit()

        # =====================================================
        # Agent
        # =====================================================

        agent_graph = (
            http_request
            .app
            .state
            .agent_graph
        )

        config = {
            "configurable": {
                "thread_id": str(
                    request.conversation_id
                ),
            }
        }

        result = agent_graph.invoke(
            {
                "user_message": request.message,
                "route": "",
                "top_n": 10,
                "chart_requested": False,
                "topic": "",
                "trend_data": [],
                "chart_data": {},
                "response": "",
                "summary": "",
                "messages": [],
            },
            config=config,
        )

        # =====================================================
        # Agent response
        # =====================================================

        assistant_message_text = result.get(
            "response",
            "",
        )

        summary = result.get(
            "summary",
            "",
        )

        trend_data = result.get(
            "trend_data",
            [],
        )

        chart_data = result.get(
            "chart_data",
            {},
        )

        top_n = result.get(
            "top_n",
            10,
        )

        # =====================================================
        # Save assistant message
        # =====================================================

        assistant_message = Message(
            conversation_id=conversation.id,
            role="assistant",
            content=assistant_message_text,
        )

        db.add(assistant_message)

        conversation.updated_at = (
            datetime.now(timezone.utc)
        )

        db.commit()

        # =====================================================
        # Response
        # =====================================================

        return {
            "response": assistant_message_text,

            "summary": summary,

            "trend_data": trend_data,

            "chart_data": chart_data,

            "top_n": top_n,
        }

    except HTTPException:
        raise

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Agent failed: {exc}",
        )
