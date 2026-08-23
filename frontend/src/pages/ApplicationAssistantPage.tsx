import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Application } from '../types/application';
import { getApplications, saveApplication } from '../services/mockService';
import { DraftEditor } from '../components/application/DraftEditor';
import { AIAssistantPanel } from '../components/application/AIAssistantPanel';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, CheckCircle2, FileText, Sparkles, AlertTriangle } from 'lucide-react';
import { formatDate, formatCurrency } from '../lib/utils';

export const ApplicationAssistantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [application, setApplication] = useState<Application | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  useEffect(() => {
    const apps = getApplications();
    const found = apps.find(a => a.id === id) || apps[0];
    if (found) {
      setApplication(found);
      if (found.sections.length > 0) {
        setActiveSectionId(found.sections[0].id);
      }
    }
  }, [id]);

  if (!application) {
    return (
      <div className="py-20 text-center space-y-3">
        <h3 className="text-lg font-bold text-slate-800">No Draft Selected</h3>
        <Button variant="primary" onClick={() => navigate('/app/applications')}>View My Applications</Button>
      </div>
    );
  }

  const activeSection = application.sections.find(s => s.id === activeSectionId) || application.sections[0];

  const handleSaveContent = (sectionId: string, newContent: string) => {
    const updatedSections = application.sections.map(s =>
      s.id === sectionId ? { ...s, content: newContent } : s
    );
    const updatedApp: Application = {
      ...application,
      sections: updatedSections,
      completionPercentage: Math.min(application.completionPercentage + 15, 100),
      status: 'in_progress'
    };
    saveApplication(updatedApp);
    setApplication(updatedApp);
  };

  const handleApplyAISuggestion = (sectionId: string, suggestion: string) => {
    handleSaveContent(sectionId, suggestion);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/app/applications')}
            className="p-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900">{application.scholarshipName}</h1>
              <Badge variant="brand">{application.provider}</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Deadline: {formatDate(application.deadline)} · Award: {formatCurrency(application.amount)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const updatedApp: Application = { ...application, status: 'ready_for_review' };
              saveApplication(updatedApp);
              setApplication(updatedApp);
            }}
            className="gap-1.5 text-xs font-semibold"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Mark Ready for Review</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-2 border-b border-slate-200 pb-2">
            {application.sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSectionId(sec.id)}
                className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors ${
                  sec.id === activeSection.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>

          <DraftEditor
            section={activeSection}
            onSaveContent={handleSaveContent}
            onApplyAISuggestion={handleApplyAISuggestion}
          />
        </div>

        <div className="space-y-4">
          <AIAssistantPanel
            section={activeSection}
            onUseSuggestion={(text) => handleApplyAISuggestion(activeSection.id, text)}
            scholarshipName={application.scholarshipName}
          />
        </div>
      </div>
    </div>
  );
};
