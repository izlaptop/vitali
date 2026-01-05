
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
    heartRate: 70
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
    { label: 'Steps', value: currentStats.steps, target: 10000, icon: <CustomIcons.Bolt className="w-6 h-6 text-orange-400" />, color: 'bg-orange-500/10 text-orange-400' },
    { label: 'Hydration', value: `${currentStats.waterIntake}ml`, target: 2500, icon: <CustomIcons.Droplet className="w-6 h-6 text-blue-400" />, color: 'bg-blue-500/10 text-blue-400' },
    { label: 'Sleep', value: `${currentStats.sleepHours}h`, target: 8, icon: <CustomIcons.Moon className="w-6 h-6 text-indigo-400" />, color: 'bg-indigo-500/10 text-indigo-400' },
    { label: 'Heart Rate', value: `${currentStats.heartRate}bpm`, target: 60, icon: <CustomIcons.Heart className="w-6 h-6 text-rose-400" />, color: 'bg-rose-500/10 text-rose-400' },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">System Status: {user.name}</h1>
          <p className="text-slate-400">Analysis complete. Vitals operating within expected parameters.</p>
        </div>
        <button 
          onClick={() => setIsLogging(true)}
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
        >
          <CustomIcons.Plus className="w-5 h-5" />
          Update Vitals
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className="glass rounded-2xl p-6 relative overflow-hidden group">
            <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            <div className="mt-4 w-full bg-slate-800 rounded-full h-1.5">
              <div 
                className="bg-emerald-500 h-1.5 rounded-full transition-all duration-1000" 
                style={{ width: `${Math.min(100, (parseFloat(stat.value.toString()) / stat.target) * 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Biometric Trends
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={user.logs}>
                <defs>
                  <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#f8fafc' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area type="monotone" dataKey="steps" stroke="#10b981" fillOpacity={1} fill="url(#colorSteps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Hydration Logs
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={user.logs}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#334155', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#f8fafc' }}
                />
                <Bar dataKey="waterIntake" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Log Modal */}
      {isLogging && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass w-full max-w-lg rounded-2xl p-8 animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold mb-6">Log Daily Metrics</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Steps</label>
                  <input 
                    type="number" 
                    value={newLog.steps}
                    onChange={(e) => setNewLog({ ...newLog, steps: parseInt(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Calories</label>
                  <input 
                    type="number" 
                    value={newLog.calories}
                    onChange={(e) => setNewLog({ ...newLog, calories: parseInt(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Water (ml)</label>
                  <input 
                    type="number" 
                    value={newLog.waterIntake}
                    onChange={(e) => setNewLog({ ...newLog, waterIntake: parseInt(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Sleep (hrs)</label>
                  <input 
                    type="number" 
                    step="0.5"
                    value={newLog.sleepHours}
                    onChange={(e) => setNewLog({ ...newLog, sleepHours: parseFloat(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button 
                  type="button"
                  onClick={() => setIsLogging(false)}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/20"
                >
                  Confirm Logs
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
