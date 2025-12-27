
import React from 'react';
import { AlertTriangle, TrendingDown, ShieldAlert, XCircle, Info } from 'lucide-react';

const RiskSection = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => (
  <div className="space-y-3 text-left">
    <div className="flex items-center gap-3">
      {icon}
      <h3 className="text-white font-bold">{title}</h3>
    </div>
    <p className="text-xs text-slate-400 leading-relaxed italic">{text}</p>
  </div>
);

const RiskDisclosure: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-16 animate-in fade-in duration-500">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Mandatory Safety Briefing</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight text-white">Risk Disclosure</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Trading meme coins and interacting with permissionless smart contracts involves extreme risk of total capital loss.
        </p>
      </div>

      <div className="bg-rose-500/5 border border-rose-500/20 rounded-[2.5rem] p-8 md:p-12 space-y-12">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="bg-rose-500 p-4 rounded-full shadow-2xl shadow-rose-900/40">
            <AlertTriangle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white font-display">Zero Protection Policy</h2>
          <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
            CoinTint is a pure smart contract factory. We do not evaluate, audit, or verify the intentions of token creators. 
            Once a token is deployed, it is out of our control.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <RiskSection 
            icon={<TrendingDown className="w-5 h-5 text-rose-500" />}
            title="Creator Responsibility"
            text="CoinTint only creates the token. Everything after—liquidity, marketing, and management—is up to the creator and the market. Creators can abandon projects at any time."
          />
          <RiskSection 
            icon={<XCircle className="w-5 h-5 text-rose-500" />}
            title="Liquidity & Trading"
            text="Deployed tokens have no inherent value and no liquidity. To trade, creators must manually provide liquidity on a DEX. There are no guarantees that a market will ever exist."
          />
          <RiskSection 
            icon={<ShieldAlert className="w-5 h-5 text-rose-500" />}
            title="Malicious Actors"
            text="Tokens can be used for 'Rug Pulls' or other fraudulent activities. CoinTint does not enforce lock-ups or vesting. 100% of supply goes to the creator immediately."
          />
          <RiskSection 
            icon={<Info className="w-5 h-5 text-rose-500" />}
            title="Informational Data"
            text="Social links (X, Telegram, Website) in metadata are provided by the creator and are not verified. They can lead to phishing sites or malicious links."
          />
        </div>

        <div className="pt-8 border-t border-rose-500/10 text-center">
          <p className="text-xs text-rose-500 font-bold uppercase tracking-[0.2em] mb-2">
            No Promises. No Protection.
          </p>
          <p className="text-[10px] text-slate-500 italic uppercase">
            CoinTint behavior is standard for all EVM networks. Proceed with extreme caution.
          </p>
        </div>
      </div>

      <div className="text-center">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
        >
          Back to top
        </button>
      </div>
    </div>
  );
};

export default RiskDisclosure;
