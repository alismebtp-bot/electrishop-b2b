import { useState } from 'react';
import { Printer, Settings, Plus, Trash2, TestTube, CheckCircle } from 'lucide-react';

interface Printer {
  id: string;
  name: string;
  model: string;
  connection: 'usb' | 'network' | 'bluetooth';
  status: 'online' | 'offline' | 'error';
  paperSize: string;
  isDefault: boolean;
}

const mockPrinters: Printer[] = [
  { id: '1', name: 'Imprimante bureau', model: 'Brother HL-L8360CDW', connection: 'network', status: 'online', paperSize: 'A4', isDefault: true },
  { id: '2', name: 'Étiquettes stock', model: 'Zebra ZD421', connection: 'usb', status: 'online', paperSize: '100x150mm', isDefault: false },
  { id: '3', name: 'Ticket caisse', model: 'Epson TM-T20III', connection: 'usb', status: 'offline', paperSize: '80mm', isDefault: false },
];

export default function PrinterSetup() {
  const [printers, setPrinters] = useState<Printer[]>(mockPrinters);
  const [showAdd, setShowAdd] = useState(false);
  const [newPrinter, setNewPrinter] = useState({ name: '', model: '', connection: 'network' as const, paperSize: 'A4' });

  const handleTestPrint = (id: string) => {
    alert(`Test d'impression envoyé à l'imprimante ${id}`);
  };

  const handleDelete = (id: string) => {
    setPrinters(printers.filter(p => p.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setPrinters(printers.map(p => ({ ...p, isDefault: p.id === id })));
  };

  const handleAdd = () => {
    if (!newPrinter.name || !newPrinter.model) return;
    const printer: Printer = {
      id: Date.now().toString(),
      name: newPrinter.name,
      model: newPrinter.model,
      connection: newPrinter.connection,
      status: 'online',
      paperSize: newPrinter.paperSize,
      isDefault: false,
    };
    setPrinters([...printers, printer]);
    setShowAdd(false);
    setNewPrinter({ name: '', model: '', connection: 'network', paperSize: 'A4' });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Printer size={28} className="text-[#D4A853]" />
          Imprimantes
        </h1>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-4 py-2 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110 transition-all"
        >
          <Plus size={18} />
          Ajouter
        </button>
      </div>

      {showAdd && (
        <div className="bg-[#141415] rounded-xl p-6 border border-white/10 space-y-4">
          <h3 className="text-lg font-semibold text-white">Nouvelle imprimante</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Nom</label>
              <input
                type="text"
                value={newPrinter.name}
                onChange={(e) => setNewPrinter({ ...newPrinter, name: e.target.value })}
                className="w-full h-11 px-4 bg-[#0A0A0B] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4A853]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Modèle</label>
              <input
                type="text"
                value={newPrinter.model}
                onChange={(e) => setNewPrinter({ ...newPrinter, model: e.target.value })}
                className="w-full h-11 px-4 bg-[#0A0A0B] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4A853]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Connexion</label>
              <select
                value={newPrinter.connection}
                onChange={(e) => setNewPrinter({ ...newPrinter, connection: e.target.value as 'usb' | 'network' | 'bluetooth' })}
                className="w-full h-11 px-4 bg-[#0A0A0B] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4A853]"
              >
                <option value="network">Réseau</option>
                <option value="usb">USB</option>
                <option value="bluetooth">Bluetooth</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Format papier</label>
              <input
                type="text"
                value={newPrinter.paperSize}
                onChange={(e) => setNewPrinter({ ...newPrinter, paperSize: e.target.value })}
                className="w-full h-11 px-4 bg-[#0A0A0B] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4A853]"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleAdd} className="px-6 py-2 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110">
              Ajouter
            </button>
            <button onClick={() => setShowAdd(false)} className="px-6 py-2 bg-[#1C1C1E] text-gray-400 rounded-lg hover:text-white">
              Annuler
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {printers.map((printer) => (
          <div key={printer.id} className="bg-[#141415] rounded-xl p-5 border border-white/10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#D4A853]/20 rounded-lg flex items-center justify-center">
                <Printer size={24} className="text-[#D4A853]" />
              </div>
              {printer.isDefault && (
                <span className="text-xs px-2 py-1 bg-[#D4A853]/20 text-[#D4A853] rounded-full">
                  Par défaut
                </span>
              )}
            </div>
            <h3 className="text-white font-semibold">{printer.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{printer.model}</p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400"><span className="text-gray-500">Connexion:</span> {printer.connection.toUpperCase()}</p>
              <p className="text-gray-400"><span className="text-gray-500">Format:</span> {printer.paperSize}</p>
              <p className="flex items-center gap-2">
                <span className="text-gray-500">Statut:</span>
                <span className={`flex items-center gap-1 ${printer.status === 'online' ? 'text-green-400' : printer.status === 'error' ? 'text-red-400' : 'text-gray-400'}`}>
                  <span className={`w-2 h-2 rounded-full ${printer.status === 'online' ? 'bg-green-400' : printer.status === 'error' ? 'bg-red-400' : 'bg-gray-400'}`} />
                  {printer.status === 'online' ? 'En ligne' : printer.status === 'error' ? 'Erreur' : 'Hors ligne'}
                </span>
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 flex gap-2">
              <button
                onClick={() => handleTestPrint(printer.id)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[#1C1C1E] text-gray-400 rounded-lg text-sm hover:text-white transition-all"
              >
                <TestTube size={14} />
                Test
              </button>
              {!printer.isDefault && (
                <button
                  onClick={() => handleSetDefault(printer.id)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[#1C1C1E] text-gray-400 rounded-lg text-sm hover:text-white transition-all"
                >
                  <CheckCircle size={14} />
                  Défaut
                </button>
              )}
              <button
                onClick={() => handleDelete(printer.id)}
                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
