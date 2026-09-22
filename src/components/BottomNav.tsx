import { Home, Search, ShoppingCart, User, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const { state } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { icon: Home, label: 'Accueil', path: '/' },
    { icon: Search, label: 'Recherche', path: '/catalogue' },
    { icon: ShoppingCart, label: 'Panier', path: '/panier', badge: totalItems },
    { icon: User, label: 'Compte', path: '/profil' },
    { icon: Menu, label: 'Menu', path: '/admin' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0B]/95 backdrop-blur-lg border-t border-white/10 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-0.5 p-2 relative"
            >
              <item.icon
                size={22}
                className={isActive ? 'text-[#D4A853]' : 'text-gray-500'}
              />
              <span className={`text-[10px] ${isActive ? 'text-[#D4A853]' : 'text-gray-500'}`}>
                {item.label}
              </span>
              {item.badge ? (
                <span className="absolute -top-0.5 right-0 w-4 h-4 bg-[#D4A853] text-[#0A0A0B] rounded-full text-[10px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
