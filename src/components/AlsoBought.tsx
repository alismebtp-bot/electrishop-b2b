import { useCart } from '@/context/CartContext';
import { ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';

interface AlsoBoughtProps {
  currentProductId: string;
  category: string;
}

// Mock related products - in real app, this would be based on purchase patterns
const getRelatedProducts = (category: string) => {
  const related: Record<string, Array<{id: string; name: string; priceHT: number; image: string; rating: number}>> = {
    'Disjoncteurs': [
      { id: 'r1', name: 'Disjoncteur DNX³ 20A', priceHT: 14.50, image: '/product_1.jpg', rating: 4.8 },
      { id: 'r2', name: 'Disjoncteur DNX³ 32A', priceHT: 16.90, image: '/product_1.jpg', rating: 4.7 },
    ],
    'Câbles': [
      { id: 'r3', name: 'Câble R2V 3G2.5', priceHT: 2.45, image: '/product_2.jpg', rating: 4.6 },
      { id: 'r4', name: 'Gaine ICTA 20mm', priceHT: 1.20, image: '/product_2.jpg', rating: 4.5 },
    ],
  };
  return related[category] || related['Disjoncteurs'];
};

export default function AlsoBought({ currentProductId, category }: AlsoBoughtProps) {
  const { dispatch } = useCart();
  const [added, setAdded] = useState<string | null>(null);
  const products = getRelatedProducts(category);

  const handleAdd = (product: typeof products[0]) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        priceHT: product.priceHT,
        image: product.image,
        quantity: 1,
      },
    });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold text-white mb-6">Les clients ont aussi acheté</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-[#141415] rounded-xl p-4 border border-white/10">
            <div className="aspect-square bg-[#0A0A0B] rounded-lg mb-3 overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <h4 className="text-white font-medium text-sm mb-1">{product.name}</h4>
            <div className="flex items-center gap-1 mb-2">
              <Star size={12} className="text-[#D4A853] fill-[#D4A853]" />
              <span className="text-xs text-gray-400">{product.rating}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#D4A853] font-semibold">{product.priceHT.toFixed(2)}€</span>
              <button
                onClick={() => handleAdd(product)}
                className={`p-2 rounded-lg transition-all ${
                  added === product.id
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-[#D4A853]/20 text-[#D4A853] hover:bg-[#D4A853]/30'
                }`}
              >
                <ShoppingCart size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
