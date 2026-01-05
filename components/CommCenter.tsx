
import React, { useState } from 'react';
import { UserAccount, ChatMessage } from '../types';
import { CustomIcons } from '../constants';

interface CommCenterProps {
  user: UserAccount;
  messages: ChatMessage[];
  onSendMessage: (text: string, code: string) => void;
}

const CommCenter: React.FC<CommCenterProps> = ({ user, messages, onSendMessage }) => {
  const [activeCode, setActiveCode] = useState('GLOBAL-01');
  const [inputText, setInputText] = useState('');

  const filteredMessages = messages.filter(m => m.code === activeCode);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText, activeCode);
    setInputText('');
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col gap-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white">COMM CENTER</h1>
          <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Encrypted Node: {activeCode}</p>
        </div>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={activeCode}
            onChange={e => setActiveCode(e.target.value.toUpperCase())}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1 text-xs text-emerald-400 font-mono outline-none focus:border-emerald-500"
            placeholder="SYNC CODE"
          />
        </div>
      </header>

      <div className="flex-1 glass rounded-3xl flex flex-col overflow-hidden border-emerald-500/10">
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {filteredMessages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-10">
               <CustomIcons.Signal className="w-16 h-16 text-slate-500" />
               <p className="text-[10px] uppercase tracking-[0.4em] font-black mt-6 text-slate-500">Awaiting Signal Link...</p>
            </div>
          )}
          {filteredMessages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.senderId === user.id ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{msg.senderName}</span>
                <span className="text-[8px] text-slate-600 font-mono">{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className={`max-w-[70%] p-4 rounded-2xl ${msg.senderId === user.id ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-300 rounded-tl-none border border-slate-700'}`}>
                <p className="text-sm font-medium">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-900/80 border-t border-slate-800 flex gap-4">
          <input 
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Transmitting data packet..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 outline-none transition-all"
          />
          <button 
            onClick={handleSend}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs transition-all active:scale-95"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommCenter;
