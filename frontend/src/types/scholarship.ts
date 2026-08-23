export type RiskLevel = 'low' | 'medium' | 'high';
export type EligibilityStatus = 'eligible' | 'partial' | 'ineligible';

export interface FactorScores {
  courseMatch: number;
  academicMatch: number;
  incomeMatch: number;
  domicileMatch: number;
  categoryMatch: number;
  documentReadiness: number;
}

export interface EligibilityCriterion {
  id: string;
  category: 'academic' | 'financial' | 'demographic' | 'field' | 'location';
  description: string;
  isMet: boolean;
  userValue?: string;
  requiredValue?: string;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  schemeType: string;
  sourceType: 'government_central' | 'government_state' | 'aicte_ugc' | 'corporate_csr' | 'foundation' | 'university';
  officialSourceName: string;
  officialUrl: string;
  sourceUrl?: string;
  logoUrl?: string;
  description: string;
  amount: number;
  currency: string;
  academicYear: string;
  deadline: string;
  location: string;
  categories: string[];
  eligibleCourses: string[];
  eligibleStudyLevels: string[];
  eligibleYears: string[];
  minimumPercentageOrCGPA: number;
  maximumFamilyIncome: number;
  domicileRequirements: string;
  categoryRequirements: string;
  genderRequirements: string;
  disabilityRequirements: string;
  institutionRequirements: string;
  requiredDocuments: string[];
  eligibilityRequirements?: EligibilityCriterion[];
  applicationProcess: string;
  isVerified: boolean;
  sourceTrustLevel: number;
  riskScore: number;
  riskLevel: RiskLevel;
  matchScore?: number;
  eligibilityStatus?: EligibilityStatus;
  factorScores?: FactorScores;
  matchingReasons?: string[];
  missingRequirements?: string[];
  createdDate: string;
}

export interface ScholarshipFilterState {
  search: string;
  category: string;
  sourceType: string;
  state: string;
  course: string;
  minAmount: number;
  maxAmount: number;
  maxIncome: number;
  riskLevel: string;
  eligibilityStatus: string;
  sortBy: 'match' | 'deadline' | 'amount';
}
