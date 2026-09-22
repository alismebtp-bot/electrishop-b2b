import { useState } from 'react';
import { Truck, MapPin, Clock, CheckCircle, Package, Route, Calendar } from 'lucide-react';

interface Delivery {
  id: string;
  orderId: string;
  customer: string;
  address: string;
  driver: string;
  vehicle: string;
  status: 'preparing' | 'ready' | 'in_transit' | 'delivered';
  scheduledDate: string;
  eta?: string;
}

const mockDeliveries: Delivery[] = [
  { id: 'LIV-001', orderId: 'CMD-2026-001234', customer: 'Elec Pro Paris', address: '12 Rue de Paris, 75001', driver: 'Ahmed Benali', vehicle: 'Renault Master', status: 'in_transit', scheduledDate: '2026-06-15', eta: '14:30' },
  { id: 'LIV-002', orderId: 'CMD-2026-001233', customer: 'Bâtiment Confort', address: '45 Avenue Lyon, 69001', driver: 'Jean Dupont', vehicle: 'Peugeot Boxer', status: 'ready', scheduledDate: '2026-06-15' },
  { id: 'LIV-003', orderId: 'CMD-2026-001232', customer: 'SARL Élec 91', address: '78 Bd Marseille, 13001', driver: 'Non assigné', vehicle: 'Non assigné', status: 'preparing', scheduledDate: '2026-06-16' },
];

const statusConfig = {
  preparing: { label: 'En préparation', color: 'bg-yellow-500/20 text-yellow-400', icon: Package },
  ready: { label: 'Prête', color: 'bg-blue-500/20 text-blue-400', icon: CheckCircle },
  in_transit: { label: 'En transit', color: 'bg-purple-500/20 text-purple-400', icon: Truck },
  delivered: { label: 'Livrée', color: 'bg-green-500/20 text-green-400', icon: CheckCircle },
};

export default function AdminDelivery() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? mockDeliveries
    : mockDeliveries.filter(d => d.status === filter);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Truck size={28} className="text-[#D4A853]" />
          Livraisons
        </h1>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'Toutes' },
          { id: 'preparing', label: 'En préparation' },
          { id: 'ready', label: 'Prêtes' },
          { id: 'in_transit', label: 'En transit' },
          { id: 'delivered', label: 'Livrées' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              filter === f.id ? 'bg-[#D4A853] text-[#0A0A0B]' : 'bg-[#1C1C1E] text-gray-400 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((delivery) => {
          const config = statusConfig[delivery.status];
          return (
            <div key={delivery.id} className="bg-[#141415] rounded-xl p-5 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-semibold">{delivery.id}</span>
                <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${config.color}`}>
                  <config.icon size={14} />
                  {config.label}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400"><span className="text-gray-500">Commande:</span> {delivery.orderId}</p>
                <p className="text-gray-400"><span className="text-gray-500">Client:</span> {delivery.customer}</p>
                <p className="text-gray-400 flex items-center gap-1">
                  <MapPin size={14} /> {delivery.address}
                </p>
                <p className="text-gray-400"><span className="text-gray-500">Chauffeur:</span> {delivery.driver}</p>
                <p className="text-gray-400"><span className="text-gray-500">Véhicule:</span> {delivery.vehicle}</p>
                <p className="text-gray-400 flex items-center gap-1">
                  <Calendar size={14} /> {delivery.scheduledDate}
                </p>
                {delivery.eta && (
                  <p className="text-gray-400 flex items-center gap-1">
                    <Clock size={14} /> ETA: {delivery.eta}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
