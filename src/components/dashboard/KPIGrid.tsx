import { Package, AlertTriangle, ShieldAlert, RefreshCw } from 'lucide-react';
import KPICard from './KPICard';
import type { KPIData } from '../../types/inventoryTypes';

interface KPIGridProps {
  kpis: KPIData;
}

export default function KPIGrid({ kpis }: KPIGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <KPICard
        icon={<Package className="w-5 h-5" />}
        value={kpis.totalProducts}
        label="Total Products"
        color="blue"
        trend={{ value: '+2', label: 'from last week', direction: 'up' }}
      />
      <KPICard
        icon={<AlertTriangle className="w-5 h-5" />}
        value={kpis.lowStockItems}
        label="Low Stock Items"
        color="orange"
        trend={{ value: '0', label: 'no change since yesterday', direction: 'neutral' }}
      />
      <KPICard
        icon={<ShieldAlert className="w-5 h-5" />}
        value={kpis.stockoutRiskItems}
        label="Stockout Risk Items"
        color="red"
        trend={{ value: '-1', label: 'resolved today', direction: 'down' }}
      />
      <KPICard
        icon={<RefreshCw className="w-5 h-5" />}
        value={kpis.pendingReplenishment}
        label="Pending Replenishment"
        color="green"
        trend={{ value: '+4', label: 'orders processed', direction: 'up' }}
      />
    </div>
  );
}
