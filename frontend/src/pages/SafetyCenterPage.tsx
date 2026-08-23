import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ShieldAlert, ShieldCheck, AlertTriangle, Lock, DollarSign, Info } from 'lucide-react';
import { mockScholarships } from '../mocks/scholarshipsMock';
import { mockSafetyResults } from '../mocks/safetyMock';
import { ThreatCategoryCard } from '../components/safety/ThreatCategoryCard';
import { RiskMeter } from '../components/safety/RiskMeter';

export const SafetyCenterPage: React.FC = () => {
  const highRiskScams = mockScholarships.filter(s => s.riskLevel === 'high');
  const safeListings = mockScholarships.filter(s => s.riskLevel === 'low');
  const sampleHighRiskResult = mockSafetyResults['sch_suspicious_guarantee_grant'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-danger-600 flex items-center justify-center text-white font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Scholarship Safety Center</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Azure AI Content Safety & Predatory Fraud Detection Module
          </p>
        </div>

        <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-semibold">
          Azure AI Guardrails Active
        </span>
      </div>

      <div className="p-4 bg-brand-50 border border-brand-200 rounded-xl flex items-start gap-3">
        <Info className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-brand-950 leading-relaxed">
          <strong>Prototype Architecture Notice:</strong> Azure AI Content Safety endpoints are scaffolded in the Python backend. The frontend currently renders pre-audited risk classification models for technical demonstration.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Total Scanned</p>
            <h3 className="text-2xl font-extrabold text-slate-900">{mockScholarships.length}</h3>
          </div>
          <ShieldCheck className="w-8 h-8 text-brand-600" />
        </Card>

        <Card className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-emerald-600 uppercase">Verified Safe</p>
            <h3 className="text-2xl font-extrabold text-emerald-600">{safeListings.length}</h3>
          </div>
          <ShieldCheck className="w-8 h-8 text-emerald-500" />
        </Card>

        <Card className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-amber-600 uppercase">Caution Required</p>
            <h3 className="text-2xl font-extrabold text-amber-600">0</h3>
          </div>
          <AlertTriangle className="w-8 h-8 text-amber-500" />
        </Card>

        <Card className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-danger-600 uppercase">High Risk Scams</p>
            <h3 className="text-2xl font-extrabold text-danger-600">{highRiskScams.length}</h3>
          </div>
          <ShieldAlert className="w-8 h-8 text-danger-600" />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-danger-600" />
                <span>Flagged Predatory Scam Listings</span>
              </h3>
              <Badge variant="danger">{highRiskScams.length} Detected</Badge>
            </div>

            <div className="space-y-4">
              {highRiskScams.map((scam) => (
                <div key={scam.id} className="p-4 bg-danger-50/50 border border-danger-200 rounded-xl space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold text-danger-700 uppercase tracking-wider block">Predatory Scam Flagged</span>
                      <h4 className="text-sm font-bold text-slate-900">{scam.name}</h4>
                      <p className="text-xs text-slate-600 mt-1">{scam.provider}</p>
                    </div>
                    <Badge variant="danger" className="font-extrabold">Risk Score: {scam.riskScore}/100</Badge>
                  </div>

                  <p className="text-xs text-slate-700 italic bg-white p-3 rounded-lg border border-danger-100">
                    "{scam.description}"
                  </p>

                  <div className="p-3 bg-danger-900 text-white rounded-lg text-xs font-medium">
                    <strong>Recommended Action:</strong> DO NOT submit application fee or provide sensitive financial credentials.
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {sampleHighRiskResult && (
            <Card className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">Azure Content Safety Flag Analysis Breakdown</h3>
              <div className="space-y-3">
                {sampleHighRiskResult.flags.map((flag) => (
                  <ThreatCategoryCard key={flag.id} flag={flag} />
                ))}
              </div>
            </Card>
          )}
        </div>

        <div>
          <RiskMeter score={sampleHighRiskResult.riskScore} riskLevel={sampleHighRiskResult.riskLevel} />
        </div>
      </div>
    </div>
  );
};
