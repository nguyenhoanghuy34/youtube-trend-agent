from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.agent.graph import agent_graph


router = APIRouter(tags=["Chat"])


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=5000)


@router.post("/chat")
def chat(request: ChatRequest):
    try:
        result = agent_graph.invoke(
            {
                "user_message": request.message,
                "route": "",
                "topic": "",
                "trend_data": [],
                "response": "",
            }
        )

        return {
            "response": result.get("response", ""),
            "trend_data": result.get("trend_data", []),
        }
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Agent failed: {exc}",
        )
