import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  AlertTriangle,
  RefreshCw,
  Settings,
  Boxes,
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/inventory', label: 'Inventory', icon: Package },
  { to: '/alerts', label: 'Stock Alerts', icon: AlertTriangle },
  { to: '/replenishment', label: 'Replenishment', icon: RefreshCw },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 h-screen z-50 flex-shrink-0 flex flex-col bg-[#f9f9f9] text-slate-700 w-[260px] border-r border-slate-200">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 min-h-[60px]">
        <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
          <Boxes className="w-5 h-5 text-white" />
        </div>
        <div className="whitespace-nowrap">
          <h1 className="text-sm font-semibold text-slate-900 leading-tight">Auto Replenish</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-[#ececec] text-slate-900 font-semibold'
                  : 'text-slate-600 hover:bg-[#ececec]'
              }`
            }
          >
            <item.icon className="w-4 h-4 min-w-[16px]" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer / User Area (Similar to ChatGPT's bottom section) */}
      <div className="px-3 py-4 border-t border-slate-200">
        <button className="flex items-center gap-3 px-3 py-2 w-full hover:bg-[#ececec] rounded-md transition-colors text-left text-sm font-medium text-slate-700">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold">
            U
          </div>
          <span className="truncate">User Account</span>
        </button>
      </div>
    </aside>
  );
}
