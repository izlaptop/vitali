
import React, { useState, useRef, useEffect } from 'react';
import { UserAccount } from '../types';
import { getHealthAdvice } from '../services/gemini';
import { CustomIcons } from '../constants';

interface AICoachProps {
  user: UserAccount;
}

const AICoach: React.FC<AICoachProps> = ({ user }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    { role: 'ai', content: "Vitali analysis engine initialized. I have reviewed your latest biometric logs. How may I assist your health journey today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const advice = await getHealthAdvice(user.logs[user.logs.length - 1], userMsg);
    setMessages(prev => [...prev, { role: 'ai', content: advice || "Analysis failed to yield conclusive data." }]);
    setIsLoading(false);
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold text-white flex items-center gap-4">
          Vitali AI Analyst
          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs rounded border border-emerald-500/20 uppercase tracking-widest">Active</span>
        </h1>
        <p className="text-slate-400">Deep biological insights powered by advanced reasoning.</p>
      </header>

      <div className="flex-1 glass rounded-2xl flex flex-col overflow-hidden">
        <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700 flex gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-900/50 border-t border-slate-800">
          <div className="flex gap-4">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about your metrics, meal ideas, or workout optimization..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 text-white rounded-xl font-bold transition-all"
            >
              Analyze
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoach;
