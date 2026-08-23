from typing import Dict

class ProfileAgent:
    def analyze_profile(self, profile: Dict) -> Dict:
        academic = profile.get("academic", {})
        gpa = academic.get("gpa", 0.0)
        
        score = 80
        if gpa >= 3.5:
            score += 15
            
        return {
            "normalized_gpa": gpa,
            "completeness_score": min(score, 100),
            "status": "normalized"
        }
