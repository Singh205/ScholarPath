import { Application } from '../types/application';
import { getStorageItem, setStorageItem } from '../lib/storage';

const APPLICATIONS_KEY = 'scholarpath_user_applications';

const initialMockApplications: Application[] = [
  {
    id: 'app_01',
    scholarshipId: 'sch_nsp_central_sector_2026',
    scholarshipName: 'Central Sector Scheme of Scholarships for College & University Students',
    provider: 'Department of Higher Education, Ministry of Education (Govt of India)',
    deadline: '2026-10-31',
    amount: 20000,
    status: 'in_progress',
    completionPercentage: 70,
    sections: [
      {
        id: 'sec_1',
        title: 'Statement of Academic Aspirations',
        prompt: 'Describe your educational journey in B.Tech CSE and how this Ministry of Education scholarship will assist your career goals (max 500 words).',
        content: 'As a 3rd year Computer Science & Engineering student at Shiv Nadar University, I maintain an 8.0 CGPA while leading research in AI ethics and open-source software.\n\nReceiving the Central Sector Scheme scholarship will relieve family financial pressure and enable me to focus on completing my technical undergraduate degree and research.',
        aiSuggestedContent: 'Highlight your 95% Class X score, 84% Class XII performance, and your Dean\'s Honor List recognition at Shiv Nadar University.',
        keyPoints: [
          'Emphasize 8.0 CGPA at Shiv Nadar University',
          'Mention Class 10 (95%) and Class 12 (84%) merit background',
          'Highlight research in Ethical AI and open-source contributions'
        ],
        wordCountLimit: 500
      },
      {
        id: 'sec_2',
        title: 'Income & Domicile Verification',
        prompt: 'Provide details regarding your Uttar Pradesh revenue income certificate and domicile documentation.',
        content: 'I possess an official Income Certificate issued by Tehsildar (FY 2025-26) confirming annual family income of ₹8,00,000, along with a verified UP Domicile Certificate.',
        aiSuggestedContent: 'Ensure Aadhaar card is linked to your bank account for NSP direct benefit transfer (DBT).',
        keyPoints: ['Income Certificate verified', 'UP Domicile Certificate ready', 'Aadhaar linked bank account'],
        wordCountLimit: 300
      }
    ],
    requiredDocuments: [
      { name: 'Class XII Marksheet (84%)', isUploaded: true },
      { name: 'Income Certificate (FY 2025-26)', isUploaded: true },
      { name: 'UP Domicile Certificate', isUploaded: true },
      { name: 'Aadhaar Card Copy', isUploaded: true },
      { name: 'Bonafide Student Certificate (SNU)', isUploaded: false }
    ],
    updatedAt: '2026-08-22T16:00:00Z',
    version: 2
  },
  {
    id: 'app_02',
    scholarshipId: 'sch_reliance_foundation_ug_2026',
    scholarshipName: 'Reliance Foundation Undergraduate Scholarship Scheme',
    provider: 'Reliance Foundation (CSR Initiative)',
    deadline: '2026-10-05',
    amount: 200000,
    status: 'draft',
    completionPercentage: 35,
    sections: [
      {
        id: 'sec_rf_1',
        title: 'Aptitude & Leadership Essay',
        prompt: 'How do you intend to leverage technology and innovation to drive positive social impact in India?',
        content: 'Studying Computer Science & Engineering in India has demonstrated to me how AI tools can democratize technical education.',
        aiSuggestedContent: 'Reference your National Student AI Hackathon 1st Rank winning project.',
        keyPoints: ['National AI Hackathon win', 'Social impact AI research'],
        wordCountLimit: 600
      }
    ],
    requiredDocuments: [
      { name: 'Class X & XII Marksheets', isUploaded: true },
      { name: 'College ID Card', isUploaded: true },
      { name: 'Income Proof', isUploaded: false }
    ],
    updatedAt: '2026-08-21T11:00:00Z',
    version: 1
  }
];

export function getApplications(): Application[] {
  return getStorageItem<Application[]>(APPLICATIONS_KEY, initialMockApplications);
}

export function saveApplication(application: Application): Application[] {
  const current = getApplications();
  const index = current.findIndex(a => a.id === application.id);
  let updated: Application[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = { ...application, updatedAt: new Date().toISOString() };
  } else {
    updated = [...current, { ...application, updatedAt: new Date().toISOString() }];
  }
  setStorageItem(APPLICATIONS_KEY, updated);
  return updated;
}

export function deleteApplication(id: string): Application[] {
  const current = getApplications();
  const updated = current.filter(a => a.id !== id);
  setStorageItem(APPLICATIONS_KEY, updated);
  return updated;
}
