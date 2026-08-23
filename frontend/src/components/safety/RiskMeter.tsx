import React from 'react';
import { Card } from '../ui/Card';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';
import { RiskLevel } from '../../types/scholarship';

export interface RiskMeterProps {
  score: number;
  riskLevel: RiskLevel;
}

export const RiskMeter: React.FC<RiskMeterProps> = ({ score, riskLevel }) => {
  const getMeterColor = () => {
    if (riskLevel === 'high') return 'from-danger-600 to-red-700 text-danger-500';
    if (riskLevel === 'medium') return 'from-warning-500 to-amber-600 text-warning-500';
    return 'from-safe-500 to-emerald-600 text-safe-500';
  };

  const getIcon = () => {
    if (riskLevel === 'high') return <ShieldAlert className="w-10 h-10 text-danger-500" />;
    if (riskLevel === 'medium') return <AlertTriangle className="w-10 h-10 text-warning-500" />;
    return <ShieldCheck className="w-10 h-10 text-safe-500" />;
  };

  return (
    <Card className="flex flex-col items-center justify-center p-6 text-center bg-white">
      <div className="mb-3">{getIcon()}</div>
      <span className="text-4xl font-extrabold text-slate-900 mb-1">{score} / 100</span>
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
        Azure Content Safety Risk Score
      </span>

      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-3">
        <div
          className={`h-full bg-gradient-to-r ${getMeterColor()} transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="text-xs font-semibold">
        {riskLevel === 'high' && (
          <span className="text-danger-600 font-extrabold uppercase">High Risk Predatory Scam</span>
        )}
        {riskLevel === 'medium' && (
          <span className="text-warning-600 font-extrabold uppercase">Caution: Verification Required</span>
        )}
        {riskLevel === 'low' && (
          <span className="text-safe-600 font-extrabold uppercase">Verified Safe Opportunity</span>
        )}
      </div>
    </Card>
  );
};
