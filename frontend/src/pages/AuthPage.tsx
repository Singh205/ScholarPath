import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginDemoUser } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('akshaj.student@university.edu');
  const [password, setPassword] = useState('demo123456');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginDemoUser();
    navigate('/app/dashboard');
  };

  const handleDemoAuth = () => {
    loginDemoUser();
    navigate('/app/onboarding');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
              <GraduationCap className="w-7 h-7" />
            </div>
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {isSignUp ? 'Create your ScholarPath account' : 'Sign in to ScholarPath'}
          </h1>
          <p className="text-xs text-slate-500">
            AI-powered scholarship discovery and eligibility platform
          </p>
        </div>

        <Card className="shadow-xl border-slate-200 p-6 space-y-5">
          <button
            onClick={handleDemoAuth}
            className="w-full p-3.5 bg-gradient-to-r from-brand-50 to-emerald-50 border border-brand-200 hover:border-brand-300 rounded-xl text-left flex items-center justify-between group transition-all"
          >
            <div>
              <span className="text-xs font-extrabold text-brand-700 uppercase tracking-wider block flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Demo Access</span>
              </span>
              <p className="text-xs font-semibold text-slate-800">Continue with Pre-populated Akshaj Sharma Profile</p>
            </div>
            <ArrowRight className="w-4 h-4 text-brand-600 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider absolute">
              or use demo form
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <Input label="Full Name" placeholder="e.g. Akshaj Sharma" required />
            )}

            <Input
              label="University Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" variant="primary" className="w-full py-2.5 font-bold shadow-md">
              {isSignUp ? 'Create Account & Continue' : 'Sign In'}
            </Button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-semibold text-brand-600 hover:underline"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </Card>

        <div className="text-center text-[11px] text-slate-500">
          <p>Demo Mode: No backend server or passwords required.</p>
        </div>
      </div>
    </div>
  );
};
