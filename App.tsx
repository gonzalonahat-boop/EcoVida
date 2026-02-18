
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

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.Home: return <Home onOpenCalculator={() => setActiveTab(Tab.Calculator)} />;
      case Tab.Challenges: return <Challenges />;
      case Tab.Scan: return <Scanner />;
      case Tab.Learn: return <Education />;
      case Tab.Calculator: return <Calculator onBack={() => setActiveTab(Tab.Home)} />;
      default: return <Home onOpenCalculator={() => setActiveTab(Tab.Calculator)} />;
    }
  };

  const navItems = [
    { id: Tab.Home, label: 'Home', icon: 'home' },
    { id: Tab.Challenges, label: 'Awards', icon: 'military_tech' },
    { id: Tab.Scan, label: 'Scan', icon: 'center_focus_weak' },
    { id: Tab.Learn, label: 'Learn', icon: 'school' },
  ];

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative overflow-hidden">
      {/* Dynamic Header (Handled within components mostly, but basic branding here if needed) */}
      
      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      {activeTab !== Tab.Calculator && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-t border-zinc-100 dark:border-zinc-800 px-6 py-4 flex justify-between items-center max-w-md mx-auto z-50 rounded-t-3xl shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === item.id ? 'text-primary scale-110' : 'text-zinc-400'}`}
            >
              <span className={`material-symbols-outlined text-2xl ${activeTab === item.id ? 'filled-icon' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>
            </button>
          ))}
          
          {/* Floating Action Center Button (Overlay style) */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden sm:block">
             <button 
                onClick={() => setActiveTab(Tab.Scan)}
                className="size-16 bg-primary rounded-full shadow-lg shadow-primary/40 flex items-center justify-center text-white ring-8 ring-white dark:ring-zinc-900 active:scale-90 transition-transform"
             >
                <span className="material-symbols-outlined text-4xl">add</span>
             </button>
          </div>
        </nav>
      )}

      {/* Dark Mode Toggle Float */}
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-4 right-4 z-[60] size-10 rounded-full bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md border border-white/20 dark:border-zinc-700 flex items-center justify-center text-zinc-800 dark:text-zinc-200"
      >
        <span className="material-symbols-outlined">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
        </span>
      </button>
    </div>
  );
};

export default App;
