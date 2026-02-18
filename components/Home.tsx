
import React from 'react';

interface HomeProps {
  dailyFootprint: number;
  footprintGoal: number;
  onOpenCalculator: () => void;
}

const Home: React.FC<HomeProps> = ({ dailyFootprint, footprintGoal, onOpenCalculator }) => {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = Math.min(100, (dailyFootprint / footprintGoal) * 100);
  const strokeDashoffset = circumference - (circumference * progressPercent) / 100;

  return (
    <div className="animate-in fade-in duration-700">
      <header className="px-8 pt-10 pb-4">
        <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">Eco Dashboard</p>
        <h1 className="text-3xl font-black text-zinc-900 dark:text-white leading-tight">Eco Explorer 👋</h1>
      </header>

      {/* Daily Footprint Section */}
      <section className="px-6 py-2">
        <div className="bg-white dark:bg-zinc-900 rounded-[3rem] p-8 shadow-2xl shadow-zinc-200/40 dark:shadow-none border border-zinc-50 dark:border-zinc-800 flex flex-col items-center relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
            <span className="material-symbols-outlined text-[15rem]">eco</span>
          </div>
          
          <div className="relative flex items-center justify-center mb-6">
            <svg className="w-56 h-56 transform -rotate-90" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#2ecc70', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#27ae60', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <circle 
                className="text-zinc-100 dark:text-zinc-800" 
                cx="100" cy="100" fill="transparent" r={radius} 
                stroke="currentColor" strokeWidth="16" 
              />
              <circle 
                className={`${dailyFootprint > footprintGoal ? 'text-rose-500' : ''} transition-all duration-1000 ease-in-out`} 
                cx="100" cy="100" fill="transparent" r={radius} 
                stroke={dailyFootprint > footprintGoal ? 'currentColor' : 'url(#grad1)'}
                strokeDasharray={circumference} 
                strokeDashoffset={strokeDashoffset} 
                strokeLinecap="round" strokeWidth="16" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-black tracking-tighter text-zinc-900 dark:text-white leading-none">{dailyFootprint}</span>
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-1">kg CO2e today</span>
            </div>
          </div>

          <div className="w-full space-y-4">
            <div className="flex justify-between w-full text-[10px] font-black text-zinc-400 uppercase tracking-widest px-2">
                <span>Current: {progressPercent.toFixed(0)}%</span>
                <span className={dailyFootprint > footprintGoal ? 'text-rose-500' : ''}>Goal: {footprintGoal} kg</span>
            </div>
            <div className={`flex items-center justify-center gap-2 py-3 px-6 rounded-2xl font-black text-xs transition-colors ${dailyFootprint > footprintGoal ? 'bg-rose-50 text-rose-500' : 'bg-primary/10 text-primary'}`}>
              <span className="material-symbols-outlined text-lg">
                {dailyFootprint > footprintGoal ? 'warning' : 'verified'}
              </span>
              <span>{dailyFootprint > footprintGoal ? 'Over daily limit' : 'On Track'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Quick Grid */}
      <section className="px-8 py-6 grid grid-cols-2 gap-5">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2.5rem] border border-zinc-50 dark:border-zinc-800 shadow-sm">
            <div className="size-12 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 mb-4">
                <span className="material-symbols-outlined">bolt</span>
            </div>
            <p className="text-xl font-black">12.4 <span className="text-[10px] text-zinc-400">kWh</span></p>
            <p className="text-[10px] font-black text-zinc-400 uppercase mt-1">Energy Saved</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-[2.5rem] border border-zinc-50 dark:border-zinc-800 shadow-sm">
            <div className="size-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                <span className="material-symbols-outlined">water_drop</span>
            </div>
            <p className="text-xl font-black">45.0 <span className="text-[10px] text-zinc-400">L</span></p>
            <p className="text-[10px] font-black text-zinc-400 uppercase mt-1">Water Saved</p>
          </div>
      </section>

      {/* Action CTA */}
      <section className="px-8 pb-12">
        <button 
            onClick={onOpenCalculator}
            className="w-full bg-zinc-900 dark:bg-primary text-white font-black py-6 rounded-[2rem] shadow-2xl shadow-zinc-900/20 dark:shadow-primary/30 flex items-center justify-center gap-4 active:scale-95 transition-all"
        >
            <span className="material-symbols-outlined text-2xl">add_circle</span>
            <span className="uppercase tracking-[0.2em] text-xs">Calculate Trip Impact</span>
        </button>
      </section>
    </div>
  );
};

export default Home;
