import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 移动端兼容性：确保 DOM 完全加载
function initApp() {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Could not find root element to mount to");
    // 显示错误信息
    document.body.innerHTML = '<div style="padding: 20px; color: white; text-align: center;"><h1>初始化错误</h1><p>无法找到根元素</p></div>';
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('App mounted successfully');
  } catch (error) {
    console.error('Failed to mount app:', error);
    rootElement.innerHTML = '<div style="padding: 20px; color: white; text-align: center;"><h1>应用错误</h1><p>无法启动应用</p><p style="font-size: 12px; margin-top: 10px;">' + error.message + '</p></div>';
  }
}

// 确保 DOM 完全加载后再初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  // DOM 已经加载完成
  initApp();
}