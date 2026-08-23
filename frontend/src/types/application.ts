export type ApplicationStatus = 'draft' | 'in_progress' | 'ready_for_review' | 'submitted';

export interface ApplicationSection {
  id: string;
  title: string;
  prompt: string;
  content: string;
  aiSuggestedContent?: string;
  keyPoints?: string[];
  wordCountLimit?: number;
}

export interface Application {
  id: string;
  scholarshipId: string;
  scholarshipName: string;
  provider: string;
  deadline: string;
  amount: number;
  status: ApplicationStatus;
  completionPercentage: number;
  sections: ApplicationSection[];
  requiredDocuments: { name: string; isUploaded: boolean }[];
  updatedAt: string;
  version: number;
}
