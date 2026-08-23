from pydantic import BaseModel
from typing import List, Optional

class ThreatFlagSchema(BaseModel):
    id: str
    category: str
    severity: str
    title: str
    description: str
    detectedTextSnippet: Optional[str] = None

class SafetyScoreBreakdownSchema(BaseModel):
    domainAuthority: int
    feePatternScore: int
    textAuthenticityScore: int
    contactVerifiabilityScore: int

class SafetyResultSchema(BaseModel):
    scholarshipId: str
    scholarshipName: str
    provider: str
    riskScore: int
    riskLevel: str
    flags: List[ThreatFlagSchema]
    summaryReasoning: str
    recommendedAction: str
    checkedAt: str
    safetyScoreBreakdown: SafetyScoreBreakdownSchema
