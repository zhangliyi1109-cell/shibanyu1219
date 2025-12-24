
import React, { useState, useEffect } from 'react';
import { UserSettings, AppTab } from './types';
import { DEFAULT_SETTINGS } from './constants';
import { StorageService } from './services/storageService';
import { Dashboard } from './components/Dashboard';
import { Discovery } from './components/Tools';
import { Chat } from './components/Chat';
import { Settings } from './components/Settings';
import { Login } from './components/Login';
import { Fish, Waves, Shield, Anchor, Settings as SettingsIcon, MessageCircle, LogOut } from 'lucide-react';
import { initCapacitor, isNativePlatform } from './src/capacitor-init';
import { getCurrentUser, signOut, onAuthStateChange, AuthUser } from './services/authService';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // 检查认证状态
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('检查认证状态失败:', error);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();

    // 监听认证状态变化
    const { data: { subscription } } = onAuthStateChange((user, session) => {
      setUser(user);
      if (user) {
        // 用户登录后，初始化数据
        initAppData();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 初始化应用数据
  const initAppData = async () => {
    try {
      // 初始化 Capacitor（如果是原生平台）
      if (isNativePlatform()) {
        await initCapacitor();
      }
      
      await StorageService.init();
      const loadedSettings = await StorageService.getSettings(DEFAULT_SETTINGS);
      setSettings(loadedSettings);
    } catch (error) {
      console.error('初始化失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 用户登录成功后初始化数据
  useEffect(() => {
    if (user && authLoading === false && isLoading) {
      initAppData();
    }
  }, [user, authLoading]);

  // 处理登录成功
  const handleLoginSuccess = (loggedInUser: AuthUser) => {
    setUser(loggedInUser);
  };

  // 处理登出
  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      setSettings(DEFAULT_SETTINGS);
      setIsLoading(true);
    } catch (error) {
      console.error('登出失败:', error);
    }
  };

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

  // 如果正在加载认证状态，显示加载界面
  if (authLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-sea-surface via-sea-abyss to-sea-dark">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-sea-accent rounded-3xl shadow-neon-amber mb-4 animate-float">
            <Fish size={40} className="text-sea-dark" />
          </div>
          <p className="text-blue-200/60">加载中...</p>
        </div>
      </div>
    );
  }

  // 如果未登录，显示登录界面
  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // 如果已登录但数据还在加载，显示加载界面
  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-sea-surface via-sea-abyss to-sea-dark">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-sea-accent rounded-3xl shadow-neon-amber mb-4 animate-float">
            <Fish size={40} className="text-sea-dark" />
          </div>
          <p className="text-blue-200/60">加载数据中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col overflow-hidden font-sans select-none text-slate-50" style={{ 
      minHeight: '-webkit-fill-available',
      paddingTop: isNativePlatform() ? 'env(safe-area-inset-top)' : '0',
      paddingBottom: isNativePlatform() ? 'env(safe-area-inset-bottom)' : '0',
      paddingLeft: isNativePlatform() ? 'env(safe-area-inset-left)' : '0',
      paddingRight: isNativePlatform() ? 'env(safe-area-inset-right)' : '0'
    } as React.CSSProperties}>
      {/* Deep Sea Gradient Header */}
      <header className="h-20 flex items-center justify-between px-6 z-20 border-b border-white/5 bg-sea-surface/20 backdrop-blur-xl safe-area-top">
        <div className="flex items-center gap-3">
          <div className="bg-sea-accent p-2.5 rounded-2xl shadow-neon-amber animate-float">
            <Fish size={24} className="text-sea-dark" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="font-black text-2xl tracking-tight italic text-white">石斑鱼</span>
              <span className="text-sea-accent font-black text-[10px] tracking-widest opacity-80 uppercase">ShiBanYu</span>
            </div>
            <span className="text-[10px] font-medium text-blue-200/60 tracking-tight">
              {user.phone ? user.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : user.email || '已登录'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowSettingsModal(true)} 
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5 shadow-bubble"
          >
            <SettingsIcon size={20} className="text-blue-100" />
          </button>
          <button 
            onClick={handleLogout}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5 shadow-bubble"
            title="登出"
          >
            <LogOut size={20} className="text-blue-100" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden relative">
        {renderContent()}
      </main>

      {/* Navigation - Glassmorphism style */}
      <nav className="h-[88px] border-t border-white/5 bg-sea-dark/40 backdrop-blur-2xl grid grid-cols-3 pb-6 px-4 z-20 safe-area-bottom" style={{
        paddingBottom: isNativePlatform() ? 'calc(1.5rem + env(safe-area-inset-bottom))' : '1.5rem'
      }}>
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
