import React from 'react';
import { Target, Zap, Shield, Layers, Rocket, Coins } from 'lucide-react';

interface DocSectionProps {
  icon: any;
  title: string;
  children?: React.ReactNode;
}

const DocSection: React.FC<DocSectionProps> = ({ icon: Icon, title, children }) => {
  return (
    <div className="glass p-8 rounded-3xl border-white/5 hover:border-white/10 transition-all text-left">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
          <Icon className="text-indigo-400" size={24} />
        </div>
        <h3 className="text-2xl font-bold text-white font-display uppercase">{title}</h3>
      </div>
      <div className="text-slate-400 space-y-4 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
};

const Documentation: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-16 animate-in fade-in duration-700">
      {/* Hero Narrative Section */}
      <section className="text-center space-y-8 py-12">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
          <Target className="w-3.5 h-3.5" />
          <span>The Vision</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-white max-w-4xl mx-auto leading-tight uppercase">
          TintDAO & <span className="text-transparent bg-clip-text cointint-gradient">CoinTint</span>
        </h1>
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed italic">
            "CoinTint is a core pillar of the TintDAO ecosystem. Built as a launchpad for innovation on the Ink Network, we provide the infrastructure for sustainable growth and community-driven value."
          </p>
        </div>
      </section>

      {/* Platform Summary Sections */}
      <div className="grid md:grid-cols-2 gap-8">
        <DocSection icon={Rocket} title="Token Factory">
          <p>
            The CoinTint Factory is a high-performance deployment engine that allows anyone to launch verified ERC-20 tokens on Ink Network.
          </p>
          <ul className="space-y-2 list-disc pl-4 text-xs">
            <li>Instant deployment under 60 seconds</li>
            <li>Immutable IPFS metadata integration</li>
            <li>No administrative backdoors</li>
            <li>Standardized verification for explorers</li>
          </ul>
        </DocSection>

        <DocSection icon={Zap} title="Ink Infrastructure">
          <p>
            Powered by the Ink Network (Chain ID 57073), CoinTint leverages next-gen EVM technology for efficiency and security.
          </p>
          <ul className="space-y-2 list-disc pl-4 text-xs">
            <li>Low-cost gas optimization</li>
            <li>Permissionless network access</li>
            <li>EVM-compatible standards</li>
            <li>Near-instant transaction finality</li>
          </ul>
        </DocSection>

        <DocSection icon={Layers} title="Market Dynamics">
          <p>
            Launch is just the beginning. CoinTint provides clear paths for liquidity and secondary market establishment.
          </p>
          <ul className="space-y-2 list-disc pl-4 text-xs">
            <li>DEX integration guides</li>
            <li>Velodrome & InkySwap support</li>
            <li>Permissionless pair creation</li>
            <li>Standardized ERC-20 liquidity</li>
          </ul>
        </DocSection>

        <DocSection icon={Coins} title="Tint Ecosystem">
          <p>
            Every project launched on CoinTint contributes to the broader TintDAO vision of decentralized finance.
          </p>
          <ul className="space-y-2 list-disc pl-4 text-xs">
            <li>Synergy with Tint COIN (TINT)</li>
            <li>Governance-ready infrastructure</li>
            <li>Community-focused scaling</li>
            <li>Expansion across the Ink Network</li>
          </ul>
        </DocSection>
      </div>

      {/* Standards Summary */}
      <section className="glass rounded-[3rem] p-10 md:p-16 border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Shield className="w-64 h-64 text-indigo-500" />
        </div>
        <div className="relative z-10 space-y-8 text-left">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white font-display uppercase">Technical Standards</h2>
            <p className="text-slate-400">Battle-tested smart contracts for the Ink Network.</p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Standard</span>
              <p className="text-white font-bold">ERC-20</p>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Total Supply</span>
              <p className="text-white font-bold">1,000,000,000</p>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Admin</span>
              <p className="text-white font-bold">Renounced</p>
            </div>
          </div>
          
          <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
            Our contracts are immutable from birth. No owner, no pause functions, no administrative controls. Decentralization is our default setting.
          </p>
        </div>
      </section>

      {/* Footer Nav */}
      <div className="flex flex-col items-center gap-6 pt-12">
        <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">CoinTint Documentation</p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all text-white"
        >
          Back to Top
        </button>
      </div>
    </div>
  );
};

export default Documentation;