from typing import List, Dict

class ApplicationRepository:
    def __init__(self, db_client=None):
        self.db_client = db_client

    async def get_user_applications(self, user_id: str) -> List[Dict]:
        return []

    async def save_application_draft(self, application_data: Dict) -> Dict:
        return application_data
