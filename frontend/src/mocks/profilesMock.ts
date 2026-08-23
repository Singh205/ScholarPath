import { StudentProfile } from '../types/profile';

export const mockDefaultProfile: StudentProfile = {
  id: 'usr_demoprofile_in_01',
  email: 'akshaj.sharma@snu.edu.in',
  academic: {
    fullName: 'Akshaj Sharma',
    university: 'Shiv Nadar University',
    institutionType: 'Deemed University',
    course: 'B.Tech',
    branch: 'Computer Science and Engineering',
    currentYear: '3rd Year',
    currentSemester: '5th Semester',
    cgpa: 8.0,
    maxCgpa: 10.0,
    class10Percentage: 95.0,
    class12Percentage: 84.0,
    graduationYear: 2027,
  },
  financial: {
    country: 'India',
    state: 'Uttar Pradesh',
    city: 'Gautam Buddha Nagar',
    domicileState: 'Uttar Pradesh',
    nationality: 'Indian',
    annualFamilyIncome: 800000,
    incomeRange: '₹6,00,000 - ₹8,00,000',
    incomeCertificateAvailable: true,
    domicileCertificateAvailable: true,
    category: 'General',
    gender: 'Male',
    disabilityStatus: false,
    udidAvailable: false,
  },
  interests: [
    'Artificial Intelligence & Machine Learning',
    'Ethical AI Systems',
    'Open Source Software',
    'National Education Technology',
    'Cloud Computing'
  ],
  skills: [
    'Python',
    'TypeScript',
    'PyTorch',
    'React',
    'FastAPI',
    'Azure AI Services'
  ],
  achievements: [
    'Dean\'s Honor List for Academic Excellence (2024-2025)',
    '1st Rank in National Student AI Hackathon (Social Impact)',
    'Undergraduate Research Assistant at University AI Lab'
  ],
  preferences: {
    domesticOrInternational: 'both',
    categories: ['Central Government', 'AICTE / UGC', 'Corporate CSR Grant', 'STEM / Engineering', 'Merit-Based'],
    minFundingAmount: 20000,
    studyLevel: 'Undergraduate',
  },
  completenessScore: 92,
  updatedAt: '2026-08-23T14:00:00Z',
};
