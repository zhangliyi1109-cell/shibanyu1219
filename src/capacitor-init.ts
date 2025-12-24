// Capacitor 初始化文件
// 在 Web 环境下，Capacitor 不可用，所以使用条件导入

// 检查是否为原生平台（通过检查 window.Capacitor）
export function isNativePlatform(): boolean {
  return typeof window !== 'undefined' && (window as any).Capacitor?.isNativePlatform() === true;
}

// 获取平台名称
export function getPlatform(): string {
  if (typeof window === 'undefined') return 'web';
  return (window as any).Capacitor?.getPlatform() || 'web';
}

// 初始化 Capacitor 插件
export async function initCapacitor() {
  if (!isNativePlatform()) {
    return; // Web 环境，跳过
  }

  try {
    // 动态导入 Capacitor 模块（仅在原生环境中）
    const { Capacitor } = await import('@capacitor/core');
    const { StatusBar, Style } = await import('@capacitor/status-bar');
    const { SplashScreen } = await import('@capacitor/splash-screen');
    const { Keyboard } = await import('@capacitor/keyboard');
    const { App } = await import('@capacitor/app');

    // 配置状态栏
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#1e3a8a' });
    
    // 配置键盘
    Keyboard.setAccessoryBarVisible({ isVisible: true });
    Keyboard.setResizeMode({ mode: 'native' });
    
    // 隐藏启动画面
    await SplashScreen.hide();
    
    // 监听应用状态
    App.addListener('appStateChange', ({ isActive }: any) => {
      console.log('App state changed. Is active?', isActive);
    });
    
    // 监听返回按钮（Android）
    App.addListener('backButton', () => {
      // 可以在这里处理返回按钮逻辑
    });
    
    console.log('Capacitor initialized successfully');
  } catch (error) {
    console.error('Error initializing Capacitor:', error);
  }
}

// 获取安全区域 insets（用于 iOS 刘海屏等）
export function getSafeAreaInsets(): {
  top: number;
  bottom: number;
  left: number;
  right: number;
} {
  if (!isNativePlatform()) {
    return { top: 0, bottom: 0, left: 0, right: 0 };
  }
  
  // 在 iOS 上，可以通过 CSS 变量获取安全区域
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    return {
      top: parseInt(computedStyle.getPropertyValue('--safe-area-inset-top') || '0'),
      bottom: parseInt(computedStyle.getPropertyValue('--safe-area-inset-bottom') || '0'),
      left: parseInt(computedStyle.getPropertyValue('--safe-area-inset-left') || '0'),
      right: parseInt(computedStyle.getPropertyValue('--safe-area-inset-right') || '0'),
    };
  }
  
  return { top: 0, bottom: 0, left: 0, right: 0 };
}
