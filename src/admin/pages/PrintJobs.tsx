import { useState } from 'react';
import { Printer, FileText, Clock, CheckCircle, XCircle, Eye, Download } from 'lucide-react';

interface PrintJob {
  id: string;
  document: string;
  type: 'quote' | 'invoice' | 'label' | 'report';
  status: 'pending' | 'printing' | 'completed' | 'failed';
  printer: string;
  pages: number;
  createdAt: string;
}

const mockJobs: PrintJob[] = [
  { id: 'PRT-001', document: 'Devis DEV-2026-00120', type: 'quote', status: 'completed', printer: 'Brother HL-L8360', pages: 2, createdAt: '2026-06-15 10:30' },
  { id: 'PRT-002', document: 'Facture CMD-2026-001234', type: 'invoice', status: 'completed', printer: 'Brother HL-L8360', pages: 1, createdAt: '2026-06-15 11:15' },
  { id: 'PRT-003', document: 'Étiquettes stock', type: 'label', status: 'pending', printer: 'Zebra ZD421', pages: 50, createdAt: '2026-06-15 14:00' },
];

const statusConfig = {
  pending: { label: 'En attente', color: 'bg-yellow-500/20 text-yellow-400', icon: Clock },
  printing: { label: 'Impression', color: 'bg-blue-500/20 text-blue-400', icon: Printer },
  completed: { label: 'Terminé', color: 'bg-green-500/20 text-green-400', icon: CheckCircle },
  failed: { label: 'Échec', color: 'bg-red-500/20 text-red-400', icon: XCircle },
};

const typeConfig = {
  quote: { label: 'Devis', color: 'text-blue-400' },
  invoice: { label: 'Facture', color: 'text-green-400' },
  label: { label: 'Étiquette', color: 'text-purple-400' },
  report: { label: 'Rapport', color: 'text-yellow-400' },
};

export default function PrintJobs() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? mockJobs
    : mockJobs.filter(j => j.status === filter);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-3">
        <Printer size={28} className="text-[#D4A853]" />
        Impressions
      </h1>

      <div className="flex gap-2">
        {['all', 'pending', 'printing', 'completed', 'failed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f ? 'bg-[#D4A853] text-[#0A0A0B]' : 'bg-[#1C1C1E] text-gray-400 hover:text-white'
            }`}
          >
            {f === 'all' ? 'Toutes' : statusConfig[f as keyof typeof statusConfig]?.label || f}
          </button>
        ))}
      </div>

      <div className="bg-[#141415] rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Document</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Type</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Imprimante</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Pages</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Statut</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Date</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((job) => {
              const config = statusConfig[job.status];
              const typeInfo = typeConfig[job.type];
              return (
                <tr key={job.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4">
                    <p className="text-white font-medium">{job.document}</p>
                    <p className="text-xs text-gray-500">{job.id}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-sm ${typeInfo.color}`}>{typeInfo.label}</span>
                  </td>
                  <td className="px-4 py-4 text-gray-400">{job.printer}</td>
                  <td className="px-4 py-4 text-gray-400">{job.pages}</td>
                  <td className="px-4 py-4">
                    <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full w-fit ${config.color}`}>
                      <config.icon size={14} />
                      {config.label}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-400">{job.createdAt}</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button className="text-gray-500 hover:text-white"><Eye size={16} /></button>
                      <button className="text-gray-500 hover:text-white"><Download size={16} /></button>
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
