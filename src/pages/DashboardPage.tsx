import { useInventory } from '../hooks/useInventory';
import KPIGrid from '../components/dashboard/KPIGrid';
import RiskPieChart from '../components/dashboard/RiskPieChart';
import CoverageBarChart from '../components/dashboard/CoverageBarChart';
import AlertsPanel from '../components/alerts/AlertsPanel';
import { KPICardSkeleton, ChartSkeleton } from '../components/common/Skeleton';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { inventory, alerts, kpis, isLoading } = useInventory();

  if (isLoading) {
    return (
      <div className="space-y-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <KPICardSkeleton key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1"><ChartSkeleton /></div>
          <div className="lg:col-span-2"><ChartSkeleton /></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* ChatGPT-style clean header section (No big banner block) */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 py-4">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">System Overview</h2>
          <p className="text-[15px] text-slate-600 mt-2 leading-relaxed">
            Real-time monitoring of stock levels, risk detection, and AI replenishment recommendations.
          </p>
        </div>
        <Link to="/replenishment" className="neo-btn btn-primary px-4 py-2.5 flex items-center gap-2 text-sm shadow-sm">
          <Sparkles className="w-4 h-4 text-white/90" />
          View AI Recommendations
        </Link>
      </div>

      {/* KPI Cards */}
      <KPIGrid kpis={kpis} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">
        <div className="lg:col-span-1 h-full">
          <RiskPieChart data={inventory} />
        </div>
        <div className="lg:col-span-2 h-full">
          <CoverageBarChart data={inventory} />
        </div>
      </div>

      {/* Recent Alerts */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-body font-semibold text-slate-800">Critical Alerts</h3>
          <Link to="/alerts" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
            View All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <div className="neo-card p-1">
          <AlertsPanel alerts={alerts.slice(0, 4)} compact />
        </div>
      </section>
    </div>
  );
}
