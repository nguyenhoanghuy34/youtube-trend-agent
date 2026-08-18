import os
from pathlib import Path

from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI


# backend/.env
BACKEND_ROOT = Path(__file__).resolve().parents[1]
ENV_FILE = BACKEND_ROOT / ".env"

load_dotenv(ENV_FILE)


def test_gemini_connection():
    api_key = os.getenv("GEMINI_API_KEY")
    model_name = os.getenv("GEMINI_MODEL")

    print(f"\n.env: {ENV_FILE}")
    print(f"Model: {model_name}")

    assert ENV_FILE.exists(), f"Không tìm thấy .env: {ENV_FILE}"
    assert api_key, "GEMINI_API_KEY không tồn tại"
    assert model_name, "GEMINI_MODEL không tồn tại"

    print(f"API key: {api_key[:8]}...{api_key[-4:]}")

    model = ChatGoogleGenerativeAI(
        model=model_name,
        google_api_key=api_key,
        temperature=0,
    )

    response = model.invoke(
        "Reply with exactly: Gemini connection OK"
    )

    print(f"Response: {response.content}")

    assert response.content