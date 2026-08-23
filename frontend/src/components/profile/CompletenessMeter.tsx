import React from 'react';
import { Card } from '../ui/Card';
import { Progress } from '../ui/Progress';
import { CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

export interface CompletenessMeterProps {
  score: number;
}

export const CompletenessMeter: React.FC<CompletenessMeterProps> = ({ score }) => {
  return (
    <Card className="bg-gradient-to-r from-slate-900 to-brand-950 text-white border-none p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 flex-1 w-full">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-400" />
            <h3 className="text-lg font-extrabold text-white">Profile Matching Accuracy</h3>
          </div>
          <p className="text-xs text-slate-300">
            Completing all sections unlocks higher accuracy for the Microsoft Agent Framework profile matching engine.
          </p>

          <div className="pt-2">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-300">Profile Completeness</span>
              <span className="text-brand-300 font-extrabold">{score}%</span>
            </div>
            <Progress value={score} variant={score >= 80 ? 'safe' : 'brand'} size="lg" className="bg-slate-800" />
          </div>
        </div>

        <div className="flex-shrink-0 text-center sm:text-right bg-white/5 p-4 rounded-xl border border-white/10 w-full sm:w-auto">
          {score >= 85 ? (
            <div className="flex flex-col items-center sm:items-end gap-1">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Optimal Matching</span>
              <span className="text-[11px] text-slate-400">High agent retrieval confidence</span>
            </div>
          ) : (
            <div className="flex flex-col items-center sm:items-end gap-1">
              <AlertCircle className="w-8 h-8 text-amber-400" />
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Additional Data Recommended</span>
              <span className="text-[11px] text-slate-400">Add research achievements</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
