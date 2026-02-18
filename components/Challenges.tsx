
import React from 'react';
import { MOCK_USER, DAILY_QUESTS, WEEKLY_GOALS } from '../constants';

const Challenges: React.FC = () => {
  return (
    <div className="animate-in slide-in-from-right duration-500">
      {/* Profile Header */}
      <div className="flex p-6 items-center gap-4 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
        <div className="relative">
            <img src={MOCK_USER.avatar} className="size-20 rounded-full border-4 border-primary/20 object-cover" alt="Profile" />
            <div className="absolute -bottom-1 -right-1 size-7 bg-primary rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-sm filled-icon">military_tech</span>
            </div>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-black">{MOCK_USER.name}</h2>
          <div className="flex items-center gap-1 text-primary">
            <p className="text-sm font-bold">Level {MOCK_USER.level} {MOCK_USER.title}</p>
          </div>
        </div>
        <div className="bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-2xl text-center border border-primary/20">
          <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Total Points</p>
          <p className="text-xl font-black text-primary">{MOCK_USER.points.toLocaleString()}</p>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="px-6 py-4">
        <div className="flex h-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 p-1">
          <button className="flex-1 h-full bg-primary text-white rounded-full text-sm font-bold">Challenges</button>
          <button className="flex-1 h-full text-zinc-500 dark:text-zinc-400 text-sm font-bold">Leaderboard</button>
        </div>
      </div>

      {/* Daily Quests */}
      <section className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black">Daily Quests</h3>
          <span className="text-primary text-xs font-bold bg-primary/10 px-3 py-1 rounded-full">2 Remaining</span>
        </div>
        
        <div className="space-y-4">
          {DAILY_QUESTS.map((quest) => (
            <div key={quest.id} className={`flex flex-col rounded-3xl overflow-hidden shadow-sm border ${quest.completed ? 'bg-zinc-50 dark:bg-zinc-800/50 opacity-70 grayscale' : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800'}`}>
              {quest.image && (
                <div className="relative h-32 w-full overflow-hidden">
                    <img src={quest.image} className="w-full h-full object-cover" alt={quest.title} />
                    <div className="absolute top-3 right-3 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full">
                        +{quest.points} pts
                    </div>
                </div>
              )}
              <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className={`font-black ${quest.completed ? 'line-through' : ''}`}>{quest.title}</h4>
                        <p className="text-xs text-zinc-400 font-medium">{quest.description}</p>
                    </div>
                    {quest.completed && (
                        <span className="material-symbols-outlined text-primary text-3xl filled-icon">verified</span>
                    )}
                </div>
                
                {!quest.completed && (
                    <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full mr-4">
                                <div 
                                    className="h-full bg-primary rounded-full transition-all duration-1000" 
                                    style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                                ></div>
                            </div>
                            <span className="text-[10px] font-bold text-primary">{quest.progress}/{quest.total} {quest.unit}</span>
                        </div>
                        <button className="w-full bg-primary text-white py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform">
                            <span className="material-symbols-outlined text-lg">{quest.icon}</span>
                            Log Action
                        </button>
                    </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Goals */}
      <section className="px-6 py-8 pb-32">
        <h3 className="text-lg font-black mb-4">Weekly Goals</h3>
        {WEEKLY_GOALS.map((goal) => (
            <div key={goal.id} className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none">
                <div className="flex justify-between items-start mb-6">
                    <div className="size-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-3xl">{goal.icon}</span>
                    </div>
                    <div className="text-right">
                        <p className="text-primary font-black">+{goal.points} pts</p>
                        <p className="text-zinc-400 text-[10px] font-bold">3 days left</p>
                    </div>
                </div>
                <h4 className="font-black text-lg">{goal.title}</h4>
                <p className="text-xs text-zinc-400 font-medium mb-6">{goal.description}</p>
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-zinc-500">
                        <span>Progress</span>
                        <span>{goal.progress}/{goal.total} {goal.unit}</span>
                    </div>
                    <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(46,204,112,0.4)] transition-all duration-1000" 
                            style={{ width: `${(goal.progress / goal.total) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        ))}
      </section>
    </div>
  );
};

export default Challenges;
