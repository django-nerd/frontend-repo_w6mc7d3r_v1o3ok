import { ArrowDownRight, ArrowUpRight, CircleDollarSign, Package, ShoppingCart, Truck } from 'lucide-react';

function Stat({ title, value, trend, positive, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">{title}</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">{value}</div>
        </div>
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className={`mt-3 inline-flex items-center text-sm ${positive ? 'text-emerald-600' : 'text-red-600'}`}>
        {positive ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
        {trend}
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="text-sm font-medium text-gray-900 mb-3">{title}</div>
      {children}
    </div>
  );
}

export default function Dashboard({ items }) {
  const totalQuantity = items.reduce((sum, i) => sum + (i.quantity || 0), 0);
  const totalValue = items.reduce((sum, i) => sum + (i.quantity || 0) * (i.unitCost || 0), 0);
  const lowStock = items.filter((i) => (i.quantity || 0) < 5).length;
  const unique = items.length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat title="Inventory Value" value={`$${totalValue.toFixed(2)}`} trend="+8.1% this month" positive icon={CircleDollarSign} color="bg-emerald-500" />
        <Stat title="Unique Items" value={unique} trend="+2 new SKUs" positive icon={Package} color="bg-blue-500" />
        <Stat title="Total Quantity" value={totalQuantity} trend="-3.4% usage" positive={false} icon={ShoppingCart} color="bg-indigo-500" />
        <Stat title="Low Stock" value={lowStock} trend="5 need restock" positive={false} icon={Truck} color="bg-amber-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card title="Top Categories">
          <ul className="space-y-2">
            {Object.entries(items.reduce((acc, i) => { const k = i.category || 'Uncategorized'; acc[k] = (acc[k] || 0) + i.quantity; return acc; }, {}))
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([name, qty]) => (
                <li key={name} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{name}</span>
                  <span className="font-medium text-gray-900">{qty}</span>
                </li>
              ))}
          </ul>
        </Card>
        <Card title="Recent Activity">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between"><span className="text-gray-600">Received from Supplier A</span><span className="text-gray-900 font-medium">+120</span></div>
            <div className="flex items-center justify-between"><span className="text-gray-600">Order #1042 fulfilled</span><span className="text-gray-900 font-medium">-34</span></div>
            <div className="flex items-center justify-between"><span className="text-gray-600">Stock adjustment</span><span className="text-gray-900 font-medium">+3</span></div>
          </div>
        </Card>
        <Card title="Restock Alerts">
          <div className="space-y-2">
            {items.filter((i) => (i.quantity || 0) < 5).slice(0, 5).map((i) => (
              <div key={i.sku} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{i.name}</span>
                <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded">{i.quantity} left</span>
              </div>
            ))}
            {items.filter((i) => (i.quantity || 0) < 5).length === 0 && (
              <div className="text-sm text-gray-500">No low stock items. You're all set!</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
