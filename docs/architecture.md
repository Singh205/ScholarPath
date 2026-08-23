# ScholarPath — Multi-Agent AI & System Architecture

ScholarPath is an AI-powered scholarship discovery, eligibility matching, statement drafting, and content safety platform built for university students.

## Architecture Overview

```text
Student Input (Profile & Preferences)
            ↓
Microsoft Agent Framework Orchestrator
            ├── Profile & Eligibility Agent
            └── Scholarship Matching Agent
            ↓
Azure AI Search (Hybrid Vector Retrieval RAG)
            ↓
LangGraph Agent State Router
            ├── Application Assistant Agent
            └── Safety Agent (Azure AI Content Safety)
            ↓
Human-in-the-Loop Review Workspace
```

## Agent Responsibilities

1. **Profile & Eligibility Agent**: Normalizes GPA scales, academic standing, income brackets, and career interests.
2. **Scholarship Matching Agent**: Calculates vector similarity fit scores against index criteria.
3. **Application Assistant Agent**: Provides structured Statement of Purpose drafts and missing point recommendations.
4. **Content Safety Agent**: Audits listings using Azure AI Content Safety rules to detect upfront payment fee traps and fake guarantee claims.

## Service Abstraction & Fallback Strategy

The application employs a service layer abstraction:
- When `APP_MODE=mock`, services return typed demonstration records with LocalStorage persistence.
- When `APP_MODE=api`, services invoke the FastAPI backend connected to live Azure AI resources.
