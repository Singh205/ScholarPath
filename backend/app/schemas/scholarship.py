from pydantic import BaseModel
from typing import List, Optional

class EligibilityCriterionSchema(BaseModel):
    id: str
    category: str
    description: str
    isMet: bool
    userValue: Optional[str] = None
    requiredValue: Optional[str] = None

class ScholarshipSchema(BaseModel):
    id: str
    name: str
    provider: str
    logoUrl: Optional[str] = None
    description: str
    amount: float
    currency: str = "USD"
    deadline: str
    location: str
    categories: List[str]
    eligibilityRequirements: List[EligibilityCriterionSchema]
    requiredDocuments: List[str]
    sourceUrl: str
    isVerified: bool = True
    matchScore: Optional[int] = None
    riskScore: int
    riskLevel: str
    eligibilityStatus: Optional[str] = None
    matchingReasons: Optional[List[str]] = None
    missingRequirements: Optional[List[str]] = None
    createdDate: str
