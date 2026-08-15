# 🎯 YouTube Trend Intelligence Agent

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/YouTube-Data%20API-FF0000?style=for-the-badge&logo=youtube&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/LangGraph-Agent-1C3C3C?style=for-the-badge" />
</p>

<p align="center">
  <b>AI-powered YouTube Trend Intelligence for Marketing</b>
</p>

---

## 🚀 Overview

**YouTube Trend Intelligence Agent** analyzes YouTube trends and converts them into actionable marketing insights.

<p align="center">
  <img 
    src="docs/images/agent_structure.png"
    alt="YouTube Trend Intelligence Agent Architecture"
    width="850"
  />
</p>

### 🏗️ Architecture

The system follows a **multi-agent architecture** orchestrated by **LangGraph**:

```text
User Query
    ↓
Router Agent
    ↓
┌──────────────────────────────────────────────┐
│              LangGraph Orchestrator          │
├──────────────────────────────────────────────┤
│                                              │
│  Trend Discovery     → Find trending videos │
│  Competitor Analysis → Analyze channels      │
│  Audience Insight    → Analyze engagement    │
│  Content Generation  → Generate ideas        │
│                                              │
└──────────────────────────────────────────────┘
    ↓
YouTube Data API + Search / Analytics Tools
    ↓
Gemini LLM
    ↓
Analysis & Synthesis
    ↓
Marketing Insights
    ↓
Actionable Recommendations
