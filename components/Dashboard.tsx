
import React, { useState } from 'react';
import { UserAccount, HealthLog } from '../types';
import { CustomIcons } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface DashboardProps {
  user: UserAccount;
  onUpdateLog: (log: HealthLog) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onUpdateLog }) => {
  const [isLogging, setIsLogging] = useState(false);
  const [newLog, setNewLog] = useState<Partial<HealthLog>>({
    steps: 0,
    calories: 0,
    waterIntake: 0,
    sleepHours: 0,
    weight: user.logs.length > 0 ? user.logs[user.logs.length - 1].weight : 0,
    heartRate: 72
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateLog({
      ...newLog as HealthLog,
      date: new Date().toISOString().split('T')[0]
    });
    setIsLogging(false);
  };

  const currentStats = user.logs[user.logs.length - 1] || {
    steps: 0, calories: 0, waterIntake: 0, sleepHours: 0, weight: 0, heartRate: 0
  };

  const statCards = [
    { label: 'Kinetic Energy', value: currentStats.steps, target: 10000, icon: <CustomIcons.Bolt className="w-6 h-6" />, color: 'text-emerald-400' },
    { label: 'Fluid Level', value: `${currentStats.waterIntake}ml`, target: 2500, icon: <CustomIcons.Droplet className="w-6 h-6" />, color: 'text-blue-400' },
    { label: 'Sleep Phase', value: `${currentStats.sleepHours}h`, target: 8, icon: <CustomIcons.Moon className="w-6 h-6" />, color: 'text-indigo-400' },
    { label: 'Cardiac Rhythm', value: `${currentStats.heartRate}bpm`, target: 60, icon: <CustomIcons.Heart className="w-6 h-6" />, color: 'text-rose-400' },
  ];

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Status: {user.name}</h1>
          <p className="text-slate-500 text-[10px] uppercase font-black tracking-[0.4em] mt-1">Biometric Analysis Module 8.1</p>
        </div>
        <button 
          onClick={() => setIsLogging(true)}
          className="px-10 py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 active:scale-95"
        >
          <CustomIcons.Plus className="w-4 h-4" />
          Update Vitals
        </button>
      </header>

      {/* Advanced Stats Deck */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat, idx) => (
          <div key={idx} className="glass rounded-[2.5rem] p-10 relative overflow-hidden group border-white/5">
            <div className={`w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 ${stat.color} shadow-lg shadow-black/50`}>
              {stat.icon}
            </div>
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em]">{stat.label}</p>
            <p className="text-3xl font-black text-white mt-2 tracking-tighter">{stat.value}</p>
            <div className="mt-8 w-full bg-slate-900/80 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-emerald-500 h-1.5 rounded-full transition-all duration-1000" 
                style={{ width: `${Math.min(100, (parseFloat(stat.value.toString()) / stat.target) * 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Biometric Visualization Core */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass rounded-[3rem] p-10 border-white/5">
          <h3 className="text-sm font-black text-white uppercase tracking-[0.4em] mb-10 flex items-center gap-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            Neural Kinetic Trends
          </h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={user.logs}>
                <defs>
                  <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="date" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', color: '#f8fafc', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area type="monotone" dataKey="steps" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorSteps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-[3rem] p-10 border-white/5">
          <h3 className="text-sm font-black text-white uppercase tracking-[0.4em] mb-10 flex items-center gap-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Hydration Equilibrium
          </h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={user.logs}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="date" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  cursor={{ fill: '#1e293b', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', color: '#f8fafc', fontSize: '10px' }}
                />
                <Bar dataKey="waterIntake" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Biometric Input Terminal */}
      {isLogging && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl">
          <div className="glass w-full max-w-xl rounded-[3rem] p-12 animate-in zoom-in-95 duration-300 border-white/5 shadow-2xl">
            <h2 className="text-3xl font-black mb-10 uppercase tracking-tighter text-white">Input Daily Data</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3">Steps Taken</label>
                  <input 
                    type="number" 
                    value={newLog.steps}
                    onChange={(e) => setNewLog({ ...newLog, steps: parseInt(e.target.value) })}
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 outline-none text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3">Net Caloric Output</label>
                  <input 
                    type="number" 
                    value={newLog.calories}
                    onChange={(e) => setNewLog({ ...newLog, calories: parseInt(e.target.value) })}
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 outline-none text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3">Water Absorption (ml)</label>
                  <input 
                    type="number" 
                    value={newLog.waterIntake}
                    onChange={(e) => setNewLog({ ...newLog, waterIntake: parseInt(e.target.value) })}
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 outline-none text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3">Sleep Cycle (hrs)</label>
                  <input 
                    type="number" 
                    step="0.5"
                    value={newLog.sleepHours}
                    onChange={(e) => setNewLog({ ...newLog, sleepHours: parseFloat(e.target.value) })}
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-emerald-500 outline-none text-white font-mono"
                  />
                </div>
              </div>
              <div className="flex gap-6 mt-12">
                <button 
                  type="button"
                  onClick={() => setIsLogging(false)}
                  className="flex-1 py-5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/20"
                >
                  Commit Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
