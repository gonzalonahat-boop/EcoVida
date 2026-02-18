
import React, { useState } from 'react';
import { MOCK_USER, DAILY_QUESTS, WEEKLY_GOALS, HALL_OF_FAME } from '../constants';

interface ChallengesProps {
  totalPoints: number;
}

const Challenges: React.FC<ChallengesProps> = ({ totalPoints }) => {
  const [activeSubTab, setActiveSubTab] = useState<'goals' | 'fame'>('goals');
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  const [loadingQuest, setLoadingQuest] = useState<string | null>(null);

  const handleVerify = (id: string) => {
    setLoadingQuest(id);
    setTimeout(() => {
      setCompletedQuests(prev => [...prev, id]);
      setLoadingQuest(null);
    }, 1500);
  };

  return (
    <div className="animate-in slide-in-from-right duration-700">
      {/* Profile Header */}
      <div className="flex p-8 items-center gap-6 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
        <div className="relative">
            <img src={MOCK_USER.avatar} className="size-20 rounded-full border-[6px] border-primary/10 object-cover shadow-xl" alt="Profile" />
            <div className="absolute -bottom-1 -right-1 size-8 bg-primary rounded-full border-4 border-white dark:border-zinc-900 flex items-center justify-center text-white shadow-lg">
                <span className="material-symbols-outlined text-sm filled-icon">military_tech</span>
            </div>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-black text-zinc-900 dark:text-white leading-tight">{MOCK_USER.name}</h2>
          <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1">Lvl {Math.floor(totalPoints/100)} Eco-Master</p>
        </div>
        <div className="bg-zinc-900 dark:bg-primary text-white px-4 py-3 rounded-2xl text-center">
          <p className="text-[7px] font-black uppercase tracking-widest mb-1 opacity-70">Points</p>
          <p className="text-xl font-black leading-none">{totalPoints + (completedQuests.length * 50)}</p>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="px-8 py-6">
        <div className="flex h-12 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 p-1">
          <button 
            onClick={() => setActiveSubTab('goals')}
            className={`flex-1 h-full rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'goals' ? 'bg-white dark:bg-zinc-900 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-400'}`}
          >
            My Goals
          </button>
          <button 
            onClick={() => setActiveSubTab('fame')}
            className={`flex-1 h-full rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'fame' ? 'bg-white dark:bg-zinc-900 shadow-sm text-zinc-900 dark:text-white' : 'text-zinc-400'}`}
          >
            Hall of Fame
          </button>
        </div>
      </div>

      {activeSubTab === 'goals' ? (
        <div className="px-8 space-y-8 animate-in fade-in duration-300">
          <section className="space-y-6">
            <h3 className="text-xl font-black">Daily Quests</h3>
            <div className="space-y-5">
              {DAILY_QUESTS.map((quest) => {
                const isDone = completedQuests.includes(quest.id) || quest.completed;
                return (
                  <div key={quest.id} className={`flex flex-col rounded-[2.5rem] overflow-hidden shadow-sm border ${isDone ? 'bg-zinc-50 dark:bg-zinc-800/50 opacity-80' : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800'}`}>
                    {quest.image && (
                      <div className="h-32 relative overflow-hidden">
                          <img src={quest.image} className="w-full h-full object-cover" alt={quest.title} />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                          <div>
                              <h4 className="font-black text-lg leading-tight">{quest.title}</h4>
                              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter mt-1">{quest.description}</p>
                          </div>
                          {isDone ? (
                            <span className="material-symbols-outlined text-primary text-3xl filled-icon">verified</span>
                          ) : (
                            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black">+{quest.points} pts</div>
                          )}
                      </div>
                      {!isDone && (
                          <button 
                            disabled={loadingQuest === quest.id}
                            onClick={() => handleVerify(quest.id)}
                            className="w-full bg-primary text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center justify-center"
                          >
                              {loadingQuest === quest.id ? (
                                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              ) : 'Verify Task'}
                          </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="pb-32">
            <h3 className="text-xl font-black mb-6">Weekly Goals</h3>
            {WEEKLY_GOALS.map((goal) => (
                <div key={goal.id} className="p-8 rounded-[3rem] bg-zinc-900 dark:bg-zinc-800 text-white shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <div className="size-12 bg-white/10 rounded-xl flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-2xl">{goal.icon}</span>
                        </div>
                        <p className="text-primary text-xl font-black">+{goal.points} XP</p>
                    </div>
                    <h4 className="font-black text-xl mb-4">{goal.title}</h4>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-3">
                        <div 
                            className="h-full bg-primary rounded-full shadow-[0_0_15px_#2ecc70] transition-all duration-1000" 
                            style={{ width: `${(goal.progress / goal.total) * 100}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-[8px] font-black text-white/40 uppercase tracking-widest">
                        <span>Progress</span>
                        <span>{goal.progress} / {goal.total} Days</span>
                    </div>
                </div>
            ))}
          </section>
        </div>
      ) : (
        <div className="px-8 space-y-6 animate-in slide-in-from-right duration-300 pb-32">
          <h3 className="text-xl font-black">Global Ranking</h3>
          <div className="space-y-4">
            {HALL_OF_FAME.map((entry, i) => (
              <div key={i} className={`flex items-center gap-4 p-5 rounded-[2rem] border ${entry.current ? 'bg-primary/5 border-primary ring-2 ring-primary/20' : 'bg-white dark:bg-zinc-900 border-zinc-50 dark:border-zinc-800'}`}>
                <div className="size-8 font-black text-xs text-zinc-400 flex items-center justify-center">#{i+1}</div>
                <img src={entry.avatar} className="size-12 rounded-full border-2 border-zinc-100" alt={entry.name} />
                <div className="flex-1">
                  <h4 className="font-black text-sm">{entry.name}</h4>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase">Lvl {entry.level} Hunter</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-zinc-900 dark:text-white">{entry.points.toLocaleString()}</p>
                  <p className="text-[8px] font-black text-primary uppercase tracking-widest">Points</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-[2.5rem] text-center">
            <span className="material-symbols-outlined text-4xl text-zinc-400 mb-2">emoji_events</span>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Keep saving carbon to reach the Top 3!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Challenges;
