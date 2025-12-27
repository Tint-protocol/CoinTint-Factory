import React, { useState, useEffect } from 'react';
import {
  Upload, Sparkles, Loader2, ShieldCheck,
  CheckCircle2, Globe, ShieldAlert
} from 'lucide-react';
import { ethers } from 'ethers';

import {
  createCoinOnChain,
  getCreationFee
} from '../services/web3Service';
import { uploadFileToIPFS, uploadJsonToIPFS } from '../lib/ipfs';
import { WalletState, CreateTokenForm } from '../types';
import ImportTokenButton from '../components/ImportTokenButton';

interface FactoryProps {
  wallet: WalletState & { balance?: string };
  onConnect: () => void;
}

const Factory: React.FC<FactoryProps> = ({ wallet, onConnect }) => {
  const BRAND_LOGO = "https://ipfs.io/ipfs/bafkreigagkkmvjde4nhovk3ltpvst755st4qyt3jnd3l3jbc7qav45rcma";

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deployedAddress, setDeployedAddress] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [creationFee, setCreationFee] = useState<string | null>(null);

  const [form, setForm] = useState<CreateTokenForm>({
    name: '',
    symbol: '',
    description: '',
    website: '',
    twitter: '',
    github: '',
    telegram: '',
    imageFile: undefined
  });

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    const loadFee = async () => {
      try {
        const feeWei = await getCreationFee();
        setCreationFee(ethers.formatEther(feeWei));
      } catch (err) {
        console.error('Failed to load fee', err);
      }
    };
    loadFee();
  }, []);

  const insufficientBalance =
    creationFee && wallet.balance
      ? Number(wallet.balance) < Number(creationFee)
      : false;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setForm(prev => ({ ...prev, imageFile: file }));
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet.isConnected) {
      onConnect();
      return;
    }
    if (insufficientBalance) {
      alert('Insufficient balance for creation fee');
      return;
    }
    if (!form.imageFile) {
      alert('Upload image');
      return;
    }

    setLoading(true);
    try {
      const imageURI = await uploadFileToIPFS(form.imageFile);
      const metadata = {
        name: form.name,
        symbol: form.symbol,
        description: form.description,
        image: imageURI,
        website: form.website,
        twitter: form.twitter,
        github: form.github,
        telegram: form.telegram,
        creator: wallet.address,
        createdAt: Date.now()
      };
      const tokenURI = await uploadJsonToIPFS(metadata);
      const tokenAddress = await createCoinOnChain({
        name: form.name,
        symbol: form.symbol,
        totalSupply: ethers.parseUnits('1000000000', 18),
        tokenURI
      });
      setDeployedAddress(tokenAddress);
      setSuccess(true);
    } catch (err: any) {
      alert(err.message ?? 'Deploy failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center animate-in zoom-in duration-500">
        <div className="relative w-32 h-32 mx-auto mb-8">
           <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl animate-pulse"></div>
           <div className="relative w-full h-full rounded-full border-4 border-emerald-500/30 overflow-hidden bg-slate-900 flex items-center justify-center">
             <img src={previewUrl || BRAND_LOGO} className="w-full h-full object-cover" alt="Preview" />
             <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 size={32} className="text-white drop-shadow-lg" />
             </div>
           </div>
        </div>
        <h2 className="text-4xl font-display font-bold mb-4">Contract Deployed!</h2>
        <p className="text-white/60 mb-12">Your token "{form.name}" (${form.symbol}) is now live on the Ink Network.</p>
        <div className="glass-panel p-8 rounded-3xl inline-block text-left mb-12 border-emerald-500/20">
          <p className="text-xs text-emerald-400 uppercase font-bold mb-2 tracking-widest">Contract Address</p>
          <code className="text-white font-mono break-all text-sm">{deployedAddress}</code>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => setSuccess(false)} className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all text-white">New Creation</button>
          <ImportTokenButton 
            tokenAddress={deployedAddress} 
            symbol={form.symbol} 
            image={previewUrl || BRAND_LOGO} 
            className="cointint-gradient px-8 py-4 rounded-2xl shadow-xl shadow-purple-500/20 text-white border-none"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 text-left">
        <div className="lg:col-span-3 space-y-10">
          <div className="space-y-2">
            <h2 className="text-4xl font-display font-bold text-white uppercase">Token Factory</h2>
            <p className="text-white/50">Forge your digital assets on the high-performance Ink Network with CoinTint.</p>
          </div>

          {!wallet.isConnected && (
            <div className="p-6 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <ShieldCheck className="text-indigo-400" />
                <span className="text-sm font-medium">Connect your wallet to start building.</span>
              </div>
              <button onClick={onConnect} className="bg-indigo-600 px-6 py-2 rounded-xl text-sm font-bold border-none text-white">Connect</button>
            </div>
          )}

          <form onSubmit={handleCreate} className="space-y-10">
            {/* Identity & Branding */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-indigo-400 text-sm font-black uppercase tracking-[0.2em]">
                <Upload size={18} />
                Identity & Branding
              </div>
              
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div 
                  className="w-32 h-32 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 hover:border-indigo-500/50 transition-all cursor-pointer overflow-hidden group relative shrink-0"
                  onClick={() => document.getElementById('imageInput')?.click()}
                >
                  {previewUrl ? (
                    <img src={previewUrl} className="w-full h-full object-cover animate-in fade-in zoom-in duration-300" alt="Preview" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-white/20 group-hover:text-white/50" />
                      <span className="text-[10px] text-white/20 uppercase font-bold mt-2">Upload</span>
                    </>
                  )}
                  <input id="imageInput" type="file" hidden accept="image/*" onChange={handleFileChange} />
                </div>
                
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <InputField label="Token Name" name="name" value={form.name} onChange={handleInputChange} placeholder="e.g. My Token" />
                  <InputField label="Token Symbol" name="symbol" value={form.symbol} onChange={handleInputChange} placeholder="e.g. TKN" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-white/40 tracking-widest">Description</label>
                <textarea 
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-indigo-500 transition-all text-sm text-white"
                  placeholder="Describe your vision..."
                />
              </div>
            </div>

            {/* Social Infrastructure */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-indigo-400 text-sm font-black uppercase tracking-[0.2em]">
                <Globe size={18} />
                Social Infrastructure
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Website" name="website" value={form.website} onChange={handleInputChange} placeholder="https://..." />
                <InputField label="Twitter/X" name="twitter" value={form.twitter} onChange={handleInputChange} placeholder="@handle" />
                <InputField label="Telegram" name="telegram" value={form.telegram} onChange={handleInputChange} placeholder="t.me/link" />
                <InputField label="Github" name="github" value={form.github} onChange={handleInputChange} placeholder="github.com/..." />
              </div>
            </div>

            <div className="bg-orange-500/5 border border-orange-500/10 p-6 rounded-3xl flex gap-4 items-start">
              <ShieldAlert className="text-orange-400 shrink-0" size={20} />
              <div className="space-y-1">
                <p className="text-xs font-bold text-orange-200">Network Fee Policy</p>
                <p className="text-[11px] text-orange-200/50 leading-relaxed text-left">
                  A protocol fee of 0.002 ETH is required for deployment. Ensure your wallet has enough funds for both the fee and gas.
                </p>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading || (wallet.isConnected && insufficientBalance)}
              className={`w-full py-5 rounded-2xl cointint-gradient font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 shadow-2xl transition-all active:scale-95 text-white border-none ${
                loading ? 'opacity-70' : 'hover:shadow-purple-500/30'
              }`}
            >
              {loading ? (
                <><Loader2 className="animate-spin" /> Minting On-Chain...</>
              ) : wallet.isConnected ? (
                insufficientBalance ? 'Insufficient Balance' : <><Sparkles size={20} /> Deploy Token</>
              ) : 'Connect Wallet to Build'}
            </button>
          </form>
        </div>

        {/* Sidebar Preview */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-8 rounded-[2.5rem] sticky top-28 border-white/5 space-y-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-white/40">Real-time Preview</h3>
            
            <div className="bg-black/60 rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl text-left">
              <div className="h-48 relative overflow-hidden bg-slate-900 flex items-center justify-center">
                <img 
                  src={previewUrl || BRAND_LOGO} 
                  className={`w-full h-full ${previewUrl ? 'object-cover' : 'object-contain p-12 opacity-80'} animate-in fade-in duration-500`} 
                  alt="Preview"
                />
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                  LIVE PREVIEW
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center">
                    <img 
                      src={previewUrl || BRAND_LOGO} 
                      className="w-full h-full object-cover" 
                      alt="Mini Preview"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{form.name || 'Your Token'}</h4>
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">${form.symbol || 'SYM'}</p>
                  </div>
                </div>
                <p className="text-xs text-white/60 line-clamp-3 italic leading-relaxed">
                  {form.description || 'Provide a vision to see the preview description...'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/40">Chain</span>
                <span className="font-bold">Ink Network</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/40">Fee</span>
                <span className="font-bold text-purple-400">{creationFee || '0.002'} ETH</span>
              </div>
              <div className="flex justify-between items-center text-xs border-t border-white/5 pt-4">
                <span className="text-white/40">Wallet Balance</span>
                <span className={`font-bold ${insufficientBalance ? 'text-rose-500' : 'text-emerald-400'}`}>
                  {parseFloat(wallet.balance || '0').toFixed(6)} ETH
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, placeholder }: any) => (
  <div className="space-y-2 text-left">
    <label className="text-[10px] uppercase font-black text-white/40 tracking-widest">{label}</label>
    <input 
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-indigo-500 transition-all text-sm text-white"
    />
  </div>
);

export default Factory;