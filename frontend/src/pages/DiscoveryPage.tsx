import React, { useEffect } from 'react';
import { useScholarships } from '../context/ScholarshipContext';
import { ScholarshipCard } from '../components/scholarships/ScholarshipCard';
import { ScholarshipFilter } from '../components/scholarships/ScholarshipFilter';
import { Compass, Sparkles } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export const DiscoveryPage: React.FC = () => {
  const { scholarships, isLoading, filters, setFilters } = useScholarships();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const filterParam = searchParams.get('filter');
    const sortParam = searchParams.get('sort');

    if (filterParam === 'eligible') {
      setFilters(prev => ({ ...prev, eligibilityStatus: 'eligible' }));
    }
    if (sortParam === 'deadline') {
      setFilters(prev => ({ ...prev, sortBy: 'deadline' }));
    }
  }, [searchParams, setFilters]);

  const handleReset = () => {
    setFilters({
      search: '',
      category: 'all',
      sourceType: 'all',
      state: 'all',
      course: 'all',
      minAmount: 0,
      maxAmount: 5000000,
      maxIncome: 10000000,
      riskLevel: 'all',
      eligibilityStatus: 'all',
      sortBy: 'match',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Indian Scholarship Directory</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Centralized index populated by Azure AI Search RAG & DB Layer ({scholarships.length} schemes)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-brand-50 border border-brand-200 text-brand-700 rounded-lg text-xs font-semibold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Deterministic Match Engine Active</span>
          </span>
        </div>
      </div>

      <ScholarshipFilter
        filters={filters}
        onFilterChange={(updated) => setFilters(prev => ({ ...prev, ...updated }))}
        onReset={handleReset}
      />

      {isLoading ? (
        <div className="py-20 text-center space-y-3">
          <div className="animate-spin w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full mx-auto" />
          <p className="text-xs text-slate-500 font-medium">Searching scheme index...</p>
        </div>
      ) : scholarships.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
          <Compass className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No scholarships match your filters</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria, selecting all states, or selecting all categories.
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-brand-600 text-white rounded-lg text-xs font-semibold shadow-xs"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
          ))}
        </div>
      )}
    </div>
  );
};
