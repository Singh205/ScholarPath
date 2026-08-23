import React from 'react';
import { Card } from '../ui/Card';
import { Sparkles, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { Progress } from '../ui/Progress';
import { FactorScores } from '../../types/scholarship';

export interface MatchReasoningCardProps {
  score: number;
  matchingReasons: string[];
  missingRequirements?: string[];
  factorScores?: FactorScores;
}

export const MatchReasoningCard: React.FC<MatchReasoningCardProps> = ({
  score,
  matchingReasons,
  missingRequirements = [],
  factorScores,
}) => {
  return (
    <Card className="bg-gradient-to-br from-brand-900 via-slate-900 to-brand-950 text-white border-none shadow-xl">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-brand-800/80">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-brand-500/20 border border-brand-400/30 rounded-xl text-brand-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Deterministic Match Engine</h3>
            <p className="text-xs text-brand-200">Matching Agent + Azure AI Search RAG</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-3xl font-extrabold text-white">{score}%</span>
          <span className="text-[10px] text-brand-300 block uppercase font-bold">Fit Confidence</span>
        </div>
      </div>

      <div className="mb-5 space-y-1">
        <div className="flex justify-between text-xs text-brand-200 font-semibold mb-1">
          <span>Overall Scheme Compatibility</span>
          <span>{score} / 100</span>
        </div>
        <Progress value={score} variant={score >= 80 ? 'safe' : 'warning'} className="bg-slate-950" />
      </div>

      {factorScores && (
        <div className="grid grid-cols-2 gap-2 mb-5 p-3 bg-white/5 border border-white/10 rounded-xl text-[11px]">
          <div>
            <span className="text-slate-400 block">Course Match</span>
            <span className="font-extrabold text-emerald-400">{factorScores.courseMatch}%</span>
          </div>
          <div>
            <span className="text-slate-400 block">Academic CGPA</span>
            <span className="font-extrabold text-emerald-400">{factorScores.academicMatch}%</span>
          </div>
          <div>
            <span className="text-slate-400 block">Family Income (₹)</span>
            <span className="font-extrabold text-brand-300">{factorScores.incomeMatch}%</span>
          </div>
          <div>
            <span className="text-slate-400 block">Domicile State</span>
            <span className="font-extrabold text-brand-300">{factorScores.domicileMatch}%</span>
          </div>
          <div>
            <span className="text-slate-400 block">Category / Gender</span>
            <span className="font-extrabold text-purple-300">{factorScores.categoryMatch}%</span>
          </div>
          <div>
            <span className="text-slate-400 block">Doc Readiness</span>
            <span className="font-extrabold text-amber-300">{factorScores.documentReadiness}%</span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Key Alignment Points ({matchingReasons.length})</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-200">
            {matchingReasons.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-white/5 p-2.5 rounded-lg border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {missingRequirements.length > 0 && (
          <div>
            <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>Eligibility Gaps & Missing Documents ({missingRequirements.length})</span>
            </h4>
            <ul className="space-y-2 text-xs text-amber-200">
              {missingRequirements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};
