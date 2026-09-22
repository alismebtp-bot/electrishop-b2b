import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0B] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">ElectriShop</h3>
            <p className="text-gray-500 text-sm mb-4">
              Votre fournisseur B2B de matériel électrique de confiance. Livraison rapide et tarifs professionnels.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-[#1C1C1E] rounded-lg flex items-center justify-center text-gray-500 hover:text-[#D4A853] hover:bg-[#D4A853]/10 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {['Accueil', 'Catalogue', 'Nouveautés', 'Promotions', 'Mon compte'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Accueil' ? '/' : item === 'Catalogue' ? '/catalogue' : '#'} className="text-gray-500 text-sm hover:text-[#D4A853] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Catégories</h4>
            <ul className="space-y-2">
              {['Disjoncteurs', 'Câbles', 'Ampoules LED', 'Outillage', 'Connectique'].map((item) => (
                <li key={item}>
                  <Link to={`/catalogue?category=${encodeURIComponent(item)}`} className="text-gray-500 text-sm hover:text-[#D4A853] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPin size={16} className="text-[#D4A853]" />
                12 Rue de l'Électricité, 75001 Paris
              </li>
              <li className="flex items-center gap-2 text-gray-500 text-sm">
                <Phone size={16} className="text-[#D4A853]" />
                01 23 45 67 89
              </li>
              <li className="flex items-center gap-2 text-gray-500 text-sm">
                <Mail size={16} className="text-[#D4A853]" />
                contact@electrishop.fr
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © 2026 ElectriShop. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 text-sm hover:text-gray-400">Mentions légales</a>
            <a href="#" className="text-gray-600 text-sm hover:text-gray-400">CGV</a>
            <a href="#" className="text-gray-600 text-sm hover:text-gray-400">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
