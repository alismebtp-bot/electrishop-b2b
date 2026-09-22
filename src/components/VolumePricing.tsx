import { useState } from 'react';
import { BarChart3, Minus, Plus } from 'lucide-react';

interface VolumeTier {
  qty: number;
  unitPrice: number;
  total: number;
}

interface VolumePricingProps {
  basePrice: number;
  tiers: { qty: number; discount: number }[];
}

export default function VolumePricing({ basePrice, tiers }: VolumePricingProps) {
  const [quantity, setQuantity] = useState(1);

  const calculatePrice = (qty: number) => {
    const applicableTier = [...tiers].reverse().find(t => qty >= t.qty);
    const discount = applicableTier?.discount || 0;
    return basePrice * (1 - discount / 100);
  };

  const unitPrice = calculatePrice(quantity);
  const total = unitPrice * quantity;

  const volumeTiers: VolumeTier[] = tiers.map(t => ({
    qty: t.qty,
    unitPrice: basePrice * (1 - t.discount / 100),
    total: basePrice * (1 - t.discount / 100) * t.qty,
  }));

  return (
    <div className="bg-[#141415] rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={18} className="text-[#D4A853]" />
        <h3 className="text-white font-semibold">Tarification volume</h3>
      </div>

      <div className="flex items-center gap-4 mb-4 p-3 bg-[#0A0A0B] rounded-lg">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-8 h-8 bg-[#1C1C1E] rounded flex items-center justify-center text-gray-400 hover:text-white"
        >
          <Minus size={14} />
        </button>
        <span className="text-white font-semibold w-8 text-center">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="w-8 h-8 bg-[#1C1C1E] rounded flex items-center justify-center text-gray-400 hover:text-white"
        >
          <Plus size={14} />
        </button>
        <div className="flex-1 text-right">
          <p className="text-[#D4A853] font-bold">{total.toFixed(2)}€ HT</p>
          <p className="text-xs text-gray-500">{unitPrice.toFixed(2)}€ HT / unité</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 mb-1">
          <span>Quantité</span>
          <span>Prix unitaire</span>
          <span className="text-right">Total</span>
        </div>
        {volumeTiers.map((tier, i) => {
          const isActive = quantity >= tier.qty;
          return (
            <div
              key={i}
              className={`grid grid-cols-3 gap-2 p-2 rounded text-sm ${
                isActive ? 'bg-[#D4A853]/10 text-[#D4A853]' : 'text-gray-400'
              }`}
            >
              <span>{tier.qty}+</span>
              <span>{tier.unitPrice.toFixed(2)}€ HT</span>
              <span className="text-right">{tier.total.toFixed(2)}€ HT</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
