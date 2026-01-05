
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
  const [globalChat, setGlobalChat] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const savedAccounts = localStorage.getItem('vitali_accounts_v2');
    const savedChat = localStorage.getItem('vitali_chat');
    
    if (savedAccounts) {
      const parsed = JSON.parse(savedAccounts);
      setAccounts(parsed);
    } else {
      const adminAcc: UserAccount = {
        id: 'admin-0',
        username: 'admin',
        password: '12345',
        name: 'System Administrator',
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200',
        targetWeight: 80,
        preferences: ['Control'],
        logs: [],
        videos: [],
        role: 'admin'
      };
      setAccounts([adminAcc]);
      localStorage.setItem('vitali_accounts_v2', JSON.stringify([adminAcc]));
    }

    if (savedChat) {
      setGlobalChat(JSON.parse(savedChat));
    }

    setIsInitialized(true);
  }, []);

  const handleUpdateAccount = (updatedAcc: UserAccount) => {
    const updatedAccounts = accounts.map(a => a.id === updatedAcc.id ? updatedAcc : a);
    setAccounts(updatedAccounts);
    setActiveAccount(updatedAcc);
    localStorage.setItem('vitali_accounts_v2', JSON.stringify(updatedAccounts));
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
    const updatedChat = [...globalChat, newMessage];
    setGlobalChat(updatedChat);
    localStorage.setItem('vitali_chat', JSON.stringify(updatedChat));
  };

  const navItems = [
    { id: 'dashboard', icon: <CustomIcons.Bolt />, label: 'Vitals' },
    { id: 'recipes', icon: <CustomIcons.Chef />, label: 'Fuel' },
    { id: 'coach', icon: <CustomIcons.Heart />, label: 'Coach' },
    { id: 'comm', icon: <CustomIcons.Message />, label: 'Chat' },
    { id: 'games', icon: <CustomIcons.Game />, label: 'Play' },
    { id: 'vault', icon: <CustomIcons.Video />, label: 'Vault' },
    ...(activeAccount?.role === 'admin' ? [{ id: 'admin', icon: <CustomIcons.Settings />, label: 'Admin' }] : [])
  ];

  const renderView = () => {
    if (!activeAccount) return null;

    switch (currentView) {
      case 'dashboard': return <Dashboard user={activeAccount} onUpdateLog={handleUpdateLog} />;
      case 'recipes': return <RecipeBook preferences={activeAccount.preferences} />;
      case 'coach': return <AICoach user={activeAccount} />;
      case 'comm': return <CommCenter user={activeAccount} messages={globalChat} onSendMessage={handleSendChat} />;
      case 'games': return <GameZone />;
      case 'vault': return <MediaVault user={activeAccount} onAddVideo={handleAddVideo} />;
      case 'admin': return activeAccount.role === 'admin' ? <AdminConsole accounts={accounts} onUpdateAccounts={(accs) => {
          setAccounts(accs);
          localStorage.setItem('vitali_accounts_v2', JSON.stringify(accs));
        }} /> : null;
      default: return <Dashboard user={activeAccount} onUpdateLog={handleUpdateLog} />;
    }
  };

  if (!isInitialized) return null;

  if (!activeAccount) {
    return <AuthPortal accounts={accounts} onLogin={setActiveAccount} onRegister={(acc) => {
      const updated = [...accounts, acc];
      setAccounts(updated);
      localStorage.setItem('vitali_accounts_v2', JSON.stringify(updated));
      setActiveAccount(acc);
    }} />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white overflow-hidden">
      
      {/* Sidebar - Desktop Only */}
      <nav className="hidden md:flex w-20 lg:w-64 glass border-r border-slate-800 flex-col sticky top-0 z-50 h-screen shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center neon-border">
            <CustomIcons.Heart className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight hidden lg:block">VITALI</span>
        </div>

        <div className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setCurrentView(item.id as AppView)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${currentView === item.id ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'hover:bg-slate-800 text-slate-400 border border-transparent'}`}
            >
              <div className="w-5 h-5 shrink-0">{item.icon}</div>
              <span className="font-medium hidden lg:block uppercase tracking-wider text-[10px]">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="p-4 mt-auto border-t border-slate-800">
           <button 
             onClick={() => { setActiveAccount(null); setCurrentView('dashboard'); }}
             className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800 transition-all text-left"
           >
             <img src={activeAccount.avatar} alt="" className="w-10 h-10 rounded-lg object-cover border border-slate-700" />
             <div className="hidden lg:block overflow-hidden">
               <p className="text-sm font-bold text-white truncate">{activeAccount.name}</p>
               <p className="text-[10px] text-rose-500 uppercase font-bold">Logout</p>
             </div>
           </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-950 relative pb-24 md:pb-0">
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 glass border-b border-slate-800 sticky top-0 z-40">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <CustomIcons.Heart className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold tracking-tight text-sm uppercase">Vitali Core</span>
           </div>
           <button onClick={() => setActiveAccount(null)} className="p-2 bg-slate-800 rounded-lg">
              <img src={activeAccount.avatar} alt="" className="w-6 h-6 rounded-md object-cover" />
           </button>
        </div>

        <div className="max-w-7xl mx-auto p-4 md:p-10 space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {renderView()}
        </div>
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 glass border-t border-slate-800 z-50 px-2 flex items-center justify-around pb-safe">
        {navItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => setCurrentView(item.id as AppView)}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all ${currentView === item.id ? 'text-emerald-400 bg-emerald-500/10 scale-110' : 'text-slate-500'}`}
          >
            <div className="w-5 h-5 mb-1">{item.icon}</div>
            <span className="text-[8px] font-bold uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
