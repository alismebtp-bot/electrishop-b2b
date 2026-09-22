import { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Package, TrendingUp } from 'lucide-react';
import { PRODUCTS } from '@/data/products';

export default function AdminProducts() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const categories = ['all', ...new Set(PRODUCTS.map(p => p.category))];

  const filtered = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                         p.ref.toLowerCase().includes(search.toLowerCase()) ||
                         p.brand.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Package size={28} className="text-[#D4A853]" />
          Produits
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110 transition-all">
          <Plus size={18} />
          Ajouter
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 bg-[#141415] border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4A853]"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-11 px-4 bg-[#141415] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4A853]"
        >
          <option value="all">Toutes catégories</option>
          {categories.filter(c => c !== 'all').map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="bg-[#141415] rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Produit</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Référence</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Prix HT</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Stock</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Catégorie</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 20).map((product) => (
              <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1C1C1E] rounded-lg flex items-center justify-center overflow-hidden">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package size={18} className="text-gray-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-400 text-sm">{product.ref}</td>
                <td className="px-4 py-3 text-[#D4A853] font-semibold">{product.priceHT.toFixed(2)}€</td>
                <td className="px-4 py-3">
                  <span className={`text-sm ${product.stock < 20 ? 'text-red-400' : 'text-green-400'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-sm">{product.category}</td>
                <td className="px-4 py-3">
                  <button className="text-gray-500 hover:text-white transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
