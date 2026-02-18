
import React, { useState, useEffect } from 'react';
import { Tab } from './types';
import Home from './components/Home';
import Challenges from './components/Challenges';
import Scanner from './components/Scanner';
import Education from './components/Education';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Global State for "100%" App functionality
  const [totalPoints, setTotalPoints] = useState(1250);
  const [dailyFootprint, setDailyFootprint] = useState(7.4);
  const footprintGoal = 12.0;

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const addPoints = (points: number) => {
    setTotalPoints(prev => prev + points);
  };

  const updateFootprint = (kg: number) => {
    setDailyFootprint(prev => Math.max(0, parseFloat((prev + kg).toFixed(2))));
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.Home: 
        return <Home 
          dailyFootprint={dailyFootprint} 
          footprintGoal={footprintGoal}
          onOpenCalculator={() => setActiveTab(Tab.Calculator)} 
        />;
      case Tab.Challenges: 
        return <Challenges totalPoints={totalPoints} />;
      case Tab.Scan: 
        return <Scanner onEarnPoints={addPoints} />;
      case Tab.Learn: 
        return <Education />;
      case Tab.Calculator: 
        return <Calculator 
          onBack={() => setActiveTab(Tab.Home)} 
          onSave={(kg, pts) => {
            updateFootprint(kg);
            addPoints(pts);
            setActiveTab(Tab.Home);
          }}
        />;
      default: 
        return <Home 
          dailyFootprint={dailyFootprint} 
          footprintGoal={footprintGoal}
          onOpenCalculator={() => setActiveTab(Tab.Calculator)} 
        />;
    }
  };

  const navItems = [
    { id: Tab.Home, label: 'Home', icon: 'home' },
    { id: Tab.Challenges, label: 'Awards', icon: 'military_tech' },
    { id: Tab.Scan, label: 'Scan', icon: 'center_focus_weak' },
    { id: Tab.Learn, label: 'Learn', icon: 'school' },
  ];

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative overflow-hidden bg-background-light dark:bg-background-dark shadow-2xl transition-colors duration-300">
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      {activeTab !== Tab.Calculator && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-t border-zinc-100 dark:border-zinc-800 px-6 py-4 pb-8 flex justify-between items-center max-w-md mx-auto z-50 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative ${activeTab === item.id ? 'text-primary' : 'text-zinc-400'}`}
            >
              <span className={`material-symbols-outlined text-2xl transition-transform duration-300 ${activeTab === item.id ? 'filled-icon scale-110' : 'scale-100'}`}>
                {item.icon}
              </span>
              <span className="text-[10px] font-black tracking-tighter uppercase">{item.label}</span>
              {activeTab === item.id && (
                <span className="absolute -bottom-2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_#2ecc70]"></span>
              )}
            </button>
          ))}
        </nav>
      )}

      {/* Dark Mode Toggle */}
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-6 right-6 z-[60] size-11 rounded-full bg-white/70 dark:bg-zinc-800/70 backdrop-blur-md border border-white/20 dark:border-zinc-700 flex items-center justify-center text-zinc-800 dark:text-zinc-200 shadow-lg active:scale-90 transition-transform"
      >
        <span className="material-symbols-outlined text-xl">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
        </span>
      </button>
    </div>
  );
};

export default App;
