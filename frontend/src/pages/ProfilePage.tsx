import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ProfileForm } from '../components/profile/ProfileForm';
import { CompletenessMeter } from '../components/profile/CompletenessMeter';
import { User, ShieldCheck } from 'lucide-react';
import { Toast } from '../components/ui/Toast';

export const ProfilePage: React.FC = () => {
  const { userProfile, updateProfile } = useAuth();
  const [showToast, setShowToast] = React.useState(false);

  if (!userProfile) return null;

  const handleSave = async (updated: any) => {
    await updateProfile(updated);
    setShowToast(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold">
              <User className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Student Profile & Preferences</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Managed by Profile & Eligibility Agent (Microsoft Agent Framework)
          </p>
        </div>

        <span className="px-3 py-1 bg-brand-50 border border-brand-200 text-brand-700 rounded-full text-xs font-semibold flex items-center gap-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Profile Agent Active</span>
        </span>
      </div>

      <CompletenessMeter score={userProfile.completenessScore} />

      <ProfileForm initialProfile={userProfile} onSave={handleSave} />

      {showToast && (
        <Toast
          type="success"
          message="Student profile & match vectors updated successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};
