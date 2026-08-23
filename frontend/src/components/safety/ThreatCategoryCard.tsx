import React from 'react';
import { ThreatFlag } from '../../types/safety';
import { Card } from '../ui/Card';
import { AlertCircle, DollarSign, Lock, AlertOctagon, HelpCircle, FileWarning } from 'lucide-react';
import { Badge } from '../ui/Badge';

export interface ThreatCategoryCardProps {
  flag: ThreatFlag;
}

export const ThreatCategoryCard: React.FC<ThreatCategoryCardProps> = ({ flag }) => {
  const getCategoryIcon = () => {
    switch (flag.category) {
      case 'payment_request':
        return <DollarSign className="w-5 h-5 text-danger-600" />;
      case 'unrealistic_guarantee':
        return <AlertOctagon className="w-5 h-5 text-danger-600" />;
      case 'suspicious_contact':
        return <Lock className="w-5 h-5 text-danger-600" />;
      default:
        return <FileWarning className="w-5 h-5 text-warning-600" />;
    }
  };

  return (
    <Card className="border-l-4 border-l-danger-500 bg-danger-50/30 p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-danger-100 rounded-lg">{getCategoryIcon()}</div>
          <h4 className="text-sm font-bold text-slate-900">{flag.title}</h4>
        </div>
        <Badge variant={flag.severity === 'high' ? 'danger' : 'warning'} className="uppercase font-bold text-[10px]">
          {flag.severity} Severity
        </Badge>
      </div>

      <p className="text-xs text-slate-700 leading-relaxed pl-9">{flag.description}</p>

      {flag.detectedTextSnippet && (
        <div className="ml-9 p-2.5 bg-white border border-danger-200 rounded-lg text-[11px] text-danger-900 font-mono italic">
          "{flag.detectedTextSnippet}"
        </div>
      )}
    </Card>
  );
};
