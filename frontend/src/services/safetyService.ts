import { SafetyResult } from '../types/safety';
import { mockSafetyResults } from '../mocks/safetyMock';
import { isMockMode } from './api/config';
import { apiRequest } from './api/client';

export async function fetchScholarshipSafety(scholarshipId: string): Promise<SafetyResult> {
  if (isMockMode()) {
    if (mockSafetyResults[scholarshipId]) {
      return mockSafetyResults[scholarshipId];
    }
    return {
      scholarshipId,
      scholarshipName: 'Scholarship Audit',
      provider: 'Verified Institution',
      riskScore: 5,
      riskLevel: 'low',
      flags: [],
      summaryReasoning: 'Azure AI Content Safety found no predatory fee structure, identity theft indicators, or deceptive claims.',
      recommendedAction: 'Safe to apply.',
      checkedAt: new Date().toISOString(),
      safetyScoreBreakdown: {
        domainAuthority: 88,
        feePatternScore: 100,
        textAuthenticityScore: 92,
        contactVerifiabilityScore: 90
      }
    };
  }

  return apiRequest<SafetyResult>(`/safety/analyze/${scholarshipId}`);
}
