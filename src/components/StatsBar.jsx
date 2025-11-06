import { Boxes, DollarSign, PackageCheck } from 'lucide-react';

export default function StatsBar({ items }) {
  const totalItems = items.length;
  const totalQuantity = items.reduce((sum, i) => sum + (i.quantity || 0), 0);
  const totalValue = items.reduce((sum, i) => sum + (i.quantity || 0) * (i.unitCost || 0), 0);
  const lowStock = items.filter((i) => (i.quantity || 0) < 5).length;

  const stat = (icon, label, value) => (
    <div className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      {icon}
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-lg font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stat(<Boxes className="h-5 w-5 text-blue-600" />, 'Unique Items', totalItems)}
      {stat(<PackageCheck className="h-5 w-5 text-green-600" />, 'Total Quantity', totalQuantity)}
      {stat(<DollarSign className="h-5 w-5 text-emerald-600" />, 'Inventory Value', `$${totalValue.toFixed(2)}`)}
      {stat(<Boxes className="h-5 w-5 text-amber-600" />, 'Low Stock', lowStock)}
    </div>
  );
}
