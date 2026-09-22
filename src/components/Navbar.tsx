import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { state } = useCart();
  const navigate = useNavigate();

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalogue?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0B]/95 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#D4A853] rounded-lg flex items-center justify-center">
              <Package size={18} className="text-[#0A0A0B]" />
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">ElectriShop</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">Accueil</Link>
            <Link to="/catalogue" className="text-gray-400 hover:text-white transition-colors">Catalogue</Link>
            <Link to="/nouveautes" className="text-gray-400 hover:text-white transition-colors">Nouveautés</Link>
            <Link to="/promotions" className="text-gray-400 hover:text-white transition-colors">Promotions</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Search size={20} />
            </button>

            <LanguageSwitcher />

            <Link
              to="/panier"
              className="relative p-2 text-gray-400 hover:text-white transition-colors"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#D4A853] text-[#0A0A0B] rounded-full text-[10px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              to="/profil"
              className="p-2 text-gray-400 hover:text-white transition-colors hidden sm:block"
            >
              <User size={20} />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors md:hidden"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-white/10 py-3 px-4">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un produit..."
              autoFocus
              className="w-full h-10 pl-10 pr-4 bg-[#141415] border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4A853]"
            />
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 py-4 px-4">
          <nav className="flex flex-col gap-3">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white py-2">Accueil</Link>
            <Link to="/catalogue" onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white py-2">Catalogue</Link>
            <Link to="/nouveautes" onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white py-2">Nouveautés</Link>
            <Link to="/promotions" onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white py-2">Promotions</Link>
            <Link to="/profil" onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white py-2">Mon compte</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
