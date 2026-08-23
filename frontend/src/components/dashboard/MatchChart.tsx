import React from 'react';
import { Card } from '../ui/Card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

export const MatchChart: React.FC = () => {
  const data = [
    { category: 'STEM / CS', matches: 6, color: '#0274c5' },
    { category: 'AI & Ethics', matches: 3, color: '#16a34a' },
    { category: 'Merit Fellowship', matches: 4, color: '#7cc8fc' },
    { category: 'Need-Based', matches: 2, color: '#d97706' },
    { category: 'Leadership', matches: 2, color: '#9333ea' },
  ];

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Scholarship Match Breakdown</h3>
          <p className="text-xs text-slate-500">Distribution across matched opportunity categories</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-brand-50 text-brand-700 rounded-md">
          Total: 17 Opportunities
        </span>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="category" tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis allowDecimals={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              itemStyle={{ color: '#38bdf8' }}
            />
            <Bar dataKey="matches" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
