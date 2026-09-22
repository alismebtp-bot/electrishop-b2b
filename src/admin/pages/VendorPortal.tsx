import { useState } from 'react';
import {
  Building2, Package, DollarSign, TrendingUp, Star,
  MessageSquare, FileText, Truck, CheckCircle, AlertTriangle,
  Plus, Search, Filter, Download, Send
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const SALES_DATA = [
  { month: 'Jan', sales: 12000 },
  { month: 'Fév', sales: 15000 },
  { month: 'Mar', sales: 18000 },
  { month: 'Avr', sales: 14000 },
  { month: 'Mai', sales: 21000 },
  { month: 'Juin', sales: 25000 },
];

const PRODUCTS = [
  { id: '1', name: 'Disjoncteur DNX³ 16A', sku: 'LEG-0001', price: 12.90, stock: 150, sold: 450, rating: 4.8 },
  { id: '2', name: 'Câble R2V 3G1.5', sku: 'NXS-0001', price: 1.89, stock: 500, sold: 1200, rating: 4.5 },
  { id: '3', name: 'Ampoule LED E27 10W', sku: 'PHI-0001', price: 4.99, stock: 300, sold: 890, rating: 4.7 },
];

const ORDERS = [
  { id: 'FOU-001', date: '2026-06-15', total: 5000, status: 'confirmed', items: 50 },
  { id: 'FOU-002', date: '2026-06-10', total: 3200, status: 'shipped', items: 30 },
  { id: 'FOU-003', date: '2026-06-05', total: 7800, status: 'pending', items: 100 },
];

export default function VendorPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Tableau de bord', icon: TrendingUp },
    { id: 'products', label: 'Mes produits', icon: Package },
    { id: 'orders', label: 'Commandes', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Building2 size={28} className="text-[#D4A853]" />
          Portail fournisseur
        </h1>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id ? 'bg-[#D4A853] text-[#0A0A0B]' : 'bg-[#1C1C1E] text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#141415] rounded-xl p-5 border border-white/10">
              <DollarSign size={20} className="text-[#D4A853] mb-2" />
              <p className="text-2xl font-bold text-white">105,000€</p>
              <p className="text-sm text-gray-500">Chiffre d'affaires</p>
            </div>
            <div className="bg-[#141415] rounded-xl p-5 border border-white/10">
              <Package size={20} className="text-[#D4A853] mb-2" />
              <p className="text-2xl font-bold text-white">2,540</p>
              <p className="text-sm text-gray-500">Produits vendus</p>
            </div>
            <div className="bg-[#141415] rounded-xl p-5 border border-white/10">
              <Star size={20} className="text-[#D4A853] mb-2" />
              <p className="text-2xl font-bold text-white">4.7</p>
              <p className="text-sm text-gray-500">Note moyenne</p>
            </div>
            <div className="bg-[#141415] rounded-xl p-5 border border-white/10">
              <TrendingUp size={20} className="text-[#D4A853] mb-2" />
              <p className="text-2xl font-bold text-white">+18%</p>
              <p className="text-sm text-gray-500">Croissance</p>
            </div>
          </div>

          <div className="bg-[#141415] rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Ventes mensuelles</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ backgroundColor: '#141415', border: '1px solid #333', borderRadius: '8px', color: '#fff' }} />
                <Line type="monotone" dataKey="sales" stroke="#D4A853" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-[#141415] rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Produit</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">SKU</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Prix HT</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Stock</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Vendus</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Note</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((product) => (
                <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4 text-white">{product.name}</td>
                  <td className="px-4 py-4 text-gray-400">{product.sku}</td>
                  <td className="px-4 py-4 text-[#D4A853]">{product.price.toFixed(2)}€</td>
                  <td className="px-4 py-4 text-gray-400">{product.stock}</td>
                  <td className="px-4 py-4 text-gray-400">{product.sold}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-[#D4A853] fill-[#D4A853]" />
                      <span className="text-white">{product.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-[#141415] rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Commande</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Date</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Articles</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Total</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4 text-white font-medium">{order.id}</td>
                  <td className="px-4 py-4 text-gray-400">{order.date}</td>
                  <td className="px-4 py-4 text-gray-400">{order.items}</td>
                  <td className="px-4 py-4 text-[#D4A853]">{order.total.toFixed(2)}€</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {order.status === 'confirmed' ? 'Confirmé' :
                       order.status === 'shipped' ? 'Expédié' : 'En attente'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
