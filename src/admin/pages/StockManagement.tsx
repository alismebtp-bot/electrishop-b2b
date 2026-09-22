import { useState } from 'react';
import { Package, Search, Plus, Minus, AlertTriangle, CheckCircle, History, Barcode } from 'lucide-react';

interface StockItem {
  id: string;
  name: string;
  ref: string;
  sku: string;
  quantity: number;
  minStock: number;
  location: string;
  lastUpdated: string;
}

const mockStock: StockItem[] = [
  { id: '1', name: 'Disjoncteur DNX³ 16A', ref: 'LEG-0001', sku: 'DIS-16A-001', quantity: 150, minStock: 50, location: 'A-01-03', lastUpdated: '2026-06-15' },
  { id: '2', name: 'Câble R2V 3G1.5', ref: 'NXS-0001', sku: 'CAB-3G15-001', quantity: 500, minStock: 200, location: 'B-02-01', lastUpdated: '2026-06-14' },
  { id: '3', name: 'Ampoule LED E27 10W', ref: 'PHI-0001', sku: 'AMP-E27-010', quantity: 12, minStock: 30, location: 'C-01-05', lastUpdated: '2026-06-13' },
  { id: '4', name: 'Outillage électricien', ref: 'FAC-0001', sku: 'OUT-PRO-001', quantity: 8, minStock: 10, location: 'D-03-02', lastUpdated: '2026-06-12' },
];

export default function StockManagement() {
  const [search, setSearch] = useState('');
  const [stock, setStock] = useState<StockItem[]>(mockStock);
  const [showAdjust, setShowAdjust] = useState<string | null>(null);
  const [adjustQty, setAdjustQty] = useState(0);

  const filtered = stock.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.ref.toLowerCase().includes(search.toLowerCase()) ||
    s.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdjust = (id: string) => {
    setStock(stock.map(s => s.id === id ? { ...s, quantity: s.quantity + adjustQty } : s));
    setShowAdjust(null);
    setAdjustQty(0);
  };

  const lowStock = stock.filter(s => s.quantity < s.minStock);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-3">
        <Package size={28} className="text-[#D4A853]" />
        Gestion des stocks
      </h1>

      {lowStock.length > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 text-yellow-400 mb-2">
            <AlertTriangle size={20} />
            <span className="font-semibold">Stock faible ({lowStock.length} produit(s))</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {lowStock.map(s => (
              <span key={s.id} className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                {s.name} ({s.quantity} / {s.minStock})
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Rechercher par nom, référence ou SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 bg-[#141415] border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4A853]"
        />
      </div>

      <div className="bg-[#141415] rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Produit</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">SKU</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Quantité</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Min</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Emplacement</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-4">
                  <p className="text-white font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.ref}</p>
                </td>
                <td className="px-4 py-4 text-gray-400 font-mono text-sm">{item.sku}</td>
                <td className="px-4 py-4">
                  <span className={`font-semibold ${item.quantity < item.minStock ? 'text-red-400' : 'text-green-400'}`}>
                    {item.quantity}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-400">{item.minStock}</td>
                <td className="px-4 py-4 text-gray-400">{item.location}</td>
                <td className="px-4 py-4">
                  {showAdjust === item.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={adjustQty}
                        onChange={(e) => setAdjustQty(parseInt(e.target.value) || 0)}
                        className="w-20 h-8 px-2 bg-[#0A0A0B] border border-white/10 rounded text-white text-sm"
                      />
                      <button onClick={() => handleAdjust(item.id)} className="p-1 text-green-400 hover:bg-green-500/10 rounded">
                        <CheckCircle size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowAdjust(item.id)}
                      className="text-xs px-3 py-1 bg-[#1C1C1E] text-gray-400 rounded hover:text-white transition-all"
                    >
                      Ajuster
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
