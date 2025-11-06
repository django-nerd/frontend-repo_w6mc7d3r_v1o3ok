import { useMemo, useState } from 'react';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import InventoryTable from './components/InventoryTable';
import InventoryForm from './components/InventoryForm';

function App() {
  const [items, setItems] = useState([
    { name: 'Wireless Mouse', sku: 'WM-001', category: 'Accessories', quantity: 24, unitCost: 12.99 },
    { name: 'Mechanical Keyboard', sku: 'KB-220', category: 'Accessories', quantity: 8, unitCost: 59.5 },
    { name: '27" Monitor', sku: 'MN-270', category: 'Displays', quantity: 4, unitCost: 189.0 },
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
      // prevent duplicate SKU
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

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <StatsBar items={filtered} />

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Inventory</h2>
          <button onClick={handleAdd} className="md:hidden px-3 py-2 bg-blue-600 text-white rounded-md text-sm">Add Item</button>
        </div>

        <InventoryTable items={filtered} onEdit={handleEdit} onDelete={handleDelete} />
      </main>

      <InventoryForm open={open} onClose={() => setOpen(false)} onSubmit={handleSubmit} initial={editing} />
    </div>
  );
}

export default App;
