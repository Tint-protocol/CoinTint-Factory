import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './views/Home';
import Factory from './views/Factory';
import CoinSpec from './views/CoinSpec';
import Liquidity from './views/Liquidity';
import Help from './views/Help';
import PrivacyPolicy from './views/PrivacyPolicy';
import RiskDisclosure from './views/RiskDisclosure';
import Documentation from './views/Documentation';
import Navbar from './components/Navbar';
import { WalletState } from './types';
import { connectWalletAction, getBalance } from './services/web3Service';

const App: React.FC = () => {
  const LOGO_URL = "https://ipfs.io/ipfs/bafkreigagkkmvjde4nhovk3ltpvst755st4qyt3jnd3l3jbc7qav45rcma";
  const INK_LOGO_URL = "https://gateway.pinata.cloud/ipfs/bafkreigb6qgabdbhvv3gxg4gizu7qljubifp7x5ihnsojlcftgds55qc6y";

  const [wallet, setWallet] = useState<WalletState & { balance?: string }>({
    isConnected: false,
    address: null,
    chainId: null,
    balance: '0'
  });

  const handleConnect = async () => {
    const result = await connectWalletAction();
    if (result) {
      setWallet({
        isConnected: true,
        address: result.address,
        chainId: result.chainId,
        balance: result.balance
      });
    }
  };

  const handleDisconnect = () => {
    setWallet({
      isConnected: false,
      address: null,
      chainId: null,
      balance: '0'
    });
  };

  // Sync balance periodically if connected
  useEffect(() => {
    if (wallet.isConnected && wallet.address) {
      const interval = setInterval(async () => {
        const bal = await getBalance(wallet.address!);
        setWallet(prev => ({ ...prev, balance: bal }));
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [wallet.isConnected, wallet.address]);

  return (
    <Router>
      <div className="min-h-screen bg-[#050505] text-white flex flex-col">
        <Navbar 
          wallet={wallet} 
          onConnect={handleConnect} 
          onDisconnect={handleDisconnect} 
        />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/factory" element={<Factory wallet={wallet} onConnect={handleConnect} />} />
            <Route path="/coinspec" element={<CoinSpec />} />
            <Route path="/liquidity" element={<Liquidity />} />
            <Route path="/help" element={<Help />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/risk" element={<RiskDisclosure />} />
            <Route path="/documentation" element={<Documentation />} />
          </Routes>
        </main>
        
        <footer className="border-t border-white/5 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img src={LOGO_URL} alt="CoinTint Logo" className="w-full h-full object-contain" />
                </div>
                <span 
                  style={{ fontFamily: '"Arial Black", "Arial Bold", Gadget, sans-serif' }} 
                  className="font-bold text-xl tracking-tight text-white"
                >
                  CoinTint
                </span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/10"></div>
              <div className="flex flex-col items-center sm:items-start">
                <img 
                  src={INK_LOGO_URL} 
                  alt="Ink Network" 
                  className="h-5 object-contain opacity-80" 
                />
                <span className="text-[9px] uppercase font-black tracking-[0.2em] text-white/30 mt-1.5">
                  Deployed on Ink Network
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-white/60 text-sm justify-center md:justify-end">
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/risk" className="hover:text-rose-400 transition-colors">Risk Disclosure</Link>
                <a 
                  href="https://explorer.inkonchain.com/address/0xC79f4e117715b9BD5057A9942Cdc792CF4AFA325" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                >
                  SmartContract
                </a>
                <Link to="/documentation" className="hover:text-white transition-colors">Documentation</Link>
              </div>
              <div className="text-white/20 text-[11px] font-medium tracking-wide">
                &copy; {new Date().getFullYear()} CoinTint CoinFactory. Built for TintDAO Ecosystem.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;