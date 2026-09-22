import { Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const FREE_SHIPPING_THRESHOLD = 200;

export default function FreeShippingBar() {
  const { state } = useCart();
  const totalHT = state.items.reduce((sum, item) => sum + item.priceHT * item.quantity, 0);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - totalHT);
  const progress = Math.min(100, (totalHT / FREE_SHIPPING_THRESHOLD) * 100);

  if (totalHT >= FREE_SHIPPING_THRESHOLD) {
    return (
      <div className="bg-green-500/10 border-b border-green-500/20 py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-green-400 text-sm">
          <Truck size={16} />
          <span>Vous bénéficiez de la <strong>livraison gratuite</strong> !</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#141415] border-b border-white/10 py-2 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-400 flex items-center gap-2">
            <Truck size={16} className="text-[#D4A853]" />
            Livraison gratuite à partir de {FREE_SHIPPING_THRESHOLD}€ HT
          </span>
          <span className="text-[#D4A853] font-medium">Il manque {remaining.toFixed(2)}€</span>
        </div>
        <div className="h-1.5 bg-[#0A0A0B] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#D4A853] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
