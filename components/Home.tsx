
import React from 'react';

interface HomeProps {
  onOpenCalculator: () => void;
}

const Home: React.FC<HomeProps> = ({ onOpenCalculator }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <header className="p-4 flex flex-col gap-1">
        <p className="text-xs font-medium text-zinc-500">Welcome back,</p>
        <h1 className="text-2xl font-black">Alex! 👋</h1>
      </header>

      {/* Daily Footprint Section */}
      <section className="px-4 py-2">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-xl shadow-zinc-200/50 dark:shadow-none border border-zinc-50 dark:border-zinc-800 flex flex-col items-center">
          <h3 className="text-sm font-bold text-primary dark:text-primary mb-6 uppercase tracking-widest">Daily Footprint</h3>
          <div className="relative flex items-center justify-center">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle className="text-zinc-100 dark:text-zinc-800" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12" />
              <circle className="text-primary transition-all duration-1000" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeDasharray="552.9" strokeDashoffset="165.8" strokeLinecap="round" strokeWidth="12" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-black tracking-tight">8.2</span>
              <span className="text-sm font-bold text-zinc-500">kg CO2e</span>
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center gap-2">
            <p className="text-xs font-bold text-zinc-400">Daily Limit: 12.0 kg</p>
            <div className="flex items-center gap-1 px-4 py-1.5 bg-primary/10 rounded-full text-primary dark:text-primary text-xs font-bold">
              <span className="material-symbols-outlined text-sm">trending_down</span>
              <span>15% better than yesterday</span>
            </div>
          </div>
        </div>
      </section>

      {/* Active Challenges Carousel */}
      <section className="pt-8">
        <div className="flex items-center justify-between px-6 mb-4">
          <h2 className="text-xl font-extrabold">Active Challenges</h2>
          <button className="text-primary font-bold text-sm">View all</button>
        </div>
        <div className="flex overflow-x-auto gap-4 px-6 pb-4 no-scrollbar">
          {[
            { title: 'Meat-Free Day', progress: 60, icon: 'nutrition', color: 'bg-primary/10', text: 'text-primary' },
            { title: 'Bike to Work', progress: 0, icon: 'directions_bike', color: 'bg-blue-50', text: 'text-blue-500' },
            { title: 'Zero Waste', progress: 5, icon: 'delete_sweep', color: 'bg-orange-50', text: 'text-orange-500' }
          ].map((ch, i) => (
            <div key={i} className="flex-none w-44 bg-white dark:bg-zinc-900 p-5 rounded-3xl shadow-md border border-zinc-50 dark:border-zinc-800">
              <div className={`w-full aspect-square ${ch.color} rounded-2xl mb-4 flex items-center justify-center`}>
                <span className={`material-symbols-outlined text-4xl ${ch.text}`}>{ch.icon}</span>
              </div>
              <h4 className="font-bold text-sm mb-1 truncate">{ch.title}</h4>
              <p className={`text-xs font-bold ${ch.progress > 0 ? ch.text : 'text-zinc-400'}`}>
                {ch.progress > 0 ? `${ch.progress}% complete` : 'Not started'}
              </p>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-3">
                <div className={`h-full rounded-full transition-all duration-700 ${ch.text.replace('text', 'bg')}`} style={{ width: `${ch.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Grid */}
      <section className="px-6 py-6">
        <h2 className="text-xl font-extrabold mb-4">Daily Impact Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-zinc-50 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="size-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <span className="text-xs font-bold text-primary">+8%</span>
            </div>
            <p className="text-2xl font-black">12 kWh</p>
            <p className="text-xs font-medium text-zinc-500">Electricity saved</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-zinc-50 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="size-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <span className="material-symbols-outlined">water_drop</span>
              </div>
              <span className="text-xs font-bold text-primary">+12%</span>
            </div>
            <p className="text-2xl font-black">45 L</p>
            <p className="text-xs font-medium text-zinc-500">Water saved</p>
          </div>
        </div>
      </section>

      {/* Action CTA */}
      <section className="px-6 pb-12">
        <button 
            onClick={onOpenCalculator}
            className="w-full bg-primary text-white font-bold py-4 rounded-full shadow-lg shadow-primary/30 flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
            <span className="material-symbols-outlined">calculate</span>
            Calculate Trip Impact
        </button>
      </section>
    </div>
  );
};

export default Home;
