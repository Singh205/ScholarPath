import React, { useState } from 'react';
import { StudentProfile } from '../../types/profile';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Save, Plus, X } from 'lucide-react';
import { INDIAN_STATES_AND_UTS } from '../../data/states';
import { INSTITUTION_TYPES, POPULAR_INDIAN_UNIVERSITIES } from '../../data/universities';
import { SOCIAL_CATEGORIES } from '../../data/categories';

export interface ProfileFormProps {
  initialProfile: StudentProfile;
  onSave: (profile: StudentProfile) => Promise<void>;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ initialProfile, onSave }) => {
  const [profile, setProfile] = useState<StudentProfile>(initialProfile);
  const [newInterest, setNewInterest] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newAchievement, setNewAchievement] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(profile);
    } finally {
      setIsSaving(false);
    }
  };

  const addInterest = () => {
    if (newInterest.trim() && !profile.interests.includes(newInterest.trim())) {
      setProfile({ ...profile, interests: [...profile.interests, newInterest.trim()] });
      setNewInterest('');
    }
  };

  const removeInterest = (item: string) => {
    setProfile({ ...profile, interests: profile.interests.filter(i => i !== item) });
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const removeSkill = (item: string) => {
    setProfile({ ...profile, skills: profile.skills.filter(s => s !== item) });
  };

  const addAchievement = () => {
    if (newAchievement.trim() && !profile.achievements.includes(newAchievement.trim())) {
      setProfile({ ...profile, achievements: [...profile.achievements, newAchievement.trim()] });
      setNewAchievement('');
    }
  };

  const removeAchievement = (item: string) => {
    setProfile({ ...profile, achievements: profile.achievements.filter(a => a !== item) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
          Academic Information & Performance
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={profile.academic.fullName}
            onChange={(e) => setProfile({ ...profile, academic: { ...profile.academic, fullName: e.target.value } })}
            required
          />

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">University / College</label>
            <input
              type="text"
              list="university-list"
              value={profile.academic.university}
              onChange={(e) => setProfile({ ...profile, academic: { ...profile.academic, university: e.target.value } })}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm"
              required
            />
            <datalist id="university-list">
              {POPULAR_INDIAN_UNIVERSITIES.map((u) => (
                <option key={u} value={u} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Institution Type</label>
            <select
              value={profile.academic.institutionType}
              onChange={(e) => setProfile({ ...profile, academic: { ...profile.academic, institutionType: e.target.value } })}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm"
            >
              {INSTITUTION_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <Input
            label="Degree Programme (e.g. B.Tech, B.Sc, BCA)"
            value={profile.academic.course}
            onChange={(e) => setProfile({ ...profile, academic: { ...profile.academic, course: e.target.value } })}
            required
          />
          <Input
            label="Branch / Specialization (e.g. CSE, ECE, IT)"
            value={profile.academic.branch}
            onChange={(e) => setProfile({ ...profile, academic: { ...profile.academic, branch: e.target.value } })}
            required
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Current Year"
              value={profile.academic.currentYear}
              onChange={(e) => setProfile({ ...profile, academic: { ...profile.academic, currentYear: e.target.value } })}
              required
            />
            <Input
              label="Current Semester"
              value={profile.academic.currentSemester}
              onChange={(e) => setProfile({ ...profile, academic: { ...profile.academic, currentSemester: e.target.value } })}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Input
              label="Current CGPA (10.0)"
              type="number"
              step="0.01"
              max="10.0"
              value={profile.academic.cgpa}
              onChange={(e) => setProfile({ ...profile, academic: { ...profile.academic, cgpa: Number(e.target.value) } })}
              required
            />
            <Input
              label="Class XII %"
              type="number"
              step="0.1"
              max="100.0"
              value={profile.academic.class12Percentage}
              onChange={(e) => setProfile({ ...profile, academic: { ...profile.academic, class12Percentage: Number(e.target.value) } })}
              required
            />
            <Input
              label="Class X %"
              type="number"
              step="0.1"
              max="100.0"
              value={profile.academic.class10Percentage}
              onChange={(e) => setProfile({ ...profile, academic: { ...profile.academic, class10Percentage: Number(e.target.value) } })}
              required
            />
          </div>

          <Input
            label="Expected Graduation Year"
            type="number"
            value={profile.academic.graduationYear}
            onChange={(e) => setProfile({ ...profile, academic: { ...profile.academic, graduationYear: Number(e.target.value) } })}
            required
          />
        </div>
      </Card>

      <Card>
        <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
          Financial & Domicile Eligibility Context
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Domicile State</label>
            <select
              value={profile.financial.domicileState}
              onChange={(e) => setProfile({ ...profile, financial: { ...profile.financial, domicileState: e.target.value, state: e.target.value } })}
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
            value={profile.financial.annualFamilyIncome}
            onChange={(e) => setProfile({ ...profile, financial: { ...profile.financial, annualFamilyIncome: Number(e.target.value) } })}
            required
          />

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Social Category</label>
            <select
              value={profile.financial.category}
              onChange={(e) => setProfile({ ...profile, financial: { ...profile.financial, category: e.target.value } })}
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
              value={profile.financial.gender}
              onChange={(e) => setProfile({ ...profile, financial: { ...profile.financial, gender: e.target.value } })}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <label className="flex items-center gap-3 p-3 bg-slate-50 border rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={profile.financial.incomeCertificateAvailable}
                onChange={(e) => setProfile({ ...profile, financial: { ...profile.financial, incomeCertificateAvailable: e.target.checked } })}
                className="w-4 h-4 text-brand-600 rounded"
              />
              <span className="text-xs font-medium text-slate-800">State Revenue Income Certificate Available</span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-slate-50 border rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={profile.financial.domicileCertificateAvailable}
                onChange={(e) => setProfile({ ...profile, financial: { ...profile.financial, domicileCertificateAvailable: e.target.checked } })}
                className="w-4 h-4 text-brand-600 rounded"
              />
              <span className="text-xs font-medium text-slate-800">State Domicile Certificate Available</span>
            </label>
          </div>
        </div>
      </Card>

      <Card className="space-y-6">
        <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
          Interests, Skills & Achievements
        </h3>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Research & Tech Focus</label>
          <div className="flex gap-2 mb-3">
            <Input
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="e.g. Machine Learning, Ethical AI"
            />
            <Button type="button" variant="secondary" onClick={addInterest}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold rounded-full">
                {item}
                <button type="button" onClick={() => removeInterest(item)} className="hover:text-brand-900">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Skills & Technologies</label>
          <div className="flex gap-2 mb-3">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="e.g. Python, TypeScript, PyTorch"
            />
            <Button type="button" variant="secondary" onClick={addSkill}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold rounded-full">
                {item}
                <button type="button" onClick={() => removeSkill(item)} className="hover:text-purple-900">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Honors & Achievements</label>
          <div className="flex gap-2 mb-3">
            <Input
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              placeholder="e.g. 1st Rank National AI Hackathon"
            />
            <Button type="button" variant="secondary" onClick={addAchievement}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {profile.achievements.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800">
                <span>{item}</span>
                <button type="button" onClick={() => removeAchievement(item)} className="text-slate-400 hover:text-danger-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" variant="primary" isLoading={isSaving} size="lg" className="gap-2 shadow-md">
          <Save className="w-5 h-5" />
          <span>Save & Update Matching Engine</span>
        </Button>
      </div>
    </form>
  );
};
