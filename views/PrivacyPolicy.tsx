
import React from 'react';
import { Shield, EyeOff, Database, Globe, Lock } from 'lucide-react';

const PrivacySection = ({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) => (
  <div className="glass p-8 rounded-3xl border-white/5 flex flex-col md:flex-row gap-6 hover:border-white/10 transition-colors text-left">
    <div className="shrink-0">{icon}</div>
    <div className="space-y-2">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{content}</p>
    </div>
  </div>
);

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-12 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
          <Shield className="w-3.5 h-3.5" />
          <span>Data Transparency</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-white">Privacy Policy</h1>
        <p className="text-slate-400 text-lg">
          At CoinTint, we prioritize decentralization and user privacy. 
          We collect as little data as technically possible.
        </p>
      </div>

      <div className="grid gap-6">
        <PrivacySection 
          icon={<EyeOff className="w-6 h-6 text-purple-400" />}
          title="No Personal Information Collection"
          content="CoinTint is a decentralized application (dApp). We do not have user accounts, we do not require your name, email address, or physical location. We do not use tracking cookies to identify you."
        />
        
        <PrivacySection 
          icon={<Globe className="w-6 h-6 text-blue-400" />}
          title="Public Blockchain Data"
          content="By interacting with the Ink Network through CoinTint, your wallet address and transaction history become part of the public record. This data is not stored by CoinTint but is permanent on the blockchain."
        />

        <PrivacySection 
          icon={<Database className="w-6 h-6 text-amber-400" />}
          title="Storage & IPFS"
          content="Token metadata (images, names, descriptions) is stored on IPFS, a decentralized storage network. Once uploaded, this data is public and immutable. CoinTint does not maintain a private database of your uploads."
        />

        <PrivacySection 
          icon={<Lock className="w-6 h-6 text-rose-400" />}
          title="Third-Party Services"
          content="We prioritize local execution. Any interaction with external APIs is minimized to ensure your metadata remains under your control until explicitly deployed to the decentralized network."
        />
      </div>

      <div className="glass p-8 rounded-3xl border-white/5 space-y-4 text-left">
        <h2 className="text-xl font-bold text-white">Wallet Connection</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          When you connect your wallet (e.g., MetaMask), we only read your public address to facilitate transactions. Your private keys never leave your device and are never accessible to CoinTint.
        </p>
      </div>

      <div className="text-center pt-8">
        <p className="text-xs text-slate-600 uppercase font-bold tracking-[0.2em]">
          Last Updated: October 2024 • Version 1.0
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
