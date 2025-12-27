
import React from 'react';
import { Search, Filter, TrendingUp, Users, Clock } from 'lucide-react';

const mockTokens = [
  { id: '1', name: 'Nebula Protocol', symbol: 'NEB', supply: '1B', cap: '$1.2M', growth: '+12%', color: 'bg-blue-500' },
  { id: '2', name: 'CyberCat Memecoin', symbol: 'CCAT', supply: '420T', cap: '$450K', growth: '+85%', color: 'bg-pink-500' },
  { id: '3', name: 'Vortex Utility', symbol: 'VTX', supply: '10M', cap: '$3.1M', growth: '-2%', color: 'bg-purple-500' },
  { id: '4', name: 'Gaia Green', symbol: 'GAIA', supply: '100M', cap: '$890K', growth: '+5%', color: 'bg-emerald-500' },
  { id: '5', name: 'Nova Finance', symbol: 'NOVA', supply: '500M', cap: '$2.2M', growth: '+18%', color: 'bg-orange-500' },
  { id: '6', name: 'Aether Swap', symbol: 'AETH', supply: '250M', cap: '$1.5M', growth: '+7%', color: 'bg-indigo-500' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-display font-bold mb-2">Token Dashboard</h2>
          <p className="text-white/50">Discover and manage coins minted in the CoinTint Factory.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
            <input 
              placeholder="Search tokens..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
          <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTokens.map((token) => (
          <div key={token.id} className="glass-panel p-6 rounded-3xl hover:border-white/20 transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl ${token.color} flex items-center justify-center font-bold text-xl`}>
                  {token.symbol[0]}
                </div>
                <div>
                  <h3 className="font-bold">{token.name}</h3>
                  <span className="text-xs text-white/40 font-medium">${token.symbol}</span>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase ${
                token.growth.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
              }`}>
                {token.growth}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-1">
                <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Market Cap</p>
                <p className="text-lg font-display font-bold">{token.cap}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Supply</p>
                <p className="text-lg font-display font-bold">{token.supply}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-1 text-[10px] text-white/40 font-bold uppercase tracking-tighter">
                <Clock size={12} /> Live 2h ago
              </div>
              <button className="text-xs font-bold text-indigo-400 group-hover:underline underline-offset-4">
                View Contract
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 glass-panel rounded-3xl p-10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-display font-bold mb-2">Want to see your coin here?</h3>
            <p className="text-white/50">Start engineering your vision with our AI-powered factory.</p>
          </div>
          <a 
            href="#/factory" 
            className="px-8 py-4 rounded-2xl cointint-gradient font-bold shadow-xl shadow-purple-500/20 hover:scale-105 transition-all"
          >
            Launch New Token
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
