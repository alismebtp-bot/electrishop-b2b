import { useState } from 'react';
import { Shield, CheckCircle, AlertTriangle, XCircle, Search, Filter, TrendingUp } from 'lucide-react';

interface QualityCheck {
  id: string;
  productName: string;
  ref: string;
  batch: string;
  date: string;
  status: 'passed' | 'warning' | 'failed';
  inspector: string;
  notes: string;
}

const mockChecks: QualityCheck[] = [
  { id: 'QC-001', productName: 'Disjoncteur DNX³ 16A', ref: 'LEG-0001', batch: 'LOT-2026-A', date: '2026-06-15', status: 'passed', inspector: 'Pierre Martin', notes: 'Conforme aux normes NFC' },
  { id: 'QC-002', productName: 'Câble R2V 3G1.5', ref: 'NXS-0001', batch: 'LOT-2026-B', date: '2026-06-14', status: 'warning', inspector: 'Marie Dubois', notes: 'Épaisseur isolant légèrement inférieure' },
  { id: 'QC-003', productName: 'Ampoule LED E27', ref: 'PHI-0001', batch: 'LOT-2026-C', date: '2026-06-13', status: 'passed', inspector: 'Jean Bernard', notes: 'Luminosité conforme' },
];

const statusConfig = {
  passed: { label: 'Conforme', color: 'bg-green-500/20 text-green-400', icon: CheckCircle },
  warning: { label: 'Avertissement', color: 'bg-yellow-500/20 text-yellow-400', icon: AlertTriangle },
  failed: { label: 'Non conforme', color: 'bg-red-500/20 text-red-400', icon: XCircle },
};

export default function ProductQuality() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = mockChecks.filter(c => {
    const matchesSearch = c.productName.toLowerCase().includes(search.toLowerCase()) ||
                         c.ref.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    passed: mockChecks.filter(c => c.status === 'passed').length,
    warning: mockChecks.filter(c => c.status === 'warning').length,
    failed: mockChecks.filter(c => c.status === 'failed').length,
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-3">
        <Shield size={28} className="text-[#D4A853]" />
        Contrôle qualité
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#141415] rounded-xl p-5 border border-white/10">
          <div className="flex items-center gap-2 text-green-400 mb-2">
            <CheckCircle size={20} />
            <span className="font-medium">Conforme</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.passed}</p>
        </div>
        <div className="bg-[#141415] rounded-xl p-5 border border-white/10">
          <div className="flex items-center gap-2 text-yellow-400 mb-2">
            <AlertTriangle size={20} />
            <span className="font-medium">Avertissements</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.warning}</p>
        </div>
        <div className="bg-[#141415] rounded-xl p-5 border border-white/10">
          <div className="flex items-center gap-2 text-red-400 mb-2">
            <XCircle size={20} />
            <span className="font-medium">Non conforme</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.failed}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher..."
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
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Contrôle</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Produit</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Lot</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Date</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Inspecteur</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Statut</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((check) => {
              const config = statusConfig[check.status];
              return (
                <tr key={check.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4 text-white font-medium">{check.id}</td>
                  <td className="px-4 py-4">
                    <p className="text-white">{check.productName}</p>
                    <p className="text-xs text-gray-500">{check.ref}</p>
                  </td>
                  <td className="px-4 py-4 text-gray-400">{check.batch}</td>
                  <td className="px-4 py-4 text-gray-400">{check.date}</td>
                  <td className="px-4 py-4 text-gray-400">{check.inspector}</td>
                  <td className="px-4 py-4">
                    <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full w-fit ${config.color}`}>
                      <config.icon size={14} />
                      {config.label}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-400 text-sm">{check.notes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
