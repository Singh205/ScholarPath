import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginDemoUser } = useAuth();

  const handleDemoStart = () => {
    loginDemoUser();
    navigate('/app/dashboard');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg text-slate-900 tracking-tight flex items-center gap-1">
              Scholar<span className="text-brand-600">Path</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-brand-100 text-brand-700 rounded-md font-bold uppercase tracking-wider">AI</span>
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
          <a href="#features" className="hover:text-brand-600 transition-colors">Features</a>
          <a href="#agents" className="hover:text-brand-600 transition-colors">Multi-Agent AI</a>
          <a href="#safety" className="hover:text-brand-600 transition-colors">Safety Center</a>
          <Link to="/architecture" className="hover:text-brand-600 transition-colors flex items-center gap-1">
            <span>Architecture</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <Button variant="primary" onClick={() => navigate('/app/dashboard')} className="flex items-center gap-2">
              <span>Go to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
              <Button variant="primary" size="sm" onClick={handleDemoStart} className="flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span>Explore Demo</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
