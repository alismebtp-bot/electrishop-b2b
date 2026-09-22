import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const salesData = [
  { month: 'Jan', sales: 4200, orders: 38 },
  { month: 'Fév', sales: 5800, orders: 52 },
  { month: 'Mar', sales: 3900, orders: 34 },
  { month: 'Avr', sales: 7200, orders: 61 },
  { month: 'Mai', sales: 8900, orders: 78 },
  { month: 'Juin', sales: 6500, orders: 55 },
];

const categoryData = [
  { name: 'Disjoncteurs', value: 35, color: '#D4A853' },
  { name: 'Câbles', value: 25, color: '#E8C87A' },
  { name: 'Ampoules', value: 20, color: '#B8923E' },
  { name: 'Outillage', value: 15, color: '#7C6F4E' },
  { name: 'Autres', value: 5, color: '#4A4A4A' },
];

const topProducts = [
  { name: 'Disjoncteur DNX³ 16A', sales: 234, revenue: 3020 },
  { name: 'Câble R2V 3G1.5', sales: 189, revenue: 1890 },
  { name: 'Ampoule LED E27 10W', sales: 156, revenue: 780 },
];

export default function AdminAnalytics() {
  const [period, setPeriod] = useState('30d');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
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

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: DollarSign, label: 'Chiffre d\'affaires', value: '28,500€', change: '+12.5%', up: true },
          { icon: ShoppingCart, label: 'Commandes', value: '156', change: '+8.2%', up: true },
          { icon: Users, label: 'Nouveaux clients', value: '42', change: '+15.3%', up: true },
          { icon: Package, label: 'Produits vendus', value: '1,234', change: '-2.1%', up: false },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#141415] rounded-xl p-5 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <stat.icon size={20} className="text-[#D4A853]" />
              <span className={`text-xs font-medium ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-[#141415] rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Évolution des ventes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4A853" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#D4A853" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip contentStyle={{ backgroundColor: '#141415', border: '1px solid #333', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="sales" stroke="#D4A853" fillOpacity={1} fill="url(#salesGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#141415] rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Répartition par catégorie</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#141415', border: '1px solid #333', borderRadius: '8px' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top products */}
      <div className="bg-[#141415] rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Top produits</h3>
        <div className="space-y-3">
          {topProducts.map((product, i) => (
            <div key={product.name} className="flex items-center justify-between p-3 bg-[#0A0A0B] rounded-lg">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-[#D4A853] text-[#0A0A0B] rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <span className="text-white font-medium">{product.name}</span>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">{product.revenue}€</p>
                <p className="text-xs text-gray-500">{product.sales} ventes</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
