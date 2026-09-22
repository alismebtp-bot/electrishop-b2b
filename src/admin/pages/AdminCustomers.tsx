import { useState } from 'react';
import { Search, Users, Mail, Phone, Building2, Filter, MoreHorizontal } from 'lucide-react';

interface Customer {
  id: string;
  company: string;
  siret: string;
  contact: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
}

const mockCustomers: Customer[] = [
  { id: '1', company: 'Elec Pro Paris', siret: '12345678900010', contact: 'Jean Dupont', email: 'jean@elecpro.fr', phone: '01 23 45 67 89', orders: 12, totalSpent: 15420, status: 'active' },
  { id: '2', company: 'Bâtiment Confort', siret: '98765432100020', contact: 'Marie Martin', email: 'marie@batconfort.fr', phone: '01 98 76 54 32', orders: 8, totalSpent: 8930, status: 'active' },
  { id: '3', company: 'SARL Électricité 91', siret: '45678912300030', contact: 'Pierre Bernard', email: 'pierre@elec91.fr', phone: '01 45 67 89 01', orders: 5, totalSpent: 4230, status: 'inactive' },
];

export default function AdminCustomers() {
  const [search, setSearch] = useState('');
  const [customers] = useState<Customer[]>(mockCustomers);

  const filtered = customers.filter(c =>
    c.company.toLowerCase().includes(search.toLowerCase()) ||
    c.contact.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Users size={28} className="text-[#D4A853]" />
          Clients
        </h1>
        <span className="text-gray-500">{filtered.length} client(s)</span>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher un client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 bg-[#141415] border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4A853]"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#1C1C1E] border border-white/10 rounded-lg text-gray-400 hover:text-white transition-all">
          <Filter size={18} />
          Filtrer
        </button>
      </div>

      <div className="bg-[#141415] rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Entreprise</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Contact</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Commandes</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Total</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Statut</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((customer) => (
              <tr key={customer.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#D4A853]/20 rounded-lg flex items-center justify-center">
                      <Building2 size={18} className="text-[#D4A853]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{customer.company}</p>
                      <p className="text-xs text-gray-500">{customer.siret}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <p className="text-white">{customer.contact}</p>
                  <p className="text-xs text-gray-500">{customer.email}</p>
                </td>
                <td className="px-4 py-4 text-white">{customer.orders}</td>
                <td className="px-4 py-4 text-[#D4A853] font-semibold">{customer.totalSpent.toLocaleString()}€</td>
                <td className="px-4 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    customer.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {customer.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-4 py-4">
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
