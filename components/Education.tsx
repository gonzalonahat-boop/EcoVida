
import React from 'react';
import { ARTICLES, VIDEOS } from '../constants';

const Education: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <header className="p-6 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10">
        <div className="flex w-full items-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 px-4 py-3 shadow-sm">
          <span className="material-symbols-outlined text-zinc-400 mr-2">search</span>
          <input 
            type="text" 
            placeholder="Search topics like 'Circular Economy'" 
            className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-medium"
          />
        </div>
      </header>

      {/* Featured Content */}
      <section className="px-6 pb-6">
        <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400 bg-white dark:bg-zinc-900 shadow-xl">
          <div className="h-48 relative">
            <img src="https://picsum.photos/seed/micro/600/300" className="w-full h-full object-cover" alt="Featured" />
            <div className="absolute top-4 left-4">
                <span className="bg-amber-400 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Featured Quiz</span>
            </div>
          </div>
          <div className="p-6">
            <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-2">Quiz of the Week</p>
            <h2 className="text-xl font-black mb-3 leading-tight">Weekly Challenge: Ocean Microplastics</h2>
            <div className="flex items-center justify-between">
                <p className="text-xs text-zinc-400 max-w-[60%] leading-relaxed font-medium">Master the facts and help save our marine life.</p>
                <button className="bg-primary text-white font-black px-5 py-2.5 rounded-full text-xs active:scale-95 transition-transform">Earn 50 XP</button>
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="px-6 pt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black">Daily Articles</h3>
          <button className="text-primary text-xs font-bold">View all</button>
        </div>
        <div className="space-y-6">
          {ARTICLES.map(article => (
            <div key={article.id} className="group cursor-pointer">
              <div className="rounded-3xl overflow-hidden h-44 mb-4 shadow-md transition-transform group-hover:scale-[0.98]">
                <img src={article.image} className="w-full h-full object-cover" alt={article.title} />
              </div>
              <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-1">{article.category}</p>
              <h4 className="text-xl font-serif font-bold leading-tight mb-2 group-hover:text-primary transition-colors">{article.title}</h4>
              <div className="flex items-center text-zinc-400 text-xs font-medium">
                <span className="material-symbols-outlined text-sm mr-1">schedule</span>
                <span>{article.readTime}</span>
                <span className="mx-2">•</span>
                <span>By {article.author}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Videos */}
      <section className="pt-10 pb-32">
        <div className="flex items-center justify-between px-6 mb-4">
          <h3 className="text-lg font-black">Short Videos</h3>
          <button className="text-primary text-xs font-bold">More clips</button>
        </div>
        <div className="flex overflow-x-auto gap-4 px-6 no-scrollbar">
          {VIDEOS.map(video => (
            <div key={video.id} className="flex-none w-48">
              <div className="relative aspect-[9/16] rounded-3xl overflow-hidden mb-3 shadow-lg group">
                <img src={video.thumbnail} className="w-full h-full object-cover" alt={video.title} />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-5xl opacity-80 group-hover:opacity-100 transition-opacity">play_circle</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{video.duration}</div>
              </div>
              <p className="text-xs font-bold leading-snug line-clamp-2 px-1">{video.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Education;
