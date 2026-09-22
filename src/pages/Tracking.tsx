import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin, Truck, ArrowLeft, Clock, Navigation, Phone, Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Lazy load Leaflet to avoid SSR issues
let L: any = null;

export default function Tracking() {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    import("leaflet").then((leaflet) => {
      if (!mounted) return;
      L = leaflet.default || leaflet;
      require("leaflet/dist/leaflet.css");

      if (mapRef.current && !leafletMap.current) {
        const map = L.map(mapRef.current).setView([48.8566, 2.3522], 12);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap",
        }).addTo(map);

        // Delivery route
        const route = [
          [48.8566, 2.3522],
          [48.86, 2.36],
          [48.865, 2.37],
          [48.87, 2.38],
        ];

        L.polyline(route, { color: "#D4A853", weight: 4 }).addTo(map);

        // Markers
        L.marker([48.8566, 2.3522])
          .addTo(map)
          .bindPopup("Dépôt central");
        L.marker([48.87, 2.38])
          .addTo(map)
          .bindPopup("Destination");

        // Truck icon
        const truckIcon = L.divIcon({
          html: `<div style="background:#D4A853;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#0A0A0B;font-weight:bold;">🚚</div>`,
          className: "",
          iconSize: [32, 32],
        });

        L.marker([48.865, 2.37], { icon: truckIcon })
          .addTo(map)
          .bindPopup("Votre livraison est en route !");

        leafletMap.current = map;
        setMapLoaded(true);
      }
    });

    return () => {
      mounted = false;
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/account?tab=orders">
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} className="mr-2" />
              Retour
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">Suivi GPS</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="bg-[#141415] border-white/10 overflow-hidden">
              <div ref={mapRef} className="h-[500px] w-full" />
              {!mapLoaded && (
                <div className="h-[500px] flex items-center justify-center bg-[#141415]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4A853]" />
                </div>
              )}
            </Card>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <Card className="bg-[#141415] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Truck size={20} className="text-[#D4A853]" />
                  Livraison en cours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">N° commande</span>
                  <span className="text-white font-mono">CMD-123456</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Transporteur</span>
                  <span className="text-white">Chronopost</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Statut</span>
                  <Badge variant="outline" className="text-[#D4A853] border-[#D4A853]/30">
                    En route
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Arrivée estimée</span>
                  <span className="text-white">14:30 - 15:30</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#141415] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-base">Itinéraire</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package size={14} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-white">Colis pris en charge</p>
                    <p className="text-xs text-gray-500">08:15 - Dépôt Paris 11</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#D4A853]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Navigation size={14} className="text-[#D4A853]" />
                  </div>
                  <div>
                    <p className="text-sm text-white">En route vers destination</p>
                    <p className="text-xs text-gray-500">12:45 - Autoroute A3</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={14} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Livraison</p>
                    <p className="text-xs text-gray-600">Estimé: 14:30 - 15:30</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#141415] border-white/10">
              <CardContent className="p-4">
                <p className="text-sm text-white font-medium mb-2">Contact livreur</p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Phone size={14} className="text-[#D4A853]" />
                  06 12 34 56 78
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
