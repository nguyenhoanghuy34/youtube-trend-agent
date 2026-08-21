from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import Conversation, Message
from app.schemas.conversation import (
    ConversationCreate,
    ConversationDetailResponse,
    ConversationResponse,
    MessageCreate,
    MessageResponse,
)

from app.schemas.conversation import (
    ConversationCreate,
    ConversationUpdate,
    ConversationDetailResponse,
    ConversationResponse,
    MessageCreate,
    MessageResponse,
)


router = APIRouter(
    prefix="/conversations",
    tags=["Conversations"],
)


@router.post(
    "",
    response_model=ConversationResponse,
)
def create_conversation(
    data: ConversationCreate,
    db: Session = Depends(get_db),
):
    conversation = Conversation(
        title=data.title,
        user_id=data.user_id,
    )

    db.add(conversation)
    db.commit()
    db.refresh(conversation)

    return conversation


@router.patch(
    "/{conversation_id}",
    response_model=ConversationResponse,
)
def update_conversation(
    conversation_id: int,
    data: ConversationUpdate,
    db: Session = Depends(get_db),
):
    conversation = (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id,
            Conversation.user_id == data.user_id,
        )
        .first()
    )

    if not conversation:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    title = data.title.strip()

    if not title:
        raise HTTPException(
            status_code=400,
            detail="Conversation title cannot be empty",
        )

    conversation.title = title
    conversation.updated_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(conversation)

    return conversation


@router.get(
    "",
    response_model=list[ConversationResponse],
)
def get_conversations(
    user_id: int | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(Conversation)

    if user_id is not None:
        query = query.filter(Conversation.user_id == user_id)

    return query.order_by(Conversation.updated_at.desc()).all()


@router.get(
    "/{conversation_id}",
    response_model=ConversationDetailResponse,
)
def get_conversation(
    conversation_id: int,
    user_id: int | None = None,
    db: Session = Depends(get_db),
):
    conversation = (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id
        )
        .first()
    )

    if not conversation:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    if user_id is not None and conversation.user_id != user_id:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    return conversation


@router.post(
    "/{conversation_id}/messages",
    response_model=MessageResponse,
)
def create_message(
    conversation_id: int,
    data: MessageCreate,
    db: Session = Depends(get_db),
):
    conversation = (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id
        )
        .first()
    )

    if not conversation:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    message = Message(
        conversation_id=conversation_id,
        role=data.role,
        content=data.content,
    )

    db.add(message)
    conversation.updated_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(message)

    return message
