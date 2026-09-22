import { Shield, Truck, RotateCcw, Headphones, Clock, Award } from 'lucide-react';

const TRUST_SIGNALS = [
  { icon: Shield, label: 'Paiement sécurisé', description: 'Transactions cryptées SSL' },
  { icon: Truck, label: 'Livraison rapide', description: '24-48h en France' },
  { icon: RotateCcw, label: 'Retour 14 jours', description: 'Satisfait ou remboursé' },
  { icon: Headphones, label: 'Support technique', description: 'Experts à votre écoute' },
  { icon: Clock, label: 'Stock disponible', description: 'Expédition sous 24h' },
  { icon: Award, label: 'Garantie 2 ans', description: 'Sur tous nos produits' },
];

export default function TrustSignals() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {TRUST_SIGNALS.map((signal) => (
        <div key={signal.label} className="flex flex-col items-center text-center p-4">
          <div className="w-12 h-12 bg-[#D4A853]/20 rounded-full flex items-center justify-center mb-3">
            <signal.icon size={22} className="text-[#D4A853]" />
          </div>
          <p className="text-white text-sm font-medium">{signal.label}</p>
          <p className="text-gray-500 text-xs mt-1">{signal.description}</p>
        </div>
      ))}
    </div>
  );
}
