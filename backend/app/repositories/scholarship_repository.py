from typing import List, Dict, Optional

class ScholarshipRepository:
    def __init__(self, db_client=None):
        self.db_client = db_client

    async def get_all_scholarships(self) -> List[Dict]:
        return []

    async def get_by_id(self, scholarship_id: str) -> Optional[Dict]:
        return None
