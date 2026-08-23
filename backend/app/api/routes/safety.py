from fastapi import APIRouter
from app.services.mock_fallback import get_mock_safety_analysis

router = APIRouter()

@router.get("/analyze/{scholarship_id}")
async def analyze_scholarship_safety(scholarship_id: str):
    return get_mock_safety_analysis(scholarship_id)
