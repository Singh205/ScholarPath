import { AgentActivityItem, MatchingStage } from '../types/agent';
import { isMockMode } from './api/config';
import { apiRequest } from './api/client';

export const mockAgentActivityStream: AgentActivityItem[] = [
  {
    id: 'act_in_1',
    timestamp: '2 mins ago',
    agentType: 'safety',
    agentName: 'Azure Content Safety Agent',
    action: 'Scanned listing #sch_nsp_central_sector_2026',
    status: 'completed',
    details: 'Verified official GOV.IN domain authority (99/100) and zero fee extortion indicators.'
  },
  {
    id: 'act_in_2',
    timestamp: '5 mins ago',
    agentType: 'matching',
    agentName: 'Scholarship Matching Agent',
    action: 'Evaluated 6 deterministic factor scores against student profile',
    status: 'completed',
    details: 'Matched Akshaj Sharma (B.Tech CSE, 8.0 CGPA, UP Domicile) with 95% confidence.'
  },
  {
    id: 'act_in_3',
    timestamp: '12 mins ago',
    agentType: 'retrieval',
    agentName: 'Azure AI Search RAG Agent',
    action: 'Ingested & indexed 5 new central & state government scheme documents',
    status: 'completed',
    details: 'Extracted eligibility rules for AICTE Pragati & NSP Central Sector scheme.'
  },
  {
    id: 'act_in_4',
    timestamp: '25 mins ago',
    agentType: 'profile',
    agentName: 'Profile & Eligibility Agent',
    action: 'Updated student profile completeness calculation (92%)',
    status: 'completed',
    details: 'Normalized CGPA scale (10.0), Class X/XII %, and annual family income indicators.'
  },
  {
    id: 'act_in_5',
    timestamp: '1 hour ago',
    agentType: 'application',
    agentName: 'Application Assistant Agent',
    action: 'Generated structured outline for Statement of Academic Aspirations',
    status: 'completed',
    details: 'Suggested emphasizing Ethical AI research and Shiv Nadar University achievements.'
  }
];

export async function fetchAgentActivity(): Promise<AgentActivityItem[]> {
  if (isMockMode()) {
    return mockAgentActivityStream;
  }
  return apiRequest<AgentActivityItem[]>('/agents/activity');
}

export const INITIAL_MATCHING_STAGES: MatchingStage[] = [
  {
    id: 'stage_1',
    name: 'Profile & Eligibility Agent',
    agent: 'Microsoft Agent Framework · Profile Module',
    description: 'Normalizing CGPA (10.0 scale), Class X/XII %, domicile state, and annual family income (₹)...',
    status: 'idle',
    progress: 0,
  },
  {
    id: 'stage_2',
    name: 'Scholarship Matching Agent',
    agent: 'Deterministic Rule Engine + Azure AI Search RAG',
    description: 'Evaluating 6 core factor scores across 25+ Indian government & CSR scheme rules...',
    status: 'idle',
    progress: 0,
  },
  {
    id: 'stage_3',
    name: 'Safety & Risk Agent',
    agent: 'Azure AI Content Safety · Predatory Risk Classifier',
    description: 'Auditing UPI fee traps, Aadhaar OTP requests, unofficial domains, and fake guarantees...',
    status: 'idle',
    progress: 0,
  },
  {
    id: 'stage_4',
    name: 'Ranking Engine & Assistant Agent',
    agent: 'LangGraph Multi-Agent Orchestrator',
    description: 'Synthesizing final match confidence scores and generating personalized rationale...',
    status: 'idle',
    progress: 0,
  }
];

export async function generateApplicationDraft(scholarshipName: string, userField: string, promptTitle: string): Promise<string> {
  if (isMockMode()) {
    return `Statement of Academic Aspirations for ${scholarshipName}\n\nMy passion for ${userField} began during my secondary education where I scored 95% in Class X and 84% in Class XII. Currently pursuing B.Tech in Computer Science & Engineering at Shiv Nadar University, I maintain an 8.0 CGPA while researching Ethical AI Systems and open-source software.\n\nReceiving the ${scholarshipName} will directly assist my academic journey, allowing me to complete my engineering degree without financial hardship. My long-term goal is to build scalable AI infrastructure that addresses societal challenges in India.\n\nThank you for evaluating my application.`;
  }
  return apiRequest<string>('/agents/application/draft', {
    method: 'POST',
    body: JSON.stringify({ scholarshipName, userField, promptTitle })
  });
}
