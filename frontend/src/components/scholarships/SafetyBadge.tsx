import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';
import { RiskLevel } from '../../types/scholarship';
import { Badge } from '../ui/Badge';

export interface SafetyBadgeProps {
  riskLevel: RiskLevel;
  riskScore: number;
  showScore?: boolean;
}

export const SafetyBadge: React.FC<SafetyBadgeProps> = ({
  riskLevel,
  riskScore,
  showScore = true,
}) => {
  if (riskLevel === 'high') {
    return (
      <Badge variant="danger" className="gap-1 font-semibold">
        <ShieldAlert className="w-3.5 h-3.5" />
        <span>High Risk Scams {showScore && `(${riskScore}/100)`}</span>
      </Badge>
    );
  }

  if (riskLevel === 'medium') {
    return (
      <Badge variant="warning" className="gap-1 font-semibold">
        <AlertTriangle className="w-3.5 h-3.5" />
        <span>Caution {showScore && `(${riskScore}/100)`}</span>
      </Badge>
    );
  }

  return (
    <Badge variant="safe" className="gap-1 font-semibold">
      <ShieldCheck className="w-3.5 h-3.5" />
      <span>Verified Safe {showScore && `(Score ${riskScore})`}</span>
    </Badge>
  );
};
