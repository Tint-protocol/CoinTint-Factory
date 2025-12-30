
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Send, 
  Image as ImageIcon, 
  X, 
  Activity,
  ShieldAlert,
  Zap,
  TrendingUp,
  Globe, 
  ArrowRight,
  Fingerprint,
  User,
  Database,
  Cpu,
  Layers,
  Network,
  Clock,
  ChevronRight,
  Lock,
  CheckCircle2,
  ExternalLink,
  Hash,
  Box,
  ArrowDownRight,
  AlertCircle,
  FileText,
  ShieldCheck,
  Search,
  Scan,
  Compass,
  FileSearch,
  CheckCircle,
  ThumbsUp,
  ThumbsDown,
  Repeat,
  Check,
  Menu,
  Share2,
  Twitter,
  Facebook,
  Instagram,
  Copy,
  Download
} from 'lucide-react';
import { Message, InstitutionalData, PersonaType, InstitutionalMetadata } from '../types';
import { LegalPageType } from './LegalOverlay';
import { marked } from 'marked';
import { HashService } from '../services/hashService';
import { blockchainService } from '../services/blockchainService';
import { feedbackService, FeedbackType } from '../services/feedbackService';

interface ChatAreaProps {
  messages: Message[];
  onSendMessage: (content: string, image?: string) => void;
  isAnalyzing: boolean;
  onOpenLegalPage: (type: LegalPageType) => void;
  onToggleSidebar?: () => void;
}

const APP_LOGO_URL = "https://gateway.pinata.cloud/ipfs/bafkreigagkkmvjde4nhovk3ltpvst755st4qyt3jnd3l3jbc7qav45rcma";

const TradingViewWidget: React.FC<{ symbol: string }> = ({ symbol }) => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = '';
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": symbol || "BINANCE:BTCUSDT",
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "support_host": "https://www.tradingview.com"
    });
    container.current.appendChild(script);
  }, [symbol]);
  return (
    <div className="w-full h-[320px] md:h-[450px] rounded-[1rem] md:rounded-[1.5rem] overflow-hidden border border-white/5 bg-black/40 shadow-xl my-4 md:my-6">
      <div id="tradingview_widget" ref={container} className="w-full h-full" />
    </div>
  );
};

const SocialShareOverlay: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  content: string; 
  metadata?: InstitutionalMetadata;
  integrityHash?: string;
}> = ({ isOpen, onClose, content, metadata, integrityHash }) => {
  if (!isOpen) return null;

  const title = metadata ? `Sovereign Audit: ${metadata.symbol}` : "TintAI Market Intelligence";
  const shareText = `Deep analysis by TintAI: ${title}. Verify on-chain. #TintAI #TintDAO #Web3Intelligence`;
  const shareUrl = window.location.href;

  const handleXShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleFBShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleIGShare = () => {
    // Instagram doesn't support direct URL sharing with pre-filled text well, usually copy content
    navigator.clipboard.writeText(shareText);
    alert("Share text copied! Open Instagram and paste in your story or post.");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'TintAI Analysis', text: shareText, url: shareUrl });
      } catch (e) { console.error(e); }
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-6 md:p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] ring-1 ring-white/5">
        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"><X size={20} /></button>
        
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-[12px] font-black text-purple-500 uppercase tracking-[0.4em]">Broadcast_Intelligence</h3>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-tighter">Share analysis to sovereign networks</p>
          </div>

          {/* Mini Screenshot / Preview Card */}
          <div className="w-full aspect-video bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <img src={APP_LOGO_URL} className="w-24 opacity-20 grayscale" alt="" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <img src={APP_LOGO_URL} className="w-8 h-8 rounded-lg border border-white/10 p-1 bg-black/50" alt="" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">TintAI Analysis</span>
                  <span className="text-[8px] text-purple-500 font-black uppercase mt-1">Sovereign Protocol v8.0</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-[14px] md:text-[18px] font-black text-white uppercase tracking-tight leading-tight" style={{ fontFamily: "'Arial Black', Gadget, sans-serif" }}>
                  {title}
                </div>
                <div className="flex items-center gap-2">
                   <div className="px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded text-[7px] font-black text-green-500 uppercase tracking-widest">VERIFIED</div>
                   <div className="text-[7px] font-mono text-zinc-600 truncate max-w-[150px]">{integrityHash || "0x..."}</div>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">© 2025 TINTDAO ECOSYSTEM</div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-purple-500 rounded-full" />
                  <div className="w-1 h-1 bg-purple-500 rounded-full opacity-50" />
                  <div className="w-1 h-1 bg-purple-500 rounded-full opacity-20" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
            <button onClick={handleXShare} className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all group">
              <Twitter size={20} className="text-white group-hover:text-sky-400" />
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">X / Twitter</span>
            </button>
            <button onClick={handleFBShare} className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all group">
              <Facebook size={20} className="text-white group-hover:text-blue-500" />
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Facebook</span>
            </button>
            <button onClick={handleIGShare} className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all group">
              <Instagram size={20} className="text-white group-hover:text-pink-500" />
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Instagram</span>
            </button>
            <button onClick={handleNativeShare} className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all group">
              <Share2 size={20} className="text-white group-hover:text-purple-500" />
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">More</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TransactionVerificator: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'PENDING':
      case 'DATA_PENDING': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'FAILED': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
    }
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-[1rem] md:rounded-[1.25rem] overflow-hidden mb-6 md:mb-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] ring-1 ring-white/5 animate-in fade-in zoom-in-95 duration-500">
      <div className="px-4 md:px-5 py-2 md:py-3 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 rounded text-[8px] md:text-[9px] font-black text-purple-400 uppercase tracking-widest">
            <Globe size={10} /> {data.network || 'Mainnet'}
          </div>
          <div className="h-3 w-px bg-white/10 hidden md:block" />
          <div className="hidden md:flex items-center gap-1.5 text-[9px] font-black text-zinc-500 uppercase tracking-widest">
            <Clock size={10} /> {new Date(data.timestamp).toLocaleTimeString()}
          </div>
        </div>
        <div className={`flex items-center gap-2 px-2.5 md:px-3 py-1 rounded-full text-[8px] md:text-[9px] font-black border uppercase tracking-widest shadow-sm ${getStatusColor(data.status)}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${data.status === 'CONFIRMED' ? 'bg-green-500 animate-pulse' : 'bg-zinc-500'}`} />
          {data.status}
        </div>
      </div>

      <div className="p-4 md:p-8 flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center justify-between">
        <div className="flex items-center gap-4 md:gap-5 min-w-0 flex-1">
          <div className="relative shrink-0">
            <div className={`absolute inset-0 blur-xl opacity-30 rounded-full ${data.status === 'CONFIRMED' ? 'bg-green-500' : 'bg-purple-500'}`} />
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center relative z-10">
              <Fingerprint size={20} className={data.status === 'CONFIRMED' ? 'text-green-500' : 'text-purple-500'} />
            </div>
          </div>
          <div className="min-w-0">
            <div className="text-[8px] md:text-[10px] font-black text-purple-500 uppercase tracking-[0.3em] mb-1">TX_IDENTIFIER</div>
            <h2 className="text-white text-sm md:text-lg font-mono font-bold tracking-tight truncate select-all">
              {data.hash}
            </h2>
          </div>
        </div>
        <a 
          href={data.explorerUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="shrink-0 flex items-center justify-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-white text-black rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95 shadow-xl w-full md:w-auto"
        >
          EXPLORER <ExternalLink size={12} />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border-y border-white/5">
        {[
          { label: 'Block', value: data.blockNumber, icon: <Box size={11} /> },
          { label: 'Value', value: data.value, icon: <Zap size={11} /> },
          { label: 'Compute', value: data.gasUsed, icon: <Activity size={11} /> },
          { label: 'Integrity', value: 'Verified', icon: <ShieldCheck size={11} />, color: 'text-green-500' }
        ].map((f, i) => (
          <div key={i} className="bg-[#0a0a0a] p-3 md:p-5 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-[7px] md:text-[8px] font-black text-zinc-500 uppercase tracking-widest">
              {f.icon} {f.label}
            </div>
            <div className={`text-[10px] md:text-[12px] font-mono font-bold truncate ${f.color || 'text-zinc-200'}`}>
              {f.value || 'N/A'}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 md:p-8 bg-white/[0.01] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 border-b border-white/5">
        <div className="space-y-1.5 md:space-y-2.5">
          <label className="text-[7px] md:text-[8px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
            <ArrowDownRight size={10} className="text-purple-500" /> SOURCE
          </label>
          <div className="px-3 md:px-4 py-2 md:py-3 bg-zinc-900/50 border border-white/5 rounded-xl font-mono text-[9px] md:text-[10px] text-zinc-400 break-all select-all hover:bg-zinc-900/80 transition-colors cursor-copy">
            {data.from}
          </div>
        </div>
        <div className="space-y-1.5 md:space-y-2.5">
          <label className="text-[7px] md:text-[8px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
            <ArrowDownRight size={10} className="text-cyan-500 rotate-90" /> TARGET
          </label>
          <div className="px-3 md:px-4 py-2 md:py-3 bg-zinc-900/50 border border-white/5 rounded-xl font-mono text-[9px] md:text-[10px] text-zinc-400 break-all select-all hover:bg-zinc-900/80 transition-colors cursor-copy">
            {data.to}
          </div>
        </div>
      </div>
    </div>
  );
};

const CoinMetadataPanel: React.FC<{ metadata: InstitutionalMetadata }> = ({ metadata }) => {
  if (!metadata) return null;

  const metrics = [
    { label: 'Circ. Supply', value: metadata.circulating_supply, icon: <Layers size={11} /> },
    { label: 'Total Supply', value: metadata.total_supply, icon: <Database size={11} /> },
    { label: 'Vol (24H)', value: metadata.spot_volume_24h, icon: <Activity size={11} /> },
    { label: 'Open Int.', value: metadata.open_interest, icon: <Zap size={11} /> },
    { label: 'OI Chg (24H)', value: metadata.oi_change_24h, icon: <TrendingUp size={11} /> },
    { label: 'L/S Ratio', value: metadata.long_short_ratio, icon: <Globe size={11} /> },
    { label: 'MCap / FDV', value: metadata.mcap_pdv, icon: <Cpu size={11} /> },
  ];

  return (
    <div className="bg-[#080808] border border-white/10 rounded-[1rem] overflow-hidden mb-6 md:mb-8 shadow-2xl group ring-1 ring-white/5">
      <div className="px-4 md:px-6 py-3 md:py-4 flex items-center justify-between border-b border-white/5 bg-white/[0.01]">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/10 blur-xl rounded-full" />
            <img 
              src={metadata.logo_url && metadata.logo_url !== 'DATA UNAVAILABLE' && metadata.logo_url !== 'DATA UNAVAILABLE (SOURCE CONSTRAINT)' ? metadata.logo_url : APP_LOGO_URL} 
              alt={metadata.symbol} 
              className="w-8 h-8 md:w-10 md:h-10 rounded-xl object-contain bg-white/5 p-1 md:p-1.5 border border-white/10 relative z-10"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-[12px] md:text-[15px] font-black text-purple-500 tracking-tight uppercase leading-none">{metadata.asset_name}</h2>
            <div className="flex items-center gap-2 mt-1 md:mt-1.5">
              <span className="text-[8px] md:text-[10px] font-black text-purple-500 uppercase tracking-widest bg-purple-500/10 px-1.5 py-0.5 rounded-md border border-purple-500/20">{metadata.symbol}</span>
            </div>
          </div>
        </div>
        <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 bg-green-500/5 rounded-full text-[8px] md:text-[9px] font-black text-green-500 uppercase tracking-widest border border-green-500/10">
           <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Live
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
        {metrics.map((m, i) => (
          <div key={i} className="bg-[#080808] p-3 md:p-5 flex flex-col gap-1.5 hover:bg-white/[0.02] transition-colors border-r border-white/5 last:border-r-0">
            <div className="flex items-center gap-1.5 text-[7px] md:text-[8px] font-black text-purple-500/60 uppercase tracking-[0.2em]">
              {m.icon} {m.label}
            </div>
            <div className="text-[10px] md:text-[12px] font-mono font-bold text-zinc-200 truncate">
              {m.value || '---'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChartistAnalyticModule: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return null;
  const sections = [
    { label: 'Market Regime', value: data.market_regime, icon: <Globe size={10} /> },
    { label: 'Alpha Signal', value: data.alpha_signal, icon: <Zap size={10} />, primary: true },
    { label: 'Institutional Conclusion', value: data.institutional_conclusion, icon: <ShieldAlert size={10} />, primary: true },
  ];

  return (
    <div className="bg-white/[0.01] border border-white/5 rounded-[1rem] md:rounded-[1.25rem] p-4 md:p-8 space-y-4 md:space-y-6 mt-6 md:mt-8 shadow-inner">
      <div className="flex items-center gap-2 md:gap-3 text-[8px] md:text-[9px] font-black text-purple-500 uppercase tracking-[0.4em]">
        <Database size={12} className="text-purple-500" /> Decision_Matrix
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {sections.map((sec, i) => sec.value && (
          <div key={i} className={`p-4 md:p-6 rounded-[0.75rem] md:rounded-[1rem] border transition-all ${sec.primary ? 'bg-purple-500/[0.03] border-purple-500/10 col-span-full shadow-lg' : 'bg-white/[0.01] border-white/5'}`}>
             <div className="flex items-center gap-2 mb-2 text-[7px] md:text-[8px] font-black text-purple-500 uppercase tracking-widest">
               {sec.icon} {sec.label}
             </div>
            <div className="text-zinc-100 text-[12px] md:text-[14px] font-semibold leading-relaxed">
              {sec.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AssistantFeedback: React.FC<{ 
  message: Message, 
  onShare: () => void 
}> = ({ message, onShare }) => {
  const [feedback, setFeedback] = useState<FeedbackType | null>(null);

  const handleFeedback = (type: FeedbackType) => {
    const newVal = feedback === type ? null : type;
    setFeedback(newVal);
    feedbackService.submitFeedback(message.id, newVal);
  };

  return (
    <div className="mt-4 md:mt-6 flex items-center gap-2 md:gap-3">
      <button 
        onClick={() => handleFeedback('like')}
        className={`p-2 rounded-lg border transition-all ${feedback === 'like' ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
      >
        <ThumbsUp size={14} />
      </button>
      <button 
        onClick={() => handleFeedback('dislike')}
        className={`p-2 rounded-lg border transition-all ${feedback === 'dislike' ? 'bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
      >
        <ThumbsDown size={14} />
      </button>
      <div className="w-px h-3 bg-white/10 mx-1" />
      <button 
        onClick={onShare}
        className={`p-2 px-3 md:px-4 rounded-lg border bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all flex items-center gap-2 group active:scale-95`}
      >
        <Repeat size={14} className="group-hover:rotate-180 transition-transform duration-500" />
        <span className="text-[9px] font-black uppercase tracking-widest">Share Analysis</span>
      </button>
    </div>
  );
};

const QuantumRenderer: React.FC<{
  content: string;
  onSuggestionClick: (s: string) => void;
  message: Message;
 }>
 = ({ content, onSuggestionClick, message }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);

  const data: InstitutionalData = useMemo(() => {
    try {
      const cleaned = content.trim();
      const jsonStart = cleaned.indexOf('{');
      const jsonEnd = cleaned.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1) {
        return JSON.parse(cleaned.substring(jsonStart, jsonEnd + 1));
      }
      return { text: content };
    } catch (e) { 
      return { text: content }; 
    }
  }, [content]);

  const isTransaction = data.metadata && 'hash' in data.metadata && 'status' in data.metadata;

  const htmlContent = useMemo(() => {
    if (!data.text || isTransaction) return ''; 
    return marked(data.text);
  }, [data.text, isTransaction]);

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {data.metadata && !isTransaction && <CoinMetadataPanel metadata={data.metadata} />}
      {data.metadata && isTransaction && <TransactionVerificator data={data.metadata} />}
      
      {data.text && !isTransaction && (
        <div 
          className="prose prose-sm md:prose-base prose-invert max-w-none prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-4 md:prose-p:mb-8" 
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}

      {(data.chartist || data.tradingview_symbol) && !isTransaction && (
        <div className="pt-6 md:pt-8 border-t border-white/5 space-y-8 md:space-y-10">
          {data.tradingview_symbol && <TradingViewWidget symbol={data.tradingview_symbol} />}
          {data.chartist && <ChartistAnalyticModule data={data.chartist} />}
        </div>
      )}

      <AssistantFeedback message={message} onShare={() => setIsShareOpen(true)} />

      {isShareOpen && (
        <SocialShareOverlay 
          isOpen={isShareOpen} 
          onClose={() => setIsShareOpen(false)} 
          content={data.text || ""} 
          metadata={data.metadata}
          integrityHash={data.integrity_check}
        />
      )}

      {data.suggestions && data.suggestions.length > 0 && (
        <div className="pt-8 md:pt-10 border-t border-white/5 space-y-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            <span style={{ fontFamily: "'Arial Black', Gadget, sans-serif" }} className="text-zinc-400 font-bold text-[11px] tracking-widest opacity-60">Recommended:</span>
          </div>
          <div className="flex flex-col ml-1">
            {data.suggestions.map((s, idx) => {
              const isLast = idx === data.suggestions.length - 1;
              const prefix = isLast ? "➡ " : "➡";
              return (
                <button 
                  key={idx} 
                  onClick={() => onSuggestionClick(s)} 
                  style={{ fontFamily: "'Arial Black', Gadget, sans-serif" }}
                  className="text-white hover:text-purple-400 font-bold text-[12px] md:text-[14px] tracking-wide transition-colors text-left py-1 flex items-center group active:scale-95"
                >
                  <span className="text-purple-500 mr-2 font-mono opacity-80 group-hover:opacity-100">{prefix}</span>
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const ChatArea: React.FC<ChatAreaProps> = ({ messages, onSendMessage, isAnalyzing, onOpenLegalPage, onToggleSidebar }) => {
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [sessionHash, setSessionHash] = useState<string>('00000000000000000000000000000000');
  const [isContractDetected, setIsContractDetected] = useState(false);
  const [classification, setClassification] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const updateHash = async () => {
      const lastMsg = messages[messages.length - 1];
      const source = lastMsg ? `${lastMsg.id}-${lastMsg.content.slice(0, 50)}` : 'initial-state';
      const hash = await HashService.generateSHA256(source + Date.now());
      setSessionHash(hash);
    };
    updateHash();
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isAnalyzing]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, window.innerHeight * 0.4);
      textarea.style.height = `${newHeight}px`;
    }
  }, [input]);

  useEffect(() => {
    const val = input.trim();
    if (!val) {
      setClassification(null);
      setIsContractDetected(false);
      return;
    }

    let detectedType: string | null = null;
    let contractFlag = false;

    if (val.startsWith('0x')) {
      if (val.length === 66) {
        detectedType = 'EVM_TRANSACTION_HASH';
      } else if (val.length === 42) {
        detectedType = 'EVM_ADDRESS';
        contractFlag = true;
      } else {
        detectedType = 'INVALID_EVM_FORMAT';
      }
    } else {
      const isBase58 = /^[1-9A-HJ-NP-Za-km-z]+$/.test(val);
      if (isBase58) {
        if (val.length >= 85) {
          detectedType = 'SOLANA_TX_SIGNATURE';
        } else if (val.length >= 32 && val.length <= 44) {
          detectedType = 'SOLANA_ADDRESS';
          contractFlag = true;
        }
      }
    }

    setClassification(detectedType);
    setIsContractDetected(contractFlag);
  }, [input]);

  const handleSend = () => {
    if ((input.trim() || selectedImage) && !isAnalyzing) {
      onSendMessage(input, selectedImage || undefined);
      setInput(''); 
      setSelectedImage(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col relative h-full bg-[#0f0f11] overflow-hidden selection:bg-purple-500/30">
      <div className="sticky top-0 z-40 bg-[#0f0f11]/95 backdrop-blur-3xl border-b border-white/10 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3 md:gap-4">
          <button 
            onClick={onToggleSidebar}
            className="p-2 -ml-2 text-zinc-400 hover:text-white md:hidden transition-all active:scale-95"
          >
            <Menu size={20} />
          </button>
          <div className="w-2 md:w-2.5 h-2 md:h-2.5 bg-purple-500 rounded-full animate-pulse shadow-[0_0_12px_#a855f7]" />
        </div>
        <div className="flex gap-2 md:gap-4">
           <div className="flex items-center gap-2 md:gap-3 px-3 md:px-5 py-1.5 md:py-2 bg-white/5 rounded-full border border-white/5 font-mono shadow-inner">
              <Hash size={10} className="text-purple-500" /> 
              <span className="text-[8px] md:text-[10px] text-white/60 truncate max-w-[100px] sm:max-w-[140px] md:max-w-[280px] tracking-widest font-bold">
                {sessionHash}
              </span>
           </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-12 lg:px-32 py-8 md:py-12 space-y-10 md:space-y-16 scroll-smooth pb-[40vh] md:pb-[50vh] custom-scroll">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto pt-16 md:pt-32 space-y-6 md:space-y-10">
            <h1 className="text-3xl md:text-6xl font-black text-white tracking-tighter leading-tight select-none uppercase" style={{ fontFamily: "'Arial Black', Gadget, sans-serif" }}>
              i'm Tint Lets StayTinted(<span className="text-purple-500">TINT</span>)
            </h1>
            <p className="text-zinc-500 text-sm md:text-xl font-medium max-w-3xl leading-relaxed">
              “Engineered as a high-fidelity intelligence layer, TintAI facilitates chart scans, on-chain contract audits, and a broad spectrum of general-purpose advisory functions. Welcome to the Sovereign Protocol.”
            </p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto w-full space-y-12 md:space-y-24">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex group ${msg.role === 'user' ? 'justify-end' : 'justify-start'} message-fade-in`}>
                <div className={msg.role === 'user' ? 'max-w-[90%] md:max-w-[85%] w-fit bg-white/[0.08] backdrop-blur-[10px] px-4 md:px-5 py-2.5 md:py-3 rounded-[1rem] md:rounded-[1.8rem] border border-white/[0.12] shadow-2xl ring-1 ring-white/5 ml-auto' : 'w-full flex gap-4 md:gap-8'}>
                  {msg.role === 'assistant' && (
                    <div className="hidden xs:block w-8 md:w-12 h-8 md:h-12 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    {msg.image && <img src={msg.image} className="mb-6 md:mb-8 rounded-[1rem] md:rounded-[1.5rem] max-h-60 md:max-h-80 w-auto border border-white/10 shadow-2xl" alt="Market Scan" />}
                    {msg.role === 'user' ? (
                      <div className="text-zinc-100 text-sm md:text-[16px] font-medium leading-relaxed whitespace-pre-wrap break-words overflow-hidden">{msg.content}</div>
                    ) : (
                     <>                       
                       <QuantumRenderer
                         content={msg.content}
                         onSuggestionClick={(s) => onSendMessage(s)}
                         message={msg}
                       />
                     </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {isAnalyzing && (
          <div className="max-w-6xl mx-auto flex items-center gap-3 md:gap-4 opacity-70">
            <div className="typing-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 md:left-80 p-4 md:p-10 bg-gradient-to-t from-[#0f0f11] via-[#0f0f11]/95 to-transparent z-[100]">
        <div className="max-w-4xl mx-auto relative">
          
          {selectedImage && (
            <div className="absolute -top-20 md:-top-24 left-0 right-0 animate-in slide-in-from-bottom-4 fade-in duration-300">
               <div className="flex items-center gap-3 md:gap-4 bg-white/5 backdrop-blur-2xl p-2.5 md:p-3 rounded-[1.2rem] md:rounded-[1.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/5 mx-auto w-fit">
                <div className="relative">
                  <img src={selectedImage} className="h-10 md:h-12 w-10 md:w-12 rounded-lg md:rounded-xl object-cover border border-white/10" alt="Preview" />
                  <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5"><CheckCircle size={8} className="text-white"/></div>
                </div>
                <div className="flex flex-col gap-0.5 pr-3 md:pr-4">
                  <div className="text-[8px] md:text-[10px] font-black text-purple-500 uppercase tracking-widest leading-none">Visual_Input</div>
                  <div className="text-[7px] md:text-[8px] text-zinc-500 font-bold uppercase tracking-tighter">Ready for Sovereign Scan</div>
                </div>
                <button onClick={() => setSelectedImage(null)} className="p-1.5 md:p-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-all"><X size={16} /></button>
              </div>
            </div>
          )}

          {classification && !selectedImage && (
            <div className="absolute -top-12 md:-top-16 left-0 right-0 animate-in slide-in-from-bottom-4 fade-in duration-300">
              <div className={`flex items-center gap-2 md:gap-3 ${classification === 'INVALID_EVM_FORMAT' ? 'bg-red-500/10 border-red-500/30' : (isContractDetected ? 'bg-purple-500/10 border-purple-500/30' : 'bg-blue-500/10 border-blue-500/30')} backdrop-blur-2xl px-3 md:px-4 py-1.5 md:py-2 rounded-full border shadow-lg mx-auto w-fit`}>
                <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${classification === 'INVALID_EVM_FORMAT' ? 'text-red-400' : (isContractDetected ? 'text-purple-400' : 'text-blue-400')}`}>
                  {classification.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
          )}

          <div className="relative group">
            <div className="absolute inset-0 bg-purple-500/5 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
            <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[1.5rem] md:rounded-[2rem] px-5 md:px-8 py-2 md:py-3.5 shadow-2xl focus-within:border-purple-500/30 focus-within:ring-1 focus-within:ring-purple-500/20 transition-all flex items-end gap-3 md:gap-4 relative z-10 min-h-[48px] md:min-h-[56px]">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Ask tint anything..."
                rows={1}
                style={{ height: 'auto' }}
                className="flex-1 bg-transparent border-none outline-none text-white text-[14px] md:text-[15px] py-1 md:py-1.5 resize-none min-h-[24px] max-h-[30vh] md:max-h-[40vh] placeholder:text-zinc-800 font-medium custom-scroll leading-normal overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words"
              />
              <div className="flex items-center gap-3 md:gap-4 border-l border-white/5 pl-3 md:pl-4 shrink-0 mb-1">
                <input type="file" ref={fileInputRef} accept="image/*" onChange={(e) => {
                  const f = e.target.files?.[0];
                  if(f){ const r = new FileReader(); r.onload=()=>setSelectedImage(r.result as string); r.readAsDataURL(f); }
                }} className="hidden" />
                <button onClick={() => fileInputRef.current?.click()} className="text-zinc-700 hover:text-white transition-all transform hover:scale-110 active:scale-95"><ImageIcon size={18}/></button>
                <button 
                  onClick={handleSend} 
                  disabled={isAnalyzing || (!input.trim() && !selectedImage)} 
                  className="bg-white text-black p-2 md:p-2.5 rounded-full disabled:opacity-5 transition-all transform hover:scale-105 active:scale-90 shadow-2xl flex items-center justify-center shrink-0"
                >
                  <Send size={16}/>
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
