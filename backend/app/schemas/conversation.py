from datetime import datetime

from pydantic import BaseModel, ConfigDict


class MessageCreate(BaseModel):
    role: str
    content: str


class MessageResponse(BaseModel):
    id: int
    conversation_id: int
    role: str
    content: str
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )


class ConversationCreate(BaseModel):
    title: str = "New Conversation"
    user_id: int | None = None


class ConversationUpdate(BaseModel):
    title: str
    user_id: int


class ConversationResponse(BaseModel):
    id: int
    title: str
    user_id: int | None = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )


class ConversationDetailResponse(ConversationResponse):
    messages: list[MessageResponse] = []