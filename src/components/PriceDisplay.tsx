interface PriceDisplayProps {
  priceHT: number;
  oldPriceHT?: number;
  vatRate?: number;
  showTTC?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function PriceDisplay({ priceHT, oldPriceHT, vatRate = 20, showTTC = true, size = 'md' }: PriceDisplayProps) {
  const priceTTC = priceHT * (1 + vatRate / 100);
  const oldPriceTTC = oldPriceHT ? oldPriceHT * (1 + vatRate / 100) : null;

  const sizeClasses = {
    sm: { price: 'text-lg', old: 'text-sm' },
    md: { price: 'text-xl', old: 'text-base' },
    lg: { price: 'text-3xl', old: 'text-xl' },
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-baseline gap-2">
        <span className={`${sizeClasses[size].price} font-bold text-[#D4A853]`}>
          {priceHT.toFixed(2)}€ HT
        </span>
        {oldPriceHT && (
          <span className={`${sizeClasses[size].old} text-gray-500 line-through`}>
            {oldPriceHT.toFixed(2)}€ HT
          </span>
        )}
      </div>
      {showTTC && (
        <span className="text-sm text-gray-500">
          {priceTTC.toFixed(2)}€ TTC
        </span>
      )}
    </div>
  );
}
