import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Layers, ChevronRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-indigo-600/30 blur-[120px] rounded-full"></div>
        <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-purple-600/20 blur-[100px] rounded-full"></div>
      </div>

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-8 animate-pulse">
          <Layers size={14} />
          <span>CoinTint CoinFactory</span>
        </div>
        
        <h1 className="font-display font-black text-6xl md:text-8xl tracking-tighter leading-none mb-6 uppercase text-white">
          LAUNCH. <br />
          <span className="text-transparent bg-clip-text cointint-gradient">SCALE.</span>
        </h1>
        
        <p className="max-w-3xl mx-auto text-white/60 text-lg md:text-xl mb-12 font-light leading-relaxed">
          IPFS metadata built-in – simple, decentralized, no extra setup, focused on narrative, community, and momentum. 
          Let CoinTint handle the technical deployment on Ink Network while you focus on the vision.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/factory" 
            className="w-full sm:w-auto px-10 py-5 rounded-2xl cointint-gradient text-lg font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)] transition-all text-white border-none"
          >
            Start Creating <Rocket size={20} />
          </Link>
          <Link 
            to="/documentation" 
            className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-lg font-bold hover:bg-white/10 transition-all text-center flex items-center justify-center text-white"
          >
            Read Docs <ChevronRight size={20} className="ml-1" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;