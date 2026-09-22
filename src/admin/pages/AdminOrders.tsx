import { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, XCircle, Filter, Eye } from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  date: string;
  totalHT: number;
  totalTTC: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
}

const mockOrders: Order[] = [
  { id: 'CMD-2026-001234', customer: 'Elec Pro Paris', date: '2026-06-15', totalHT: 1033.75, totalTTC: 1240.50, status: 'delivered', items: 5 },
  { id: 'CMD-2026-001233', customer: 'Bâtiment Confort', date: '2026-06-14', totalHT: 741.67, totalTTC: 890.00, status: 'shipped', items: 3 },
  { id: 'CMD-2026-001232', customer: 'SARL Élec 91', date: '2026-06-14', totalHT: 1950.67, totalTTC: 2340.80, status: 'processing', items: 8 },
  { id: 'CMD-2026-001231', customer: 'Pro Facility', date: '2026-06-13', totalHT: 472.75, totalTTC: 567.30, status: 'pending', items: 2 },
];

const statusConfig = {
  pending: { label: 'En attente', color: 'bg-yellow-500/20 text-yellow-400', icon: Clock },
  processing: { label: 'En préparation', color: 'bg-blue-500/20 text-blue-400', icon: Package },
  shipped: { label: 'Expédiée', color: 'bg-purple-500/20 text-purple-400', icon: Truck },
  delivered: { label: 'Livrée', color: 'bg-green-500/20 text-green-400', icon: CheckCircle },
  cancelled: { label: 'Annulée', color: 'bg-red-500/20 text-red-400', icon: XCircle },
};

export default function AdminOrders() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = mockOrders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
                         o.customer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Package size={28} className="text-[#D4A853]" />
          Commandes
        </h1>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher une commande..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 bg-[#141415] border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4A853]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-11 px-4 bg-[#141415] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4A853]"
        >
          <option value="all">Tous statuts</option>
          {Object.entries(statusConfig).map(([key, config]) => (
            <option key={key} value={key}>{config.label}</option>
          ))}
        </select>
      </div>

      <div className="bg-[#141415] rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Commande</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Client</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Date</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Total TTC</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Statut</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => {
              const config = statusConfig[order.status];
              return (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4">
                    <p className="text-white font-medium">{order.id}</p>
                    <p className="text-xs text-gray-500">{order.items} article(s)</p>
                  </td>
                  <td className="px-4 py-4 text-white">{order.customer}</td>
                  <td className="px-4 py-4 text-gray-400">{order.date}</td>
                  <td className="px-4 py-4 text-[#D4A853] font-semibold">{order.totalTTC.toFixed(2)}€</td>
                  <td className="px-4 py-4">
                    <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full w-fit ${config.color}`}>
                      <config.icon size={14} />
                      {config.label}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button className="text-gray-500 hover:text-white transition-colors">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
