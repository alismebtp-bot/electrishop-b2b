import { useState } from 'react';
import { Building2, Search, Plus, Star, Phone, Mail, MapPin, TrendingUp } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  rating: number;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
}

const mockVendors: Vendor[] = [
  { id: '1', name: 'Legrand France', contact: 'Pierre Martin', email: 'contact@legrand.fr', phone: '01 23 45 67 89', address: 'Paris, France', rating: 4.8, totalOrders: 45, totalSpent: 125000, status: 'active' },
  { id: '2', name: 'Schneider Electric', contact: 'Marie Dubois', email: 'pro@schneider.fr', phone: '01 98 76 54 32', address: 'Rueil-Malmaison, France', rating: 4.6, totalOrders: 38, totalSpent: 98000, status: 'active' },
  { id: '3', name: 'Nexans', contact: 'Jean Bernard', email: 'france@nexans.com', phone: '01 45 67 89 01', address: 'Lyon, France', rating: 4.5, totalOrders: 22, totalSpent: 76000, status: 'active' },
];

export default function AdminVendors() {
  const [search, setSearch] = useState('');

  const filtered = mockVendors.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Building2 size={28} className="text-[#D4A853]" />
          Fournisseurs
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110 transition-all">
          <Plus size={18} />
          Ajouter
        </button>
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Rechercher un fournisseur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 bg-[#141415] border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4A853]"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((vendor) => (
          <div key={vendor.id} className="bg-[#141415] rounded-xl p-5 border border-white/10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#D4A853]/20 rounded-lg flex items-center justify-center">
                <Building2 size={24} className="text-[#D4A853]" />
              </div>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-[#D4A853] fill-[#D4A853]" />
                <span className="text-sm text-white">{vendor.rating}</span>
              </div>
            </div>
            <h3 className="text-white font-semibold mb-1">{vendor.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{vendor.contact}</p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400 flex items-center gap-2">
                <Mail size={14} /> {vendor.email}
              </p>
              <p className="text-gray-400 flex items-center gap-2">
                <Phone size={14} /> {vendor.phone}
              </p>
              <p className="text-gray-400 flex items-center gap-2">
                <MapPin size={14} /> {vendor.address}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Commandes</p>
                <p className="text-white font-semibold">{vendor.totalOrders}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Total achats</p>
                <p className="text-[#D4A853] font-semibold">{vendor.totalSpent.toLocaleString()}€</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
