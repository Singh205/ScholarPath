import React from 'react';
import { useScholarships } from '../context/ScholarshipContext';
import { ScholarshipCard } from '../components/scholarships/ScholarshipCard';
import { Bookmark, Compass } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const SavedScholarshipsPage: React.FC = () => {
  const navigate = useNavigate();
  const { scholarships, savedIds } = useScholarships();
  const savedScholarships = scholarships.filter(s => savedIds.includes(s.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold">
          <Bookmark className="w-5 h-5 fill-current" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Saved Scholarships</h1>
          <p className="text-xs text-slate-500">Your bookmarked opportunities ({savedScholarships.length})</p>
        </div>
      </div>

      {savedScholarships.length === 0 ? (
        <Card className="p-12 text-center space-y-3">
          <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No saved scholarships yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click the bookmark icon on any scholarship card to save it for quick access.
          </p>
          <Button variant="primary" onClick={() => navigate('/app/discovery')}>
            Explore Directory
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedScholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
          ))}
        </div>
      )}
    </div>
  );
};
