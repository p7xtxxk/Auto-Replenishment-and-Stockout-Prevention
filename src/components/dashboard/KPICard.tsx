import type { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  icon: ReactNode;
  value: number;
  label: string;
  color: 'blue' | 'green' | 'orange' | 'red';
  trend?: {
    value: string;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
}

const colorMap = {
  blue: {
    bg: 'bg-blue-50/50',
    iconBg: 'bg-blue-100 text-blue-600',
    text: 'text-slate-900',
  },
  green: {
    bg: 'bg-emerald-50/50',
    iconBg: 'bg-emerald-100 text-emerald-600',
    text: 'text-slate-900',
  },
  orange: {
    bg: 'bg-orange-50/50',
    iconBg: 'bg-orange-100 text-orange-600',
    text: 'text-slate-900',
  },
  red: {
    bg: 'bg-red-50/50',
    iconBg: 'bg-red-100 text-red-600',
    text: 'text-slate-900',
  },
};

export default function KPICard({ icon, value, label, color, trend }: KPICardProps) {
  const c = colorMap[color];

  return (
    <div className="neo-card p-6 h-full flex flex-col justify-between group hover:border-slate-300 transition-colors relative">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${c.iconBg} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
        
        {trend && (
          <div className="flex items-center gap-1.5 absolute top-6 right-6">
             <span className={`text-[13px] font-bold ${trend.direction === 'up' ? 'text-emerald-600' : trend.direction === 'down' ? 'text-red-600' : 'text-slate-600'}`}>
              {trend.value} <span className="text-[12px] font-medium opacity-80">{trend.label}</span>
            </span>
            {trend.direction === 'up' && <TrendingUp className="w-4 h-4 text-emerald-500" />}
            {trend.direction === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
            {trend.direction === 'neutral' && <Minus className="w-4 h-4 text-slate-400" />}
          </div>
        )}
      </div>

      <div className="mt-auto">
        <p className="text-[15px] font-medium text-slate-500 mb-2">{label}</p>
        <p className={`text-5xl font-bold tracking-tight ${c.text}`}>{value}</p>
      </div>
    </div>
  );
}
