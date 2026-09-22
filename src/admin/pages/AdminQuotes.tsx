import { useState } from 'react';
import { FileText, Search, Plus, Download, Send, Eye } from 'lucide-react';

interface Quote {
  id: string;
  customer: string;
  date: string;
  totalHT: number;
  totalTTC: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  validUntil: string;
}

const mockQuotes: Quote[] = [
  { id: 'DEV-2026-00120', customer: 'Elec Pro Paris', date: '2026-06-15', totalHT: 5000.00, totalTTC: 6000.00, status: 'sent', validUntil: '2026-07-15' },
  { id: 'DEV-2026-00119', customer: 'Bâtiment Confort', date: '2026-06-10', totalHT: 3200.50, totalTTC: 3840.60, status: 'accepted', validUntil: '2026-07-10' },
  { id: 'DEV-2026-00118', customer: 'SARL Élec 91', date: '2026-06-05', totalHT: 1890.00, totalTTC: 2268.00, status: 'draft', validUntil: '2026-07-05' },
];

const statusConfig = {
  draft: { label: 'Brouillon', color: 'bg-gray-500/20 text-gray-400' },
  sent: { label: 'Envoyé', color: 'bg-blue-500/20 text-blue-400' },
  accepted: { label: 'Accepté', color: 'bg-green-500/20 text-green-400' },
  rejected: { label: 'Refusé', color: 'bg-red-500/20 text-red-400' },
  expired: { label: 'Expiré', color: 'bg-yellow-500/20 text-yellow-400' },
};

export default function AdminQuotes() {
  const [search, setSearch] = useState('');

  const filtered = mockQuotes.filter(q =>
    q.id.toLowerCase().includes(search.toLowerCase()) ||
    q.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <FileText size={28} className="text-[#D4A853]" />
          Devis
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110 transition-all">
          <Plus size={18} />
          Nouveau devis
        </button>
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Rechercher un devis..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 bg-[#141415] border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4A853]"
        />
      </div>

      <div className="bg-[#141415] rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Devis</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Client</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Date</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Total TTC</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Statut</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Valide jusqu'au</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((quote) => {
              const config = statusConfig[quote.status];
              return (
                <tr key={quote.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4 text-white font-medium">{quote.id}</td>
                  <td className="px-4 py-4 text-white">{quote.customer}</td>
                  <td className="px-4 py-4 text-gray-400">{quote.date}</td>
                  <td className="px-4 py-4 text-[#D4A853] font-semibold">{quote.totalTTC.toFixed(2)}€</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${config.color}`}>
                      {config.label}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-400">{quote.validUntil}</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button className="text-gray-500 hover:text-white transition-colors"><Eye size={16} /></button>
                      <button className="text-gray-500 hover:text-blue-400 transition-colors"><Send size={16} /></button>
                      <button className="text-gray-500 hover:text-green-400 transition-colors"><Download size={16} /></button>
                    </div>
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
