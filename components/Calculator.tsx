
import React, { useState } from 'react';

interface CalculatorProps {
  onBack: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onBack }) => {
  const [distance, setDistance] = useState(15);
  const [transport, setTransport] = useState('car');
  const [fuel, setFuel] = useState('petrol');

  const calculateImpact = () => {
    let factor = 0.15; // kg CO2e per km
    if (transport === 'bus') factor = 0.08;
    if (transport === 'bike' || transport === 'walk') factor = 0;
    if (fuel === 'electric') factor *= 0.3;
    if (fuel === 'hybrid') factor *= 0.7;
    
    return (distance * factor).toFixed(1);
  };

  const transportModes = [
    { id: 'car', icon: 'directions_car', label: 'Car' },
    { id: 'bus', icon: 'directions_bus', label: 'Bus' },
    { id: 'bike', icon: 'directions_bike', label: 'Bike' },
    { id: 'walk', icon: 'directions_walk', label: 'Walk' },
  ];

  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen animate-in slide-in-from-bottom duration-500">
      <header className="sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800">
        <button onClick={onBack} className="size-10 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-lg font-black">Carbon Footprint</h2>
        <button className="size-10 flex items-center justify-center rounded-full">
            <span className="material-symbols-outlined">help_outline</span>
        </button>
      </header>

      <div className="p-6">
        {/* Progress */}
        <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-black">Transport Impact</p>
                <p className="text-[10px] font-bold text-zinc-400">Step 2 of 5</p>
            </div>
            <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '40%' }}></div>
            </div>
        </div>

        <h3 className="text-2xl font-black mb-2 leading-tight">Calculate Impact</h3>
        <p className="text-sm text-zinc-500 font-medium mb-8">How did you travel today? Select your primary mode.</p>

        {/* Transport Toggle */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6">
            {transportModes.map(mode => (
                <button
                    key={mode.id}
                    onClick={() => setTransport(mode.id)}
                    className={`flex-none flex flex-col items-center justify-center p-5 rounded-3xl min-w-[90px] gap-2 border-2 transition-all ${transport === mode.id ? 'bg-white dark:bg-zinc-900 border-primary shadow-lg shadow-primary/10' : 'bg-transparent border-transparent opacity-50'}`}
                >
                    <span className={`material-symbols-outlined text-3xl ${transport === mode.id ? 'text-primary filled-icon' : ''}`}>{mode.icon}</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${transport === mode.id ? 'text-primary' : ''}`}>{mode.label}</span>
                </button>
            ))}
        </div>

        <div className="space-y-8">
            {/* Distance */}
            <div className="space-y-3">
                <label className="text-sm font-black text-zinc-700 dark:text-zinc-300">Distance Traveled</label>
                <div className="relative">
                    <input 
                        type="number" 
                        value={distance}
                        onChange={(e) => setDistance(Number(e.target.value))}
                        className="w-full bg-white dark:bg-zinc-900 border-none rounded-2xl p-4 text-xl font-black shadow-sm focus:ring-2 focus:ring-primary"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-zinc-300">km</span>
                </div>
            </div>

            {/* Fuel Type */}
            {transport === 'car' && (
                <div className="space-y-3 animate-in fade-in duration-300">
                    <label className="text-sm font-black text-zinc-700 dark:text-zinc-300">Fuel Type</label>
                    <div className="grid grid-cols-2 gap-3">
                        {fuelTypes.map(f => (
                            <button
                                key={f}
                                onClick={() => setFuel(f.toLowerCase())}
                                className={`py-4 px-4 rounded-2xl font-bold text-sm border-2 transition-all ${fuel === f.toLowerCase() ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white dark:bg-zinc-900 border-transparent text-zinc-500 shadow-sm'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Tip */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-2xl p-4 flex gap-3 items-start">
                <span className="material-symbols-outlined text-blue-500">info</span>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-bold leading-snug">
                    {transport === 'car' && fuel !== 'electric' ? 'Switching to an EV can reduce emissions by up to 70%.' : 'Choosing low-carbon transport significantly helps our planet!'}
                </p>
            </div>
        </div>
      </div>

      {/* Floating Summary */}
      <div className="fixed bottom-0 left-0 right-0 p-6 pb-12 bg-white dark:bg-zinc-900 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] border-t border-zinc-50 dark:border-zinc-800">
        <div className="max-w-md mx-auto">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Estimated Impact</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-primary">{calculateImpact()}</span>
                        <span className="text-lg font-black text-zinc-400">kg CO2e</span>
                    </div>
                </div>
                <div className="bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    <p className="text-[10px] font-black text-primary uppercase">Good Progress</p>
                </div>
            </div>
            
            <div className="flex gap-4">
                <button 
                    onClick={onBack}
                    className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-black py-4 rounded-full active:scale-95 transition-transform"
                >
                    Back
                </button>
                <button 
                    onClick={onBack}
                    className="flex-[2] bg-primary text-white font-black py-4 rounded-full shadow-lg shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                    Continue <span className="material-symbols-outlined">arrow_forward</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
