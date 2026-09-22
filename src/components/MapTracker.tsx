import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { MapPin, Navigation, Clock } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface TrackingData {
  currentLocation: [number, number];
  destination: [number, number];
  driverName: string;
  eta: string;
  status: string;
}

interface MapTrackerProps {
  trackingData?: TrackingData;
}

export default function MapTracker({ trackingData }: MapTrackerProps) {
  const [position, setPosition] = useState<[number, number]>([48.8566, 2.3522]);

  useEffect(() => {
    if (trackingData?.currentLocation) {
      setPosition(trackingData.currentLocation);
    }
  }, [trackingData]);

  const defaultData: TrackingData = {
    currentLocation: [48.8566, 2.3522],
    destination: [48.8589, 2.3470],
    driverName: 'Ahmed Benali',
    eta: '14:30',
    status: 'En transit',
  };

  const data = trackingData || defaultData;

  return (
    <div className="bg-[#141415] rounded-xl border border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">Suivi en temps réel</h3>
          <p className="text-sm text-gray-500">Chauffeur: {data.driverName}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-[#D4A853]">
            <Clock size={14} />
            <span className="text-sm font-medium">ETA: {data.eta}</span>
          </div>
          <span className="text-xs text-gray-500">{data.status}</span>
        </div>
      </div>
      <div className="h-[300px]">
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap'
          />
          <Marker position={data.currentLocation}>
            <Popup>Position actuelle du livreur</Popup>
          </Marker>
          <Marker position={data.destination}>
            <Popup>Destination</Popup>
          </Marker>
          <Polyline
            positions={[data.currentLocation, data.destination]}
            color="#D4A853"
            dashArray="5, 10"
          />
        </MapContainer>
      </div>
    </div>
  );
}
