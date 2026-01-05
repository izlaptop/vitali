
import React, { useState, useEffect } from 'react';
import { CustomIcons } from '../constants';

const GameZone: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'NONE' | 'AGILITY' | 'BALANCE'>('NONE');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [timeLeft, setTimeLeft] = useState(20);

  const [items, setItems] = useState<{ id: number, x: number, y: number, type: 'HEALTHY' | 'UNHEALTHY' }[]>([]);
  
  const spawnAgility = () => setPos({ x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 });

  useEffect(() => {
    let interval: any;
    if (activeGame === 'BALANCE') {
      interval = setInterval(() => {
        setItems(prev => [
          ...prev.map(i => ({ ...i, y: i.y + 1.5 })),
          { 
            id: Date.now() + Math.random(), 
            x: Math.random() * 90 + 5, 
            y: -10, 
            type: (Math.random() > 0.4 ? 'HEALTHY' : 'UNHEALTHY') as 'HEALTHY' | 'UNHEALTHY'
          }
        ].filter(i => i.y < 110));
      }, 80);
    }
    return () => clearInterval(interval);
  }, [activeGame]);

  useEffect(() => {
    let timer: any;
    if (activeGame !== 'NONE' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && activeGame !== 'NONE') {
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
    <div className="space-y-10 pb-24">
      <header>
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Bio-Neural Training</h1>
        <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em] font-black">Performance Optimization Protocol</p>
      </header>

      {activeGame === 'NONE' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            onClick={() => startGame('AGILITY')}
            className="glass p-12 rounded-[3rem] border-emerald-500/10 group hover:border-emerald-400/30 transition-all cursor-pointer shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
               <CustomIcons.Bolt className="w-24 h-24" />
            </div>
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 text-emerald-400">
               <CustomIcons.Bolt className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-white mb-3 uppercase tracking-widest">Agility Reflex</h2>
            <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest leading-relaxed mb-10">Capture rapid neural impulses to verify synaptic response velocity.</p>
            <button className="px-10 py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase text-[9px] tracking-[0.3em] group-hover:bg-emerald-400 transition-colors">Initialize Test</button>
          </div>

          <div 
            onClick={() => startGame('BALANCE')}
            className="glass p-12 rounded-[3rem] border-blue-500/10 group hover:border-blue-400/30 transition-all cursor-pointer shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
               <CustomIcons.Droplet className="w-24 h-24" />
            </div>
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 text-blue-400">
               <CustomIcons.Droplet className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-white mb-3 uppercase tracking-widest">Molecular Filter</h2>
            <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest leading-relaxed mb-10">Isolate organic nutrients from synthetic contaminants in real-time.</p>
            <button className="px-10 py-4 bg-blue-500 text-white rounded-2xl font-black uppercase text-[9px] tracking-[0.3em] group-hover:bg-blue-400 transition-colors">Start Filtration</button>
          </div>
        </div>
      ) : (
        <div className="glass h-[650px] rounded-[3.5rem] relative overflow-hidden border-slate-800 shadow-inner">
          <div className="absolute top-10 left-10 flex items-center gap-12 z-10 backdrop-blur-md p-6 rounded-3xl border border-white/5 bg-slate-900/40">
            <div>
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Score Matrix</p>
              <p className="text-4xl font-black text-white tracking-tighter font-mono">{score.toString().padStart(4, '0')}</p>
            </div>
            <div className="w-px h-12 bg-slate-800"></div>
            <div>
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Time Remaining</p>
              <p className="text-4xl font-black text-rose-500 tracking-tighter font-mono">{timeLeft}s</p>
            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none opacity-30">
             <div className="w-full h-full bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:40px_40px]"></div>
          </div>

          {activeGame === 'AGILITY' && (
            <button 
              onClick={(e) => { e.stopPropagation(); setScore(s => s + 25); spawnAgility(); }}
              style={{ top: `${pos.y}%`, left: `${pos.x}%` }}
              className="absolute w-20 h-20 group transition-all active:scale-90"
            >
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping"></div>
              <div className="relative w-full h-full bg-slate-950 border-2 border-emerald-500 rounded-full shadow-[0_0_40px_rgba(16,185,129,0.4)] flex items-center justify-center overflow-hidden">
                 <CustomIcons.Bolt className="w-8 h-8 text-emerald-400 animate-pulse" />
                 <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent"></div>
              </div>
            </button>
          )}

          {activeGame === 'BALANCE' && (
            <div className="absolute inset-0">
              {items.map(item => (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.type === 'HEALTHY') setScore(s => s + 50);
                    else setScore(s => Math.max(0, s - 100));
                    setItems(prev => prev.filter(i => i.id !== item.id));
                  }}
                  style={{ top: `${item.y}%`, left: `${item.x}%` }}
                  className="absolute w-16 h-16 transition-transform active:scale-95"
                >
                  {item.type === 'HEALTHY' ? (
                    <div className="w-full h-full flex flex-col items-center">
                       <CustomIcons.BioOrganism className="w-full h-full" color="#10b981" />
                       <span className="text-[6px] font-black text-emerald-500 uppercase tracking-tighter mt-1">Organic</span>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center">
                       <CustomIcons.SyntheticHazard className="w-full h-full" />
                       <span className="text-[6px] font-black text-rose-500 uppercase tracking-tighter mt-1">Hazard</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
          
          <div className="absolute bottom-10 left-0 right-0 flex justify-center">
             <button onClick={() => setActiveGame('NONE')} className="px-8 py-3 glass text-rose-500 border-rose-500/20 rounded-xl text-[8px] font-black uppercase tracking-[0.4em] hover:bg-rose-500/10 transition-colors">Abort Simulation</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameZone;
