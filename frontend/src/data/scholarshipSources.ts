export interface ScholarshipSourceInfo {
  id: string;
  name: string;
  type: 'government_central' | 'government_state' | 'aicte_ugc' | 'corporate_csr' | 'foundation' | 'university';
  trustScore: number;
  officialDomain: string;
  description: string;
}

export const SCHOLARSHIP_SOURCES: ScholarshipSourceInfo[] = [
  {
    id: 'src_nsp',
    name: 'National Scholarship Portal (NSP) — Govt of India',
    type: 'government_central',
    trustScore: 99,
    officialDomain: 'scholarships.gov.in',
    description: 'Official single-window scholarship portal of Ministry of Electronics & IT, Government of India.'
  },
  {
    id: 'src_aicte',
    name: 'All India Council for Technical Education (AICTE)',
    type: 'aicte_ugc',
    trustScore: 98,
    officialDomain: 'aicte-india.org',
    description: 'Statutory body for technical and engineering education under Ministry of Education.'
  },
  {
    id: 'src_up_scholarship',
    name: 'Uttar Pradesh Scholarship & Fee Reimbursement System (Saksham)',
    type: 'government_state',
    trustScore: 96,
    officialDomain: 'scholarship.up.gov.in',
    description: 'State government fee reimbursement and post-matric assistance scheme.'
  },
  {
    id: 'src_tata_trusts',
    name: 'Tata Trusts Higher Education Grants',
    type: 'foundation',
    trustScore: 97,
    officialDomain: 'tatatrusts.org',
    description: 'Philanthropic grant initiative empowering university students pursuing professional degrees.'
  },
  {
    id: 'src_reliance_foundation',
    name: 'Reliance Foundation Undergraduate Scholarships',
    type: 'corporate_csr',
    trustScore: 97,
    officialDomain: 'scholarships.reliancefoundation.org',
    description: 'CSR initiative supporting meritorious students across India studying STEM and humanities.'
  },
  {
    id: 'src_hdfc_csr',
    name: 'HDFC Bank Parivartan Badhte Kadam Scholarship',
    type: 'corporate_csr',
    trustScore: 96,
    officialDomain: 'hdfcbank.com',
    description: 'Educational assistance scheme supporting students from low-income families.'
  },
  {
    id: 'src_infosys_foundation',
    name: 'Infosys Foundation STEM Excellence Fellowship',
    type: 'corporate_csr',
    trustScore: 98,
    officialDomain: 'infosys.com/infosys-foundation',
    description: 'Merit-cum-need fellowship for undergraduate engineering and computer science students.'
  }
];
