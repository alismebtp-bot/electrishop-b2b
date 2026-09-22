import { X, Plus, Minus, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const totalHT = state.items.reduce((sum, item) => sum + item.priceHT * item.quantity, 0);
  const totalTTC = totalHT * 1.20;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#141415] border-l border-white/10 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <ShoppingCart size={20} className="text-[#D4A853]" />
            Votre panier
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {state.items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={48} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-500">Votre panier est vide</p>
            </div>
          ) : (
            state.items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 bg-[#0A0A0B] rounded-lg">
                <div className="w-16 h-16 bg-[#1C1C1E] rounded-lg overflow-hidden shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      <ShoppingCart size={20} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white text-sm font-medium truncate">{item.name}</h4>
                  <p className="text-[#D4A853] text-sm font-semibold">{item.priceHT.toFixed(2)}€ HT</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: Math.max(0, item.quantity - 1) } })}
                      className="w-7 h-7 bg-[#1C1C1E] rounded flex items-center justify-center text-gray-400 hover:text-white"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}
                      className="w-7 h-7 bg-[#1C1C1E] rounded flex items-center justify-center text-gray-400 hover:text-white"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                  className="text-gray-500 hover:text-red-400 self-start"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {state.items.length > 0 && (
          <div className="p-4 border-t border-white/10 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total HT</span>
              <span className="text-white">{totalHT.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">TVA (20%)</span>
              <span className="text-white">{(totalTTC - totalHT).toFixed(2)}€</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span className="text-white">Total TTC</span>
              <span className="text-[#D4A853]">{totalTTC.toFixed(2)}€</span>
            </div>
            <button
              onClick={() => { onClose(); navigate('/panier'); }}
              className="w-full h-12 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              Commander <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
