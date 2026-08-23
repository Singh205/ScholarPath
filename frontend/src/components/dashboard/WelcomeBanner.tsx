import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const WelcomeBanner: React.FC = () => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();

  const name = userProfile?.academic?.fullName || 'Akshaj';
  const university = userProfile?.academic?.university || 'Shiv Nadar University';
  const course = userProfile?.academic?.course || 'B.Tech';
  const branch = userProfile?.academic?.branch || 'Computer Science';
  const cgpa = userProfile?.academic?.cgpa || 8.0;

  return (
    <div className="bg-gradient-to-r from-brand-900 via-slate-900 to-brand-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
      <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500/20 border border-brand-400/30 rounded-full text-xs font-semibold text-brand-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Deterministic Indian Scheme Synthesis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Good afternoon, {name}!
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            ScholarPath evaluated your academic profile at <strong className="text-white font-semibold">{university}</strong> against <strong className="text-white font-semibold">25+ Indian schemes</strong>. You have 12 high-confidence matches worth up to ₹2,00,000.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>CGPA {cgpa} / 10.0</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{course} {branch}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>UP Domicile Verified</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            onClick={() => navigate('/app/matching')}
            className="bg-brand-500 hover:bg-brand-400 text-white shadow-lg shadow-brand-500/25 border border-brand-400/30 flex items-center justify-center gap-2"
          >
            <span>Run Match Engine</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/app/discovery')}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
          >
            Browse All Schemes
          </Button>
        </div>
      </div>
    </div>
  );
};
