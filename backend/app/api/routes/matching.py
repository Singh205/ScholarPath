from fastapi import APIRouter
from app.agents.orchestrator import ScholarPathOrchestrator
from app.services.mock_fallback import get_mock_scholarships

router = APIRouter()

@router.post("/run")
async def run_matching(payload: dict):
    orchestrator = ScholarPathOrchestrator()
    scholarships = get_mock_scholarships()
    result = await orchestrator.run_full_pipeline(payload, scholarships)
    return result
