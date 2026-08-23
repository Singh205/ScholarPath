import React from 'react';
import { GraduationCap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white">ScholarPath</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-driven scholarship discovery, eligibility matching, statement drafting, and content safety evaluation.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Product MVP</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/app/discovery" className="hover:text-white transition-colors">Scholarship Search</Link></li>
              <li><Link to="/app/matching" className="hover:text-white transition-colors">AI Match Engine</Link></li>
              <li><Link to="/app/applications" className="hover:text-white transition-colors">Application Assistant</Link></li>
              <li><Link to="/app/safety" className="hover:text-white transition-colors">Safety & Scam Audit</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">AI Stack Architecture</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/app/architecture" className="hover:text-white transition-colors">Microsoft Agent Framework</Link></li>
              <li><Link to="/app/architecture" className="hover:text-white transition-colors">Azure AI Search & RAG</Link></li>
              <li><Link to="/app/architecture" className="hover:text-white transition-colors">Azure AI Content Safety</Link></li>
              <li><Link to="/app/architecture" className="hover:text-white transition-colors">LangGraph Orchestrator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Human-in-the-Loop</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              ScholarPath recommends and drafts, but students review and control final submission content.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Azure AI Content Guardrails Ready</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 ScholarPath AI Inc. Built for technical demonstration.</p>
          <p className="mt-2 sm:mt-0 font-mono">Demo Mode · LocalStorage Powered</p>
        </div>
      </div>
    </footer>
  );
};
