import { useInventory } from '../hooks/useInventory';
import AlertsPanel from '../components/alerts/AlertsPanel';
import { TableSkeleton } from '../components/common/Skeleton';

export default function AlertsPage() {
  const { alerts, isLoading } = useInventory();

  const highAlerts = alerts.filter((a) => a.severity === 'HIGH');
  const mediumAlerts = alerts.filter((a) => a.severity === 'MEDIUM');

  if (isLoading) {
    return (
      <div className="w-full">
        <TableSkeleton rows={8} />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 w-full">
      {/* Page header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 py-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">Stock Alerts</h2>
          <p className="text-[15px] text-slate-600 mt-2 leading-relaxed">
            Review {alerts.length} active inventory anomalies prioritized by risk level.
          </p>
        </div>
      </div>

      <div className="space-y-12">
        {/* Critical Alerts */}
        {highAlerts.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-sm ring-4 ring-red-50"></span>
              Critical Priorities
            </h3>
            <p className="text-sm text-slate-500 mb-4">Immediate restocking required. Projected out of stock within 48 hours.</p>
            <div className="neo-card p-1">
              <AlertsPanel alerts={highAlerts} />
            </div>
          </section>
        )}

        {/* Warning Alerts */}
        {mediumAlerts.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full shadow-sm ring-4 ring-amber-50"></span>
              Warning Trends
            </h3>
            <p className="text-sm text-slate-500 mb-4">Monitor closely. Approaching reorder thresholds.</p>
            <div className="neo-card p-1">
              <AlertsPanel alerts={mediumAlerts} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
