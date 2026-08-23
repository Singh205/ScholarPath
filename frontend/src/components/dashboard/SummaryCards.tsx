import React from 'react';
import { Award, FileEdit, Clock, ShieldAlert } from 'lucide-react';
import { Card } from '../ui/Card';
import { useNavigate } from 'react-router-dom';

export interface SummaryCardsProps {
  strongMatchesCount: number;
  inProgressCount: number;
  upcomingDeadlinesCount: number;
  highRiskCount: number;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  strongMatchesCount,
  inProgressCount,
  upcomingDeadlinesCount,
  highRiskCount,
}) => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Strong Matches',
      value: strongMatchesCount,
      subtext: '90%+ fit score',
      icon: Award,
      color: 'text-brand-600 bg-brand-50 border-brand-100',
      action: () => navigate('/app/discovery?filter=eligible'),
    },
    {
      title: 'Applications in Progress',
      value: inProgressCount,
      subtext: '2 active drafts',
      icon: FileEdit,
      color: 'text-purple-600 bg-purple-50 border-purple-100',
      action: () => navigate('/app/applications'),
    },
    {
      title: 'Upcoming Deadlines',
      value: upcomingDeadlinesCount,
      subtext: 'Next: Oct 15, 2026',
      icon: Clock,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
      action: () => navigate('/app/discovery?sort=deadline'),
    },
    {
      title: 'Flagged for Safety',
      value: highRiskCount,
      subtext: 'High-risk scam listings',
      icon: ShieldAlert,
      color: 'text-danger-600 bg-danger-50 border-danger-100',
      action: () => navigate('/app/safety'),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <Card
            key={idx}
            hoverable
            onClick={card.action}
            className="cursor-pointer flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                {card.title}
              </p>
              <h3 className="text-2xl font-extrabold text-slate-900">{card.value}</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">{card.subtext}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${card.color}`}>
              <Icon className="w-6 h-6" />
            </div>
          </Card>
        );
      })}
    </div>
  );
};
