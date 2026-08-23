import React from 'react';
import { Bookmark, Sparkles, MapPin, Calendar, Building2, CheckCircle2 } from 'lucide-react';
import { Scholarship } from '../../types/scholarship';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { SafetyBadge } from './SafetyBadge';
import { formatCurrency, formatDate } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';
import { useScholarships } from '../../context/ScholarshipContext';

export interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
  const navigate = useNavigate();
  const { savedIds, toggleSave } = useScholarships();
  const isSaved = savedIds.includes(scholarship.id);

  return (
    <Card hoverable className="flex flex-col justify-between h-full group border-slate-200/90">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {scholarship.logoUrl ? (
              <img
                src={scholarship.logoUrl}
                alt={scholarship.provider}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center font-bold text-brand-700 text-lg">
                {scholarship.provider.charAt(0)}
              </div>
            )}
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Building2 className="w-3.5 h-3.5" />
                <span className="truncate max-w-[180px]">{scholarship.provider}</span>
              </div>
              <h3
                onClick={() => navigate(`/app/scholarship/${scholarship.id}`)}
                className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1 cursor-pointer mt-0.5"
              >
                {scholarship.name}
              </h3>
            </div>
          </div>

          <button
            onClick={() => toggleSave(scholarship.id)}
            className={`p-2 rounded-lg border transition-colors ${
              isSaved
                ? 'bg-amber-50 border-amber-200 text-amber-600'
                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
          </button>
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {scholarship.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {scholarship.categories.slice(0, 3).map((cat, idx) => (
            <Badge key={idx} variant="neutral" size="sm">
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-slate-500 font-medium">
            <MapPin className="w-3.5 h-3.5" />
            <span>{scholarship.location}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            <span>Due {formatDate(scholarship.deadline)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Award Amount</span>
            <span className="text-lg font-extrabold text-brand-700">
              {formatCurrency(scholarship.amount, scholarship.currency)}
            </span>
          </div>

          <div className="flex flex-col items-end gap-1">
            {scholarship.matchScore && (
              <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-50 border border-brand-200 text-brand-700 rounded-lg text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{scholarship.matchScore}% Match</span>
              </div>
            )}
            <SafetyBadge riskLevel={scholarship.riskLevel} riskScore={scholarship.riskScore} showScore={false} />
          </div>
        </div>

        <div className="pt-1 flex gap-2">
          <button
            onClick={() => navigate(`/app/scholarship/${scholarship.id}`)}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <span>View Full Analysis</span>
            <CheckCircle2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Card>
  );
};
