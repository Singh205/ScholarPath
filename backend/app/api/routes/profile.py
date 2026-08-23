from fastapi import APIRouter
from app.schemas.profile import StudentProfileSchema

router = APIRouter()

@router.get("", response_model=dict)
async def get_profile():
    return {
        "id": "usr_demoprofile_01",
        "email": "akshaj.student@university.edu",
        "completenessScore": 92,
        "status": "active"
    }

@router.put("", response_model=dict)
async def update_profile(profile: dict):
    return profile
