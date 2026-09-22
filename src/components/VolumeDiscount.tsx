import { useState } from 'react';
import { TrendingDown, Info } from 'lucide-react';

interface Tier {
  min: number;
  discount: number;
  label: string;
}

interface VolumeDiscountProps {
  tiers: Tier[];
  currentQty: number;
  unitPrice: number;
}

export default function VolumeDiscount({ tiers, currentQty, unitPrice }: VolumeDiscountProps) {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);

  const sortedTiers = [...tiers].sort((a, b) => a.min - b.min);
  const currentTier = sortedTiers.filter(t => currentQty >= t.min).pop();
  const nextTier = sortedTiers.find(t => currentQty < t.min);

  return (
    <div className="bg-[#141415] rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <TrendingDown size={18} className="text-[#D4A853]" />
        <h3 className="text-white font-semibold">Remises par volume</h3>
      </div>

      <div className="space-y-2">
        {sortedTiers.map((tier, index) => {
          const isActive = currentQty >= tier.min;
          const isNext = nextTier?.min === tier.min;
          const discountedPrice = unitPrice * (1 - tier.discount / 100);

          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredTier(index)}
              onMouseLeave={() => setHoveredTier(null)}
              className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                isActive ? 'bg-[#D4A853]/10 border border-[#D4A853]/30' :
                isNext ? 'bg-white/5 border border-dashed border-white/20' :
                'bg-[#0A0A0B] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isActive ? 'bg-[#D4A853] text-[#0A0A0B]' : 'bg-[#1C1C1E] text-gray-500'
                }`}>
                  {isActive ? '✓' : index + 1}
                </div>
                <div>
                  <p className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>
                    {tier.label}
                  </p>
                  {hoveredTier === index && (
                    <p className="text-xs text-[#D4A853]">{discountedPrice.toFixed(2)}€ HT / unité</p>
                  )}
                </div>
              </div>
              <span className={`text-sm font-bold ${isActive ? 'text-[#D4A853]' : 'text-gray-500'}`}>
                -{tier.discount}%
              </span>
            </div>
          );
        })}
      </div>

      {nextTier && (
        <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
          <Info size={12} />
          Plus que {nextTier.min - currentQty} unité(s) pour obtenir -{nextTier.discount}%
        </p>
      )}

      {currentTier && (
        <p className="text-xs text-green-400 mt-3">
          Vous bénéficiez actuellement de -{currentTier.discount}% de remise
        </p>
      )}
    </div>
  );
}
