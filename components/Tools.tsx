
import React, { useState, useEffect } from 'react';
import { DailyGoal, Achievement, ColleagueCard } from '../types';
import { StorageService } from '../services/storageService';
import { generateAchievementFeedback } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowRight, X, Waves, Star, Edit2, Trash2, Heart, AlertCircle, Sparkles } from 'lucide-react';

// 获取高品质萌系卡通鱼头像
const getNeighborAvatar = (name: string, index: number) => {
  return `https://api.dicebear.com/7.x/big-smile/svg?seed=${encodeURIComponent(name)}-fish&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
};

export const Discovery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scales' | 'monsters'>('scales');

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* 顶部 Segmented Control 视觉优化 */}
      <div className="px-6 pt-6 pb-2 sticky top-0 z-10">
        <div className="bg-white/10 backdrop-blur-2xl rounded-xl p-1 border border-white/10 flex relative shadow-inner">
          <motion.div 
            layoutId="tab-bg"
            className="absolute top-1 bottom-1 bg-white/15 rounded-[9px] shadow-sm z-0"
            style={{ 
              left: activeTab === 'scales' ? '4px' : 'calc(50% + 2px)',
              right: activeTab === 'scales' ? 'calc(50% + 2px)' : '4px'
            }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
          <button 
            onClick={() => setActiveTab('scales')}
            className={`flex-1 py-1.5 text-xs font-semibold tracking-tight z-10 transition-colors ${activeTab === 'scales' ? 'text-white' : 'text-white/40'}`}
          >
            成长鳞片
          </button>
          <button 
            onClick={() => setActiveTab('monsters')}
            className={`flex-1 py-1.5 text-xs font-semibold tracking-tight z-10 transition-colors ${activeTab === 'monsters' ? 'text-white' : 'text-white/40'}`}
          >
            深海邻居
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 pb-32 no-scrollbar">
        {activeTab === 'scales' ? <ScaleCollection /> : <NPCGallery />}
      </div>
    </div>
  );
};

const ScaleCollection: React.FC = () => {
  const today = new Date().toLocaleDateString('en-CA');
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newAch, setNewAch] = useState('');
  const [loading, setLoading] = useState(false);

  // 加载初始数据
  useEffect(() => {
    const loadAchievements = async () => {
      try {
        const loaded = await StorageService.getAchievementsByDate(today);
        setAchievements(loaded);
      } catch (error) {
        console.error('加载事件记录失败:', error);
      }
    };
    loadAchievements();
  }, [today]);

  const addAch = async () => {
    if (!newAch.trim()) return;
    setLoading(true);
    try {
    const fb = await generateAchievementFeedback(newAch);
    const a: Achievement = { id: crypto.randomUUID(), text: newAch, aiFeedback: fb, timestamp: Date.now(), date: today };
      await StorageService.addAchievement(a);
    setAchievements([a, ...achievements]);
    setNewAch('');
    } catch (error) {
      console.error('添加事件记录失败:', error);
    } finally {
    setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-5 border border-white/10 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-amber-400" size={16} />
          <h3 className="font-bold text-sm text-white/90">捕捉今日微光</h3>
        </div>
        <div className="flex gap-2 mb-4">
          <input 
            value={newAch} 
            onChange={e => setNewAch(e.target.value)} 
            onKeyDown={e => e.key === 'Enter' && addAch()} 
            className="flex-1 bg-white/5 rounded-2xl px-4 py-3 text-sm outline-none border border-white/5 focus:border-white/20 transition-all font-medium placeholder-white/10 text-white" 
            placeholder="写下闪光的一刻..." 
          />
          <button disabled={loading} onClick={addAch} className="bg-white text-black w-11 h-11 rounded-2xl font-bold active:scale-90 transition-transform flex items-center justify-center shrink-0 shadow-lg">
            {loading ? <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : <ArrowRight size={20} />}
          </button>
        </div>
        <div className="space-y-3">
          {achievements.map(a => (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} key={a.id} className="group">
              <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <p className="font-semibold text-sm text-white/90 mb-1.5 tracking-tight">{a.text}</p>
                <div className="flex items-start gap-2">
                  <div className="w-0.5 h-full bg-amber-400/50 rounded-full mt-1.5" />
                  <p className="text-[11px] text-white/40 italic leading-snug font-medium">
                    {a.aiFeedback}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const NPCGallery: React.FC = () => {
  const [cards, setCards] = useState<ColleagueCard[]>([]);
  const [modalState, setModalState] = useState<{ show: boolean; mode: 'add' | 'edit'; card: Partial<ColleagueCard> }>({
    show: false,
    mode: 'add',
    card: { rarity: 1 }
  });

  // 加载初始数据
  useEffect(() => {
    const loadCards = async () => {
      try {
        const loaded = await StorageService.getColleagueCards();
        setCards(loaded);
      } catch (error) {
        console.error('加载深海邻居资料失败:', error);
      }
    };
    loadCards();
  }, []);

  const openAdd = () => setModalState({ show: true, mode: 'add', card: { rarity: 1 } });
  const openEdit = (card: ColleagueCard) => setModalState({ show: true, mode: 'edit', card });

  const saveCard = async () => {
    const { mode, card } = modalState;
    if (!card.name || !card.tag) {
      // 添加视觉反馈：提示用户填写必填字段
      alert('请填写"名字"和"群体"字段');
      return;
    }

    let updatedCards: ColleagueCard[];
    if (mode === 'add') {
      const newC: ColleagueCard = { 
        id: crypto.randomUUID(), 
        name: card.name.trim(), 
        tag: card.tag.trim(), 
        strengths: (card.strengths || '暂未发现闪光点').trim(), 
        weaknesses: (card.weaknesses || '目前表现良好').trim(), 
        rarity: card.rarity || 1 
      };
      updatedCards = [...cards, newC];
    } else {
      updatedCards = cards.map(c => c.id === card.id ? ({
        ...card,
        name: card.name!.trim(),
        tag: card.tag!.trim(),
        strengths: (card.strengths || '暂未发现闪光点').trim(),
        weaknesses: (card.weaknesses || '目前表现良好').trim(),
      } as ColleagueCard) : c);
    }

    setCards(updatedCards);
    try {
      await StorageService.saveColleagueCards(updatedCards);
      setModalState({ ...modalState, show: false });
    } catch (error) {
      console.error('保存深海邻居资料失败:', error);
      alert('保存失败，请重试');
    }
  };

  const deleteCard = async (id: string) => {
    const updated = cards.filter(c => c.id !== id);
    setCards(updated);
    try {
      await StorageService.saveColleagueCards(updated);
    } catch (error) {
      console.error('删除深海邻居资料失败:', error);
    }
    setModalState({ ...modalState, show: false });
  };

  const RARITIES = [
    { lv: 1, label: '初识', color: 'bg-slate-400' },
    { lv: 2, label: '同频', color: 'bg-emerald-400' },
    { lv: 3, label: '稀有', color: 'bg-blue-400' },
    { lv: 4, label: '绝世', color: 'bg-purple-400' },
    { lv: 5, label: '巅峰', color: 'bg-rose-500' },
  ];

  return (
    <div className="h-full relative">
      <div className="grid grid-cols-1 gap-3">
        {cards.map((card, idx) => {
          const r = RARITIES[card.rarity - 1] || RARITIES[0];
          const avatarUrl = getNeighborAvatar(card.name, idx);
          
          return (
            <motion.div 
              layout 
              key={card.id} 
              className="bg-white/[0.04] backdrop-blur-2xl rounded-[1.5rem] p-4 relative border border-white/10 shadow-sm group hover:bg-white/[0.06] transition-colors"
            >
              <button 
                onClick={() => openEdit(card)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-white/20 hover:text-white hover:bg-white/10 transition-all z-20"
              >
                <Edit2 size={12} />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="w-11 h-11 bg-white/10 rounded-2xl overflow-hidden p-0.5 shadow-sm">
                    <img src={avatarUrl} alt={card.name} className="w-full h-full object-cover" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${r.color} rounded-full flex items-center justify-center border-2 border-[#020617] z-20`}>
                    <span className="text-white text-[7px] font-bold">{card.rarity}</span>
                  </div>
                </div>

                <div className="flex flex-col min-w-0">
                  <h4 className="font-bold text-base text-white/95 truncate leading-tight">
                      {card.name}
                  </h4>
                  <span className="text-[10px] text-white/30 font-semibold tracking-wide mt-0.5">
                    {card.tag.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* 信息紧凑化布局 */}
              <div className="space-y-2.5">
                <div className="flex items-start gap-3">
                  <Heart size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-[11px] text-white/60 leading-relaxed font-medium">
                      <span className="text-white/80 mr-1.5">闪光点</span> {card.strengths}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertCircle size={12} className="text-rose-400 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-[11px] text-white/60 leading-relaxed font-medium">
                      <span className="text-white/80 mr-1.5">避雷点</span> {card.weaknesses}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
        
        {cards.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-white/10">
             <Waves size={32} className="mb-4 stroke-[1.5]" />
             <p className="text-xs font-semibold tracking-widest uppercase">静谧深海 · 暂无录入</p>
          </div>
        )}
      </div>
      
      <button 
        onClick={openAdd} 
        className="fixed bottom-32 right-6 bg-white text-black w-13 h-13 rounded-full shadow-2xl z-30 flex items-center justify-center active:scale-95 transition-all"
        style={{ width: '52px', height: '52px' }}
      >
        <Plus size={24} strokeWidth={2.5} />
      </button>

      <AnimatePresence>
        {modalState.show && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              className="bg-[#1c1c1e] w-full max-w-sm p-6 relative rounded-[2rem] border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh] no-scrollbar"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-white">
                  {modalState.mode === 'add' ? '邻居建档' : '编辑档案'}
                </h3>
                <button onClick={() => setModalState({ ...modalState, show: false })} className="p-2 rounded-full bg-white/5 text-white/40">
                  <X size={16}/>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-white/30 ml-1 uppercase">代号</label>
                    <input 
                      value={modalState.card.name || ''}
                      onChange={e => setModalState({ ...modalState, card: { ...modalState.card, name: e.target.value } })} 
                      className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-sm font-semibold outline-none text-white focus:border-white/20 transition-all" 
                      placeholder="名字" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-white/30 ml-1 uppercase">群体</label>
                    <input 
                      value={modalState.card.tag || ''}
                      onChange={e => setModalState({ ...modalState, card: { ...modalState.card, tag: e.target.value } })} 
                      className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-sm font-semibold outline-none text-white focus:border-white/20 transition-all" 
                      placeholder="职场属性" 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/30 ml-1 uppercase">闪光点</label>
                  <textarea 
                    value={modalState.card.strengths || ''}
                    onChange={e => setModalState({ ...modalState, card: { ...modalState.card, strengths: e.target.value } })} 
                    className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-sm font-medium outline-none resize-none text-white focus:border-white/20 transition-all" 
                    rows={2} 
                    placeholder="有哪些优点..." 
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/30 ml-1 uppercase">避雷点</label>
                  <textarea 
                    value={modalState.card.weaknesses || ''}
                    onChange={e => setModalState({ ...modalState, card: { ...modalState.card, weaknesses: e.target.value } })} 
                    className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-sm font-medium outline-none resize-none text-white focus:border-white/20 transition-all" 
                    rows={2} 
                    placeholder="相处要注意..." 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/30 ml-1 uppercase">稀有程度</label>
                  <div className="flex gap-2">
                    {RARITIES.map(r => (
                      <button 
                        key={r.lv} 
                        type="button"
                        onClick={() => setModalState({ ...modalState, card: { ...modalState.card, rarity: r.lv } })} 
                        className={`flex-1 h-9 rounded-lg text-[10px] font-bold transition-all border ${modalState.card.rarity === r.lv ? 'bg-white text-black border-transparent' : 'bg-white/5 text-white/20 border-white/5'}`}
                      >
                        {r.lv}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4">
                  {modalState.mode === 'edit' && (
                    <button 
                      onClick={() => modalState.card.id && deleteCard(modalState.card.id)} 
                      className="bg-rose-500/10 text-rose-500 w-12 h-12 rounded-xl flex items-center justify-center border border-rose-500/10"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      saveCard();
                    }} 
                    disabled={!modalState.card.name || !modalState.card.tag}
                    className={`flex-1 py-3.5 rounded-xl font-bold shadow-lg transition-all text-sm ${
                      !modalState.card.name || !modalState.card.tag
                        ? 'bg-white/20 text-white/40 cursor-not-allowed'
                        : 'bg-white text-black active:scale-95'
                    }`}
                  >
                    保存
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
