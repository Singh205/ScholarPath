from typing import Dict

class ApplicationAgent:
    def generate_draft_suggestion(self, prompt: str, profile_summary: str) -> str:
        return f"Structured Statement of Purpose Draft responding to '{prompt}'. Emphasizing student accomplishments: {profile_summary}."
