
import React, { useState, useEffect } from 'react';

const GameZone: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'NONE' | 'AGILITY' | 'BALANCE'>('NONE');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [timeLeft, setTimeLeft] = useState(30);

  // Agility Logic
  const spawnAgility = () => setPos({ x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 });
  const handleAgilityClick = () => {
    setScore(s => s + 1);
    spawnAgility();
  };

  // Balance Logic (Falling items)
  const [items, setItems] = useState<{ id: number, x: number, y: number, type: 'HEALTHY' | 'UNHEALTHY' }[]>([]);
  
  useEffect(() => {
    let interval: any;
    if (activeGame === 'BALANCE') {
      interval = setInterval(() => {
        // Fix: Cast the type to ensure it conforms to "HEALTHY" | "UNHEALTHY" union
        setItems(prev => [
          ...prev.map(i => ({ ...i, y: i.y + 2 })),
          { 
            id: Date.now(), 
            x: Math.random() * 90 + 5, 
            y: 0, 
            type: (Math.random() > 0.3 ? 'HEALTHY' : 'UNHEALTHY') as 'HEALTHY' | 'UNHEALTHY'
          }
        ].filter(i => i.y < 100));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [activeGame]);

  const handleItemClick = (id: number, type: 'HEALTHY' | 'UNHEALTHY') => {
    if (type === 'HEALTHY') setScore(s => s + 10);
    else setScore(s => Math.max(0, s - 20));
    setItems(prev => prev.filter(i => i.id !== id));
  };

  useEffect(() => {
    let timer: any;
    if (activeGame !== 'NONE' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      if (score > highScore) setHighScore(score);
      setActiveGame('NONE');
    }
    return () => clearInterval(timer);
  }, [activeGame, timeLeft, score, highScore]);

  const startGame = (type: 'AGILITY' | 'BALANCE') => {
    setScore(0);
    setTimeLeft(20);
    setActiveGame(type);
    if (type === 'AGILITY') spawnAgility();
    if (type === 'BALANCE') setItems([]);
  };

  return (
    <div className="space-y-8 pb-24">
      <header>
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">COGNITIVE TRAINING ARCADE</h1>
        <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Bio-Neural Performance Optimization</p>
      </header>

      {activeGame === 'NONE' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass p-8 rounded-[2.5rem] border-emerald-500/10 flex flex-col items-center text-center group hover:border-emerald-500/30 transition-all cursor-pointer shadow-2xl" onClick={() => startGame('AGILITY')}>
            <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mb-6 text-emerald-500 text-4xl group-hover:scale-110 transition-transform">⚡</div>
            <h2 className="text-xl font-black text-white mb-2 uppercase tracking-widest">Neural Agility</h2>
            <p className="text-slate-500 text-xs uppercase font-bold tracking-tight mb-8">Test sensory processing speed and hand-eye synchronization.</p>
            <button className="px-8 py-3 bg-emerald-500 text-white rounded-xl font-black uppercase text-[10px] tracking-widest">Initialize Sequence</button>
          </div>

          <div className="glass p-8 rounded-[2.5rem] border-blue-500/10 flex flex-col items-center text-center group hover:border-blue-500/30 transition-all cursor-pointer shadow-2xl" onClick={() => startGame('BALANCE')}>
            <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mb-6 text-blue-500 text-4xl group-hover:scale-110 transition-transform">🍎</div>
            <h2 className="text-xl font-black text-white mb-2 uppercase tracking-widest">Metabolic Balance</h2>
            <p className="text-slate-500 text-xs uppercase font-bold tracking-tight mb-8">Identify and absorb beneficial nutrients while filtering waste.</p>
            <button className="px-8 py-3 bg-blue-500 text-white rounded-xl font-black uppercase text-[10px] tracking-widest">Start Digestion</button>
          </div>
        </div>
      ) : (
        <div className="glass h-[600px] rounded-[3rem] relative overflow-hidden border-emerald-500/20 shadow-inner">
          <div className="absolute top-8 left-8 flex items-center gap-6">
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Units Gathered</p>
              <p className="text-3xl font-black text-emerald-400">{score}</p>
            </div>
            <div className="w-px h-10 bg-slate-800"></div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Uplink Time</p>
              <p className="text-3xl font-black text-rose-500">{timeLeft}s</p>
            </div>
          </div>

          {activeGame === 'AGILITY' && (
            <button 
              onClick={handleAgilityClick}
              style={{ top: `${pos.y}%`, left: `${pos.x}%` }}
              className="absolute w-16 h-16 bg-emerald-500 rounded-full neon-border shadow-[0_0_30px_rgba(16,185,129,0.5)] border-4 border-white/20 transition-all active:scale-90 flex items-center justify-center"
            >
              <span className="text-2xl">⚡</span>
            </button>
          )}

          {activeGame === 'BALANCE' && (
            <div className="absolute inset-0">
              {items.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id, item.type)}
                  style={{ top: `${item.y}%`, left: `${item.x}%` }}
                  className={`absolute w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-transform active:scale-95 shadow-xl ${item.type === 'HEALTHY' ? 'bg-emerald-500/20 border border-emerald-500/50' : 'bg-rose-500/20 border border-rose-500/50'}`}
                >
                  {item.type === 'HEALTHY' ? '🥑' : '🍩'}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {highScore > 0 && activeGame === 'NONE' && (
        <div className="text-center">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">Global Record: {highScore} Units</p>
        </div>
      )}
    </div>
  );
};

export default GameZone;
