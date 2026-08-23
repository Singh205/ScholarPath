from pydantic import BaseModel
from typing import List, Optional

class AcademicProfileSchema(BaseModel):
    fullName: str
    university: str
    degree: str
    fieldOfStudy: str
    currentYear: str
    gpa: float
    maxGpa: float = 4.0
    graduationYear: int

class FinancialContextSchema(BaseModel):
    country: str
    stateOrRegion: str
    citizenship: str
    incomeRange: str
    needLevel: str

class PreferencesSchema(BaseModel):
    domesticOrInternational: str
    categories: List[str]
    minFundingAmount: float
    studyLevel: str

class StudentProfileSchema(BaseModel):
    id: str
    email: str
    academic: AcademicProfileSchema
    financial: FinancialContextSchema
    interests: List[str]
    skills: List[str]
    achievements: List[str]
    preferences: PreferencesSchema
    completenessScore: int
    updatedAt: str
