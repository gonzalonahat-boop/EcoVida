
import React, { useState } from 'react';

interface CalculatorProps {
  onBack: () => void;
  onSave: (kg: number, pts: number) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onBack, onSave }) => {
  const [distance, setDistance] = useState(15);
  const [transport, setTransport] = useState('car');
  const [mode, setMode] = useState('private');
  const [fuel, setFuel] = useState('petrol');

  const calculateImpact = () => {
    let factor = 0.18; 
    
    if (transport === 'bus') factor = 0.08;
    if (transport === 'train') factor = 0.04;
    if (transport === 'bike' || transport === 'walk') factor = -0.05; // Positive impact (offset)
    
    if (transport === 'car') {
        if (fuel === 'electric') factor = 0.05;
        if (fuel === 'hybrid') factor = 0.11;
        if (mode === 'public') factor /= 3;
    }
    
    return parseFloat((distance * factor).toFixed(2));
  };

  const currentImpact = calculateImpact();
  const rewardPoints = currentImpact <= 0 ? 50 : 10;

  const transportModes = [
    { id: 'car', icon: 'directions_car', label: 'Car' },
    { id: 'bus', icon: 'directions_bus', label: 'Bus' },
    { id: 'train', icon: 'train', label: 'Train' },
    { id: 'bike', icon: 'pedal_bike', label: 'Bike' },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen animate-in slide-in-from-bottom duration-500 pb-56">
      <header className="sticky top-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-xl p-8 flex items-center justify-between z-50">
        <button onClick={onBack} className="size-12 flex items-center justify-center rounded-2xl bg-white dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-800 active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-zinc-900 dark:text-white">close</span>
        </button>
        <h2 className="text-lg font-black tracking-tighter">Carbon Trip Calc</h2>
        <div className="size-12"></div>
      </header>

      <div className="p-10">
        <div className="mb-12">
            <div className="flex justify-between items-center mb-3">
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Trip Details</p>
                <div className="flex gap-1">
                    {[1, 2, 3].map(i => <div key={i} className={`h-1.5 w-6 rounded-full ${i === 1 ? 'bg-primary' : 'bg-zinc-200 dark:bg-zinc-800'}`}></div>)}
                </div>
            </div>
            <h3 className="text-3xl font-black mb-4 leading-tight">Log your activity</h3>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">Better data leads to better habits.</p>
        </div>

        {/* Transport Icons */}
        <div className="grid grid-cols-4 gap-4 mb-10">
            {transportModes.map(m => (
                <button
                    key={m.id}
                    onClick={() => setTransport(m.id)}
                    className={`flex flex-col items-center gap-4 py-6 px-2 rounded-3xl transition-all duration-300 border-2 ${transport === m.id ? 'bg-primary border-primary shadow-2xl shadow-primary/30 scale-105' : 'bg-white dark:bg-zinc-900 border-transparent opacity-60 hover:opacity-100'}`}
                >
                    <span className={`material-symbols-outlined text-4xl ${transport === m.id ? 'text-white filled-icon' : 'text-zinc-400'}`}>{m.icon}</span>
                    <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${transport === m.id ? 'text-white' : 'text-zinc-400'}`}>{m.label}</span>
                </button>
            ))}
        </div>

        <div className="space-y-12">
            {/* Input Slider */}
            <div className="space-y-6">
                <div className="flex justify-between items-baseline">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Distance</label>
                    <p className="text-4xl font-black text-primary">{distance} <span className="text-base text-zinc-400">km</span></p>
                </div>
                <input 
                    type="range" min="1" max="100" value={distance}
                    onChange={(e) => setDistance(Number(e.target.value))}
                    className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-primary shadow-inner"
                />
            </div>

            {/* Private vs Public Toggle */}
            {transport !== 'bike' && transport !== 'walk' && (
                <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-3xl flex animate-in fade-in slide-in-from-top-2">
                    <button 
                        onClick={() => setMode('private')}
                        className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'private' ? 'bg-white dark:bg-zinc-900 shadow-md text-primary' : 'text-zinc-500'}`}
                    >
                        Private
                    </button>
                    <button 
                        onClick={() => setMode('public')}
                        className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'public' ? 'bg-white dark:bg-zinc-900 shadow-md text-primary' : 'text-zinc-500'}`}
                    >
                        Shared / Public
                    </button>
                </div>
            )}
        </div>
      </div>

      {/* Result Card Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-10 pb-12 bg-white dark:bg-zinc-900 rounded-t-[4rem] shadow-[0_-30px_80px_rgba(0,0,0,0.15)] z-50 border-t border-zinc-50 dark:border-zinc-800">
        <div className="max-w-md mx-auto space-y-10">
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">Impact Calculation</p>
                    <div className="flex items-baseline gap-2">
                        <span className={`text-5xl font-black ${currentImpact <= 0 ? 'text-primary' : 'text-zinc-900 dark:text-white'}`}>
                            {currentImpact <= 0 ? 'Off-set' : currentImpact}
                        </span>
                        {currentImpact > 0 && <span className="text-xl font-black text-primary">kg</span>}
                    </div>
                </div>
                <div className="bg-primary text-white px-5 py-3 rounded-2xl shadow-lg shadow-primary/20">
                    <p className="text-xs font-black">+{rewardPoints} XP</p>
                </div>
            </div>
            
            <button 
                onClick={() => onSave(currentImpact, rewardPoints)}
                className="w-full bg-zinc-900 dark:bg-primary text-white font-black py-6 rounded-[2rem] text-xs uppercase tracking-[0.3em] shadow-2xl active:scale-95 transition-all"
            >
                Add to My Impact
            </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
