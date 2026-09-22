import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  ref: string;
  priceHT: number;
  oldPriceHT?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  stock: number;
  promo?: string;
}

export default function ProductCard({ id, name, ref, priceHT, oldPriceHT, image, category, rating, reviewCount, stock, promo }: ProductCardProps) {
  const { dispatch } = useCart();
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({
      type: 'ADD_ITEM',
      payload: { id, name, priceHT, image, quantity: 1 },
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = oldPriceHT ? Math.round((1 - priceHT / oldPriceHT) * 100) : 0;

  return (
    <div className="group bg-[#141415] rounded-xl border border-white/10 overflow-hidden hover:border-[#D4A853]/30 transition-all">
      <Link to={`/produit/${id}`} className="block">
        <div className="relative aspect-square bg-[#0A0A0B] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {promo && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {promo}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute top-2 right-2 bg-[#D4A853] text-[#0A0A0B] text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
            className="absolute bottom-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart size={16} className={liked ? 'text-red-400 fill-red-400' : 'text-white'} />
          </button>
        </div>
      </Link>

      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{category}</p>
        <Link to={`/produit/${id}`}>
          <h3 className="text-white font-medium text-sm mb-1 line-clamp-2 hover:text-[#D4A853] transition-colors">{name}</h3>
        </Link>
        <p className="text-xs text-gray-600 mb-2">{ref}</p>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className={i < Math.floor(rating) ? 'text-[#D4A853] fill-[#D4A853]' : 'text-gray-700'} />
          ))}
          <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#D4A853] font-bold">{priceHT.toFixed(2)}€ HT</p>
            {oldPriceHT && (
              <p className="text-xs text-gray-500 line-through">{oldPriceHT.toFixed(2)}€ HT</p>
            )}
          </div>
          <button
            onClick={handleAdd}
            disabled={stock <= 0}
            className={`p-2 rounded-lg transition-all ${
              added
                ? 'bg-green-500/20 text-green-400'
                : stock <= 0
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                : 'bg-[#D4A853]/20 text-[#D4A853] hover:bg-[#D4A853]/30'
            }`}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
