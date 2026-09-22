import { useState } from 'react';
import { Route, MapPin, Truck, Clock, ArrowRight, Plus, Trash2 } from 'lucide-react';

interface Stop {
  id: string;
  address: string;
  customer: string;
  orderId: string;
  estimatedTime: string;
}

interface RoutePlan {
  id: string;
  name: string;
  driver: string;
  vehicle: string;
  date: string;
  stops: Stop[];
  totalDistance: string;
  estimatedDuration: string;
}

const mockRoutes: RoutePlan[] = [
  {
    id: 'ROUTE-001',
    name: 'Tournée Paris Centre',
    driver: 'Ahmed Benali',
    vehicle: 'Renault Master',
    date: '2026-06-15',
    stops: [
      { id: '1', address: '12 Rue de Paris, 75001', customer: 'Elec Pro Paris', orderId: 'CMD-2026-001234', estimatedTime: '09:30' },
      { id: '2', address: '45 Avenue de l\'Opéra, 75002', customer: 'Pro Facility', orderId: 'CMD-2026-001231', estimatedTime: '10:15' },
      { id: '3', address: '78 Bd Haussmann, 75008', customer: 'Bâtiment Confort', orderId: 'CMD-2026-001233', estimatedTime: '11:00' },
    ],
    totalDistance: '24 km',
    estimatedDuration: '2h30',
  },
];

export default function DeliveryRoute() {
  const [routes] = useState<RoutePlan[]>(mockRoutes);
  const [selectedRoute, setSelectedRoute] = useState<RoutePlan | null>(mockRoutes[0]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Route size={28} className="text-[#D4A853]" />
          Tournées
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110 transition-all">
          <Plus size={18} />
          Nouvelle tournée
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Tournées planifiées</h3>
          {routes.map((route) => (
            <div
              key={route.id}
              onClick={() => setSelectedRoute(route)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedRoute?.id === route.id
                  ? 'bg-[#D4A853]/10 border-[#D4A853]/30'
                  : 'bg-[#141415] border-white/10 hover:border-white/20'
              }`}
            >
              <p className="text-white font-semibold">{route.name}</p>
              <p className="text-sm text-gray-500">{route.driver} — {route.vehicle}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1"><MapPin size={12} /> {route.stops.length} arrêts</span>
                <span className="flex items-center gap-1"><Route size={12} /> {route.totalDistance}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {route.estimatedDuration}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2">
          {selectedRoute && (
            <div className="bg-[#141415] rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">{selectedRoute.name}</h3>
                  <p className="text-sm text-gray-500">{selectedRoute.date} — {selectedRoute.driver}</p>
                </div>
                <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-4">
                {selectedRoute.stops.map((stop, index) => (
                  <div key={stop.id} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-[#D4A853] text-[#0A0A0B] rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      {index < selectedRoute.stops.length - 1 && (
                        <div className="w-0.5 h-12 bg-[#D4A853]/30 mt-1" />
                      )}
                    </div>
                    <div className="flex-1 p-4 bg-[#0A0A0B] rounded-lg">
                      <div className="flex items-center justify-between">
                        <p className="text-white font-medium">{stop.customer}</p>
                        <span className="text-xs text-[#D4A853]">{stop.estimatedTime}</span>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin size={14} /> {stop.address}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{stop.orderId}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
