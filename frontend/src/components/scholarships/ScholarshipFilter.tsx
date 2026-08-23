import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { ScholarshipFilterState } from '../../types/scholarship';
import { INDIAN_STATES_AND_UTS } from '../../data/states';

export interface ScholarshipFilterProps {
  filters: ScholarshipFilterState;
  onFilterChange: (updated: Partial<ScholarshipFilterState>) => void;
  onReset: () => void;
}

export const ScholarshipFilter: React.FC<ScholarshipFilterProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-4">
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            placeholder="Search NSP, AICTE, Tata, Reliance, B.Tech, UP..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="match">Highest AI Match</option>
              <option value="deadline">Upcoming Deadline</option>
              <option value="amount">Highest Award (₹)</option>
            </select>
          </div>

          <button
            onClick={onReset}
            className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5 ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Scheme Category</label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ category: e.target.value })}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-800"
          >
            <option value="all">All Schemes</option>
            <option value="Central Government">Central Government (NSP)</option>
            <option value="State Government">State Government</option>
            <option value="AICTE / UGC">AICTE / UGC</option>
            <option value="Corporate CSR Grant">Corporate CSR Grant</option>
            <option value="Foundation Fellowship">Foundation Fellowship</option>
            <option value="Women in Technology">Women in STEM</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Course Stream</label>
          <select
            value={filters.course}
            onChange={(e) => onFilterChange({ course: e.target.value })}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-800"
          >
            <option value="all">All Courses</option>
            <option value="B.Tech">B.Tech / B.E.</option>
            <option value="B.Sc.">B.Sc.</option>
            <option value="BCA">BCA / MCA</option>
            <option value="Diploma">Diploma</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">State / Domicile</label>
          <select
            value={filters.state}
            onChange={(e) => onFilterChange({ state: e.target.value })}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-800"
          >
            <option value="all">All India & States</option>
            {INDIAN_STATES_AND_UTS.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Risk Status</label>
          <select
            value={filters.riskLevel}
            onChange={(e) => onFilterChange({ riskLevel: e.target.value })}
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-800"
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Verified Safe (Low Risk)</option>
            <option value="high">High Risk Scams</option>
          </select>
        </div>
      </div>
    </div>
  );
};
