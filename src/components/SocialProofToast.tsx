import { useEffect, useState } from 'react';
import { ShoppingCart, MapPin, X } from 'lucide-react';

interface ProofEvent {
  id: string;
  customer: string;
  location: string;
  product: string;
  time: string;
}

const MOCK_EVENTS: ProofEvent[] = [
  { id: '1', customer: 'Elec Pro Paris', location: 'Paris', product: 'Disjoncteur DNX³ 16A', time: 'Il y a 2 min' },
  { id: '2', customer: 'Bâtiment Confort', location: 'Lyon', product: 'Câble R2V 3G1.5', time: 'Il y a 5 min' },
  { id: '3', customer: 'SARL Élec 91', location: 'Évry', product: 'Ampoule LED E27', time: 'Il y a 8 min' },
  { id: '4', customer: 'Pro Facility', location: 'Marseille', product: 'Outillage électricien', time: 'Il y a 12 min' },
];

export default function SocialProofToast() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const showTimer = setTimeout(() => setVisible(true), 5000);
    const rotateTimer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % MOCK_EVENTS.length);
        setVisible(true);
      }, 300);
    }, 8000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(rotateTimer);
    };
  }, [dismissed]);

  if (dismissed) return null;

  const event = MOCK_EVENTS[current];

  return (
    <div
      className={`fixed bottom-24 left-4 z-40 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="bg-[#141415] border border-white/10 rounded-xl p-4 shadow-xl max-w-xs">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 text-gray-500 hover:text-white"
        >
          <X size={14} />
        </button>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-[#D4A853]/20 rounded-full flex items-center justify-center shrink-0">
            <ShoppingCart size={18} className="text-[#D4A853]" />
          </div>
          <div>
            <p className="text-sm text-white">
              <span className="font-semibold">{event.customer}</span> a commandé
            </p>
            <p className="text-sm text-[#D4A853]">{event.product}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <MapPin size={10} /> {event.location} · {event.time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
