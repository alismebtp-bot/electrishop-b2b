import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard, Package, ShoppingCart, Users, FileText, Truck, MapPin,
  BarChart3, Settings, Printer, QrCode, MessageSquare, Menu, X, ChevronDown, LogOut, Building2, Bell
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', path: '/admin' },
  { icon: Package, label: 'Produits', path: '/admin/products' },
  { icon: ShoppingCart, label: 'Commandes', path: '/admin/orders' },
  { icon: Users, label: 'Clients', path: '/admin/customers' },
  { icon: FileText, label: 'Devis', path: '/admin/quotes' },
  { icon: Truck, label: 'Livraisons', path: '/admin/delivery' },
  { icon: MapPin, label: 'Suivi GPS', path: '/admin/tracking' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
  { icon: Printer, label: 'Imprimantes', path: '/admin/printers' },
  { icon: QrCode, label: 'Scan Code', path: '/admin/scanner' },
  { icon: MessageSquare, label: 'Chat IA', path: '/admin/chatbot' },
  { icon: Settings, label: 'Paramètres', path: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/10">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="font-bold text-lg text-[#D4A853]">ElectriShop Admin</span>
        <div className="w-8" />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#141415] border-r border-white/10
          transform transition-transform duration-300 lg:transform-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6 border-b border-white/10">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#D4A853] rounded-lg flex items-center justify-center">
                <Zap size={18} className="text-[#0A0A0B]" />
              </div>
              <span className="font-bold text-lg text-[#D4A853]">ElectriShop</span>
            </Link>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${isActive ? 'bg-[#D4A853]/20 text-[#D4A853]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                  `}
                >
                  <item.icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <LogOut size={18} />
              <span className="text-sm">Retour au site</span>
            </Link>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <main className="flex-1 min-h-screen overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function Zap(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  );
}
