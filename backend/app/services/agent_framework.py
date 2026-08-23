from app.config import settings

class MicrosoftAgentFrameworkService:
    def __init__(self):
        self.app_mode = settings.app_mode

    async def execute_workflow(self, profile_data: dict, scholarship_data: dict):
        return {
            "status": "success",
            "mode": self.app_mode,
            "match_score": 96,
            "confidence": 0.94
        }
