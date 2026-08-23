import React from 'react';
import { Card } from '../ui/Card';
import { Calendar, ChevronRight } from 'lucide-react';
import { formatCurrency, getDaysRemaining } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';
import { mockScholarships } from '../../mocks/scholarshipsMock';

export const DeadlineTimeline: React.FC = () => {
  const navigate = useNavigate();
  const sorted = [...mockScholarships]
    .filter(s => s.riskLevel !== 'high')
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 4);

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Upcoming Deadlines</h3>
          <p className="text-xs text-slate-500">Prioritized timeline for matched applications</p>
        </div>
        <button
          onClick={() => navigate('/app/discovery?sort=deadline')}
          className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-0.5"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3 flex-1">
        {sorted.map((scholarship) => {
          const daysLeft = getDaysRemaining(scholarship.deadline);
          const isUrgent = daysLeft <= 30;

          return (
            <div
              key={scholarship.id}
              onClick={() => navigate(`/app/scholarship/${scholarship.id}`)}
              className="p-3 bg-slate-50 hover:bg-brand-50/50 border border-slate-200/80 hover:border-brand-200 rounded-xl transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 flex-shrink-0">
                  <Calendar className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                    {scholarship.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">{scholarship.provider}</p>
                </div>
              </div>

              <div className="text-right flex-shrink-0 ml-2">
                <span className="text-xs font-extrabold text-slate-900 block">
                  {formatCurrency(scholarship.amount, scholarship.currency)}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                  isUrgent ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                }`}>
                  {daysLeft > 0 ? `${daysLeft} days left` : 'Due today'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
