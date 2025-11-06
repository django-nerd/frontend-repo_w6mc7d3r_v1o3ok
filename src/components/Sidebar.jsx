import { LayoutDashboard, Boxes, Truck, BarChart3 } from 'lucide-react';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'inventory', label: 'Inventory', icon: Boxes },
  { key: 'suppliers', label: 'Suppliers', icon: Truck },
  { key: 'reports', label: 'Reports', icon: BarChart3 },
];

export default function Sidebar({ current, onChange }) {
  return (
    <aside className="hidden md:flex md:flex-col w-64 border-r border-gray-200 bg-white/80 backdrop-blur h-screen sticky top-0">
      <div className="px-5 py-4 border-b border-gray-200">
        <div className="text-lg font-semibold text-gray-900">Inventory Manager</div>
        <div className="text-xs text-gray-500">Control Center</div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ key, label, icon: Icon }) => {
          const active = current === key;
          return (
            <button
              key={key}
              onClick={() => onChange?.(key)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                active
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-4 text-xs text-gray-500">v1.0</div>
    </aside>
  );
}
