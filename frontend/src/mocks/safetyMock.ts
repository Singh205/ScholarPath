import { SafetyResult } from '../types/safety';

export const mockSafetyResults: Record<string, SafetyResult> = {
  'sch_nsp_central_sector_2026': {
    scholarshipId: 'sch_nsp_central_sector_2026',
    scholarshipName: 'Central Sector Scheme of Scholarships for College & University Students',
    provider: 'Department of Higher Education, Ministry of Education (Govt of India)',
    riskScore: 2,
    riskLevel: 'low',
    flags: [],
    summaryReasoning: 'Verified official Government portal scholarships.gov.in (NSP) with valid GOV.IN domain authority, no application fees, and official institute verification workflows.',
    recommendedAction: 'Safe to apply through official National Scholarship Portal.',
    checkedAt: '2026-08-23T10:15:00Z',
    safetyScoreBreakdown: {
      domainAuthority: 99,
      feePatternScore: 100,
      textAuthenticityScore: 98,
      contactVerifiabilityScore: 97
    }
  },
  'sch_fake_whatsapp_fee_trap': {
    scholarshipId: 'sch_fake_whatsapp_fee_trap',
    scholarshipName: 'Urgent PM Youth Direct ₹50,000 Account Credit Grant',
    provider: 'Unverified Telegram & WhatsApp Express Registration Cell',
    riskScore: 94,
    riskLevel: 'high',
    flags: [
      {
        id: 'flag_fee_in_1',
        category: 'payment_request',
        severity: 'high',
        title: 'Upfront UPI Registration Fee Demand (₹499)',
        description: 'Reputable Indian government and corporate schemes never collect mandatory registration fees via UPI or personal accounts.',
        detectedTextSnippet: 'Mandatory ₹499 verification and registration fee required via UPI'
      },
      {
        id: 'flag_channel_1',
        category: 'whatsapp_trap',
        severity: 'high',
        title: 'Unofficial WhatsApp Application Trap',
        description: 'Listing prompts applicants to send screenshots and bank credentials to a personal WhatsApp number.',
        detectedTextSnippet: 'Send UPI payment screenshot on WhatsApp number'
      },
      {
        id: 'flag_pin_1',
        category: 'otp_pin_request',
        severity: 'high',
        title: 'Requests Debit Card PIN Credentials',
        description: 'Severe identity theft and banking credential fraud attempt.',
        detectedTextSnippet: 'Bank Account Number & Debit Card PIN Details'
      }
    ],
    summaryReasoning: 'Azure AI Content Safety flagged high-confidence predatory financial extortion patterns.',
    recommendedAction: 'HIGH RISK: Do not send money via UPI or share bank details. Report listing immediately.',
    checkedAt: '2026-08-23T08:00:00Z',
    safetyScoreBreakdown: {
      domainAuthority: 10,
      feePatternScore: 0,
      textAuthenticityScore: 15,
      contactVerifiabilityScore: 5
    }
  },
  'sch_fake_aadhaar_otp_phishing': {
    scholarshipId: 'sch_fake_aadhaar_otp_phishing',
    scholarshipName: 'National Digital Student Laptop & Scholarship Subsidy Scheme',
    provider: 'Unverified Digital Education Welfare Network',
    riskScore: 98,
    riskLevel: 'high',
    flags: [
      {
        id: 'flag_otp_1',
        category: 'otp_pin_request',
        severity: 'high',
        title: 'Aadhaar OTP Phishing Attempt',
        description: 'Demands applicants enter Aadhaar OTP received on registered mobile. This can lead to unauthorized bank account access via Aadhaar Enabled Payment Systems (AePS).',
        detectedTextSnippet: 'submit the OTP received on your mobile phone to claim instantly'
      },
      {
        id: 'flag_domain_in_1',
        category: 'domain_spoofing',
        severity: 'high',
        title: 'Domain Impersonating Government Scheme',
        description: 'Uses obscure TLD (.xyz) formatted to resemble official government subsidy portal.',
        detectedTextSnippet: 'free-laptop-scheme-gov-direct.xyz'
      }
    ],
    summaryReasoning: 'Severe identity theft and banking credential phishing threat.',
    recommendedAction: 'HIGH RISK: Never share Aadhaar OTP with any third-party portal.',
    checkedAt: '2026-08-23T11:45:00Z',
    safetyScoreBreakdown: {
      domainAuthority: 5,
      feePatternScore: 10,
      textAuthenticityScore: 10,
      contactVerifiabilityScore: 5
    }
  }
};
