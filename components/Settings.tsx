
import React, { useState, useMemo } from 'react';
import { UserSettings } from '../types';
import { AVATAR_OPTIONS } from '../constants';
import { X, Clock, Wallet, Briefcase, User } from 'lucide-react';

interface SettingsProps {
  settings: UserSettings;
  onSave: (newSettings: UserSettings) => void;
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ settings, onSave, onClose }) => {
  const [form, setForm] = useState<UserSettings>(settings);

  const timeOptions = useMemo(() => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      const h = i.toString().padStart(2, '0');
      times.push(`${h}:00`);
      times.push(`${h}:30`);
    }
    return times;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
        ...prev,
        [name]: (name === 'freedomGoalName' || name.includes('Time') || name === 'avatar')
          ? value 
          : parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 z-50 flex items-end sm:items-center justify-center backdrop-blur-md">
      <div className="bg-[#0f172a] w-full sm:w-[480px] h-[90vh] sm:h-auto sm:max-h-[90vh] sm:rounded-3xl rounded-t-3xl p-0 overflow-hidden shadow-2xl flex flex-col border border-white/10">
        
        <div className="flex justify-between items-center p-6 border-b border-white/5 bg-sea-surface/20 sticky top-0 z-10">
          <h2 className="text-xl font-black italic tracking-widest text-white uppercase">潜水员设定</h2>
          <button onClick={onClose} className="bg-white/5 p-2 rounded-full text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-8 pb-10 custom-scrollbar">
          <form id="settings-form" onSubmit={handleSubmit} className="space-y-8">
            
            {/* 0. Avatar Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-widest">
                <User size={14} />
                <span>潜水状态选择</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {AVATAR_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, avatar: opt.id }))}
                    className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${
                      form.avatar === opt.id 
                      ? 'bg-amber-400 border-amber-400 shadow-neon-amber' 
                      : 'bg-white/5 border-white/5 grayscale hover:grayscale-0'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-xl bg-slate-900 mb-2 flex items-center justify-center overflow-hidden border border-white/10">
                       {/* In a real app, these would be the uploaded image assets */}
                       <span className="text-2xl">{opt.id === 'work' ? '💻' : opt.id === 'commute' ? '💼' : opt.id === 'listen' ? '🎧' : '🌊'}</span>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-tighter ${form.avatar === opt.id ? 'text-sea-dark' : 'text-slate-500'}`}>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 1. Salary Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-widest">
                <Briefcase size={14} />
                <span>鱼食补给标准 (薪资)</span>
              </div>
              <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                 <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                       <input
                          type="number"
                          name="preTaxMonthlySalary"
                          value={form.preTaxMonthlySalary}
                          onChange={handleChange}
                          className="w-full bg-slate-900 rounded-xl py-3 px-3 text-center font-black text-lg shadow-inner outline-none focus:ring-2 ring-amber-400/30 text-white"
                        />
                       <span className="text-[10px] text-slate-500 mt-2 block text-center font-black uppercase tracking-widest">月薪 base</span>
                    </div>
                    <span className="text-amber-400 font-black">×</span>
                    <div className="w-20 relative">
                       <input
                          type="number"
                          name="salaryMonths"
                          value={form.salaryMonths}
                          onChange={handleChange}
                          className="w-full bg-slate-900 rounded-xl py-3 px-3 text-center font-black text-lg shadow-inner outline-none focus:ring-2 ring-amber-400/30 text-white"
                        />
                       <span className="text-[10px] text-slate-500 mt-2 block text-center font-black uppercase tracking-widest">薪数</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* 2. Time Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-widest">
                <Clock size={14} />
                <span>潜水营运时间</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <label className="text-[10px] text-slate-500 pl-1 font-black uppercase">Start 深潜开始</label>
                     <select
                        name="startTime"
                        value={form.startTime}
                        onChange={handleChange}
                        className="w-full bg-slate-900 rounded-xl p-3 text-center font-black text-white shadow-inner outline-none focus:ring-2 ring-amber-400/30 appearance-none border border-white/5"
                     >
                        {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] text-slate-500 pl-1 font-black uppercase">End 浮出水面</label>
                     <select
                        name="endTime"
                        value={form.endTime}
                        onChange={handleChange}
                        className="w-full bg-slate-900 rounded-xl p-3 text-center font-black text-white shadow-inner outline-none focus:ring-2 ring-amber-400/30 appearance-none border border-white/5"
                     >
                        {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                     </select>
                  </div>
              </div>
            </div>

            {/* 3. Goal Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-widest">
                <Wallet size={14} />
                <span>彼岸终极目标</span>
              </div>
              
              <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-4">
                 <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 ml-1 font-black uppercase">目标描述</label>
                    <input
                      type="text"
                      name="freedomGoalName"
                      value={form.freedomGoalName}
                      onChange={handleChange}
                      className="w-full bg-slate-900 rounded-xl p-4 text-white text-xs font-bold outline-none border border-white/5 focus:border-amber-400/30"
                      placeholder="例如：环游深海"
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 ml-1 font-black uppercase">所需金额</label>
                    <input
                      type="number"
                      name="freedomGoalTargetAmount"
                      value={form.freedomGoalTargetAmount}
                      onChange={handleChange}
                      className="w-full bg-slate-900 rounded-xl p-4 text-white font-black text-sm outline-none border border-white/5 focus:border-amber-400/30"
                    />
                 </div>
              </div>
            </div>

          </form>
        </div>

        <div className="p-6 border-t border-white/5 bg-slate-900">
          <button
            onClick={handleSubmit}
            className="w-full bg-amber-400 text-slate-900 font-black text-sm py-5 rounded-2xl shadow-neon-amber active:scale-95 transition-transform uppercase tracking-widest"
          >
            同步深海配置
          </button>
        </div>
        
      </div>
    </div>
  );
};
