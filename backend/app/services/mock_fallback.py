from typing import List, Dict

MOCK_SCHOLARSHIPS_DATA = [
    {
        "id": "sch_azure_innovators_2026",
        "name": "Microsoft Azure Cloud & AI Future Leaders Fellowship",
        "provider": "Microsoft Philanthropies & Education",
        "description": "Global fellowship designed to support undergraduate & graduate research in Artificial Intelligence.",
        "amount": 15000,
        "currency": "USD",
        "deadline": "2026-10-15",
        "location": "Global",
        "categories": ["STEM", "Merit-Based", "Research"],
        "eligibilityRequirements": [],
        "requiredDocuments": ["Transcript", "Statement of Purpose"],
        "sourceUrl": "https://www.microsoft.com",
        "isVerified": True,
        "matchScore": 96,
        "riskScore": 2,
        "riskLevel": "low",
        "eligibilityStatus": "eligible",
        "matchingReasons": ["GPA 3.88 exceeds 3.50 requirement.", "CS Major aligns with target."],
        "createdDate": "2026-07-01"
    }
]

def get_mock_scholarships() -> List[Dict]:
    return MOCK_SCHOLARSHIPS_DATA

def get_mock_safety_analysis(scholarship_id: str) -> Dict:
    return {
        "scholarshipId": scholarship_id,
        "scholarshipName": "Scholarship Inspection",
        "provider": "Verified Entity",
        "riskScore": 2,
        "riskLevel": "low",
        "flags": [],
        "summaryReasoning": "Verified official domain microsoft.com with valid TLS certificates.",
        "recommendedAction": "Safe to proceed.",
        "checkedAt": "2026-08-23T12:00:00Z",
        "safetyScoreBreakdown": {
            "domainAuthority": 99,
            "feePatternScore": 100,
            "textAuthenticityScore": 98,
            "contactVerifiabilityScore": 97
        }
    }
