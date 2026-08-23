import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Sparkles, AlertTriangle, ShieldCheck, Copy, Check, Lightbulb } from 'lucide-react';
import { ApplicationSection } from '../../types/application';

export interface AIAssistantPanelProps {
  section: ApplicationSection;
  onUseSuggestion: (text: string) => void;
  scholarshipName: string;
}

export const AIAssistantPanel: React.FC<AIAssistantPanelProps> = ({
  section,
  onUseSuggestion,
  scholarshipName,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (section.aiSuggestedContent) {
      navigator.clipboard.writeText(section.aiSuggestedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900">
          <strong className="font-bold block mb-0.5">Human-in-the-Loop Requirement</strong>
          AI-generated draft suggestions are starting points. Review, edit, and personalize every essay before final submission.
        </div>
      </div>

      <Card className="bg-gradient-to-b from-brand-950 to-slate-900 text-white border-none shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-brand-800/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-brand-500/20 border border-brand-400/30 rounded-lg text-brand-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">AI Application Assistant</h4>
              <p className="text-[11px] text-brand-200">Application Agent · Microsoft Framework</p>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded font-semibold">
            Agent Active
          </span>
        </div>

        {section.keyPoints && section.keyPoints.length > 0 && (
          <div>
            <h5 className="text-xs font-bold text-brand-300 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Recommended Profile Highlights</span>
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-200">
              {section.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-white/5 px-2.5 py-1.5 rounded-md border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {section.aiSuggestedContent && (
          <div className="space-y-2">
            <h5 className="text-xs font-bold text-brand-300 uppercase tracking-wider flex items-center justify-between">
              <span>AI Suggested Improvement</span>
              <button
                onClick={handleCopy}
                className="text-[11px] font-normal text-slate-300 hover:text-white flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>
            </h5>
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-200 leading-relaxed font-mono">
              {section.aiSuggestedContent}
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => onUseSuggestion(section.aiSuggestedContent!)}
              className="w-full bg-brand-500 hover:bg-brand-400 text-white font-semibold gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Insert Suggestion into Draft</span>
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
