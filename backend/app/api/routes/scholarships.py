from fastapi import APIRouter
from app.services.mock_fallback import get_mock_scholarships

router = APIRouter()

@router.get("")
async def list_scholarships():
    return get_mock_scholarships()

@router.get("/{scholarship_id}")
async def get_scholarship(scholarship_id: str):
    items = get_mock_scholarships()
    for item in items:
        if item["id"] == scholarship_id:
            return item
    return items[0]
