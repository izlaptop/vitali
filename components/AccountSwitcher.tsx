
import React, { useState } from 'react';
import { UserAccount } from '../types';
import { CustomIcons } from '../constants';

interface AccountSwitcherProps {
  accounts: UserAccount[];
  activeAccount: UserAccount;
  onSwitch: (acc: UserAccount) => void;
  onAdd: (name: string) => void;
}

const AccountSwitcher: React.FC<AccountSwitcherProps> = ({ accounts, activeAccount, onSwitch, onAdd }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [newName, setNewName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setShowMenu(!showMenu)}
        className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800 transition-all text-left"
      >
        <img src={activeAccount.avatar} alt="" className="w-10 h-10 rounded-lg object-cover" />
        <div className="hidden lg:block overflow-hidden">
          <p className="text-sm font-bold text-white truncate">{activeAccount.name}</p>
          <p className="text-xs text-slate-500 truncate">Core Member</p>
        </div>
      </button>

      {showMenu && (
        <div className="absolute bottom-full left-0 w-full mb-2 glass rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-2 duration-200">
          <div className="p-2 space-y-1">
            {accounts.map(acc => (
              <button 
                key={acc.id}
                onClick={() => {
                  onSwitch(acc);
                  setShowMenu(false);
                }}
                className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all ${acc.id === activeAccount.id ? 'bg-emerald-500/10 text-emerald-400' : 'hover:bg-slate-800 text-slate-400'}`}
              >
                <img src={acc.avatar} alt="" className="w-8 h-8 rounded-md object-cover" />
                <span className="text-sm font-medium truncate">{acc.name}</span>
              </button>
            ))}
            
            {!isAdding ? (
              <button 
                onClick={() => setIsAdding(true)}
                className="w-full flex items-center gap-3 p-2 rounded-lg text-slate-500 hover:text-white transition-all text-sm"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-slate-800 rounded-md">
                   <CustomIcons.Plus className="w-4 h-4" />
                </div>
                <span>Add Node</span>
              </button>
            ) : (
              <div className="p-2 space-y-2">
                <input 
                  autoFocus
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Subject name..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                       if (newName.trim()) onAdd(newName);
                       setIsAdding(false);
                       setNewName('');
                    }}
                    className="flex-1 py-1 bg-emerald-500 text-white rounded text-[10px] font-bold"
                  >
                    Create
                  </button>
                  <button 
                    onClick={() => setIsAdding(false)}
                    className="flex-1 py-1 bg-slate-800 text-white rounded text-[10px] font-bold"
                  >
                    Exit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSwitcher;
