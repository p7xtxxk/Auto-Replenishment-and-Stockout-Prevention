import { AlertTriangle, AlertCircle, Clock } from 'lucide-react';
import type { StockAlert } from '../../types/inventoryTypes';
import EmptyState from '../common/EmptyState';

interface AlertsPanelProps {
  alerts: StockAlert[];
  compact?: boolean;
}

function formatTime(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export default function AlertsPanel({ alerts, compact = false }: AlertsPanelProps) {
  if (alerts.length === 0) {
    return (
      <div className="p-8">
        <EmptyState message="No alerts" description="All inventory levels are healthy." />
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${compact ? '' : 'gap-3'} divide-y divide-slate-100`}>
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`flex items-start gap-5 ${compact ? 'py-5 px-6' : 'neo-card p-6'} hover:bg-[#f9fafb] transition-colors w-full group relative overflow-hidden`}
        >
          {/* Subtle severity border on left */}
          <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${alert.severity === 'HIGH' ? 'bg-red-500' : 'bg-amber-500'}`} />

          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
              alert.severity === 'HIGH' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
            }`}
          >
            {alert.severity === 'HIGH' ? <AlertCircle className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pr-6 mt-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[15px] text-slate-800 font-mono font-bold">{alert.sku}</span>
              <div className="flex items-center gap-1.5 text-[13px] font-medium text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                {formatTime(alert.timestamp)}
              </div>
            </div>
            <p className="text-[16px] text-slate-700 font-medium leading-relaxed truncate">{alert.message}</p>
          </div>
          
          {/* Right-Anchored Indicators */}
          <div className="flex flex-col items-center justify-center shrink-0 w-[140px] border-l border-slate-100 pl-6 gap-3">
             <span
              className={`text-[12px] font-bold uppercase tracking-widest px-3 py-1 rounded ${
                alert.severity === 'HIGH'
                  ? 'bg-red-500 text-white shadow-sm'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {alert.severity === 'HIGH' ? 'CRITICAL' : 'WARNING'}
            </span>
            <div className="flex flex-col items-center">
              <p className={`text-[28px] font-bold tabular-nums tracking-tight leading-none ${alert.severity === 'HIGH' ? 'text-red-600' : 'text-amber-600'}`}>
                {alert.daysUntilStockout}
              </p>
              <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mt-1 text-center">days left</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
