import React, { useState, useEffect } from 'react';
import { Application } from '../types/application';
import { getApplications, deleteApplication } from '../services/mockService';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { Tabs } from '../components/ui/Tabs';
import { FileText, Calendar, Trash2, ArrowRight, Plus } from 'lucide-react';
import { formatDate, formatCurrency } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export const MyApplicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  const handleDelete = (id: string) => {
    const updated = deleteApplication(id);
    setApplications(updated);
  };

  const filtered = applications.filter(a => {
    if (activeTab === 'all') return true;
    return a.status === activeTab;
  });

  const tabs = [
    { id: 'all', label: 'All Drafts', count: applications.length },
    { id: 'in_progress', label: 'In Progress', count: applications.filter(a => a.status === 'in_progress').length },
    { id: 'ready_for_review', label: 'Ready for Review', count: applications.filter(a => a.status === 'ready_for_review').length },
    { id: 'submitted', label: 'Submitted', count: applications.filter(a => a.status === 'submitted').length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Applications</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Application Workspaces & Draft History (Saved locally in LocalStorage)
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate('/app/discovery')}
          className="gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Application</span>
        </Button>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {filtered.length === 0 ? (
        <Card className="p-12 text-center space-y-3">
          <FileText className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No applications in this view</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Explore matched scholarships and start an application workspace.
          </p>
          <Button variant="primary" onClick={() => navigate('/app/discovery')}>
            Find Scholarships
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((app) => (
            <Card key={app.id} hoverable className="space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider block">{app.provider}</span>
                    <h3 className="text-base font-bold text-slate-900 line-clamp-1">{app.scholarshipName}</h3>
                  </div>
                  <Badge variant={app.status === 'ready_for_review' ? 'safe' : 'brand'} className="uppercase text-[10px] font-bold">
                    {app.status.replace('_', ' ')}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Due {formatDate(app.deadline)}</span>
                  </div>
                  <span className="font-bold text-slate-900">{formatCurrency(app.amount)}</span>
                </div>

                <div className="space-y-1 pt-2">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                    <span>Draft Progress</span>
                    <span>{app.completionPercentage}%</span>
                  </div>
                  <Progress value={app.completionPercentage} variant="brand" size="sm" />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleDelete(app.id)}
                  className="p-2 text-slate-400 hover:text-danger-600 rounded-lg hover:bg-danger-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/app/application/${app.id}`)}
                  className="gap-1.5 shadow-xs"
                >
                  <span>Continue Editing Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
