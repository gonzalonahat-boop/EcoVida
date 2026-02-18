
import React, { useState } from 'react';
import { ARTICLES, MICROPLASTICS_QUIZ } from '../constants';

const Education: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuiz, setActiveQuiz] = useState<boolean>(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const filteredArticles = ARTICLES.filter(art => 
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    art.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleQuizAnswer = (optionIdx: number) => {
    if (optionIdx === MICROPLASTICS_QUIZ[quizStep].correctAnswer) {
      setQuizScore(prev => prev + 1);
    }
    
    if (quizStep < MICROPLASTICS_QUIZ.length - 1) {
      setQuizStep(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizScore(0);
    setQuizFinished(false);
    setActiveQuiz(false);
  };

  return (
    <div className="animate-in fade-in duration-500 min-h-screen relative bg-background-light dark:bg-background-dark">
      <header className="p-6 sticky top-0 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-xl z-30">
        <div className="flex w-full items-center rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 px-5 py-3 shadow-lg">
          <span className="material-symbols-outlined text-primary mr-3">search</span>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..." 
            className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-bold placeholder:text-zinc-400"
          />
        </div>
      </header>

      {/* Featured Quiz Card */}
      {!searchQuery && (
        <section className="px-6 pb-6">
          <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-amber-400 bg-white dark:bg-zinc-900 shadow-2xl group cursor-pointer active:scale-[0.98] transition-all">
            <div className="h-48 relative overflow-hidden">
              <img src="https://picsum.photos/seed/micro/800/400" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Featured" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent"></div>
              <div className="absolute top-5 left-5">
                  <span className="bg-amber-400 text-zinc-900 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-lg">Active Quiz</span>
              </div>
            </div>
            <div className="p-8">
              <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2">Ocean Education</p>
              <h2 className="text-2xl font-black mb-4 leading-tight">Microplastics: The Invisible Threat</h2>
              <div className="flex items-center justify-between gap-4">
                  <p className="text-xs text-zinc-400 max-w-[65%] font-bold">Earn 100 XP by testing your plastic knowledge.</p>
                  <button 
                    onClick={() => setActiveQuiz(true)}
                    className="flex-shrink-0 bg-primary text-white font-black px-6 py-3 rounded-2xl text-[10px] uppercase tracking-widest shadow-lg shadow-primary/30 active:scale-95 transition-all"
                  >
                    Start Quiz
                  </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Section */}
      <section className="px-8 pt-4 pb-32">
        <h3 className="text-xl font-black mb-8">Daily Readings</h3>
        <div className="space-y-10">
          {filteredArticles.map(article => (
            <div key={article.id} className="group cursor-pointer">
              <div className="rounded-[2.5rem] overflow-hidden h-48 mb-5 shadow-xl">
                <img src={article.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={article.title} />
              </div>
              <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2">{article.category}</p>
              <h4 className="text-xl font-serif font-bold leading-tight mb-4 text-zinc-900 dark:text-white">{article.title}</h4>
              <div className="flex items-center justify-between text-zinc-400 text-[9px] font-black uppercase tracking-widest">
                  <div className="flex items-center gap-4">
                    <span>{article.readTime}</span>
                    <span>By {article.author}</span>
                  </div>
                  <span className="material-symbols-outlined text-lg">bookmark</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fullscreen Quiz Modal */}
      {activeQuiz && (
        <div className="fixed inset-0 z-[100] bg-white dark:bg-zinc-950 p-10 flex flex-col animate-in slide-in-from-bottom duration-500 overflow-y-auto">
          <div className="flex justify-between items-center mb-12">
            <button onClick={resetQuiz} className="size-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="text-center">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest">Step {quizStep + 1} of 3</p>
              <div className="flex gap-1 mt-2">
                {[0,1,2].map(i => <div key={i} className={`h-1.5 w-6 rounded-full ${i <= quizStep ? 'bg-primary' : 'bg-zinc-100 dark:bg-zinc-800'}`}></div>)}
              </div>
            </div>
            <div className="size-12"></div>
          </div>

          {!quizFinished ? (
            <div className="flex flex-col flex-1 animate-in fade-in duration-300">
              <h4 className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4">Question</h4>
              <h2 className="text-3xl font-black mb-12 leading-tight dark:text-white">
                {MICROPLASTICS_QUIZ[quizStep].question}
              </h2>
              
              <div className="space-y-4">
                {MICROPLASTICS_QUIZ[quizStep].options.map((option, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleQuizAnswer(idx)}
                    className="w-full p-6 text-left rounded-[1.5rem] border-2 border-zinc-100 dark:border-zinc-800 hover:border-primary hover:bg-primary/5 transition-all text-sm font-bold flex items-center gap-4 group active:scale-95"
                  >
                    <div className="size-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-black group-hover:bg-primary group-hover:text-white transition-colors">
                      {String.fromCharCode(65 + idx)}
                    </div>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
              <div className="size-32 bg-primary/10 rounded-full flex items-center justify-center mb-8 relative">
                <span className="material-symbols-outlined text-6xl text-primary filled-icon">military_tech</span>
                <div className="absolute inset-0 border-4 border-primary rounded-full animate-ping opacity-20"></div>
              </div>
              <h2 className="text-4xl font-black mb-4 dark:text-white">Quiz Completed!</h2>
              <p className="text-zinc-500 font-bold mb-10 max-w-[250px]">
                You got <span className="text-primary">{quizScore} / 3</span> correct. 
                {quizScore === 3 ? " You're a true Ocean Guardian!" : " Great effort, keep learning!"}
              </p>
              
              <div className="bg-zinc-900 dark:bg-primary w-full p-8 rounded-[2rem] text-white mb-8 shadow-2xl">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Rewards Earned</p>
                <p className="text-4xl font-black">+{quizScore * 33} XP</p>
              </div>

              <button 
                onClick={resetQuiz}
                className="w-full py-6 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-black uppercase tracking-widest active:scale-95 transition-all"
              >
                Back to Learning
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Education;
