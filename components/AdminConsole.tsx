
import React, { useState } from 'react';
import { UserAccount } from '../types';

interface AdminConsoleProps {
  accounts: UserAccount[];
  onUpdateAccounts: (accs: UserAccount[]) => void;
}

const AdminConsole: React.FC<AdminConsoleProps> = ({ accounts, onUpdateAccounts }) => {
  const [editingAcc, setEditingAcc] = useState<UserAccount | null>(null);

  const deleteAccount = (id: string) => {
    if (id === 'admin-0') return;
    if (window.confirm("ARE YOU SURE YOU WANT TO PURGE THIS DATA PACKET?")) {
      onUpdateAccounts(accounts.filter(a => a.id !== id));
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAcc) return;
    const updated = accounts.map(a => a.id === editingAcc.id ? editingAcc : a);
    onUpdateAccounts(updated);
    setEditingAcc(null);
  };

  const totalLogs = accounts.reduce((sum, acc) => sum + acc.logs.length, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24">
      <header>
        <h1 className="text-3xl font-black text-rose-500 uppercase tracking-tighter">SYSTEM CONTROL CENTER</h1>
        <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Universal Root Access Level: OMEGA</p>
      </header>

      {/* Global Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-3xl border-rose-500/20">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Active Subjects</p>
          <p className="text-3xl font-black text-white">{accounts.length}</p>
        </div>
        <div className="glass p-6 rounded-3xl border-emerald-500/20">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Data Packets Logged</p>
          <p className="text-3xl font-black text-emerald-400">{totalLogs}</p>
        </div>
        <div className="glass p-6 rounded-3xl border-blue-500/20">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">System Uptime</p>
          <p className="text-3xl font-black text-blue-400">99.9%</p>
        </div>
      </div>

      <div className="glass rounded-3xl overflow-hidden border-rose-500/10 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs uppercase font-black">
            <thead className="bg-slate-900/80 border-b border-slate-800">
              <tr>
                <th className="px-6 py-5 tracking-widest text-slate-500">Subject Identity</th>
                <th className="px-6 py-5 tracking-widest text-slate-500">Uplink Code</th>
                <th className="px-6 py-5 tracking-widest text-slate-500">Metric Units</th>
                <th className="px-6 py-5 tracking-widest text-slate-500 text-right">Command</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {accounts.map(acc => (
                <tr key={acc.id} className="hover:bg-slate-900/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img src={acc.avatar} className="w-10 h-10 rounded-xl object-cover border border-slate-800 group-hover:border-rose-500/50 transition-all" />
                      <div>
                        <span className="text-white block">{acc.name}</span>
                        <span className="text-[9px] text-slate-600 tracking-tighter">{acc.role === 'admin' ? 'ROOT_USER' : 'STANDARD_USER'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-400 font-mono tracking-tighter">{acc.username}</td>
                  <td className="px-6 py-5 text-emerald-400 font-mono">{acc.logs.length} PTS</td>
                  <td className="px-6 py-5 text-right space-x-4">
                    <button 
                      onClick={() => setEditingAcc(acc)}
                      className="text-emerald-500 hover:text-emerald-400 font-black tracking-widest transition-colors"
                    >
                      MODIFY
                    </button>
                    {acc.id !== 'admin-0' && (
                      <button 
                        onClick={() => deleteAccount(acc.id)}
                        className="text-rose-500 hover:text-rose-400 font-black tracking-widest transition-colors"
                      >
                        PURGE
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingAcc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="glass w-full max-w-lg p-10 rounded-[2.5rem] border-rose-500/30 shadow-[0_0_80px_rgba(244,63,94,0.1)]">
            <h2 className="text-2xl font-black mb-8 uppercase tracking-widest text-white flex items-center gap-3">
              <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
              Modifying Identity Profile
            </h2>
            <form onSubmit={handleSaveEdit} className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-500 block mb-2 tracking-widest">Public Identifier</label>
                <input 
                  type="text" 
                  value={editingAcc.name}
                  onChange={e => setEditingAcc({...editingAcc, name: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-sm outline-none focus:border-rose-500 transition-all text-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-500 block mb-2 tracking-widest">Target Biological Mass (kg)</label>
                <input 
                  type="number" 
                  value={editingAcc.targetWeight}
                  onChange={e => setEditingAcc({...editingAcc, targetWeight: parseFloat(e.target.value)})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-sm outline-none focus:border-rose-500 transition-all text-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-500 block mb-2 tracking-widest">Account Authority</label>
                <select 
                  value={editingAcc.role}
                  onChange={e => setEditingAcc({...editingAcc, role: e.target.value as 'user' | 'admin'})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-sm outline-none focus:border-rose-500 transition-all text-white appearance-none"
                >
                  <option value="user">STANDARD ACCESS</option>
                  <option value="admin">ROOT ACCESS</option>
                </select>
              </div>
              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setEditingAcc(null)} className="flex-1 py-4 bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest">Abort</button>
                <button type="submit" className="flex-1 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-500/20">Commit Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminConsole;
