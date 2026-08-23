import React from 'react';
import { Card } from '../ui/Card';
import { Cpu, ShieldCheck, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { mockAgentActivityStream } from '../../mocks/agentActivityMock';
import { useNavigate } from 'react-router-dom';

export const AgentActivityStream: React.FC = () => {
  const navigate = useNavigate();

  const getAgentIcon = (agentType: string) => {
    switch (agentType) {
      case 'safety':
        return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
      case 'matching':
        return <Sparkles className="w-4 h-4 text-brand-500" />;
      case 'application':
        return <FileText className="w-4 h-4 text-purple-500" />;
      default:
        return <Cpu className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <h3 className="text-base font-bold text-slate-900">Live Agent Activity Stream</h3>
        </div>
        <button
          onClick={() => navigate('/app/architecture')}
          className="text-xs font-semibold text-brand-600 hover:underline"
        >
          View Pipeline
        </button>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pr-1">
        {mockAgentActivityStream.map((item) => (
          <div
            key={item.id}
            className="p-3 bg-slate-50 border border-slate-200/70 rounded-xl flex items-start gap-3 text-xs"
          >
            <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-2xs mt-0.5">
              {getAgentIcon(item.agentType)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="font-bold text-slate-900 truncate">{item.agentName}</span>
                <span className="text-[10px] text-slate-400 font-medium flex-shrink-0">{item.timestamp}</span>
              </div>
              <p className="font-medium text-slate-700 leading-snug">{item.action}</p>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{item.details}</p>
            </div>

            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-1" />
          </div>
        ))}
      </div>
    </Card>
  );
};
