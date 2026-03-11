import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/inventory': 'Inventory Management',
  '/alerts': 'Stock Alerts',
  '/replenishment': 'Replenishment',
  '/settings': 'Settings',
};

export default function MainLayout() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Dashboard';

  return (
    <div className="min-h-screen flex bg-[#f8fafc] text-slate-800 font-sans overflow-x-hidden">
      <Sidebar />
      {/* Main Content Area: flex-grow to fill remaining space, min-w-0 prevents flex overflow */}
      <div className="flex-grow flex flex-col min-w-0 min-h-screen">
        <Header title={title} />
        <main className="flex-1 p-10 overflow-y-auto">
          <div className="page-fade w-full h-full max-w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
