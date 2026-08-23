from fastapi import APIRouter
from app.agents.application_agent import ApplicationAgent

router = APIRouter()

@router.post("/draft")
async def generate_draft(payload: dict):
    agent = ApplicationAgent()
    prompt = payload.get("promptTitle", "Statement of Purpose")
    field = payload.get("userField", "Computer Science")
    draft = agent.generate_draft_suggestion(prompt, field)
    return {"draft": draft}
