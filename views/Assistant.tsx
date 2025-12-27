import React, { useState, useRef, useEffect } from 'react';
import { chatWithExpert } from '../services/geminiService';
import { Send, Bot, User, Loader2, Info } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to CoinTint Labs. I am your AI architect. How can I help you engineer your next viral token today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      // Map history format for API
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const response = await chatWithExpert(userMsg, history);
      setMessages(prev => [...prev, { role: 'model', text: response || "I encountered an error in my neural links. Please try again." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Error connecting to AI brain. Check your connection." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col h-[calc(100vh-160px)]">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl cointint-gradient flex items-center justify-center shadow-lg shadow-purple-500/20">
          <Bot className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold">CoinTint AI Expert</h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs text-white/40 uppercase font-bold tracking-widest">Neural Link Active</span>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-3xl flex-grow overflow-hidden flex flex-col">
        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-grow p-6 overflow-y-auto space-y-6 scroll-smooth"
        >
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-white/10'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white/5 border border-white/10 text-white/80 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-2 text-white/40">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-xs font-medium italic">Architect is thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-white/5 border-t border-white/10">
          <div className="relative">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about tokenomics, virality, or marketing strategies..."
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="absolute right-2 top-2 bottom-2 w-10 h-10 rounded-xl cointint-gradient flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-3 px-2 text-[10px] text-white/30 uppercase font-bold tracking-widest">
            <Info size={10} />
            AI can provide insights but always DYOR (Do Your Own Research).
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;