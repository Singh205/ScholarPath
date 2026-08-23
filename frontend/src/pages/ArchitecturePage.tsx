import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Cpu, ShieldCheck, Search, Layers, Server, Code, FileText, CheckCircle2, ArrowDown } from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold">
              <Cpu className="w-5 h-5 text-brand-400" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">AI & System Architecture</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Technical blueprint for Viva / Demo presentations (Microsoft & Azure Integration Scaffolding)
          </p>
        </div>

        <Badge variant="brand" className="py-1 px-3">
          Viva Presentation Ready
        </Badge>
      </div>

      <Card className="bg-slate-900 text-white p-6 sm:p-8 space-y-6 border-none shadow-2xl">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xl font-extrabold text-white">Target Production Multi-Agent Pipeline Flow</h2>
          <p className="text-xs text-slate-400">
            End-to-end data processing flow from student profile input to human-in-the-loop application submission.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-2 max-w-md mx-auto py-4">
          <div className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-center font-bold text-xs text-brand-300">
            1. Student Input & Profile Vector (Frontend / LocalStorage)
          </div>
          <ArrowDown className="w-4 h-4 text-slate-500" />
          <div className="w-full p-3 bg-brand-950 border border-brand-700 rounded-xl text-center font-bold text-xs text-white">
            2. Microsoft Agent Framework Orchestrator
          </div>
          <ArrowDown className="w-4 h-4 text-slate-500" />
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-center text-xs font-semibold text-emerald-300">
              Profile Agent
            </div>
            <div className="p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-center text-xs font-semibold text-emerald-300">
              Matching Agent
            </div>
          </div>
          <ArrowDown className="w-4 h-4 text-slate-500" />
          <div className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-center font-bold text-xs text-brand-300">
            3. Azure AI Search + Vector Retrieval RAG Pipeline
          </div>
          <ArrowDown className="w-4 h-4 text-slate-500" />
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-center text-xs font-semibold text-purple-300">
              Application Assistant Agent
            </div>
            <div className="p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-center text-xs font-semibold text-danger-300">
              Safety Agent (Azure AI Content Safety)
            </div>
          </div>
          <ArrowDown className="w-4 h-4 text-slate-500" />
          <div className="w-full p-3 bg-emerald-950 border border-emerald-700 rounded-xl text-center font-bold text-xs text-emerald-300">
            4. Human-in-the-Loop Review & Submission Workspace
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="space-y-3">
          <div className="flex items-center gap-2 text-brand-600">
            <Cpu className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900">Microsoft Agent Framework</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Multi-agent orchestration governing specialized agent responsibilities (Profile, Matching, Application, and Safety).
          </p>
          <span className="inline-block text-[11px] font-mono text-slate-500 bg-slate-100 p-2 rounded w-full">
            backend/app/agents/orchestrator.py
          </span>
        </Card>

        <Card className="space-y-3">
          <div className="flex items-center gap-2 text-emerald-600">
            <Search className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900">Azure AI Search & RAG</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Indexes structured scholarship criteria and performs hybrid vector similarity search to calculate precise match percentages.
          </p>
          <span className="inline-block text-[11px] font-mono text-slate-500 bg-slate-100 p-2 rounded w-full">
            backend/app/services/azure_search.py
          </span>
        </Card>

        <Card className="space-y-3">
          <div className="flex items-center gap-2 text-danger-600">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900">Azure AI Content Safety</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Rule engine detecting predatory fee extraction, fraudulent guaranteed awards, and credential phishing risks.
          </p>
          <span className="inline-block text-[11px] font-mono text-slate-500 bg-slate-100 p-2 rounded w-full">
            backend/app/services/content_safety.py
          </span>
        </Card>

        <Card className="space-y-3">
          <div className="flex items-center gap-2 text-purple-600">
            <Layers className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900">LangChain & LangGraph</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Document ingestion abstractions and graph state representation for multi-agent workflow decision paths.
          </p>
          <span className="inline-block text-[11px] font-mono text-slate-500 bg-slate-100 p-2 rounded w-full">
            backend/app/rag/retriever.py
          </span>
        </Card>

        <Card className="space-y-3">
          <div className="flex items-center gap-2 text-amber-600">
            <Server className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900">FastAPI REST Server</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Asynchronous Python API providing strongly typed endpoints for profile, scholarship matching, safety audit, and drafts.
          </p>
          <span className="inline-block text-[11px] font-mono text-slate-500 bg-slate-100 p-2 rounded w-full">
            backend/app/main.py
          </span>
        </Card>

        <Card className="space-y-3">
          <div className="flex items-center gap-2 text-slate-700">
            <Code className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900">Mock Fallback Layer</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Enables instant demonstration without requiring active Azure credentials or cloud deployment.
          </p>
          <span className="inline-block text-[11px] font-mono text-slate-500 bg-slate-100 p-2 rounded w-full">
            backend/app/services/mock_fallback.py
          </span>
        </Card>
      </div>
    </div>
  );
};
