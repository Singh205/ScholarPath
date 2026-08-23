import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_mode: str = os.getenv("APP_MODE", "mock")
    api_prefix: str = "/api/v1"
    
    azure_ai_project_endpoint: str = os.getenv("AZURE_AI_PROJECT_ENDPOINT", "")
    azure_ai_model_deployment: str = os.getenv("AZURE_AI_MODEL_DEPLOYMENT", "gpt-4o")
    
    azure_search_endpoint: str = os.getenv("AZURE_SEARCH_ENDPOINT", "")
    azure_search_api_key: str = os.getenv("AZURE_SEARCH_API_KEY", "")
    azure_search_index_name: str = os.getenv("AZURE_SEARCH_INDEX_NAME", "scholarships-index")
    
    azure_content_safety_endpoint: str = os.getenv("AZURE_CONTENT_SAFETY_ENDPOINT", "")
    azure_content_safety_key: str = os.getenv("AZURE_CONTENT_SAFETY_KEY", "")

    class Config:
        env_file = ".env"

settings = Settings()
