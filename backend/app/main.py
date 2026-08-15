from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from backend.app.agent.graph import agent_graph


app = FastAPI()


class ChatRequest(BaseModel):
    message: str


@app.post("/chat")
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

        # Người dùng chỉ nhận nội dung trả lời
        return result["response"]

    except Exception as e:

        error = str(e)

        if (
            "RESOURCE_EXHAUSTED" in error
            or "429" in error
        ):
            raise HTTPException(
                status_code=429,
                detail="Gemini API quota đã hết. Vui lòng thử lại sau.",
            )

        raise HTTPException(
            status_code=500,
            detail="Agent gặp lỗi khi xử lý yêu cầu.",
        )