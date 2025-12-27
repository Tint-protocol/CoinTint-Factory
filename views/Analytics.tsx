import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { TrendingUp, Users, Activity, Wallet } from 'lucide-react';

const data = [
  { name: 'Jan', price: 400, volume: 2400 },
  { name: 'Feb', price: 300, volume: 1398 },
  { name: 'Mar', price: 200, volume: 9800 },
  { name: 'Apr', price: 278, volume: 3908 },
  { name: 'May', price: 189, volume: 4800 },
  { name: 'Jun', price: 239, volume: 3800 },
  { name: 'Jul', price: 349, volume: 4300 },
];

const viralityData = [
  { name: 'Discord', score: 85, color: '#5865F2' },
  { name: 'Twitter', score: 92, color: '#1DA1F2' },
  { name: 'Telegram', score: 65, color: '#0088cc' },
  { name: 'Reddit', score: 45, color: '#FF4500' },
];

const Analytics: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-display font-bold mb-2">Market Analytics</h2>
          <p className="text-white/50">Tracking the latest trends in the CoinTint ecosystem.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold uppercase">24H</button>
          <button className="px-4 py-2 rounded-lg bg-indigo-500/20 border border-indigo-500/50 text-indigo-300 text-xs font-bold uppercase">7D</button>
          <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold uppercase">30D</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard icon={<TrendingUp size={20} className="text-emerald-400" />} label="Avg. Growth" value="+24.8%" />
        <StatCard icon={<Users size={20} className="text-indigo-400" />} label="New Holders" value="1,240" />
        <StatCard icon={<Activity size={20} className="text-pink-400" />} label="Transactions" value="8,492" />
        <StatCard icon={<Wallet size={20} className="text-yellow-400" />} label="TVL Generated" value="$2.4M" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-3xl h-[450px] flex flex-col">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-indigo-400" /> Factory Market Cap
          </h3>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#ffffff20" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#ffffff20" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#818cf8" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl h-[450px] flex flex-col">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Activity size={20} className="text-pink-400" /> Virality Sentiment Score
          </h3>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viralityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#ffffff" 
                  fontSize={14} 
                  width={100} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                />
                <Bar dataKey="score" radius={[0, 10, 10, 0]} barSize={32}>
                  {viralityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
  <div className="glass-panel p-6 rounded-2xl flex items-center gap-4">
    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold text-white/30 uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default Analytics;