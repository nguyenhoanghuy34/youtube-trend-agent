from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from app.agent.graph import agent_graph


app = FastAPI(
    title="YouTube Trend Agent",
    version="0.1.0",
)


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    route: str
    response: str


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):

    try:

        result = agent_graph.invoke({
            "user_message": request.message,
            "route": "",
            "response": "",
        })

        return {
            "route": result["route"],
            "response": result["response"],
        }

    except Exception as e:

        print("\n========== AGENT ERROR ==========")
        print(type(e).__name__)
        print(str(e))
        print("=================================\n")

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )