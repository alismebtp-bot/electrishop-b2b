import { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Calendar, Download } from 'lucide-react';

const MONTHLY_DATA = [
  { month: 'Jan', revenue: 24500, costs: 18000, profit: 6500 },
  { month: 'Fév', revenue: 28000, costs: 19500, profit: 8500 },
  { month: 'Mar', revenue: 32000, costs: 21000, profit: 11000 },
  { month: 'Avr', revenue: 29000, costs: 20000, profit: 9000 },
  { month: 'Mai', revenue: 35000, costs: 22500, profit: 12500 },
  { month: 'Juin', revenue: 38600, costs: 24000, profit: 14600 },
];

const CATEGORY_MARGIN = [
  { category: 'Disjoncteurs', margin: 35, revenue: 12500 },
  { category: 'Câbles', margin: 28, revenue: 8900 },
  { category: 'Ampoules', margin: 42, revenue: 5600 },
  { category: 'Outillage', margin: 22, revenue: 7200 },
  { category: 'Connectique', margin: 38, revenue: 4400 },
];

export default function EarningsDashboard() {
  const [period, setPeriod] = useState('6m');

  const stats = [
    { label: 'Chiffre d\'affaires', value: '187,100€', change: '+15.2%', up: true },
    { label: 'Coûts', value: '125,000€', change: '+8.5%', up: false },
    { label: 'Bénéfice net', value: '62,100€', change: '+22.1%', up: true },
    { label: 'Marge moyenne', value: '33.2%', change: '+2.1%', up: true },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Revenus</h1>
        <div className="flex gap-2">
          <div className="flex gap-2">
            {['1m', '3m', '6m', '1y'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  period === p ? 'bg-[#D4A853] text-[#0A0A0B]' : 'bg-[#1C1C1E] text-gray-400 hover:text-white'
                }`}
              >
                {p === '1m' ? '1 mois' : p === '3m' ? '3 mois' : p === '6m' ? '6 mois' : '1 an'}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1C1C1E] text-gray-400 rounded-lg text-sm hover:text-white transition-all">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#141415] rounded-xl p-5 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-[#D4A853]/20 rounded-lg flex items-center justify-center">
                <DollarSign size={20} className="text-[#D4A853]" />
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

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-[#141415] rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Bénéfice mensuel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={MONTHLY_DATA}>
              <defs>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip contentStyle={{ backgroundColor: '#141415', border: '1px solid #333', borderRadius: '8px', color: '#fff' }} />
              <Area type="monotone" dataKey="profit" stroke="#22c55e" fill="url(#profitGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#141415] rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Revenus vs Coûts</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={MONTHLY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip contentStyle={{ backgroundColor: '#141415', border: '1px solid #333', borderRadius: '8px', color: '#fff' }} />
              <Legend />
              <Bar dataKey="revenue" fill="#D4A853" name="Revenus" />
              <Bar dataKey="costs" fill="#ef4444" name="Coûts" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#141415] rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Marge par catégorie</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORY_MARGIN.map((cat) => (
            <div key={cat.category} className="p-4 bg-[#0A0A0B] rounded-lg">
              <p className="text-sm text-gray-500">{cat.category}</p>
              <p className="text-xl font-bold text-white mt-1">{cat.margin}%</p>
              <p className="text-xs text-[#D4A853] mt-1">{cat.revenue.toLocaleString()}€ CA</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
