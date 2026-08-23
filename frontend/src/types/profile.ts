export interface AcademicProfile {
  fullName: string;
  university: string;
  institutionType: string;
  course: string;
  branch: string;
  currentYear: string;
  currentSemester: string;
  cgpa: number;
  maxCgpa: number;
  class10Percentage: number;
  class12Percentage: number;
  graduationYear: number;
}

export interface FinancialContext {
  country: string;
  state: string;
  city: string;
  domicileState: string;
  nationality: string;
  annualFamilyIncome: number;
  incomeRange: string;
  incomeCertificateAvailable: boolean;
  domicileCertificateAvailable: boolean;
  category: string;
  gender: string;
  disabilityStatus: boolean;
  udidAvailable: boolean;
}

export interface Preferences {
  domesticOrInternational: 'domestic' | 'international' | 'both';
  categories: string[];
  minFundingAmount: number;
  studyLevel: string;
}

export interface StudentProfile {
  id: string;
  email: string;
  academic: AcademicProfile;
  financial: FinancialContext;
  interests: string[];
  skills: string[];
  achievements: string[];
  preferences: Preferences;
  completenessScore: number;
  updatedAt: string;
}
