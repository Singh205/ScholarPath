import { RiskLevel } from './scholarship';

export interface ThreatFlag {
  id: string;
  category: 'payment_request' | 'otp_pin_request' | 'aadhaar_scraping' | 'domain_spoofing' | 'whatsapp_trap' | 'unrealistic_guarantee' | 'suspicious_contact' | 'urgency_pressure' | 'missing_provider' | 'inconsistent_eligibility';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  detectedTextSnippet?: string;
}

export interface SafetyResult {
  scholarshipId: string;
  scholarshipName: string;
  provider: string;
  riskScore: number;
  riskLevel: RiskLevel;
  flags: ThreatFlag[];
  summaryReasoning: string;
  recommendedAction: string;
  checkedAt: string;
  safetyScoreBreakdown: {
    domainAuthority: number;
    feePatternScore: number;
    textAuthenticityScore: number;
    contactVerifiabilityScore: number;
  };
}
