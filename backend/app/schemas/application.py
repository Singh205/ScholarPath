from pydantic import BaseModel
from typing import List, Optional

class SectionSchema(BaseModel):
    id: str
    title: str
    prompt: str
    content: str
    aiSuggestedContent: Optional[str] = None
    keyPoints: Optional[List[str]] = None
    wordCountLimit: Optional[int] = None

class DocumentStatusSchema(BaseModel):
    name: str
    isUploaded: bool

class ApplicationSchema(BaseModel):
    id: str
    scholarshipId: str
    scholarshipName: str
    provider: str
    deadline: str
    amount: float
    status: str
    completionPercentage: int
    sections: List[SectionSchema]
    requiredDocuments: List[DocumentStatusSchema]
    updatedAt: str
    version: int = 1
