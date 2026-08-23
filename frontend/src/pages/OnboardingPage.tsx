import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Progress } from '../components/ui/Progress';
import { useAuth } from '../context/AuthContext';
import { mockDefaultProfile } from '../mocks/profilesMock';
import { INDIAN_STATES_AND_UTS } from '../data/states';
import { SOCIAL_CATEGORIES } from '../data/categories';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateProfile, setOnboardingCompleted } = useAuth();
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState(mockDefaultProfile);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else finishOnboarding();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const finishOnboarding = async () => {
    await updateProfile(profileData);
    setOnboardingCompleted(true);
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg text-slate-900">ScholarPath India Onboarding</span>
          </div>
          <span className="text-xs font-semibold text-slate-500">Step {step} of 4</span>
        </div>

        <Progress value={(step / 4) * 100} size="md" variant="brand" />

        <Card className="p-6 sm:p-8 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Academic Background</h2>
                <p className="text-xs text-slate-500">Normalizes CGPA, Class X/XII %, and degree stream for deterministic matching.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={profileData.academic.fullName}
                  onChange={(e) => setProfileData({
                    ...profileData,
                    academic: { ...profileData.academic, fullName: e.target.value }
                  })}
                />
                <Input
                  label="University / College"
                  value={profileData.academic.university}
                  onChange={(e) => setProfileData({
                    ...profileData,
                    academic: { ...profileData.academic, university: e.target.value }
                  })}
                />
                <Input
                  label="Degree Programme (e.g. B.Tech)"
                  value={profileData.academic.course}
                  onChange={(e) => setProfileData({
                    ...profileData,
                    academic: { ...profileData.academic, course: e.target.value }
                  })}
                />
                <Input
                  label="Branch (e.g. Computer Science)"
                  value={profileData.academic.branch}
                  onChange={(e) => setProfileData({
                    ...profileData,
                    academic: { ...profileData.academic, branch: e.target.value }
                  })}
                />
                <Input
                  label="Cumulative CGPA (Scale of 10.0)"
                  type="number"
                  step="0.01"
                  max="10.0"
                  value={profileData.academic.cgpa}
                  onChange={(e) => setProfileData({
                    ...profileData,
                    academic: { ...profileData.academic, cgpa: Number(e.target.value) }
                  })}
                />
                <Input
                  label="Class XII Percentage (%)"
                  type="number"
                  step="0.1"
                  value={profileData.academic.class12Percentage}
                  onChange={(e) => setProfileData({
                    ...profileData,
                    academic: { ...profileData.academic, class12Percentage: Number(e.target.value) }
                  })}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Financial & Domicile Context</h2>
                <p className="text-xs text-slate-500">Evaluates family income limits, state quota rules, and certificate readiness.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Domicile State</label>
                  <select
                    value={profileData.financial.domicileState}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      financial: { ...profileData.financial, domicileState: e.target.value, state: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm"
                  >
                    {INDIAN_STATES_AND_UTS.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Annual Family Income (₹ in INR)"
                  type="number"
                  step="10000"
                  value={profileData.financial.annualFamilyIncome}
                  onChange={(e) => setProfileData({
                    ...profileData,
                    financial: { ...profileData.financial, annualFamilyIncome: Number(e.target.value) }
                  })}
                />

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Social Category</label>
                  <select
                    value={profileData.financial.category}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      financial: { ...profileData.financial, category: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm"
                  >
                    {SOCIAL_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Gender</label>
                  <select
                    value={profileData.financial.gender}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      financial: { ...profileData.financial, gender: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Interests & Research Focus</h2>
                <p className="text-xs text-slate-500">Improves Azure RAG retrieval relevance for statement prompts.</p>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase">Selected Focus Areas</label>
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest, idx) => (
                    <span key={idx} className="px-3 py-1 bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold rounded-full">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">Your ScholarPath Profile is Ready!</h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Profile Completeness Score: <strong className="text-emerald-600 font-bold">92%</strong>. Deterministic matching engine initialized with 25+ Indian schemes.
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <Button variant="ghost" onClick={handleBack} className="gap-1.5">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
            ) : <div />}

            <Button variant="primary" onClick={handleNext} className="gap-2 shadow-md">
              <span>{step === 4 ? 'Enter Dashboard' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
