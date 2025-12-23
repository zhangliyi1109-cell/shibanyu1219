
import React, { useState, useRef, useEffect } from 'react';
import { generateChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Sparkles, Waves, Anchor, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: '1', 
      role: 'model', 
      text: '你好啊鱼宝，这里是深海回声。🫧\n\n我是你的深海倾听官。在这里，你可以把那些在浅滩受到的委屈、压力，都封装成瓶中信投向深渊。我会听，也会回应。', 
      timestamp: Date.now() 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || inputValue.trim();
    if (!textToSend) return;

    const userMsg: ChatMessage = { 
      id: Date.now().toString(), 
      role: 'user', 
      text: textToSend, 
      timestamp: Date.now() 
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await generateChatResponse(history, textToSend);
      
      const aiMsg: ChatMessage = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: responseText, 
        timestamp: Date.now() 
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (type: string) => {
      let text = "";
      switch(type) {
          case 'bottle': text = "本鱼有个瓶中信要投向深海... 🍾"; break;
          case 'buoyancy': text = "工作太沉重了，本鱼想学会定深悬浮。😶‍🌫️"; break;
          case 'echo': text = "想听听深海里其他鱼友的故事。🌊"; break;
      }
      handleSendMessage(text);
  };

  return (
    <div className="flex flex-col h-full bg-[#0A192F] relative text-white">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-4 scroll-smooth" ref={scrollRef}>
        <div className="text-center sticky top-0 z-10 py-2">
            <span className="px-4 py-1.5 bg-white/5 backdrop-blur-md border border-white/5 rounded-full text-[9px] font-black text-blue-300/40 uppercase tracking-[0.4em] shadow-lg">Depth: 2000m · Silent Mode</span>
        </div>
        
        {messages.map((msg) => (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'model' && (
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-xl mr-3 shrink-0 border border-blue-400/20 shadow-neon">
                <Waves size={20} className="text-blue-400" />
              </div>
            )}
            
            <div
              className={`max-w-[85%] px-5 py-4 text-sm leading-relaxed shadow-xl whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-blue-600/20 text-blue-100 rounded-3xl rounded-tr-sm border border-blue-500/30'
                  : 'bg-white/5 text-blue-50/80 rounded-3xl rounded-tl-sm border border-white/5 backdrop-blur-md'
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        
        <AnimatePresence>
          {loading && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0 }}
              className="flex justify-start items-end"
            >
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center mr-3 shrink-0 border border-blue-400/20 shadow-neon animate-pulse">
                <Headphones size={20} className="text-blue-400" />
              </div>
              <div className="bg-white/5 px-6 py-4 rounded-3xl rounded-tl-sm text-blue-300/70 text-xs flex flex-col gap-2.5 border border-white/5 backdrop-blur-md shadow-2xl">
                <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-200"></span>
                </div>
                <div className="flex items-center gap-2">
                   <span className="font-black italic tracking-widest uppercase opacity-80">倾听官正在聆听鱼宝的回声...</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="bg-[#0A192F] p-6 pb-8 border-t border-white/5 relative">
        {/* Status indicator bar when loading */}
        {loading && (
          <motion.div 
            initial={{ height: 0 }} 
            animate={{ height: 'auto' }}
            className="absolute -top-8 left-0 right-0 overflow-hidden"
          >
            <div className="bg-blue-600/10 backdrop-blur-md py-1 px-6 flex items-center justify-center gap-2 border-y border-blue-500/10">
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
              <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em]">Ocean current sensing...</span>
            </div>
          </motion.div>
        )}

        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
            <button onClick={() => handleQuickAction('bottle')} className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-300 text-[10px] font-black rounded-full border border-blue-500/10 whitespace-nowrap active:scale-95 transition-all hover:bg-blue-500/20">
                <span className="text-base">🍾</span> 投递心情
            </button>
            <button onClick={() => handleQuickAction('buoyancy')} className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-300 text-[10px] font-black rounded-full border border-purple-500/10 whitespace-nowrap active:scale-95 transition-all hover:bg-purple-500/20">
                <span className="text-base">😶‍🌫️</span> 寻找浮力
            </button>
            <button onClick={() => handleQuickAction('echo')} className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-300 text-[10px] font-black rounded-full border border-cyan-500/10 whitespace-nowrap active:scale-95 transition-all hover:bg-cyan-500/20">
                <span className="text-base">🌊</span> 鱼友广播
            </button>
        </div>

        <div className="flex items-end gap-3">
            <div className="flex-1 bg-white/5 rounded-3xl flex items-center px-5 py-3 min-h-[56px] border border-white/5 focus-within:border-blue-500/30 transition-all shadow-inner">
                <input 
                    className="flex-1 bg-transparent outline-none text-sm text-blue-50 placeholder-blue-300/20 font-medium"
                    placeholder="在这里，向深海吐个泡泡..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                />
            </div>
            
            <button 
                disabled={!inputValue.trim() || loading}
                onClick={() => handleSendMessage()}
                className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 shadow-2xl ${
                    !inputValue.trim() || loading
                    ? 'bg-white/5 text-white/10' 
                    : 'bg-blue-600 text-white shadow-blue-600/30 hover:scale-105 active:scale-95'
                }`}
            >
                {loading ? <Sparkles size={24} className="animate-spin text-blue-300" /> : <Send size={24} />}
            </button>
        </div>
      </div>
    </div>
  );
};
