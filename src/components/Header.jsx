import { useState } from 'react';
import { Plus, Search } from 'lucide-react';

export default function Header({ onAddClick, search, onSearchChange }) {
  const [query, setQuery] = useState(search || '');

  const handleChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    onSearchChange?.(q);
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">Inventory Manager</h1>
          <p className="text-sm text-gray-500">Track stock, value, and restocks in one place.</p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search items, SKU, category..."
              className="w-72 pl-9 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <button
            onClick={onAddClick}
            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </button>
        </div>
      </div>
      <div className="md:hidden px-4 pb-4 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search items, SKU, category..."
            className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
        <button
          onClick={onAddClick}
          className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>
    </header>
  );
}
