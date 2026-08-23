from typing import Dict

class SafetyAgent:
    def audit_listing(self, scholarship_data: Dict) -> Dict:
        description = scholarship_data.get("description", "").lower()
        if "fee" in description or "guaranteed" in description:
            return {
                "risk_score": 92,
                "risk_level": "high",
                "reasoning": "Predatory fee or guarantee detected."
            }
        return {
            "risk_score": 2,
            "risk_level": "low",
            "reasoning": "Verified safe."
        }
