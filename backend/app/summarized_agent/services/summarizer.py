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


load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY is missing")


client = genai.Client(
    api_key=GOOGLE_API_KEY
)


MODEL_NAME = "gemini-2.5-flash"


def summarize_batch(
    comments: list[str]
) -> dict:

    comments_text = "\n".join(
        f"- {comment}"
        for comment in comments
    )

    prompt = BATCH_SUMMARY_PROMPT.format(
        comments=comments_text
    )

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    text = response.text.strip()

    # Remove markdown code fence if Gemini adds it
    text = text.replace("```json", "")
    text = text.replace("```", "")
    text = text.strip()

    data = json.loads(text)

    result = BatchSummary.model_validate(data)

    return result.model_dump()


def summarize_final(
    batch_summaries: list[dict]
) -> dict:

    summaries_text = json.dumps(
        batch_summaries,
        ensure_ascii=False,
        indent=2
    )

    prompt = FINAL_SUMMARY_PROMPT.format(
        summaries=summaries_text
    )

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    text = response.text.strip()

    text = text.replace("```json", "")
    text = text.replace("```", "")
    text = text.strip()

    data = json.loads(text)

    result = FinalSummary.model_validate(data)

    return result.model_dump()