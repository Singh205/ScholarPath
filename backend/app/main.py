from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api.routes import profile, scholarships, matching, applications, safety

app = FastAPI(
    title="ScholarPath AI Service API",
    description="Backend architecture scaffolding for Microsoft Agent Framework, Azure AI Search, and Azure AI Content Safety.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(profile.router, prefix=f"{settings.api_prefix}/profile", tags=["Profile"])
app.include_router(scholarships.router, prefix=f"{settings.api_prefix}/scholarships", tags=["Scholarships"])
app.include_router(matching.router, prefix=f"{settings.api_prefix}/matching", tags=["Matching Engine"])
app.include_router(applications.router, prefix=f"{settings.api_prefix}/applications", tags=["Application Assistant"])
app.include_router(safety.router, prefix=f"{settings.api_prefix}/safety", tags=["Content Safety"])

@app.get("/")
async def root():
    return {
        "service": "ScholarPath AI API Gateway",
        "mode": settings.app_mode,
        "status": "healthy"
    }
