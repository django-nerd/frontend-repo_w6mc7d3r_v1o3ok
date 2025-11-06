import { useMemo } from 'react';
import { Edit, Trash2, Package } from 'lucide-react';

export default function InventoryTable({ items, onEdit, onDelete }) {
  const totals = useMemo(() => {
    const quantity = items.reduce((sum, i) => sum + (i.quantity || 0), 0);
    const value = items.reduce((sum, i) => sum + (i.quantity || 0) * (i.unitCost || 0), 0);
    return { quantity, value };
  }, [items]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {items.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <Package className="h-6 w-6 text-gray-400" />
                    <span>No items yet. Add your first product.</span>
                  </div>
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item.sku} className="hover:bg-gray-50/60">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.sku}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.category || '-'}</td>
                <td className="px-4 py-3 text-sm text-right text-gray-900">{item.quantity}</td>
                <td className="px-4 py-3 text-sm text-right text-gray-900">${item.unitCost?.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm text-right text-gray-900">${(item.quantity * item.unitCost).toFixed(2)}</td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button onClick={() => onEdit?.(item)} className="p-2 rounded hover:bg-blue-50 text-blue-600">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => onDelete?.(item)} className="p-2 rounded hover:bg-red-50 text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {items.length > 0 && (
            <tfoot className="bg-gray-50">
              <tr>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900" colSpan={3}>Totals</td>
                <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">{totals.quantity}</td>
                <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">—</td>
                <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">${totals.value.toFixed(2)}</td>
                <td />
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
