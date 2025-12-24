import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fish, Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { signIn, signUp, resetPassword, AuthUser } from '../services/authService';

interface LoginProps {
  onLoginSuccess: (user: AuthUser) => void;
}

type AuthMode = 'login' | 'register' | 'forgot';

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // 重置表单
  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError(null);
    setSuccess(null);
  };

  // 切换模式时重置表单
  useEffect(() => {
    resetForm();
  }, [mode]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError('请填写邮箱和密码');
      setLoading(false);
      return;
    }

    const { user, error: authError } = await signIn(email, password);
    
    if (authError) {
      setError(authError.message || '登录失败，请检查邮箱和密码');
    } else if (user) {
      onLoginSuccess(user);
    } else {
      setError('登录失败，请重试');
    }
    
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError('请填写邮箱和密码');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('密码长度至少为6位');
      setLoading(false);
      return;
    }

    const { user, error: authError } = await signUp(email, password, name || undefined);
    
    if (authError) {
      setError(authError.message || '注册失败，请重试');
    } else if (user) {
      setSuccess('注册成功！请检查邮箱验证链接（如已启用邮箱验证）');
      // 自动登录
      setTimeout(() => {
        onLoginSuccess(user);
      }, 1000);
    } else {
      setError('注册失败，请重试');
    }
    
    setLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!email) {
      setError('请填写邮箱地址');
      setLoading(false);
      return;
    }

    const { error: authError } = await resetPassword(email);
    
    if (authError) {
      setError(authError.message || '发送重置邮件失败');
    } else {
      setSuccess('重置密码邮件已发送，请检查您的邮箱');
    }
    
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (mode === 'login') {
      handleLogin(e);
    } else if (mode === 'register') {
      handleRegister(e);
    } else {
      handleForgotPassword(e);
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center p-6 bg-gradient-to-b from-sea-surface via-sea-abyss to-sea-dark">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 bg-sea-accent rounded-3xl shadow-neon-amber mb-4"
          >
            <Fish size={40} className="text-sea-dark" />
          </motion.div>
          <h1 className="text-3xl font-black text-white mb-2">石斑鱼</h1>
          <p className="text-blue-200/60 text-sm">在压力深海，学会呼吸</p>
        </div>

        {/* 表单卡片 */}
        <div className="glass-card p-8">
          {/* 模式切换 */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-semibold transition-all ${
                mode === 'login'
                  ? 'bg-sea-accent text-sea-dark'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              登录
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-semibold transition-all ${
                mode === 'register'
                  ? 'bg-sea-accent text-sea-dark'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              注册
            </button>
          </div>

          {/* 错误/成功消息 */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-xl text-green-200 text-sm"
              >
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 表单 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 注册模式：显示姓名 */}
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-blue-200/80 mb-2">
                  姓名（可选）
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300/60" size={18} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="请输入您的姓名"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-sea-accent focus:ring-2 focus:ring-sea-accent/20 transition-all"
                  />
                </div>
              </div>
            )}

            {/* 邮箱 */}
            <div>
              <label className="block text-sm font-medium text-blue-200/80 mb-2">
                邮箱
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300/60" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-sea-accent focus:ring-2 focus:ring-sea-accent/20 transition-all"
                />
              </div>
            </div>

            {/* 密码（登录和注册模式） */}
            {mode !== 'forgot' && (
              <div>
                <label className="block text-sm font-medium text-blue-200/80 mb-2">
                  密码
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300/60" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={mode === 'register' ? '至少6位字符' : '请输入密码'}
                    required
                    minLength={mode === 'register' ? 6 : undefined}
                    className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-sea-accent focus:ring-2 focus:ring-sea-accent/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300/60 hover:text-blue-200 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            {/* 忘记密码链接（登录模式） */}
            {mode === 'login' && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-sm text-blue-300/80 hover:text-blue-200 transition-colors"
                >
                  忘记密码？
                </button>
              </div>
            )}

            {/* 返回登录（忘记密码模式） */}
            {mode === 'forgot' && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-sm text-blue-300/80 hover:text-blue-200 transition-colors"
                >
                  返回登录
                </button>
              </div>
            )}

            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-sea-accent text-sea-dark font-bold rounded-xl hover:bg-sea-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-neon-amber"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>处理中...</span>
                </>
              ) : (
                <span>
                  {mode === 'login' ? '登录' : mode === 'register' ? '注册' : '发送重置邮件'}
                </span>
              )}
            </button>
          </form>
        </div>

        {/* 底部提示 */}
        <p className="text-center mt-6 text-blue-200/40 text-xs">
          {mode === 'login' ? (
            <>还没有账号？ <button onClick={() => setMode('register')} className="text-sea-accent hover:underline">立即注册</button></>
          ) : (
            <>已有账号？ <button onClick={() => setMode('login')} className="text-sea-accent hover:underline">立即登录</button></>
          )}
        </p>
      </motion.div>
    </div>
  );
};

