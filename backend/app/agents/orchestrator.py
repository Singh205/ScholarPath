from app.agents.profile_agent import ProfileAgent
from app.agents.matching_agent import MatchingAgent
from app.agents.application_agent import ApplicationAgent
from app.agents.safety_agent import SafetyAgent

class ScholarPathOrchestrator:
    def __init__(self):
        self.profile_agent = ProfileAgent()
        self.matching_agent = MatchingAgent()
        self.application_agent = ApplicationAgent()
        self.safety_agent = SafetyAgent()

    async def run_full_pipeline(self, profile: dict, scholarships: list):
        profile_res = self.profile_agent.analyze_profile(profile)
        matches = self.matching_agent.calculate_matches(profile, scholarships)
        return {
            "profile_analysis": profile_res,
            "matches": matches,
            "pipeline_status": "completed"
        }
