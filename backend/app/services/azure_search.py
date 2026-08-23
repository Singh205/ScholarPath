from app.config import settings

class AzureAISearchService:
    def __init__(self):
        self.endpoint = settings.azure_search_endpoint
        self.api_key = settings.azure_search_api_key
        self.index_name = settings.azure_search_index_name

    def is_configured(self) -> bool:
        return bool(self.endpoint and self.api_key)

    async def search_scholarships(self, query: str, filters: dict = None):
        if not self.is_configured():
            return []
        return []
