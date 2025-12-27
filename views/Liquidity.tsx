import React from 'react';
import { 
  Droplets, 
  ArrowRight,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

interface StepProps {
  num: string;
  title: string;
  desc: string;
}

const Step: React.FC<StepProps> = ({ num, title, desc }) => {
  return (
    <div className="flex items-start gap-4 bg-slate-900/30 p-6 rounded-2xl border border-white/5 group hover:border-white/10 transition-all text-left">
      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-sm font-bold text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
        {num}
      </div>
      <div className="space-y-1">
        <h4 className="text-white font-bold">{title}</h4>
        <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
};

const Liquidity: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
          <Droplets className="w-3.5 h-3.5" />
          <span>Liquidity Strategy</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-white uppercase">
          Activate Your Market
        </h1>
        <p className="text-slate-400 text-lg">
          CoinTint engineers your token. Now, create its value by adding liquidity to a Decentralized Exchange (DEX).
        </p>
      </div>

      {/* Main Call to Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Velodrome Card */}
        <div className="glass rounded-[2.5rem] p-8 border-blue-500/20 hover:border-blue-500/40 transition-all group overflow-hidden relative">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full group-hover:bg-blue-500/20 transition-all"></div>
          <div className="space-y-6 relative">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 bg-[#0052ff]/20 rounded-2xl flex items-center justify-center border border-[#0052ff]/30 overflow-hidden">
                <img 
                  src="https://ipfs.io/ipfs/bafkreiesv5fs36a26xnlp2wdt3g3dxf7zf74yqd47ncqvqqd6yipctykui" 
                  alt="Velodrome" 
                  className="w-8 h-8 object-contain" 
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white leading-tight">Velodrome</h3>
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Premium Hub</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed text-left">
              The primary liquidity engine on Ink. Best for professional depth and cross-ecosystem trading.
            </p>
            <a 
              href="https://velodrome.finance/liquidity" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full bg-[#0052ff] hover:bg-[#0042cc] text-white px-6 py-4 rounded-2xl font-bold transition-all group/btn"
            >
              Add Liquidity
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* InkySwap Card */}
        <div className="glass rounded-[2.5rem] p-8 border-purple-500/20 hover:border-purple-500/40 transition-all group overflow-hidden relative">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/10 blur-[60px] rounded-full group-hover:bg-purple-500/20 transition-all"></div>
          <div className="space-y-6 relative">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 bg-purple-600/20 rounded-2xl flex items-center justify-center border border-purple-500/30 overflow-hidden">
                <img 
                  src="https://ipfs.io/ipfs/bafkreiapiozy4spcezkfgeuwu4tzfgrmba2unfkmxtfwzrcp7phltnnlcq" 
                  alt="InkySwap" 
                  className="w-8 h-8 object-contain" 
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white leading-tight">InkySwap</h3>
                <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">Native Community</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed text-left">
              Designed for the native Ink community. The fastest way to pair and trade new CoinTint tokens.
            </p>
            <a 
              href="https://www.inkyswap.com/liquidity" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-2xl font-bold transition-all group/btn"
            >
              Start Trading
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Guide Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 p-2 rounded-xl border border-white/10">
            <HelpCircle className="w-5 h-5 text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Market Launch Guide</h2>
        </div>

        <div className="grid gap-4">
          <Step 
            num="1" 
            title="Verify Deployment" 
            desc="Ensure your token is visible in your wallet on the Ink Network. Use your CoinTint specs to find your contract."
          />
          <Step 
            num="2" 
            title="DEX Connection" 
            desc="Visit your preferred DEX (Velodrome/InkySwap). Connect your wallet and verify you're on the Ink Network."
          />
          <Step 
            num="3" 
            title="Create Trading Pair" 
            desc="Select 'New Pair' or 'Add Liquidity'. Pair your token with ETH or stablecoins to establish its first market price."
          />
          <Step 
            num="4" 
            title="Bootstrap Supply" 
            desc="Determine the initial pool size. Remember, you hold 100% of the supply created by CoinTint Factory."
          />
          <Step 
            num="5" 
            title="Finalize & Scale" 
            desc="Confirm approval. Once complete, your token is officially tradable by anyone on the Ink Network."
          />
        </div>
      </section>

      {/* Warning Box */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-8 space-y-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-amber-400" />
          <h3 className="text-lg font-bold text-white uppercase tracking-tight text-amber-400">Security Best Practice</h3>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed italic text-left">
          Market maturity requires trust. After adding liquidity, consider locking your LP tokens. CoinTint focuses on the factory layer, while DEXs handle the trading layer.
        </p>
      </div>

      {/* Footer CTA */}
      <div className="flex flex-col items-center gap-4 pt-12">
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

export default Liquidity;