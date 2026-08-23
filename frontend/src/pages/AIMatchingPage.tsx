import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Progress } from '../components/ui/Progress';
import { Sparkles, Cpu, Play, CheckCircle2, ArrowRight, ShieldCheck, Search } from 'lucide-react';
import { INITIAL_MATCHING_STAGES } from '../services/agentService';
import { mockScholarships } from '../mocks/scholarshipsMock';
import { ScholarshipCard } from '../components/scholarships/ScholarshipCard';
import { useNavigate } from 'react-router-dom';

export const AIMatchingPage: React.FC = () => {
  const navigate = useNavigate();
  const [stages, setStages] = useState(INITIAL_MATCHING_STAGES);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const startPipeline = () => {
    setIsRunning(true);
    setIsCompleted(false);

    setStages(prev => prev.map(s => ({ ...s, status: 'idle', progress: 0 })));

    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setStages(prev =>
          prev.map((stage, idx) => {
            if (idx === currentStage) {
              return { ...stage, status: 'running', progress: 100 };
            }
            if (idx < currentStage) {
              return { ...stage, status: 'completed', progress: 100 };
            }
            return stage;
          })
        );
        currentStage++;
      } else {
        clearInterval(interval);
        setStages(prev => prev.map(s => ({ ...s, status: 'completed', progress: 100 })));
        setIsRunning(false);
        setIsCompleted(true);
      }
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">AI Multi-Agent Matching Engine</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Simulated 4-stage pipeline orchestrating Microsoft Agent Framework, Azure AI Search & Content Safety
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-semibold">
            Demo Mode · Simulated Agent Pipeline
          </span>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white p-6 sm:p-8 space-y-6 border-none shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-white">Execute Multi-Agent Match Synthesis</h2>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Triggers the Profile Agent to normalize your GPA/major, retrieves relevant vector embeddings from Azure AI Search, runs Azure Content Safety filters, and outputs ranked recommendations.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={startPipeline}
            isLoading={isRunning}
            className="bg-brand-500 hover:bg-brand-400 text-white font-bold px-8 py-3 shadow-lg shadow-brand-500/30 flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isRunning ? 'Synthesizing Pipeline...' : 'Run Agent Matching Engine'}</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className={`p-4 rounded-xl border transition-all ${
                stage.status === 'running'
                  ? 'bg-brand-900/60 border-brand-400 ring-2 ring-brand-400/40'
                  : stage.status === 'completed'
                  ? 'bg-slate-800/80 border-emerald-500/50'
                  : 'bg-slate-800/40 border-slate-700/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-brand-300">{stage.agent}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  stage.status === 'completed'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : stage.status === 'running'
                    ? 'bg-brand-500/20 text-brand-300 border border-brand-400/30 animate-pulse'
                    : 'bg-slate-700/50 text-slate-400'
                }`}>
                  {stage.status.toUpperCase()}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{stage.name}</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">{stage.description}</p>
              <Progress
                value={stage.progress}
                variant={stage.status === 'completed' ? 'safe' : 'brand'}
                size="sm"
                className="bg-slate-900"
              />
            </div>
          ))}
        </div>
      </Card>

      {isCompleted && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <div>
                <h4 className="text-sm font-bold text-emerald-950">Synthesis Complete: 12 Scholarships Match Your Profile</h4>
                <p className="text-xs text-emerald-800">Ranked by similarity vector confidence score (Azure AI Search RAG)</p>
              </div>
            </div>
            <Button size="sm" variant="secondary" onClick={() => navigate('/app/discovery')}>
              View Full List
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockScholarships.slice(0, 3).map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
