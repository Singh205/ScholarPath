from typing import Dict, List

class MatchingAgent:
    def calculate_matches(self, profile: Dict, scholarships: List[Dict]) -> List[Dict]:
        results = []
        for s in scholarships:
            s_copy = dict(s)
            s_copy["matchScore"] = 92
            s_copy["eligibilityStatus"] = "eligible"
            results.append(s_copy)
        return results
