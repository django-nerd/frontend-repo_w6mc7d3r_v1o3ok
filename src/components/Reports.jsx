import { useMemo, useState } from 'react';
import { Download } from 'lucide-react';

export default function Reports({ items }) {
  const [range, setRange] = useState('30');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    const cats = Array.from(new Set(items.map((i) => i.category || 'Uncategorized')));
    return { categories: ['all', ...cats] };
  }, [items]);

  const exportCSV = () => {
    const headers = ['Name', 'SKU', 'Category', 'Quantity', 'Unit Cost', 'Value'];
    const rows = items.map((i) => [i.name, i.sku, i.category || '', i.quantity, i.unitCost, (i.quantity * i.unitCost).toFixed(2)]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Reports</h2>
        <button onClick={exportCSV} className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md text-sm">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Time Range</label>
          <select value={range} onChange={(e) => setRange(e.target.value)} className="w-full border rounded-md px-3 py-2">
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border rounded-md px-3 py-2">
            {filtered.categories.map((c) => (
              <option value={c} key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="text-sm text-gray-600 mb-3">Summary</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><div className="text-gray-500">Items</div><div className="text-gray-900 font-semibold">{items.length}</div></div>
          <div><div className="text-gray-500">Total Qty</div><div className="text-gray-900 font-semibold">{items.reduce((s,i)=>s+i.quantity,0)}</div></div>
          <div><div className="text-gray-500">Avg Unit Cost</div><div className="text-gray-900 font-semibold">${(items.reduce((s,i)=>s+i.unitCost,0)/items.length).toFixed(2)}</div></div>
          <div><div className="text-gray-500">Inventory Value</div><div className="text-gray-900 font-semibold">${items.reduce((s,i)=>s+i.quantity*i.unitCost,0).toFixed(2)}</div></div>
        </div>
      </div>
    </div>
  );
}
