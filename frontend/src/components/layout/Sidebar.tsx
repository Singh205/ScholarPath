import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  Sparkles,
  FileText,
  Bookmark,
  ShieldAlert,
  Cpu,
  User,
  GraduationCap
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ className, onNavigate }) => {
  const navItems = [
    { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/app/discovery', label: 'Discover', icon: Compass },
    { to: '/app/matching', label: 'My Matches', icon: Sparkles, badge: 'AI' },
    { to: '/app/applications', label: 'Applications', icon: FileText },
    { to: '/app/saved', label: 'Saved', icon: Bookmark },
    { to: '/app/safety', label: 'Safety Center', icon: ShieldAlert },
    { to: '/app/architecture', label: 'AI Architecture', icon: Cpu },
    { to: '/app/profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className={cn('w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0 border-r border-slate-800', className)}>
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/30">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-extrabold text-base text-white tracking-tight leading-none">ScholarPath</h1>
          <span className="text-[10px] text-brand-400 font-semibold uppercase tracking-wider">Multi-Agent MVP</span>
        </div>
      </div>

      <div className="px-3 py-4 flex-1 overflow-y-auto space-y-1">
        <div className="px-3 pb-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          Main Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group',
                  isActive
                    ? 'bg-brand-600/20 text-brand-300 border-l-4 border-brand-500 font-semibold'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                )
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] bg-brand-500/20 text-brand-300 border border-brand-500/40 rounded font-bold">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-200">Demo / Mock Active</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            All AI agents active in offline mock mode with LocalStorage persistence.
          </p>
        </div>
      </div>
    </aside>
  );
};
