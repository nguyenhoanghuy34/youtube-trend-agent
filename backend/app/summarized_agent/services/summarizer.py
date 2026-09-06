import os
import json

from dotenv import load_dotenv
from google import genai

from ..prompts.summary_prompt import (
    BATCH_SUMMARY_PROMPT,
    FINAL_SUMMARY_PROMPT
)

from ..schemas.summary_schema import (
    BatchSummary,
    FinalSummary
)


# ============================================================
# Environment
# ============================================================

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL")


if not GEMINI_API_KEY:
    raise ValueError(
        "GEMINI_API_KEY is missing from .env"
    )

if not GEMINI_MODEL:
    raise ValueError(
        "GEMINI_MODEL is missing from .env"
    )


# ============================================================
# Gemini Client
# ============================================================

client = genai.Client(
    api_key=GEMINI_API_KEY
)


print(f"[Gemini] Model: {GEMINI_MODEL}")


# ============================================================
# Helper
# ============================================================

def clean_json_response(text: str) -> str:
    """
    Remove Markdown code fences from Gemini response.
    """

    text = text.strip()

    if text.startswith("```json"):
        text = text[7:]

    elif text.startswith("```"):
        text = text[3:]

    if text.endswith("```"):
        text = text[:-3]

    return text.strip()


# ============================================================
# Batch Summarization
# ============================================================

def summarize_batch(
    comments: list[str]
) -> dict:
    """
    Summarize one batch of YouTube comments.
    """

    comments_text = "\n".join(
        f"- {comment}"
        for comment in comments
    )

    prompt = BATCH_SUMMARY_PROMPT.format(
        comments=comments_text
    )

    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=prompt
    )

    if not response.text:
        raise ValueError(
            "Gemini returned an empty response"
        )

    text = clean_json_response(
        response.text
    )

    try:
        data = json.loads(text)

    except json.JSONDecodeError as e:

        raise ValueError(
            f"Gemini returned invalid JSON:\n{text}"
        ) from e

    result = BatchSummary.model_validate(
        data
    )

    return result.model_dump()


# ============================================================
# Final Summarization
# ============================================================

def summarize_final(
    batch_summaries: list[dict]
) -> dict:
    """
    Combine all batch summaries into
    one final audience analysis.
    """

    summaries_text = json.dumps(
        batch_summaries,
        ensure_ascii=False,
        indent=2
    )

    prompt = FINAL_SUMMARY_PROMPT.format(
        summaries=summaries_text
    )

    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=prompt
    )

    if not response.text:
        raise ValueError(
            "Gemini returned an empty response"
        )

    text = clean_json_response(
        response.text
    )

    try:
        data = json.loads(text)

    except json.JSONDecodeError as e:

        raise ValueError(
            f"Gemini returned invalid JSON:\n{text}"
        ) from e

    result = FinalSummary.model_validate(
        data
    )

    return result.model_dump()