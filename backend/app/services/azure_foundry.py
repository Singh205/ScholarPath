from app.config import settings

class AzureAIFoundryService:
    def __init__(self):
        self.endpoint = settings.azure_ai_project_endpoint
        self.deployment = settings.azure_ai_model_deployment

    def is_configured(self) -> bool:
        return bool(self.endpoint and self.deployment)

    async def invoke_model(self, prompt: str) -> str:
        if not self.is_configured():
            return "Demo fallback response from Azure AI Foundry Service."
        return "Live response from Azure AI Foundry deployment."
