import { useInventory } from '../hooks/useInventory';
import InventoryTable from '../components/inventory/InventoryTable';
import { TableSkeleton } from '../components/common/Skeleton';
import { Search } from 'lucide-react';

export default function InventoryPage() {
  const { inventory, searchQuery, setSearchQuery, isLoading } = useInventory();

  if (isLoading) {
    return (
      <div className="w-full">
         <TableSkeleton rows={12} />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 w-full">
      {/* Page header area */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 py-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">Product Inventory</h2>
          <p className="text-[15px] text-slate-600 mt-2 leading-relaxed">
            Manage your catalog of {inventory.length} active products being tracked in real-time.
          </p>
        </div>
        
        {/* Local Page Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Filter inventory…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow transition-colors placeholder:text-slate-400 shadow-sm"
          />
        </div>
      </div>

      {/* Table Area */}
      <div className="w-full">
        <InventoryTable data={inventory} globalFilter={searchQuery} />
      </div>
    </div>
  );
}
