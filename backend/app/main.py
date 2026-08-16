from fastapi import FastAPI, HTTPException
from fastapi.responses import PlainTextResponse
from pydantic import BaseModel

from app.agent.graph import agent_graph
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse


app = FastAPI()
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

        return {
            "route": result["route"],
            "response": result["response"],
            "trend_data": result.get("trend_data", []),
        }

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

        print("\n========== AGENT ERROR ==========")
        print(error)
        print("=================================\n")

        raise HTTPException(
            status_code=500,
            detail="Agent gặp lỗi khi xử lý yêu cầu.",
        )