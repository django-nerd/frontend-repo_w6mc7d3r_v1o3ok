import { useMemo, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import StatsBar from './components/StatsBar';
import InventoryTable from './components/InventoryTable';
import InventoryForm from './components/InventoryForm';
import Suppliers from './components/Suppliers';
import Reports from './components/Reports';

function App() {
  const [page, setPage] = useState('dashboard');
  const [items, setItems] = useState([
    { name: 'Wireless Mouse', sku: 'WM-001', category: 'Accessories', quantity: 24, unitCost: 12.99 },
    { name: 'Mechanical Keyboard', sku: 'KB-220', category: 'Accessories', quantity: 8, unitCost: 59.5 },
    { name: '27" Monitor', sku: 'MN-270', category: 'Displays', quantity: 4, unitCost: 189.0 },
    { name: 'USB-C Cable', sku: 'UC-010', category: 'Accessories', quantity: 120, unitCost: 4.2 },
    { name: 'Laptop Stand', sku: 'LS-500', category: 'Accessories', quantity: 15, unitCost: 29.99 },
  ]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return items;
    return items.filter((i) =>
      [i.name, i.sku, i.category].some((f) => (f || '').toLowerCase().includes(q))
    );
  }, [items, search]);

  const handleAdd = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleSubmit = (data) => {
    if (editing) {
      setItems((prev) => prev.map((i) => (i.sku === editing.sku ? { ...editing, ...data } : i)));
    } else {
      if (items.some((i) => i.sku === data.sku)) {
        alert('An item with this SKU already exists.');
        return;
      }
      setItems((prev) => [{ ...data }, ...prev]);
    }
    setOpen(false);
    setEditing(null);
  };

  const handleEdit = (item) => {
    setEditing(item);
    setOpen(true);
  };

  const handleDelete = (item) => {
    if (confirm(`Delete ${item.name}?`)) {
      setItems((prev) => prev.filter((i) => i.sku !== item.sku));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header onAddClick={handleAdd} search={search} onSearchChange={setSearch} />

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-6">
        <Sidebar current={page} onChange={setPage} />

        <main className="space-y-6">
          {page === 'dashboard' && (
            <>
              <Dashboard items={items} />
            </>
          )}

          {page === 'inventory' && (
            <>
              <StatsBar items={filtered} />
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Inventory</h2>
                <button onClick={handleAdd} className="md:hidden px-3 py-2 bg-blue-600 text-white rounded-md text-sm">Add Item</button>
              </div>
              <InventoryTable items={filtered} onEdit={handleEdit} onDelete={handleDelete} />
            </>
          )}

          {page === 'suppliers' && (
            <Suppliers />
          )}

          {page === 'reports' && (
            <Reports items={items} />
          )}
        </main>
      </div>

      <InventoryForm open={open} onClose={() => setOpen(false)} onSubmit={handleSubmit} initial={editing} />
    </div>
  );
}

export default App;
