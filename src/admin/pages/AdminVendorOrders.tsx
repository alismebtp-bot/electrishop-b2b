import { useState } from 'react';
import { ShoppingBag, Search, Filter, Eye, Package } from 'lucide-react';

interface VendorOrder {
  id: string;
  vendor: string;
  date: string;
  totalHT: number;
  totalTTC: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'received';
  items: number;
}

const mockVendorOrders: VendorOrder[] = [
  { id: 'FOU-2026-0045', vendor: 'Legrand France', date: '2026-06-10', totalHT: 5000.00, totalTTC: 6000.00, status: 'received', items: 50 },
  { id: 'FOU-2026-0044', vendor: 'Schneider Electric', date: '2026-06-05', totalHT: 3200.00, totalTTC: 3840.00, status: 'shipped', items: 30 },
  { id: 'FOU-2026-0043', vendor: 'Nexans', date: '2026-05-28', totalHT: 7800.00, totalTTC: 9360.00, status: 'confirmed', items: 100 },
];

const statusConfig = {
  pending: { label: 'En attente', color: 'bg-yellow-500/20 text-yellow-400' },
  confirmed: { label: 'Confirmé', color: 'bg-blue-500/20 text-blue-400' },
  shipped: { label: 'Expédié', color: 'bg-purple-500/20 text-purple-400' },
  received: { label: 'Reçu', color: 'bg-green-500/20 text-green-400' },
};

export default function AdminVendorOrders() {
  const [search, setSearch] = useState('');

  const filtered = mockVendorOrders.filter(o =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.vendor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <ShoppingBag size={28} className="text-[#D4A853]" />
          Commandes fournisseurs
        </h1>
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 bg-[#141415] border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4A853]"
        />
      </div>

      <div className="bg-[#141415] rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Commande</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Fournisseur</th>
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
                  <td className="px-4 py-4 text-white">{order.vendor}</td>
                  <td className="px-4 py-4 text-gray-400">{order.date}</td>
                  <td className="px-4 py-4 text-[#D4A853] font-semibold">{order.totalTTC.toFixed(2)}€</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${config.color}`}>
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
