import { AgentActivityItem } from '../types/agent';

export const mockAgentActivityStream: AgentActivityItem[] = [
  {
    id: 'act_1',
    timestamp: '2 mins ago',
    agentType: 'safety',
    agentName: 'Azure Content Safety Agent',
    action: 'Scanned scholarship listing #sch_azure_innovators_2026',
    status: 'completed',
    details: 'Verified domain authority (99/100) and confirmed 0 financial scam indicators.'
  },
  {
    id: 'act_2',
    timestamp: '5 mins ago',
    agentType: 'matching',
    agentName: 'Scholarship Matching Agent',
    action: 'Ran vector semantic similarity check against 15 criteria',
    status: 'completed',
    details: 'Matched Akshaj Sharma (GPA 3.88, CS & AI) with 96% confidence.'
  },
  {
    id: 'act_3',
    timestamp: '12 mins ago',
    agentType: 'retrieval',
    agentName: 'Azure AI Search RAG Agent',
    action: 'Ingested & indexed 4 new STEM fellowship guidelines',
    status: 'completed',
    details: 'Extracted structured eligibility requirements for automated student verification.'
  },
  {
    id: 'act_4',
    timestamp: '25 mins ago',
    agentType: 'profile',
    agentName: 'Profile & Eligibility Agent',
    action: 'Updated profile completeness calculation (92%)',
    status: 'completed',
    details: 'Normalized GPA scale, academic level, and financial need indicators.'
  },
  {
    id: 'act_5',
    timestamp: '1 hour ago',
    agentType: 'application',
    agentName: 'Application Assistant Agent',
    action: 'Generated structured outline for Statement of Purpose',
    status: 'completed',
    details: 'Suggested emphasizing Ethical AI research and campus hackathon achievements.'
  }
];
