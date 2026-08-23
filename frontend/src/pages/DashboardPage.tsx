import React, { useEffect, useState } from 'react';
import { WelcomeBanner } from '../components/dashboard/WelcomeBanner';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { MatchChart } from '../components/dashboard/MatchChart';
import { DeadlineTimeline } from '../components/dashboard/DeadlineTimeline';
import { AgentActivityStream } from '../components/dashboard/AgentActivityStream';
import { ScholarshipCard } from '../components/scholarships/ScholarshipCard';
import { fetchScholarships } from '../services/scholarshipService';
import { getApplications } from '../services/mockService';
import { Scholarship } from '../types/scholarship';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const data = await fetchScholarships();
        setScholarships(data);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const applications = getApplications();
  const topRecommendations = scholarships.slice(0, 3);

  const strongMatchesCount = scholarships.filter(s => (s.matchScore || 0) >= 80).length;
  const inProgressCount = applications.filter(a => a.status === 'in_progress' || a.status === 'draft').length;
  const upcomingDeadlinesCount = scholarships.length;
  const highRiskCount = scholarships.filter(s => s.riskLevel === 'high').length;

  return (
    <div className="space-y-6">
      <WelcomeBanner />

      <SummaryCards
        strongMatchesCount={strongMatchesCount}
        inProgressCount={inProgressCount}
        upcomingDeadlinesCount={upcomingDeadlinesCount}
        highRiskCount={highRiskCount}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MatchChart />
        </div>
        <div>
          <DeadlineTimeline />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <span>Top Recommended Indian Schemes</span>
              <span className="px-2 py-0.5 bg-brand-100 text-brand-700 text-xs font-bold rounded-full">Deterministic Match</span>
            </h3>
            <p className="text-xs text-slate-500">Evaluated over CGPA 8.0, Class XII 84%, UP Domicile, and ₹8 Lakhs Income</p>
          </div>

          <button
            onClick={() => navigate('/app/discovery')}
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>Explore All Schemes ({scholarships.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {isLoading ? (
          <div className="py-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full mx-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topRecommendations.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <AgentActivityStream />
      </div>
    </div>
  );
};
