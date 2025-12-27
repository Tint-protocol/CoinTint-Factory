
import React from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  PlusSquare, 
  CheckCircle2, 
  ShieldAlert, 
  Wallet,
  Globe,
  FileText,
  Copy
} from 'lucide-react';

const Help: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>User Support & Guidance</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-white">
          HelpCenter Resources
        </h1>
        <p className="text-slate-400 text-lg">
          Everything you need to manage and verify your tokens on Ink Network.
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-10">
        
        {/* TL;DR Section */}
        <div className="glass rounded-3xl p-8 border-purple-500/20 bg-purple-600/5">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-purple-400" />
            The Bottom Line (TL;DR)
          </h2>
          <blockquote className="border-l-4 border-purple-500 pl-4 py-2 text-slate-300 italic mb-6">
            "When a token is deployed via CoinTint, <span className="text-white font-bold">100% of the supply is sent directly to the creator’s wallet</span>."
          </blockquote>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Token Existence
              </div>
              <p className="text-slate-400 text-left">The token is already live on the blockchain.</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Wallet Display
              </div>
              <p className="text-slate-400 text-left">Wallets need to be manually told to show new tokens. This is not a bug.</p>
            </div>
          </div>
        </div>

        {/* Section 1: Add Network */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2 rounded-xl border border-white/10">
              <Globe className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">1. Add Ink Network to Wallet</h2>
          </div>
          <div className="glass rounded-2xl p-6 space-y-4">
            <p className="text-slate-400 text-sm text-left">Use these parameters to manually configure Ink Network in MetaMask or other EVM wallets:</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <NetworkParam label="Network Name" value="Ink" onCopy={() => copyToClipboard("Ink")} />
              <NetworkParam label="New RPC URL" value="https://rpc-gel.inkonchain.com" onCopy={() => copyToClipboard("https://rpc-gel.inkonchain.com")} />
              <NetworkParam label="Chain ID" value="57073" onCopy={() => copyToClipboard("57073")} />
              <NetworkParam label="Currency Symbol" value="ETH" onCopy={() => copyToClipboard("ETH")} />
              <NetworkParam label="Block Explorer URL" value="https://explorer.inkonchain.com" fullWidth onCopy={() => copyToClipboard("https://explorer.inkonchain.com")} />
            </div>
          </div>
        </section>

        {/* Section 2: Import Tokens */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2 rounded-xl border border-white/10">
              <PlusSquare className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">2. Import CoinTint Tokens</h2>
          </div>
          <div className="space-y-4">
            {[
              "Open MetaMask and switch to Ink Network",
              "Scroll to the bottom and click 'Import Tokens'",
              "Switch to the 'Custom Token' tab",
              "Paste the Token Contract Address (from your creation page)",
              "Symbol and Decimals (18) will usually auto-fill",
              "Click 'Add Custom Token' then 'Import Tokens'"
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-4 bg-slate-900/30 p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-all text-left">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-xs font-bold text-slate-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
                  {i + 1}
                </div>
                <span className="text-slate-300 text-sm font-medium">{step}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: On-Chain Verification */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2 rounded-xl border border-white/10">
              <FileText className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">3. On-Chain Verification</h2>
          </div>
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            <div className="space-y-2">
              <p className="text-slate-300 text-sm font-medium">Block Explorer Verification</p>
              <p className="text-slate-400 text-xs leading-relaxed max-w-md">
                Verify your balance by pasting your wallet address into the Ink Block Explorer. Check the "Token Holdings" section to see your minted assets immediately.
              </p>
            </div>
            <a 
              href="https://explorer.inkonchain.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="whitespace-nowrap bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl text-sm font-bold border border-white/10 transition-all text-center"
            >
              Go to Explorer
            </a>
          </div>
        </section>

        {/* Section 4: Common Issues */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2 rounded-xl border border-white/10">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Common Issues</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass p-6 rounded-2xl space-y-3 text-left">
              <h4 className="text-white font-bold text-sm">Token does not appear</h4>
              <p className="text-xs text-slate-400 leading-relaxed italic">
                Ensure you are on Ink Network. Most wallets do not automatically scan for new custom tokens. Manual import is required.
              </p>
            </div>
            <div className="glass p-6 rounded-2xl space-y-3 text-left">
              <h4 className="text-white font-bold text-sm">Trading Issues</h4>
              <p className="text-xs text-slate-400 leading-relaxed italic">
                CoinTint creates tokens but does not provide trading liquidity. You must add liquidity to an external DEX on Ink Network.
              </p>
            </div>
          </div>
        </section>

        {/* Final Notice */}
        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-8 text-center space-y-4">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
          <h3 className="text-xl font-bold text-white italic">"Simple, explicit, no magic."</h3>
          <p className="text-sm text-emerald-200/60 max-w-md mx-auto">
            CoinTint behavior is standard for all EVM networks. If it exists on the explorer, your funds are safe.
          </p>
        </div>

      </div>

      {/* Footer CTA */}
      <div className="text-center pt-8">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 mx-auto"
        >
          Back to top
        </button>
      </div>
    </div>
  );
};

const NetworkParam = ({ label, value, fullWidth, onCopy }: { label: string, value: string, fullWidth?: boolean, onCopy: () => void }) => (
  <div className={`bg-black/20 p-4 rounded-xl border border-white/5 relative group transition-colors hover:border-white/10 ${fullWidth ? 'col-span-full' : ''} text-left`}>
    <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1">{label}</span>
    <div className="flex justify-between items-center gap-2">
      <span className="text-white font-mono break-all text-xs">{value}</span>
      <button 
        onClick={onCopy}
        className="text-slate-600 hover:text-purple-400 transition-colors p-1"
        title="Copy"
      >
        <Copy className="w-3 h-3" />
      </button>
    </div>
  </div>
);

export default Help;
