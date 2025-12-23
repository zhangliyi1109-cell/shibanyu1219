
import React, { useState, useEffect, useMemo } from 'react';
import { UserSettings, DailyGoal } from '../types';
import { MERIT_TEXTS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Waves, Plus, CheckCircle2, Circle, Anchor, Briefcase, TrendingUp } from 'lucide-react';
import { StorageService } from '../services/storageService';

interface DashboardProps {
  settings: UserSettings;
}

export const Dashboard: React.FC<DashboardProps> = ({ settings }) => {
  const today = new Date().toLocaleDateString('en-CA');
  const [todayEarnings, setTodayEarnings] = useState(0);
  const [meritCount, setMeritCount] = useState(0);
  const [popups, setPopups] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
  const [goals, setGoals] = useState<DailyGoal[]>([]);
  const [newGoalText, setNewGoalText] = useState('');

  // 加载初始数据
  useEffect(() => {
    const loadData = async () => {
      try {
        const [loadedGoals, loadedMeritCount] = await Promise.all([
          StorageService.getGoalsByDate(today),
          StorageService.getMeritCount(),
        ]);
        setGoals(loadedGoals);
        setMeritCount(loadedMeritCount);
      } catch (error) {
        console.error('加载数据失败:', error);
      }
    };
    loadData();
  }, [today]);

  const stats = useMemo(() => {
    const monthlyTotal = settings.preTaxMonthlySalary * (settings.salaryMonths / 12);
    const dailyWage = monthlyTotal / settings.workDaysPerMonth;
    const [sh, sm] = settings.startTime.split(':').map(Number);
    const [eh, em] = settings.endTime.split(':').map(Number);
    const startSecs = (sh * 3600) + (sm * 60);
    const endSecs = (eh * 3600) + (em * 60);
    const totalWorkSecs = Math.max(endSecs - startSecs, 1);
    const perSecondRate = dailyWage / totalWorkSecs;
    return { startSecs, endSecs, totalWorkSecs, perSecondRate };
  }, [settings]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const currentSecs = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
      let worked = 0;
      if (currentSecs > stats.startSecs) {
        worked = Math.min(currentSecs - stats.startSecs, stats.totalWorkSecs);
      }
      setTodayEarnings(worked * stats.perSecondRate);
    }, 100);
    return () => clearInterval(timer);
  }, [stats]);

  const isWorking = useMemo(() => {
    const now = new Date();
    const currentSecs = (now.getHours() * 3600) + (now.getMinutes() * 60);
    return currentSecs >= stats.startSecs && currentSecs <= stats.endSecs;
  }, [stats]);

  const progress = Math.min((todayEarnings / settings.freedomGoalTargetAmount) * 100, 100);

  const addGoal = async () => {
    if (!newGoalText.trim()) return;
    const g: DailyGoal = { id: crypto.randomUUID(), date: today, text: newGoalText.trim(), isCompleted: false, createdAt: Date.now() };
    try {
      await StorageService.addGoal(g);
    setGoals([...goals, g]);
    setNewGoalText('');
    } catch (error) {
      console.error('添加目标失败:', error);
    }
  };

  const toggleGoal = async (id: string) => {
    const updated = goals.map(g => g.id === id ? { ...g, isCompleted: !g.isCompleted } : g);
    setGoals(updated);
    const target = updated.find(g => g.id === id);
    if (target) {
      try {
        await StorageService.updateGoal(target);
      } catch (error) {
        console.error('更新目标失败:', error);
      }
    }
  };

  const handleMeritClick = async (e: React.MouseEvent) => {
    const newCount = meritCount + 1;
    setMeritCount(newCount);
    try {
      await StorageService.saveMeritCount(newCount);
    } catch (error) {
      console.error('保存功德计数失败:', error);
    }
    
    // 安全地获取元素位置
    if (!e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect) return;
    
    const id = Date.now();
    setPopups(prev => [...prev, { 
      id, 
      text: MERIT_TEXTS[Math.floor(Math.random() * MERIT_TEXTS.length)],
      x: e.clientX - rect.left,
      y: e.clientY - rect.top 
    }]);
    setTimeout(() => setPopups(prev => prev.filter(p => p.id !== id)), 800);
  };

  // Avatar Icons
  const getAvatarEmoji = () => {
    switch(settings.avatar) {
      case 'work': return '💻';
      case 'commute': return '💼';
      case 'listen': return '🎧';
      default: return '🐟';
    }
  };

  const getStatusText = () => {
     if (!isWorking) return "在深海休息中";
     switch(settings.avatar) {
        case 'work': return "深潜采集中";
        case 'commute': return "背包出发中";
        case 'listen': return "浅游放松中";
        case 'relax': return "离岸梦想中";
        default: return "潜伏记录中";
     }
  };

  return (
    <div className="flex flex-col h-full bg-transparent p-5 gap-5 overflow-y-auto pb-32" style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
      
      {/* 1. Mascot Section */}
      <section className="flex flex-col items-center pt-2">
         <motion.div 
            animate={{ 
                y: [0, -15, 0],
                rotate: isWorking ? [0, 5, -5, 0] : [0, 2, -2, 0]
            }}
            transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="relative"
         >
            <div className="w-24 h-24 bg-white/5 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center shadow-bubble overflow-hidden">
               <span className="text-5xl">{getAvatarEmoji()}</span>
               {isWorking && (
                 <div className="absolute -top-1 -right-1 bg-amber-400 p-1.5 rounded-full shadow-neon-amber">
                    <Briefcase size={12} className="text-sea-dark" />
                 </div>
               )}
            </div>
         </motion.div>
         
         <div className="mt-4 text-center">
            <h2 className="text-[11px] font-black tracking-[0.4em] text-amber-400 uppercase italic">石斑鱼 · {getStatusText()}</h2>
         </div>
      </section>

      {/* 2. Earnings Block */}
      <section className="glass-card p-6 flex flex-col relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
        <div className="flex justify-between items-center mb-4 relative z-10">
           <div className="flex items-center gap-2">
              <div className="bg-blue-500/20 p-1.5 rounded-lg border border-blue-400/20">
                <Calculator size={14} className="text-blue-400" />
              </div>
              <span className="text-[11px] font-black text-blue-200/60 uppercase tracking-widest leading-normal">今日已捕获鱼食</span>
           </div>
           <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${isWorking ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-white/30'}`}>
             {isWorking ? 'CAPTURING...' : 'IDLE'}
           </span>
        </div>

        <div className="flex items-baseline relative z-10 mb-2 py-2 overflow-visible">
          <span className="text-2xl font-black text-amber-400 mr-2 italic tracking-tighter">¥</span>
          <motion.span 
            className="text-5xl font-black text-white tracking-tight tabular-nums leading-none"
          >
            {todayEarnings.toFixed(4).split('.')[0]}
            <span className="text-2xl opacity-40">.{todayEarnings.toFixed(4).split('.')[1]}</span>
          </motion.span>
        </div>

        <div className="flex items-center gap-3 relative z-10 mt-3">
           <div className="bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
              <TrendingUp size={12} className="text-red-500" />
              <span className="text-[10px] font-black text-red-500 leading-normal">{settings.salaryMonths}薪战士</span>
           </div>
           <span className="text-[10px] font-bold text-gray-500 tracking-wide leading-normal">{settings.startTime}-{settings.endTime} 营业中</span>
        </div>
      </section>

      {/* 3. Fuji Redemption Progress */}
      <section className="glass-card p-5 relative">
        <div className="flex justify-between items-end mb-4 relative z-10">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
               <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest leading-normal">{settings.freedomGoalName}</span>
            </div>
            <div className="text-[20px] font-black text-white italic tracking-tighter leading-normal">
              游离进度: {progress.toFixed(1)}%
            </div>
          </div>
          <div className="text-right">
             <div className="text-[10px] font-bold text-blue-200/40 uppercase mb-0.5 leading-normal">剩余距离</div>
             <div className="text-sm font-black text-amber-400/80 leading-normal">¥{Math.max(0, settings.freedomGoalTargetAmount - todayEarnings).toFixed(0)}</div>
          </div>
        </div>

        <div className="relative h-20 w-full flex items-end justify-center px-4 overflow-hidden bg-white/5 rounded-2xl border border-white/5">
           <svg viewBox="0 0 100 60" className="w-full h-full drop-shadow-xl" preserveAspectRatio="none">
              <defs>
                 <clipPath id="fuji-clip">
                    <path d="M10 60 L42 12 L58 12 L90 60 Z" />
                 </clipPath>
                 <linearGradient id="fill-gradient" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f59e0b" />
                 </linearGradient>
              </defs>
              <path d="M10 60 L42 12 L58 12 L90 60 Z" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeLinejoin="round" />
              <motion.rect 
                x="0" y={60} width="100" 
                animate={{ height: progress * 0.6, y: 60 - (progress * 0.6) }}
                fill="url(#fill-gradient)" clipPath="url(#fuji-clip)"
                transition={{ duration: 1 }} className="opacity-80"
              />
           </svg>
        </div>
      </section>

      {/* 4. Safe House (Goals) */}
      <section className="glass-card p-5 border-amber-400/10">
        <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-2">
              <Anchor size={16} className="text-amber-400" />
              <h2 className="text-xs font-black text-white italic tracking-widest uppercase leading-normal">避风港计划</h2>
           </div>
        </div>
        
        <div className="flex gap-2 mb-4">
          <input 
            value={newGoalText} 
            onChange={e => setNewGoalText(e.target.value)} 
            onKeyDown={e => e.key === 'Enter' && addGoal()} 
            className="flex-1 bg-white/5 rounded-xl px-4 py-3 text-xs font-bold outline-none border border-white/5 focus:border-amber-400/30 transition-all placeholder-white/10" 
            placeholder="今天游向哪里？" 
          />
          <button onClick={addGoal} className="bg-amber-400 text-sea-dark w-10 h-10 rounded-xl flex items-center justify-center active:scale-90 transition-transform shadow-neon-amber">
            <Plus size={20} />
          </button>
        </div>

        <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
          {goals.map(g => (
            <motion.div 
              layout key={g.id} 
              onClick={() => toggleGoal(g.id)}
              className={`flex items-center gap-3 p-3.5 rounded-xl text-xs font-bold transition-all border ${g.isCompleted ? 'bg-white/5 text-white/20 border-transparent line-through' : 'bg-white/5 text-white border-white/5 hover:bg-white/10'}`}
            >
              {g.isCompleted ? <CheckCircle2 size={16} className="text-amber-400" /> : <Circle size={16} className="text-white/20" />}
              <span className="flex-1 truncate leading-normal">{g.text}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Pressure Relief */}
      <section className="glass-card p-6 flex flex-col items-center justify-center">
         <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => handleMeritClick(e)}
            className="w-16 h-16 bg-amber-400/20 rounded-full flex items-center justify-center border border-amber-400/30 shadow-neon-amber relative group"
         >
            <div className="absolute inset-0 bg-amber-400/5 rounded-full animate-ping opacity-20"></div>
            <Waves className="text-amber-400" size={24} />
            <AnimatePresence>
              {popups.map(p => (
                <motion.span
                  key={p.id}
                  initial={{ opacity: 1, y: 0, scale: 0.5 }}
                  animate={{ opacity: 0, y: -60, scale: 1.5 }}
                  className="absolute text-amber-400 font-black text-xs whitespace-nowrap pointer-events-none italic"
                  style={{ left: p.x, top: p.y }}
                >
                  {p.text}
                </motion.span>
              ))}
            </AnimatePresence>
         </motion.button>
         <span className="text-[10px] font-black text-amber-400/30 uppercase tracking-[0.3em] mt-4 italic">压力排泄泡</span>
      </section>
    </div>
  );
};
