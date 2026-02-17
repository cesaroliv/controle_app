import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'emerald' | 'rose' | 'blue' | 'slate';
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, subValue, icon, color = 'slate' }) => {
  const colorClasses = {
    emerald: 'text-emerald-400 bg-emerald-950/30 border-emerald-900/50',
    rose: 'text-rose-400 bg-rose-950/30 border-rose-900/50',
    blue: 'text-blue-400 bg-blue-950/30 border-blue-900/50',
    slate: 'text-slate-200 bg-slate-800 border-slate-700',
  };

  return (
    <div className={`p-4 rounded-xl border ${colorClasses[color]} flex items-start justify-between shadow-sm`}>
      <div>
        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">{label}</p>
        <h3 className="text-xl font-bold text-slate-100">{value}</h3>
        {subValue && <p className="text-xs text-slate-500 mt-1">{subValue}</p>}
      </div>
      {icon && <div className={`p-2 rounded-lg bg-slate-900/50 ${colorClasses[color].split(' ')[0]}`}>{icon}</div>}
    </div>
  );
};