# 🎬 YouTube Trend Agent

> AI-powered **YouTube Trend Intelligence Agent** for discovering, summarizing, and analyzing trending YouTube content.

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-API-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![LangChain](https://img.shields.io/badge/LangChain-Agent-1C3C3C?logo=chainlink&logoColor=white)](https://www.langchain.com/)
[![Gemini](https://img.shields.io/badge/Google-Gemini-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![YouTube API](https://img.shields.io/badge/YouTube-Data%20API%20v3-FF0000?logo=youtube&logoColor=white)](https://developers.google.com/youtube/v3)

---

## 🚀 Overview

**YouTube Trend Agent** is an AI agent that collects and analyzes YouTube trends to provide:

- 🔎 **Trend Discovery** — Find trending videos
- 📝 **Summarization** — Generate concise summaries
- 📊 **Trend Analysis** — Analyze topics and engagement
- 👥 **Audience Insights** — Identify audience interests
- 💡 **Content Ideas** — Generate new content opportunities
- 📢 **Campaign Intelligence** — Support marketing decisions

---

## 🏗️ Architecture

```text
┌─────────────────┐
│    React UI     │
│    Frontend     │
└────────┬────────┘
         │ HTTP
         ▼
┌─────────────────┐
│    FastAPI      │
│     Backend     │
└────────┬────────┘
         │
    ┌────┴─────┐
    ▼          ▼
YouTube API   AI Agent
              │
        ┌─────┴─────┐
        ▼           ▼
    LangChain    Gemini
