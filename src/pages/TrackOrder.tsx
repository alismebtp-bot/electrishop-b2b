import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Search, Truck, Package, CheckCircle, Clock, MapPin,
  ArrowLeft, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const trackingSteps = [
  { status: "pending", label: "Commande reçue", icon: Clock },
  { status: "processing", label: "En préparation", icon: Package },
  { status: "shipped", label: "Expédiée", icon: Truck },
  { status: "delivered", label: "Livrée", icon: CheckCircle },
];

const demoTracking = {
  "TRK-123456": {
    orderId: "CMD-123456",
    status: "shipped",
    carrier: "Chronopost",
    estimatedDelivery: "2024-12-28",
    currentLocation: "Centre de tri Paris",
    history: [
      { date: "2024-12-24T10:00:00Z", status: "pending", label: "Commande confirmée" },
      { date: "2024-12-24T14:00:00Z", status: "processing", label: "En préparation" },
      { date: "2024-12-25T08:00:00Z", status: "shipped", label: "Expédiée - Centre de tri Paris" },
    ],
  },
};

export default function TrackOrder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [trackingNumber, setTrackingNumber] = useState(searchParams.get("n") || "");
  const [result, setResult] = useState<typeof demoTracking[keyof typeof demoTracking] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setSearched(true);
    const normalized = trackingNumber.toUpperCase().trim();
    if (demoTracking[normalized as keyof typeof demoTracking]) {
      setResult(demoTracking[normalized as keyof typeof demoTracking]);
    } else {
      setResult(null);
    }
  };

  const currentStepIndex = trackingSteps.findIndex((s) => s.status === result?.status);

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/account?tab=orders">
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} className="mr-2" />
              Retour
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">Suivi de commande</h1>
        </div>

        <Card className="bg-[#141415] border-white/10 mb-8">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <Input
                placeholder="Numéro de suivi (ex: TRK-123456)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
              />
              <Button className="bg-[#D4A853] text-[#0A0A0B]" onClick={handleSearch}>
                <Search size={16} className="mr-2" />
                Suivre
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Essayez "TRK-123456" pour voir un exemple de suivi
            </p>
          </CardContent>
        </Card>

        {searched && !result && (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Numéro non trouvé</h3>
            <p className="text-gray-500">
              Vérifiez votre numéro de suivi ou contactez notre service client.
            </p>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            {/* Status Overview */}
            <Card className="bg-[#141415] border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Commande {result.orderId}</CardTitle>
                  <Badge variant="outline" className="text-[#D4A853] border-[#D4A853]/30">
                    {result.status === "delivered" ? "Livrée" :
                     result.status === "shipped" ? "En cours de livraison" :
                     result.status === "processing" ? "En préparation" : "En attente"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8">
                  {trackingSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    return (
                      <div key={step.status} className="flex flex-col items-center flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                          isActive ? "bg-[#D4A853] text-[#0A0A0B]" :
                          "bg-[#1C1C1E] text-gray-600"
                        } ${isCurrent ? "ring-2 ring-[#D4A853] ring-offset-2 ring-offset-[#0A0A0B]" : ""}`}>
                          <Icon size={18} />
                        </div>
                        <span className={`text-xs ${isActive ? "text-white" : "text-gray-600"}`}>
                          {step.label}
                        </span>
                        {index < trackingSteps.length - 1 && (
                          <div className={`h-0.5 w-full mt-4 absolute left-0 top-5 ${
                            index < currentStepIndex ? "bg-[#D4A853]" : "bg-[#1C1C1E]"
                          }`} style={{ position: "relative" }} />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#1C1C1E] rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Transporteur</p>
                    <p className="text-sm font-medium text-white">{result.carrier}</p>
                  </div>
                  <div className="bg-[#1C1C1E] rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Livraison estimée</p>
                    <p className="text-sm font-medium text-white">
                      {new Date(result.estimatedDelivery).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <div className="bg-[#1C1C1E] rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Localisation</p>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-[#D4A853]" />
                      <p className="text-sm font-medium text-white">{result.currentLocation}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* History */}
            <Card className="bg-[#141415] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Historique</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {result.history.map((event, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#D4A853]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={14} className="text-[#D4A853]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white">{event.label}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(event.date).toLocaleString("fr-FR")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
