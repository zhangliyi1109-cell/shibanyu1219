
import React, { useState, useEffect } from 'react';
import { UserSettings, AppTab } from './types';
import { DEFAULT_SETTINGS } from './constants';
import { StorageService } from './services/storageService';
import { Dashboard } from './components/Dashboard';
import { Discovery } from './components/Tools';
import { Chat } from './components/Chat';
import { Settings } from './components/Settings';
import { Fish, Waves, Shield, Anchor, Settings as SettingsIcon, MessageCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化 StorageService 并加载设置
  useEffect(() => {
    const init = async () => {
      try {
        await StorageService.init();
        const loadedSettings = await StorageService.getSettings(DEFAULT_SETTINGS);
        setSettings(loadedSettings);
      } catch (error) {
        console.error('初始化失败:', error);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const handleSaveSettings = async (newSettings: UserSettings) => {
    setSettings(newSettings);
    try {
      await StorageService.saveSettings(newSettings);
    } catch (error) {
      console.error('保存设置失败:', error);
    }
    setShowSettingsModal(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard settings={settings} />;
      case AppTab.DISCOVERY:
        return <Discovery />;
      case AppTab.CHAT:
        return <Chat />;
      default:
        return <Dashboard settings={settings} />;
    }
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden font-sans select-none text-slate-50" style={{ minHeight: '100vh' } as React.CSSProperties}>
      {/* Deep Sea Gradient Header */}
      <header className="h-20 flex items-center justify-between px-6 z-20 border-b border-white/5 bg-sea-surface/20 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="bg-sea-accent p-2.5 rounded-2xl shadow-neon-amber animate-float">
            <Fish size={24} className="text-sea-dark" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="font-black text-2xl tracking-tight italic text-white">石斑鱼</span>
              <span className="text-sea-accent font-black text-[10px] tracking-widest opacity-80 uppercase">ShiBanYu</span>
            </div>
            <span className="text-[10px] font-medium text-blue-200/60 tracking-tight">在压力深海，学会呼吸。</span>
          </div>
        </div>
        <button 
          onClick={() => setShowSettingsModal(true)} 
          className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5 shadow-bubble"
        >
          <SettingsIcon size={20} className="text-blue-100" />
        </button>
      </header>

      <main className="flex-1 overflow-hidden relative">
        {renderContent()}
      </main>

      {/* Navigation - Glassmorphism style */}
      <nav className="h-[88px] border-t border-white/5 bg-sea-dark/40 backdrop-blur-2xl grid grid-cols-3 pb-6 px-4 z-20">
        <button 
          onClick={() => setActiveTab(AppTab.DASHBOARD)} 
          className={`flex flex-col items-center justify-center gap-1 transition-all ${activeTab === AppTab.DASHBOARD ? 'scale-110' : 'opacity-40'}`}
        >
          <Anchor size={22} className={activeTab === AppTab.DASHBOARD ? 'text-sea-accent' : 'text-white'} />
          <span className="text-[10px] font-black tracking-widest uppercase">潜水舱</span>
        </button>
        <button 
          onClick={() => setActiveTab(AppTab.DISCOVERY)} 
          className={`flex flex-col items-center justify-center gap-1 transition-all ${activeTab === AppTab.DISCOVERY ? 'scale-110' : 'opacity-40'}`}
        >
          <Shield size={22} className={activeTab === AppTab.DISCOVERY ? 'text-sea-accent' : 'text-white'} />
          <span className="text-[10px] font-black tracking-widest uppercase">深海录</span>
        </button>
        <button 
          onClick={() => setActiveTab(AppTab.CHAT)} 
          className={`flex flex-col items-center justify-center gap-1 transition-all ${activeTab === AppTab.CHAT ? 'scale-110' : 'opacity-40'}`}
        >
          <Waves size={22} className={activeTab === AppTab.CHAT ? 'text-sea-accent' : 'text-white'} />
          <span className="text-[10px] font-black tracking-widest uppercase">回声</span>
        </button>
      </nav>

      {showSettingsModal && (
        <Settings settings={settings} onSave={handleSaveSettings} onClose={() => setShowSettingsModal(false)} />
      )}
    </div>
  );
}
