import { useState } from 'react';
import { Plus, Mail, Phone, Timer } from 'lucide-react';

const empty = { name: '', contact: '', email: '', leadTime: 7 };

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Supplier A', contact: '+1 (555) 321-4567', email: 'sales@supplier-a.com', leadTime: 5 },
    { id: 2, name: 'Tech Parts Co', contact: '+1 (555) 765-1111', email: 'hello@techparts.co', leadTime: 9 },
  ]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);

  const submit = (e) => {
    e.preventDefault();
    setSuppliers((prev) => [{ id: Date.now(), ...form }, ...prev]);
    setForm(empty);
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Suppliers</h2>
        <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md text-sm">
          <Plus className="h-4 w-4" /> Add Supplier
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {suppliers.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/60">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{s.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700"><span className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-gray-400" />{s.contact}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-700"><span className="inline-flex items-center gap-2"><Mail className="h-4 w-4 text-gray-400" />{s.email}</span></td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900"><span className="inline-flex items-center gap-1 justify-end"><Timer className="h-4 w-4 text-gray-400" />{s.leadTime} days</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-30 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-lg shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Supplier</h3>
            <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                <input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Lead Time (days)</label>
                <input type="number" min="0" value={form.leadTime} onChange={(e) => setForm({ ...form, leadTime: Number(e.target.value) })} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md border text-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium">Add Supplier</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
