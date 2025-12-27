import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  PlusCircle, 
  Home,
  FileCode,
  Droplets,
  HelpCircle,
  ExternalLink,
  LogOut,
  ChevronDown,
  Copy,
  Check
} from 'lucide-react';
import { WalletState } from '../types';

interface NavbarProps {
  wallet: WalletState & { balance?: string };
  onConnect: () => void;
  onDisconnect: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ wallet, onConnect, onDisconnect }) => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const LOGO_URL = "https://ipfs.io/ipfs/bafkreigagkkmvjde4nhovk3ltpvst755st4qyt3jnd3l3jbc7qav45rcma";
  const INK_LOGO_URL = "https://gateway.pinata.cloud/ipfs/bafkreigb6qgabdbhvv3gxg4gizu7qljubifp7x5ihnsojlcftgds55qc6y";

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Factory', path: '/factory', icon: PlusCircle },
    { name: 'Specs', path: '/coinspec', icon: FileCode },
    { name: 'Liquidity', path: '/liquidity', icon: Droplets },
    { name: 'Help', path: '/help', icon: HelpCircle },
    { name: 'ink Explorer', path: 'https://explorer.inkonchain.com/', icon: ExternalLink, external: true },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncatedAddress = wallet.address 
    ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`
    : '';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto glass-panel rounded-full px-8 py-3 flex items-center justify-between relative">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-125 animate-bounce">
            <img 
              src={LOGO_URL} 
              alt="CoinTint Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
          <span 
            style={{ fontFamily: '"Arial Black", "Arial Bold", Gadget, sans-serif' }} 
            className="font-bold text-xl tracking-tighter text-white"
          >
            CoinTint
          </span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isExternal = 'external' in item && item.external;
            
            if (isExternal) {
              return (
                <a 
                  key={item.name} 
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-medium transition-all hover:text-white whitespace-nowrap text-white/50"
                >
                  <Icon size={16} strokeWidth={2} />
                  {item.name}
                </a>
              );
            }

            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-2 text-xs font-medium transition-all hover:text-white whitespace-nowrap ${
                  location.pathname === item.path ? 'text-white' : 'text-white/50'
                }`}
              >
                <Icon size={16} strokeWidth={location.pathname === item.path ? 2.5 : 2} />
                {item.name}
              </Link>
            );
          })}
        </div>
        
        <div className="relative" ref={dropdownRef}>
          {wallet.isConnected ? (
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
            >
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{truncatedAddress}</span>
                <span className="text-xs font-bold text-white leading-none">{parseFloat(wallet.balance || '0').toFixed(4)} ETH</span>
              </div>
              <ChevronDown size={14} className={`text-white/40 group-hover:text-white transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>
          ) : (
            <button 
              onClick={onConnect}
              className="px-5 py-2 rounded-full cointint-gradient text-xs font-bold tracking-widest uppercase hover:scale-105 active:scale-95 transition-all text-white border-none"
            >
              Connect
            </button>
          )}

          {/* Wallet Info Dropdown - Now Opaque (Not Transparent) */}
          {showDropdown && wallet.isConnected && (
            <div className="absolute top-full right-0 mt-4 w-72 bg-[#0d0d0f] rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-top-2 duration-200 border border-white/10 z-[60]">
              <div className="space-y-6">
                {/* Network Branding */}
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                      <img src={INK_LOGO_URL} className="w-5 h-5 object-contain" alt="Ink" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-white/40">Network</p>
                      <p className="text-xs font-bold text-white">Ink Network</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Active</span>
                  </div>
                </div>

                {/* Account Details */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black tracking-widest text-white/40">Your Wallet</p>
                    <div className="flex items-center justify-between bg-white/[0.03] p-3 rounded-2xl border border-white/5">
                      <code className="text-[11px] font-mono text-white/80">{truncatedAddress}</code>
                      <button 
                        onClick={copyAddress}
                        className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
                      >
                        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black tracking-widest text-white/40">Ink Balance</p>
                    <div className="flex items-baseline gap-2 px-1">
                      <span className="text-2xl font-display font-bold text-white">{parseFloat(wallet.balance || '0').toFixed(6)}</span>
                      <span className="text-xs font-bold text-white/30 tracking-widest uppercase">ETH</span>
                    </div>
                  </div>
                </div>

                {/* Logout */}
                <button 
                  onClick={() => {
                    onDisconnect();
                    setShowDropdown(false);
                  }}
                  className="w-full py-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold flex items-center justify-center gap-2 transition-all group/logout"
                >
                  <LogOut size={16} className="group-hover/logout:-translate-x-1 transition-transform" />
                  Disconnect Wallet
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;