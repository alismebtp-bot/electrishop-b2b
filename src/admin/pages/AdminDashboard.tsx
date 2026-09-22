import { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import {
  DollarSign, ShoppingCart, Users, Package, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const REVENUE_DATA = [
  { date: 'Lun', revenue: 4200, orders: 38 },
  { date: 'Mar', revenue: 5800, orders: 52 },
  { date: 'Mer', revenue: 3900, orders: 34 },
  { date: 'Jeu', revenue: 7200, orders: 61 },
  { date: 'Ven', revenue: 8900, orders: 78 },
  { date: 'Sam', revenue: 6500, orders: 55 },
  { date: 'Dim', revenue: 5100, orders: 43 },
];

const CATEGORY_DATA = [
  { name: 'Disjoncteurs', value: 35, color: '#D4A853' },
  { name: 'Câbles', value: 25, color: '#E8C87A' },
  { name: 'Ampoules', value: 20, color: '#B8923E' },
  { name: 'Outillage', value: 15, color: '#7C6F4E' },
  { name: 'Autres', value: 5, color: '#4A4A4A' },
];

const RECENT_ORDERS = [
  { id: 'CMD-2026-001234', customer: 'Elec Pro Paris', total: 1240.50, status: 'completed', date: 'Il y a 2h' },
  { id: 'CMD-2026-001233', customer: 'Bâtiment Confort', total: 890.00, status: 'processing', date: 'Il y a 4h' },
  { id: 'CMD-2026-001232', customer: 'SARL Élec 91', total: 2340.80, status: 'pending', date: 'Il y a 6h' },
  { id: 'CMD-2026-001231', customer: 'Pro Facility', total: 567.30, status: 'completed', date: 'Il y a 8h' },
];

export default function AdminDashboard() {
  const [period, setPeriod] = useState('7d');

  const stats = [
    { icon: DollarSign, label: 'Chiffre d\'affaires', value: '38,600€', change: '+12.5%', up: true },
    { icon: ShoppingCart, label: 'Commandes', value: '361', change: '+8.2%', up: true },
    { icon: Users, label: 'Clients actifs', value: '142', change: '+5.1%', up: true },
    { icon: Package, label: 'Produits en stock', value: '2,847', change: '-3.2%', up: false },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Tableau de bord</h1>
        <div className="flex gap-2">
          {['7d', '30d', '90d'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                period === p ? 'bg-[#D4A853] text-[#0A0A0B]' : 'bg-[#1C1C1E] text-gray-400 hover:text-white'
              }`}
            >
              {p === '7d' ? '7 jours' : p === '30d' ? '30 jours' : '90 jours'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#141415] rounded-xl p-5 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-[#D4A853]/20 rounded-lg flex items-center justify-center">
                <stat.icon size={20} className="text-[#D4A853]" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#141415] rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Revenus</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={REVENUE_DATA}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4A853" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#D4A853" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip contentStyle={{ backgroundColor: '#141415', border: '1px solid #333', borderRadius: '8px', color: '#fff' }} />
              <Area type="monotone" dataKey="revenue" stroke="#D4A853" fill="url(#revenueGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#141415] rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Par catégorie</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                {CATEGORY_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#141415', border: '1px solid #333', borderRadius: '8px', color: '#fff' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-[#141415] rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Commandes récentes</h3>
        <div className="space-y-3">
          {RECENT_ORDERS.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 bg-[#0A0A0B] rounded-lg">
              <div>
                <p className="text-white font-medium">{order.id}</p>
                <p className="text-sm text-gray-500">{order.customer}</p>
              </div>
              <div className="text-right">
                <p className="text-[#D4A853] font-semibold">{order.total.toFixed(2)}€</p>
                <p className="text-xs text-gray-500">{order.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
