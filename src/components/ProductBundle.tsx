import { useState } from 'react';
import { Package, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface BundleItem {
  id: string;
  name: string;
  priceHT: number;
  image: string;
}

interface ProductBundleProps {
  mainProduct: BundleItem;
  accessories: BundleItem[];
  bundleDiscount?: number;
}

export default function ProductBundle({ mainProduct, accessories, bundleDiscount = 10 }: ProductBundleProps) {
  const { dispatch } = useCart();
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(true);

  const toggleAccessory = (id: string) => {
    setSelectedAccessories(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const selectedItems = accessories.filter(a => selectedAccessories.includes(a.id));
  const bundlePrice = mainProduct.priceHT + selectedItems.reduce((sum, a) => sum + a.priceHT, 0);
  const discount = selectedItems.length > 0 ? bundlePrice * (bundleDiscount / 100) : 0;
  const finalPrice = bundlePrice - discount;

  const addBundle = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { id: mainProduct.id, name: mainProduct.name, priceHT: mainProduct.priceHT, image: mainProduct.image, quantity: 1 },
    });
    selectedItems.forEach(item => {
      dispatch({
        type: 'ADD_ITEM',
        payload: { id: item.id, name: item.name, priceHT: item.priceHT * (1 - bundleDiscount / 100), image: item.image, quantity: 1 },
      });
    });
  };

  return (
    <div className="bg-[#141415] rounded-xl border border-white/10 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4"
      >
        <div className="flex items-center gap-2">
          <Package size={20} className="text-[#D4A853]" />
          <h3 className="text-white font-semibold">Pack recommandé</h3>
          <span className="text-xs bg-[#D4A853]/20 text-[#D4A853] px-2 py-0.5 rounded-full">
            -{bundleDiscount}%
          </span>
        </div>
        {expanded ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          <div className="flex items-center gap-3 p-3 bg-[#0A0A0B] rounded-lg">
            <div className="w-12 h-12 bg-[#1C1C1E] rounded-lg overflow-hidden">
              <img src={mainProduct.image} alt={mainProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-medium">{mainProduct.name}</p>
              <p className="text-[#D4A853] text-sm">{mainProduct.priceHT.toFixed(2)}€ HT</p>
            </div>
            <Check size={18} className="text-green-400" />
          </div>

          {accessories.map((accessory) => {
            const selected = selectedAccessories.includes(accessory.id);
            return (
              <button
                key={accessory.id}
                onClick={() => toggleAccessory(accessory.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                  selected ? 'bg-[#D4A853]/10 border border-[#D4A853]/30' : 'bg-[#0A0A0B] border border-transparent'
                }`}
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                  selected ? 'bg-[#D4A853] border-[#D4A853]' : 'border-gray-600'
                }`}>
                  {selected && <Check size={14} className="text-[#0A0A0B]" />}
                </div>
                <div className="w-12 h-12 bg-[#1C1C1E] rounded-lg overflow-hidden">
                  <img src={accessory.image} alt={accessory.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white text-sm">{accessory.name}</p>
                  <p className="text-gray-500 text-xs">
                    {selected ? (
                      <span className="text-[#D4A853]">{(accessory.priceHT * (1 - bundleDiscount / 100)).toFixed(2)}€ HT</span>
                    ) : (
                      `${accessory.priceHT.toFixed(2)}€ HT`
                    )}
                  </p>
                </div>
              </button>
            );
          })}

          {selectedItems.length > 0 && (
            <div className="pt-3 border-t border-white/10">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Prix du pack</span>
                <span className="text-gray-400 line-through">{bundlePrice.toFixed(2)}€ HT</span>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-green-400">Remise ({bundleDiscount}%)</span>
                <span className="text-green-400">-{discount.toFixed(2)}€ HT</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-semibold">Total</span>
                <span className="text-xl font-bold text-[#D4A853]">{finalPrice.toFixed(2)}€ HT</span>
              </div>
            </div>
          )}

          <button
            onClick={addBundle}
            className="w-full h-11 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110 transition-all"
          >
            Ajouter le pack au panier
          </button>
        </div>
      )}
    </div>
  );
}
