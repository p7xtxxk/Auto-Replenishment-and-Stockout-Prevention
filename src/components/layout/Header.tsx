import { Search, Bell } from 'lucide-react';
import { useInventoryStore } from '../../store/inventoryStore';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const { searchQuery, setSearchQuery, alerts } = useInventoryStore();
  const unreadCount = alerts.filter((a) => a.severity === 'HIGH').length;

  return (
    <header className="h-14 bg-white/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6 border-b border-slate-200/60">
      {/* Title */}
      <h1 className="text-lg font-semibold text-slate-800">{title}</h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative group flex items-center h-full">
          <Search className="absolute left-3 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-1.5 w-64 text-sm bg-slate-100 border border-transparent rounded-full focus:outline-none focus:bg-white focus:border-slate-300 focus:ring-4 focus:ring-slate-100 transition-all placeholder:text-slate-500 placeholder:opacity-100 placeholder:leading-none translate-y-[-1px]"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          )}
        </button>
      </div>
    </header>
  );
}
