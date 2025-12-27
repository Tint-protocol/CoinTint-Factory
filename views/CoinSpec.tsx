import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  ShieldCheck, 
  Cpu, 
  Info, 
  Code, 
  FileJson,
  XCircle,
  TrendingUp,
  Users,
  Activity,
  Wallet,
  FileText,
  CheckCircle2,
  Globe,
  Twitter,
  Github,
  Send
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { MOCK_TOKENS } from '../constants';

const chartData = [
  { time: '10:00', price: 120 }, { time: '11:00', price: 150 },
  { time: '12:00', price: 140 }, { time: '13:00', price: 190 },
  { time: '14:00', price: 210 }, { time: '15:00', price: 180 },
  { time: '16:00', price: 240 }, { time: '17:00', price: 280 },
];

const CoinSpec: React.FC = () => {
  const { address } = useParams();
  const token = (MOCK_TOKENS.find(t => t.address === address) || MOCK_TOKENS[0]);

  const StaticBadge = ({ icon: Icon, label }: { icon: any, label: string }) => {
    return (
      <div className="glass flex items-center gap-2 px-4 py-2 rounded-xl border-white/10 transition-all duration-300 opacity-60 cursor-default grayscale hover:grayscale-0">
        <Icon className="w-4 h-4 text-purple-400" />
        <span className="text-xs font-bold text-slate-300">{label}</span>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-20 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
          <Code className="w-3.5 h-3.5" />
          <span>Protocol Standards</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight text-white uppercase">CoinTint Specs</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Transparent, permissionless, and immutable. Understand the technical DNA of every asset created on CoinTint.
        </p>
      </div>

      {/* --- TOKEN DATA SECTION --- */}
      <section className="space-y-12 pt-10 border-t border-white/5">
        <div className="space-y-12">
          {/* Token Info Header */}
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/20 blur-[60px] rounded-full"></div>
              <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-8 border-slate-900 shadow-2xl relative">
                <img src={token.image} alt={token.name} className="w-full h-full object-cover" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-5xl font-bold text-white">{token.name}</h1>
                <div className="flex items-center justify-center gap-2">
                  <div className="bg-purple-500/20 text-purple-400 text-sm font-bold px-4 py-1 rounded-full uppercase tracking-widest border border-purple-500/20">
                    ${token.symbol}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/10">
                    <CheckCircle2 className="w-3 h-3" />
                    VERIFIED ON-CHAIN
                  </div>
                </div>
              </div>

              {/* Static Metadata Badges */}
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <StaticBadge icon={Globe} label="Website" />
                <StaticBadge icon={Twitter} label="X / Twitter" />
                <StaticBadge icon={Github} label="Github" />
                <StaticBadge icon={Send} label="Telegram" />
              </div>

              <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed pt-4">
                {token.description}
              </p>
              
              <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-mono text-slate-500 pt-4">
                <div className="bg-slate-900/50 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
                  <FileText className="w-3 h-3" />
                  <span>Contract: {token.address}</span>
                </div>
                <div className="bg-slate-900/50 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
                  <Wallet className="w-3 h-3" />
                  <span>Creator: {token.creator}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass rounded-[2rem] p-8 space-y-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest border-b border-white/5 pb-4 text-left">Market Preview Analytics</h3>
              <div className="h-[250px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={chartData}>
                     <defs>
                       <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3}/>
                         <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                       </linearGradient>
                     </defs>
                     <Area type="monotone" dataKey="price" stroke="#9333ea" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                   </AreaChart>
                 </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-6 rounded-[2rem] flex flex-col justify-center items-center text-center space-y-2">
                <Users className="w-6 h-6 text-purple-400 mb-2" />
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Holders</span>
                <div className="text-2xl font-bold text-white">{token.holders || 0}</div>
              </div>
              <div className="glass p-6 rounded-[2rem] flex flex-col justify-center items-center text-center space-y-2">
                <Activity className="w-6 h-6 text-blue-400 mb-2" />
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Transfers</span>
                <div className="text-2xl font-bold text-white">4,812</div>
              </div>
              <div className="glass p-6 rounded-[2rem] flex flex-col justify-center items-center text-center space-y-2">
                <TrendingUp className="w-6 h-6 text-emerald-400 mb-2" />
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Market Cap</span>
                <div className="text-2xl font-bold text-white">{token.marketCap || '$0'}</div>
              </div>
              <div className="glass p-6 rounded-[2rem] flex flex-col justify-center items-center text-center space-y-2">
                <Info className="w-6 h-6 text-amber-400 mb-2" />
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Protocol</span>
                <div className="text-2xl font-bold text-white">ERC-20</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Summary */}
      <div className="glass rounded-[2.5rem] p-8 md:p-12 border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Cpu className="w-32 h-32 text-purple-500" />
        </div>
        <div className="relative z-10 space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Info className="w-6 h-6 text-purple-400" />
            Core Architecture
          </h2>
          <p className="text-slate-400 leading-relaxed text-left">
            Every coin is an <span className="text-white font-bold">ERC-20 token</span> deployed on the 
            <span className="text-white font-bold"> Ink Network</span>. Our CoinFactory ensures a standardized deployment 
            process where creators maintain full autonomy while the network handles security.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-left">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest block mb-1">Network</span>
              <span className="text-white font-medium">Ink Network (EVM)</span>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-left">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest block mb-1">Standard</span>
              <span className="text-white font-medium">ERC-20</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Immutable Governance
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <SpecCard 
            title="Total Supply" 
            desc="Fixed at creation. 100% is minted directly to the creator's wallet at genesis."
            val="1,000,000,000"
          />
          <SpecCard 
            title="Decimals" 
            desc="Fixed at 18. Native ERC-20 behavior for seamless DEX compatibility."
            val="18"
          />
          <SpecCard 
            title="Admin Rights" 
            desc="Ownership is NOT retained by CoinTint. No owner role, no pause, no backdoors."
            val="None"
          />
          <SpecCard 
            title="Network Fees" 
            desc="Ink Network uses ETH for transaction fees. All deployments are permissionless."
            val="ETH"
          />
        </div>
      </div>

      <div className="text-center pt-8">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-purple-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
        >
          Back to top
        </button>
      </div>
    </div>
  );
};

const SpecCard = ({ title, desc, val }: { title: string, desc: string, val: string }) => (
  <div className="glass p-6 rounded-2xl space-y-3 border-white/5 group hover:border-white/10 transition-all text-left">
    <div className="flex justify-between items-start">
      <h4 className="text-white font-bold text-sm uppercase tracking-wide">{title}</h4>
      <span className="text-xs font-mono text-purple-400 bg-purple-400/10 px-2 py-1 rounded">{val}</span>
    </div>
    <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

export default CoinSpec;