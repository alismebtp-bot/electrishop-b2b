import { Printer, CheckCircle, AlertCircle } from 'lucide-react';

interface PrinterDevice {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'error';
  type: 'thermal' | 'laser' | 'inkjet';
  lastUsed?: string;
}

const mockPrinters: PrinterDevice[] = [
  { id: '1', name: 'Imprimante Thermique XP-80', status: 'online', type: 'thermal', lastUsed: 'Il y a 2 min' },
  { id: '2', name: 'Brother HL-L2370', status: 'online', type: 'laser', lastUsed: 'Il y a 1h' },
  { id: '3', name: 'Epson TM-T20III', status: 'error', type: 'thermal' },
];

export default function PrinterStatus() {
  return (
    <div className="bg-[#141415] rounded-xl p-6 border border-white/10">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Printer size={20} className="text-[#D4A853]" />
        État des imprimantes
      </h3>
      <div className="space-y-3">
        {mockPrinters.map((printer) => (
          <div key={printer.id} className="flex items-center justify-between p-3 bg-[#0A0A0B] rounded-lg">
            <div className="flex items-center gap-3">
              {printer.status === 'online' && <CheckCircle size={18} className="text-green-400" />}
              {printer.status === 'error' && <AlertCircle size={18} className="text-red-400" />}
              <div>
                <p className="text-sm font-medium text-white">{printer.name}</p>
                <p className="text-xs text-gray-500">{printer.type.toUpperCase()}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`
                text-xs px-2 py-1 rounded-full
                ${printer.status === 'online' ? 'bg-green-500/20 text-green-400' : ''}
                ${printer.status === 'offline' ? 'bg-gray-500/20 text-gray-400' : ''}
                ${printer.status === 'error' ? 'bg-red-500/20 text-red-400' : ''}
              `}>
                {printer.status}
              </span>
              {printer.lastUsed && (
                <p className="text-xs text-gray-500 mt-1">{printer.lastUsed}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
