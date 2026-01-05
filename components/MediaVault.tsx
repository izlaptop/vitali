
import React, { useState } from 'react';
import { UserAccount, VideoEntry } from '../types';
import { CustomIcons } from '../constants';

interface MediaVaultProps {
  user: UserAccount;
  onAddVideo: (video: VideoEntry) => void;
}

const MediaVault: React.FC<MediaVaultProps> = ({ user, onAddVideo }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<VideoEntry | null>(null);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const parseYoutubeId = (input: string) => {
    const reg = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = input.match(reg);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const handleAdd = () => {
    if (!url || !title) return;
    
    let thumb = `https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400`;
    const ytId = parseYoutubeId(url);
    if (ytId) {
      thumb = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
    }

    onAddVideo({
      id: Date.now().toString(),
      title,
      url,
      thumbnail: thumb
    });
    setUrl('');
    setTitle('');
    setShowAdd(false);
  };

  const getEmbedLink = (v: VideoEntry) => {
    const ytId = parseYoutubeId(v.url);
    if (ytId) return `https://www.youtube.com/embed/${ytId}?autoplay=1&modestbranding=1&rel=0`;
    return v.url;
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Media Archive</h1>
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em] font-black mt-1">Resource Repository Active</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:bg-emerald-600 shadow-xl shadow-emerald-500/20 active:scale-95"
        >
          <CustomIcons.Plus className="w-4 h-4" />
          Index Resource
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {user.videos.length === 0 && (
          <div className="col-span-full py-32 glass rounded-[3rem] flex flex-col items-center justify-center border-dashed border-2 border-slate-800/40 opacity-40">
            <div className="w-20 h-20 rounded-3xl bg-slate-900 flex items-center justify-center mb-6">
               <CustomIcons.Video className="w-8 h-8 text-slate-700" />
            </div>
            <p className="text-[9px] uppercase font-black tracking-[0.5em] text-slate-600 text-center px-10">No biological training assets found in the local vault.</p>
          </div>
        )}
        {user.videos.map((vid) => (
          <div key={vid.id} className="glass rounded-3xl overflow-hidden group hover:border-emerald-500/20 transition-all duration-500 shadow-2xl flex flex-col">
            <div className="relative aspect-video cursor-pointer overflow-hidden" onClick={() => setPlayingVideo(vid)}>
              <img 
                src={vid.thumbnail} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                alt={vid.title} 
              />
              <div className="absolute inset-0 bg-slate-950/60 group-hover:bg-emerald-500/10 transition-all flex items-center justify-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-2xl transform group-hover:scale-110 transition-transform">
                  <div className="ml-1 w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent"></div>
                </div>
              </div>
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-lg text-[8px] font-black text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
                Class A Unit
              </div>
            </div>
            <div className="p-6 bg-slate-900/40 border-t border-slate-800/40">
              <h3 className="font-black text-white truncate text-[11px] uppercase tracking-wider">{vid.title}</h3>
              <p className="text-[8px] text-slate-500 font-mono truncate mt-2 opacity-50">{vid.url}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Cinematic Playback Portal */}
      {playingVideo && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-12 bg-black/98 backdrop-blur-3xl animate-in fade-in duration-700">
          <button 
            onClick={() => setPlayingVideo(null)}
            className="absolute top-6 right-6 w-14 h-14 bg-white/5 hover:bg-white/10 text-white rounded-2xl flex items-center justify-center transition-all z-[210] border border-white/10"
          >
            <span className="text-xl font-black">✕</span>
          </button>
          
          <div className="w-full max-w-7xl aspect-video glass rounded-[3rem] overflow-hidden shadow-[0_0_120px_rgba(16,185,129,0.2)] animate-in zoom-in-95 duration-700 border-emerald-500/10 relative">
            <iframe 
              src={getEmbedLink(playingVideo)}
              className="w-full h-full bg-black"
              title={playingVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              frameBorder="0"
            ></iframe>
          </div>
          
          <div className="absolute bottom-12 left-12 right-12 text-center">
             <h2 className="text-lg font-black text-white uppercase tracking-[0.3em] truncate mb-2">{playingVideo.title}</h2>
             <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <p className="text-emerald-500/60 text-[8px] uppercase font-black tracking-[0.5em]">Secure Terminal Stream Enabled</p>
             </div>
          </div>
        </div>
      )}

      {/* Add Resource Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
          <div className="glass w-full max-w-md p-10 rounded-[3rem] animate-in zoom-in-95 duration-300 border-emerald-500/20 shadow-2xl">
            <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter text-white flex items-center gap-4">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
              Log New Node
            </h2>
            <div className="space-y-8">
              <div>
                <label className="text-[9px] font-black uppercase text-slate-500 block mb-3 tracking-[0.3em]">Resource Identifier</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-5 text-sm outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-700 text-white"
                  placeholder="Subject: Advanced Cardio"
                />
              </div>
              <div>
                <label className="text-[9px] font-black uppercase text-slate-500 block mb-3 tracking-[0.3em]">Neural Link (YouTube/Direct)</label>
                <input 
                  type="text" 
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-5 text-sm outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-700 text-white"
                  placeholder="https://uplink.io/..."
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button onClick={() => setShowAdd(false)} className="flex-1 py-5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all">Abort</button>
                <button onClick={handleAdd} className="flex-1 py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/20">Commit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaVault;
