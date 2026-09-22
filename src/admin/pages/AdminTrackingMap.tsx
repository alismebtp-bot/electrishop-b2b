import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { MapPin, Truck, Clock, Navigation } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Delivery {
  id: string;
  driver: string;
  vehicle: string;
  status: 'in_transit' | 'delivered' | 'pending';
  currentLocation: [number, number];
  destination: [number, number];
  eta: string;
  progress: number;
}

const mockDeliveries: Delivery[] = [
  {
    id: 'LIV-001',
    driver: 'Ahmed Benali',
    vehicle: 'Renault Master',
    status: 'in_transit',
    currentLocation: [48.8566, 2.3522],
    destination: [48.8589, 2.3470],
    eta: '14:30',
    progress: 65,
  },
  {
    id: 'LIV-002',
    driver: 'Jean Dupont',
    vehicle: 'Peugeot Boxer',
    status: 'pending',
    currentLocation: [48.8600, 2.3400],
    destination: [48.8650, 2.3300],
    eta: '15:45',
    progress: 0,
  },
];

export default function AdminTrackingMap() {
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(mockDeliveries[0]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-3">
        <MapPin size={28} className="text-[#D4A853]" />
        Suivi GPS
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-[#141415] rounded-xl border border-white/10 overflow-hidden h-[500px]">
            <MapContainer
              center={[48.8566, 2.3522]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              {mockDeliveries.map((delivery) => (
                <Marker key={delivery.id} position={delivery.currentLocation}>
                  <Popup>
                    <div className="text-sm">
                      <p className="font-bold">{delivery.driver}</p>
                      <p>{delivery.vehicle}</p>
                      <p>ETA: {delivery.eta}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Livraisons en cours</h3>
          {mockDeliveries.map((delivery) => (
            <div
              key={delivery.id}
              onClick={() => setSelectedDelivery(delivery)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedDelivery?.id === delivery.id
                  ? 'bg-[#D4A853]/10 border-[#D4A853]/30'
                  : 'bg-[#141415] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{delivery.id}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  delivery.status === 'in_transit' ? 'bg-blue-500/20 text-blue-400' :
                  delivery.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {delivery.status === 'in_transit' ? 'En transit' :
                   delivery.status === 'delivered' ? 'Livrée' : 'En attente'}
                </span>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-gray-400 flex items-center gap-2">
                  <Truck size={14} /> {delivery.driver} — {delivery.vehicle}
                </p>
                <p className="text-gray-400 flex items-center gap-2">
                  <Clock size={14} /> ETA: {delivery.eta}
                </p>
              </div>
              <div className="mt-3">
                <div className="h-2 bg-[#0A0A0B] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#D4A853] rounded-full transition-all"
                    style={{ width: `${delivery.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{delivery.progress}% complété</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
