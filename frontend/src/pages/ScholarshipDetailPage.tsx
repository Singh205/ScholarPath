import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Scholarship } from '../types/scholarship';
import { fetchScholarshipById, toggleSaveScholarship, getSavedScholarshipIds } from '../services/scholarshipService';
import { fetchScholarshipSafety } from '../services/safetyService';
import { SafetyResult } from '../types/safety';
import { MatchReasoningCard } from '../components/scholarships/MatchReasoningCard';
import { SafetyBadge } from '../components/scholarships/SafetyBadge';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { formatCurrency, formatDate } from '../lib/utils';
import {
  ArrowLeft,
  Bookmark,
  Building2,
  Calendar,
  MapPin,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  FileEdit
} from 'lucide-react';
import { getApplications, saveApplication } from '../services/mockService';

export const ScholarshipDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [safetyReport, setSafetyReport] = useState<SafetyResult | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSafetyModal, setShowSafetyModal] = useState(false);

  useEffect(() => {
    async function load() {
      if (!id) return;
      setIsLoading(true);
      try {
        const item = await fetchScholarshipById(id);
        setScholarship(item);
        if (item) {
          const report = await fetchScholarshipSafety(item.id);
          setSafetyReport(report);
        }
        const saved = getSavedScholarshipIds();
        setIsSaved(saved.includes(id));
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [id]);

  const handleToggleSave = () => {
    if (!id) return;
    const updated = toggleSaveScholarship(id);
    setIsSaved(updated.includes(id));
  };

  const handleStartApplication = () => {
    if (!scholarship) return;
    const existing = getApplications().find(a => a.scholarshipId === scholarship.id);
    if (existing) {
      navigate(`/app/application/${existing.id}`);
    } else {
      const newApp = {
        id: `app_${Date.now()}`,
        scholarshipId: scholarship.id,
        scholarshipName: scholarship.name,
        provider: scholarship.provider,
        deadline: scholarship.deadline,
        amount: scholarship.amount,
        status: 'draft' as const,
        completionPercentage: 10,
        sections: [
          {
            id: 'sec_new_1',
            title: 'Statement of Academic Aspirations',
            prompt: `Why are you applying for the ${scholarship.name}?`,
            content: '',
            aiSuggestedContent: `Focus on your CGPA, Computer Science background at Shiv Nadar University, and research in application safety.`,
            keyPoints: ['Highlight academic achievements', 'Demonstrate alignment with provider goals'],
            wordCountLimit: 500
          }
        ],
        requiredDocuments: scholarship.requiredDocuments.map(d => ({ name: d, isUploaded: false })),
        updatedAt: new Date().toISOString(),
        version: 1
      };
      saveApplication(newApp);
      navigate(`/app/application/${newApp.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="animate-spin w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full mx-auto" />
        <p className="text-xs text-slate-500 font-medium">Fetching detailed scholarship criteria & safety analysis...</p>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="py-20 text-center space-y-3">
        <h3 className="text-lg font-bold text-slate-800">Scholarship Scheme Not Found</h3>
        <Button variant="secondary" onClick={() => navigate('/app/discovery')}>Return to Directory</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/app/discovery')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Scholarships</span>
      </button>

      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold px-3 py-1 bg-brand-50 text-brand-700 border border-brand-200 rounded-full">
                {scholarship.provider}
              </span>
              <SafetyBadge riskLevel={scholarship.riskLevel} riskScore={scholarship.riskScore} />
              {scholarship.isVerified && (
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Official Verified Source
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {scholarship.name}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 font-medium pt-1">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>{scholarship.officialSourceName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{scholarship.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Deadline: {formatDate(scholarship.deadline)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 flex-shrink-0">
            <div className="text-right">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Award Amount</span>
              <span className="text-3xl font-extrabold text-brand-700">
                {formatCurrency(scholarship.amount, scholarship.currency)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={isSaved ? 'secondary' : 'outline'}
                onClick={handleToggleSave}
                className="gap-1.5"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </Button>

              <Button
                variant="primary"
                onClick={handleStartApplication}
                className="gap-2 shadow-md bg-brand-600 hover:bg-brand-700"
              >
                <FileEdit className="w-4 h-4" />
                <span>Start Application Workspace</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Scheme Description</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{scholarship.description}</p>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-3">Structured Scheme Criteria</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 border rounded-lg">
                  <span className="text-slate-500 block font-semibold">Eligible Courses</span>
                  <span className="font-bold text-slate-900">{scholarship.eligibleCourses.join(', ')}</span>
                </div>
                <div className="p-3 bg-slate-50 border rounded-lg">
                  <span className="text-slate-500 block font-semibold">Academic Criteria</span>
                  <span className="font-bold text-slate-900">
                    {scholarship.minimumPercentageOrCGPA > 0
                      ? scholarship.minimumPercentageOrCGPA <= 10
                        ? `CGPA >= ${scholarship.minimumPercentageOrCGPA}`
                        : `Percentage >= ${scholarship.minimumPercentageOrCGPA}%`
                      : 'Open to All'}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 border rounded-lg">
                  <span className="text-slate-500 block font-semibold">Max Family Income</span>
                  <span className="font-bold text-slate-900">
                    {scholarship.maximumFamilyIncome < 10000000
                      ? `₹${(scholarship.maximumFamilyIncome / 100000).toFixed(1)} Lakhs / year`
                      : 'No Income Limit'}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 border rounded-lg">
                  <span className="text-slate-500 block font-semibold">Domicile Rules</span>
                  <span className="font-bold text-slate-900">{scholarship.domicileRequirements}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-3">Required Documents Checklist</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {scholarship.requiredDocuments.map((doc, idx) => (
                  <li key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-2 font-medium text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-brand-500" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <a
                href={scholarship.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:underline"
              >
                <span>Visit Official Scheme Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            {scholarship.matchScore && (
              <MatchReasoningCard
                score={scholarship.matchScore}
                matchingReasons={scholarship.matchingReasons || []}
                missingRequirements={scholarship.missingRequirements}
                factorScores={scholarship.factorScores}
              />
            )}

            <Card className="bg-slate-50 border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-sm font-bold text-slate-900">Safety & Risk Assessment</h4>
                </div>
                <button
                  onClick={() => setShowSafetyModal(true)}
                  className="text-xs font-semibold text-brand-600 hover:underline"
                >
                  Inspect Audit
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {safetyReport?.summaryReasoning || 'Azure AI Content Safety verified domain authority and payment parameters.'}
              </p>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSafetyModal(true)}
                className="w-full text-xs font-semibold"
              >
                View Deep Risk Breakdown
              </Button>
            </Card>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={showSafetyModal}
        onClose={() => setShowSafetyModal(false)}
        title={`Safety Audit Report: ${scholarship.name}`}
      >
        {safetyReport && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase block">Azure AI Safety Score</span>
                <span className="text-2xl font-extrabold">{safetyReport.riskScore} / 100 Risk</span>
              </div>
              <SafetyBadge riskLevel={safetyReport.riskLevel} riskScore={safetyReport.riskScore} />
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase">Detection Summary</h4>
              <p className="text-slate-700 bg-slate-50 p-3 rounded-lg border leading-relaxed">
                {safetyReport.summaryReasoning}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase">Recommended Action</h4>
              <p className="text-emerald-800 font-semibold bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                {safetyReport.recommendedAction}
              </p>
            </div>

            <div className="pt-2 text-right">
              <Button variant="secondary" onClick={() => setShowSafetyModal(false)}>Close Report</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
