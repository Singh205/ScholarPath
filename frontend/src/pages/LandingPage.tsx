import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Search,
  CheckCircle2,
  Zap,
  Building2,
  IndianRupee
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginDemoUser } = useAuth();

  const handleDemo = () => {
    loginDemoUser();
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-brand-500 selection:text-white">
      <Navbar />

      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 bg-gradient-to-b from-white via-slate-50 to-slate-100 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 border border-brand-200 text-brand-700 rounded-full text-xs font-semibold mb-8 animate-fade-in shadow-xs">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>India-First Multi-Agent Architecture · NSP, AICTE, State & CSR Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6">
            Find the scholarships <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">meant for you.</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            ScholarPath helps Indian students discover relevant government, institutional, and CSR scholarships, evaluate complex eligibility criteria, prepare statements, and identify listings that need additional verification.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              variant="primary"
              size="lg"
              onClick={handleDemo}
              className="w-full sm:w-auto px-8 py-4 text-base font-bold shadow-xl shadow-brand-500/25 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Explore Interactive Demo</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/auth')}
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold border-slate-300"
            >
              Sign In to Profile
            </Button>
          </div>

          <div className="relative max-w-5xl mx-auto rounded-2xl p-3 bg-slate-900/5 ring-1 ring-slate-900/10 shadow-2xl">
            <div className="bg-slate-900 rounded-xl overflow-hidden shadow-inner border border-slate-800 p-4 sm:p-6 text-left text-white">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 ml-2">scholarpath.in/dashboard</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>25+ Structured Indian Schemes Indexed</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80">
                  <span className="text-xs text-brand-400 font-bold uppercase block mb-1">Active Indian Profile</span>
                  <p className="text-sm font-bold">Shiv Nadar University (B.Tech CSE)</p>
                  <p className="text-xs text-slate-400 mt-1">CGPA 8.0 · Class XII 84% · UP Domicile · Income ₹8 Lakhs</p>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80">
                  <span className="text-xs text-emerald-400 font-bold uppercase block mb-1">Matching & RAG Engine</span>
                  <p className="text-sm font-bold">12 High Confidence Fits</p>
                  <p className="text-xs text-slate-400 mt-1">NSP Central Sector, Reliance UG & Infosys STEM</p>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80">
                  <span className="text-xs text-purple-400 font-bold uppercase block mb-1">Safety & Risk Agent</span>
                  <p className="text-sm font-bold">UPI / Aadhaar Fraud Defense</p>
                  <p className="text-xs text-slate-400 mt-1">Audits ₹499 upfront fee scams & WhatsApp phishing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="agents" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-extrabold text-brand-600 uppercase tracking-widest mb-3">Multi-Agent System Architecture</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Four specialized AI agents designed for Indian scholarship intelligence.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">1. Profile & Eligibility</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Normalizes CGPA, Class X/XII %, domicile state, category, and family income to build a unified eligibility vector.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">2. Matching & RAG</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Evaluates structured scheme rules and uses Azure AI Search RAG over official government guidelines to explain qualifications.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">3. Application Assistant</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Helps structure Statements of Purpose, organizes document checklists, and suggests first-draft essay improvements.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-danger-100 text-danger-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">4. Safety Agent</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Audits listings for UPI registration fee scams, Aadhaar OTP harvesting, and WhatsApp-only fraudulent channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to discover your ideal scholarships?</h2>
          <p className="text-brand-100 text-base mb-8 max-w-xl mx-auto">
            Explore 25+ structured Indian scholarship schemes with deterministic matching and LocalStorage persistence.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={handleDemo}
            className="bg-white text-brand-700 hover:bg-slate-100 font-extrabold px-8 py-4 text-base shadow-xl"
          >
            Launch India-First MVP Demo
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};
