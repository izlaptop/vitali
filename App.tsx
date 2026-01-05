
import React, { useState, useEffect } from 'react';
import { UserAccount, AppView, HealthLog, ChatMessage, VideoEntry } from './types';
import { CustomIcons } from './constants';
import Dashboard from './components/Dashboard';
import RecipeBook from './components/RecipeBook';
import AICoach from './components/AICoach';
import AuthPortal from './components/AuthPortal';
import CommCenter from './components/CommCenter';
import GameZone from './components/GameZone';
import MediaVault from './components/MediaVault';
import AdminConsole from './components/AdminConsole';

const App: React.FC = () => {
  const [activeAccount, setActiveAccount] = useState<UserAccount | null>(null);
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [isInitialized, setIsInitialized] = useState(false);
  const [booting, setBooting] = useState(true);
  const [globalChat, setGlobalChat] = useState<ChatMessage[]>([]);

  useEffect(() => {
    // Universal Storage Management
    const initSystem = () => {
      try {
        const savedAccounts = localStorage.getItem('vitali_v3_core');
        const savedChat = localStorage.getItem('vitali_global_comm');
        
        if (savedAccounts) {
          setAccounts(JSON.parse(savedAccounts));
        } else {
          // Default System Account
          const root: UserAccount = {
            id: 'system-root',
            username: 'admin',
            password: 'password',
            name: 'SYSTEM ROOT',
            avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200',
            targetWeight: 80,
            preferences: ['Control'],
            logs: [],
            videos: [],
            role: 'admin'
          };
          setAccounts([root]);
          localStorage.setItem('vitali_v3_core', JSON.stringify([root]));
        }

        if (savedChat) {
          setGlobalChat(JSON.parse(savedChat));
        }

        setTimeout(() => setBooting(false), 2500);
        setIsInitialized(true);
      } catch (e) {
        console.error("Critical System Initialization Error:", e);
        localStorage.clear();
        window.location.reload();
      }
    };

    initSystem();
  }, []);

  const syncDatabase = (updatedAccounts: UserAccount[]) => {
    setAccounts(updatedAccounts);
    localStorage.setItem('vitali_v3_core', JSON.stringify(updatedAccounts));
  };

  const handleUpdateAccount = (updatedAcc: UserAccount) => {
    const updated = accounts.map(a => a.id === updatedAcc.id ? updatedAcc : a);
    syncDatabase(updated);
    setActiveAccount(updatedAcc);
  };

  const handleUpdateLog = (log: HealthLog) => {
    if (!activeAccount) return;
    const updated = {
      ...activeAccount,
      logs: [...activeAccount.logs, log].slice(-60)
    };
    handleUpdateAccount(updated);
  };

  const handleAddVideo = (video: VideoEntry) => {
    if (!activeAccount) return;
    const updated = {
      ...activeAccount,
      videos: [...activeAccount.videos, video]
    };
    handleUpdateAccount(updated);
  };

  const handleSendChat = (text: string, code: string) => {
    if (!activeAccount) return;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: activeAccount.id,
      senderName: activeAccount.name,
      text,
      timestamp: Date.now(),
      code
    };
    const updatedChat = [...globalChat, newMessage].slice(-100);
    setGlobalChat(updatedChat);
    localStorage.setItem('vitali_global_comm', JSON.stringify(updatedChat));
  };

  const navItems = [
    { id: 'dashboard', icon: <CustomIcons.Bolt />, label: 'Vitals' },
    { id: 'recipes', icon: <CustomIcons.Chef />, label: 'Fuel' },
    { id: 'coach', icon: <CustomIcons.Heart />, label: 'Coach' },
    { id: 'comm', icon: <CustomIcons.Message />, label: 'Chat' },
    { id: 'games', icon: <CustomIcons.Game />, label: 'Train' },
    { id: 'vault', icon: <CustomIcons.Video />, label: 'Vault' },
    ...(activeAccount?.role === 'admin' ? [{ id: 'admin', icon: <CustomIcons.Settings />, label: 'Root' }] : [])
  ];

  if (booting) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center p-10 z-[1000]">
        <div className="w-1 h-20 bg-emerald-500 animate-pulse mb-6"></div>
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-black text-white tracking-[0.5em] animate-pulse">VITALI INITIALIZING</h1>
          <div className="flex gap-1 justify-center">
            <div className="w-1 h-1 bg-emerald-500 animate-ping"></div>
            <div className="w-1 h-1 bg-emerald-500 animate-ping [animation-delay:0.2s]"></div>
            <div className="w-1 h-1 bg-emerald-500 animate-ping [animation-delay:0.4s]"></div>
          </div>
        </div>
        <div className="mt-10 font-mono text-[8px] text-emerald-500/40 uppercase tracking-widest max-w-xs text-center">
          Kernel Loaded // Bio-Metric Sync Active // Encryption Layer: OMEGA-4 // Account Handler Ready
        </div>
      </div>
    );
  }

  if (!activeAccount) {
    return (
      <AuthPortal 
        accounts={accounts} 
        onLogin={setActiveAccount} 
        onRegister={(acc) => {
          const updated = [...accounts, acc];
          syncDatabase(updated);
          setActiveAccount(acc);
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white overflow-hidden">
      
      {/* Sidebar - Pro Layout */}
      <nav className="hidden md:flex w-20 lg:w-64 glass border-r border-slate-800 flex-col sticky top-0 z-50 h-screen shrink-0">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center neon-border">
            <CustomIcons.Heart className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter hidden lg:block uppercase">Vitali</span>
        </div>

        <div className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setCurrentView(item.id as AppView)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all border ${currentView === item.id ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-lg shadow-emerald-500/5' : 'hover:bg-slate-800/50 text-slate-500 border-transparent'}`}
            >
              <div className="w-5 h-5 shrink-0">{item.icon}</div>
              <span className="font-bold hidden lg:block uppercase tracking-widest text-[9px]">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6 mt-auto border-t border-slate-900">
           <button 
             onClick={() => setActiveAccount(null)}
             className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-900 transition-all text-left group"
           >
             <div className="relative">
               <img src={activeAccount.avatar} alt="" className="w-10 h-10 rounded-xl object-cover border border-slate-800" />
               <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950"></div>
             </div>
             <div className="hidden lg:block overflow-hidden">
               <p className="text-[10px] font-black text-white truncate uppercase">{activeAccount.name}</p>
               <p className="text-[8px] text-rose-500 uppercase font-black tracking-tighter group-hover:underline">Disconnect</p>
             </div>
           </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-950 relative pb-24 md:pb-0">
        <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>
        
        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center justify-between p-6 glass border-b border-slate-800 sticky top-0 z-[60]">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                <CustomIcons.Heart className="w-6 h-6 text-white" />
              </div>
              <span className="font-black tracking-[0.2em] text-[10px] uppercase text-emerald-400">Core Uplink</span>
           </div>
           <button onClick={() => setActiveAccount(null)} className="p-1 border border-slate-800 rounded-xl">
              <img src={activeAccount.avatar} alt="" className="w-8 h-8 rounded-lg object-cover" />
           </button>
        </div>

        <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          {currentView === 'dashboard' && <Dashboard user={activeAccount} onUpdateLog={handleUpdateLog} />}
          {currentView === 'recipes' && <RecipeBook preferences={activeAccount.preferences} />}
          {currentView === 'coach' && <AICoach user={activeAccount} />}
          {currentView === 'comm' && <CommCenter user={activeAccount} messages={globalChat} onSendMessage={handleSendChat} />}
          {currentView === 'games' && <GameZone />}
          {currentView === 'vault' && <MediaVault user={activeAccount} onAddVideo={handleAddVideo} />}
          {currentView === 'admin' && activeAccount.role === 'admin' && (
            <AdminConsole 
              accounts={accounts} 
              onUpdateAccounts={(accs) => {
                syncDatabase(accs);
                const stillExists = accs.find(a => a.id === activeAccount.id);
                if (!stillExists) setActiveAccount(null);
                else setActiveAccount(stillExists);
              }} 
            />
          )}
        </div>
      </main>

      {/* Mobile Control Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 glass border-t border-slate-800 z-[60] px-4 flex items-center justify-around pb-safe">
        {navItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => setCurrentView(item.id as AppView)}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all ${currentView === item.id ? 'text-emerald-400 bg-emerald-500/10 scale-105 border border-emerald-500/10' : 'text-slate-600'}`}
          >
            <div className="w-5 h-5 mb-1">{item.icon}</div>
            <span className="text-[7px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
