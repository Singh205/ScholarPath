export type AgentType = 'profile' | 'matching' | 'retrieval' | 'safety' | 'ranking' | 'application';

export interface AgentActivityItem {
  id: string;
  timestamp: string;
  agentType: AgentType;
  agentName: string;
  action: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  details: string;
}

export interface MatchingStage {
  id: string;
  name: string;
  agent: string;
  description: string;
  status: 'idle' | 'running' | 'completed';
  progress: number;
}
