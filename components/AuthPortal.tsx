
import React, { useState } from 'react';
import { UserAccount } from '../types';
import { CustomIcons } from '../constants';

interface AuthPortalProps {
  accounts: UserAccount[];
  onLogin: (acc: UserAccount) => void;
  onRegister: (acc: UserAccount) => void;
}

type AuthState = 'LANDING' | 'LOGIN' | 'REGISTER';

const AuthPortal: React.FC<AuthPortalProps> = ({ accounts, onLogin, onRegister }) => {
  const [authState, setAuthState] = useState<AuthState>('LANDING');
  const [formData, setFormData] = useState({ username: '', password: '', name: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (authState === 'LOGIN') {
      const user = accounts.find(a => a.username === formData.username && a.password === formData.password);
      if (user) {
        onLogin(user);
      } else {
        setError('Verification failed. Invalid biological signature.');
      }
    } else {
      if (accounts.some(a => a.username === formData.username)) {
        setError('Subject identifier already exists in database.');
        return;
      }
      const newAcc: UserAccount = {
        id: Date.now().toString(),
        username: formData.username,
        password: formData.password,
        name: formData.name,
        avatar: `https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200`,
        targetWeight: 75,
        logs: [],
        preferences: [],
        videos: [],
        role: 'user'
      };
      onRegister(newAcc);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent opacity-60"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
      
      <div className="glass max-w-md w-full rounded-[2rem] p-10 relative z-10 border-emerald-500/10 shadow-[0_0_50px_rgba(16,185,129,0.05)] animate-in zoom-in-95 duration-700">
        
        {authState === 'LANDING' ? (
          <div className="flex flex-col items-center text-center space-y-8 py-4">
            <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center mb-2 neon-border shadow-2xl shadow-emerald-500/40 transform rotate-3">
              <CustomIcons.Heart className="w-12 h-12 text-white" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tighter text-white">VITALI</h1>
              <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em] font-bold">Health Intelligence Core</p>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-[280px]">
              Synchronize your vitals, monitor performance, and optimize your biological interface.
            </p>

            <div className="w-full space-y-3">
              <button 
                onClick={() => setAuthState('LOGIN')}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 transition-all active:scale-[0.97]"
              >
                Sign In
              </button>
              <button 
                onClick={() => setAuthState('REGISTER')}
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-[0.97]"
              >
                Create Account
              </button>
            </div>

            <div className="pt-4 border-t border-slate-900 w-full">
               <p className="text-[9px] text-slate-600 font-mono">ENCRYPTED CONNECTION ESTABLISHED // V2.4.0</p>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={() => { setAuthState('LANDING'); setError(''); }}
              className="mb-8 text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 hover:text-emerald-400 transition-colors"
            >
              ← Back to interface
            </button>

            <div className="mb-10 text-center">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                {authState === 'LOGIN' ? 'Access Uplink' : 'Subject Registration'}
              </h2>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mt-1">
                {authState === 'LOGIN' ? 'Enter Credentials' : 'Create Biological Profile'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {authState === 'REGISTER' && (
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Display Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-900/40 border border-slate-800 rounded-xl px-4 py-4 text-sm focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-700"
                    placeholder="E.g. John Doe"
                  />
                </div>
              )}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Subject Username</label>
                <input 
                  required
                  type="text" 
                  value={formData.username}
                  onChange={e => setFormData({...formData, username: e.target.value})}
                  className="w-full bg-slate-900/40 border border-slate-800 rounded-xl px-4 py-4 text-sm focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-700"
                  placeholder="admin"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Security Code</label>
                <input 
                  required
                  type="password" 
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-slate-900/40 border border-slate-800 rounded-xl px-4 py-4 text-sm focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-700"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="bg-rose-500/5 border border-rose-500/10 text-rose-500 text-[10px] font-black uppercase p-4 rounded-xl text-center">
                  {error}
                </div>
              )}

              <button 
                type="submit"
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 transition-all active:scale-[0.98] mt-6"
              >
                {authState === 'LOGIN' ? 'Authorize' : 'Initialize Profile'}
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <button 
                onClick={() => { setAuthState(authState === 'LOGIN' ? 'REGISTER' : 'LOGIN'); setError(''); }}
                className="text-[10px] font-black text-slate-600 uppercase tracking-widest hover:text-emerald-400 transition-colors"
              >
                {authState === 'LOGIN' ? "Need a new profile?" : "Already registered?"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPortal;
