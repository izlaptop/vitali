
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

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const handleAdd = () => {
    if (!url || !title) return;
    
    let thumb = `https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400`;
    const ytId = extractYoutubeId(url);
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

  const getEmbedUrl = (videoUrl: string) => {
    const ytId = extractYoutubeId(videoUrl);
    if (ytId) {
      return `https://www.youtube.com/embed/${ytId}?autoplay=1&modestbranding=1&rel=0`;
    }
    return videoUrl;
  };

  const isEmbeddable = (videoUrl: string) => {
    return !!extractYoutubeId(videoUrl);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">MEDIA VAULT</h1>
          <p className="text-slate-500 text-[10px] md:text-xs uppercase tracking-widest font-bold">Optimized Resource Playback</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 active:scale-95"
        >
          <CustomIcons.Plus className="w-4 h-4" />
          Add Resource
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {user.videos.length === 0 && (
          <div className="col-span-full py-16 md:py-24 glass rounded-3xl flex flex-col items-center justify-center border-dashed border-2 border-slate-800/50 opacity-50">
            <div className="w-16 h-16 rounded-full bg-slate-900/50 flex items-center justify-center mb-4">
               <CustomIcons.Video className="w-8 h-8 text-slate-700" />
            </div>
            <p className="text-[10px] uppercase font-black tracking-[0.4em] text-slate-600 text-center">No cached archives detected</p>
          </div>
        )}
        {user.videos.map((vid) => (
          <div key={vid.id} className="glass rounded-2xl overflow-hidden group hover:border-emerald-500/30 transition-all duration-300 shadow-xl flex flex-col">
            <div className="relative aspect-video cursor-pointer overflow-hidden" onClick={() => setPlayingVideo(vid)}>
              <img 
                src={vid.thumbnail} 
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                alt={vid.title} 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400';
                }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50 transform group-hover:scale-110 transition-transform">
                  <div className="ml-1 w-0 h-0 border-t-[8px] md:border-t-[10px] border-t-transparent border-l-[12px] md:border-l-[15px] border-l-white border-b-[8px] md:border-b-[10px] border-b-transparent"></div>
                </div>
              </div>
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur-md rounded text-[8px] font-bold text-emerald-400 border border-emerald-500/10">
                HD UNIT
              </div>
            </div>
            <div className="p-4 bg-slate-900/40 flex-1 flex flex-col justify-center">
              <h3 className="font-bold text-white truncate text-xs md:text-sm uppercase tracking-tight">{vid.title}</h3>
              <p className="text-[9px] text-slate-500 font-mono truncate mt-1 opacity-60">{vid.url}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Robust Video Player Modal */}
      {playingVideo && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-6 md:p-10 bg-black/98 backdrop-blur-2xl animate-in fade-in duration-500">
          <button 
            onClick={() => setPlayingVideo(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all z-[210] border border-white/10 shadow-lg"
          >
            <span className="text-xl sm:text-2xl">✕</span>
          </button>
          
          <div className="w-full max-w-6xl aspect-video glass rounded-xl md:rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.3)] animate-in zoom-in-95 duration-500 border-emerald-500/20">
            {isEmbeddable(playingVideo.url) ? (
              <iframe 
                src={getEmbedUrl(playingVideo.url)}
                className="w-full h-full bg-black"
                title={playingVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                frameBorder="0"
              ></iframe>
            ) : (
              <video 
                src={playingVideo.url} 
                controls 
                autoPlay 
                muted
                playsInline
                className="w-full h-full object-contain bg-black"
                onError={(e) => {
                   console.error("Video element error", e);
                   alert("Direct link failed. The URL might not be a direct video file. Opening in new tab instead.");
                   window.open(playingVideo.url, '_blank');
                   setPlayingVideo(null);
                }}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          
          <div className="absolute bottom-6 sm:bottom-10 left-4 right-4 text-center">
             <h2 className="text-sm sm:text-lg font-black text-white uppercase tracking-widest truncate">{playingVideo.title}</h2>
             <p className="text-emerald-400 text-[8px] sm:text-[10px] uppercase font-bold tracking-[0.3em] mt-2 animate-pulse">Neural Interface Stream Active</p>
          </div>
        </div>
      )}

      {/* Add Modal - Mobile Friendly */}
      {showAdd && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="glass w-full max-w-md p-6 sm:p-8 rounded-[2rem] animate-in zoom-in-95 duration-200 border-emerald-500/20 shadow-2xl">
            <h2 className="text-lg md:text-xl font-black mb-6 uppercase tracking-widest text-emerald-400 flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              Index Archive
            </h2>
            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-500 block mb-2 tracking-widest">Entry Identifier</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-4 text-sm outline-none focus:border-emerald-500 transition-all placeholder:text-slate-700 text-white"
                  placeholder="Subject: Recovery Session"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-500 block mb-2 tracking-widest">Global Uplink (YouTube/URL)</label>
                <input 
                  type="text" 
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-4 text-sm outline-none focus:border-emerald-500 transition-all placeholder:text-slate-700 text-white"
                  placeholder="https://..."
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button onClick={() => setShowAdd(false)} className="order-2 sm:order-1 flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">Abort</button>
                <button onClick={handleAdd} className="order-1 sm:order-2 flex-1 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/30">Commit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaVault;
