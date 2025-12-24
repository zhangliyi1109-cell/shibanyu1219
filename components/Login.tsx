import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fish, Phone, Lock, User, Loader2 } from 'lucide-react';
import { sendOTP, verifyOTP, resendOTP, signInWithWeChat, AuthUser } from '../services/authService';

interface LoginProps {
  onLoginSuccess: (user: AuthUser) => void;
}

type AuthMode = 'phone' | 'verify';

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  // 倒计时
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 格式化手机号显示
  const formatPhone = (value: string) => {
    // 移除所有非数字字符
    const numbers = value.replace(/\D/g, '');
    // 限制长度
    if (numbers.length > 11) return phone;
    return numbers;
  };

  // 验证手机号格式
  const validatePhone = (phoneNumber: string): boolean => {
    // 中国手机号：11位数字，以1开头
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  // 发送验证码
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!phone) {
      setError('请填写手机号');
      setLoading(false);
      return;
    }

    const formattedPhone = formatPhone(phone);
    if (!validatePhone(formattedPhone)) {
      setError('请输入正确的手机号（11位数字）');
      setLoading(false);
      return;
    }

    const { error: authError } = await sendOTP(formattedPhone);
    
    if (authError) {
      setError(authError.message || '发送验证码失败，请重试');
    } else {
      setSuccess('验证码已发送，请查收短信');
      setMode('verify');
      setCountdown(60); // 60秒倒计时
    }
    
    setLoading(false);
  };

  // 验证验证码
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!code || code.length !== 6) {
      setError('请输入6位验证码');
      setLoading(false);
      return;
    }

    const formattedPhone = formatPhone(phone);
    const { user, error: authError } = await verifyOTP(formattedPhone, code);
    
    if (authError) {
      setError(authError.message || '验证码错误，请重试');
    } else if (user) {
      onLoginSuccess(user);
    } else {
      setError('验证失败，请重试');
    }
    
    setLoading(false);
  };

  // 重新发送验证码
  const handleResendCode = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formattedPhone = formatPhone(phone);
    const { error: authError } = await resendOTP(formattedPhone);
    
    if (authError) {
      setError(authError.message || '重新发送失败，请重试');
    } else {
      setSuccess('验证码已重新发送');
      setCountdown(60);
    }
    
    setLoading(false);
  };

  // 返回输入手机号
  const handleBackToPhone = () => {
    setMode('phone');
    setCode('');
    setError(null);
    setSuccess(null);
  };

  // 微信登录
  const handleWeChatLogin = async () => {
    setLoading(true);
    setError(null);
    
    const { error } = await signInWithWeChat();
    
    if (error) {
      setError(error.message || '微信登录失败，请重试');
      setLoading(false);
    }
    // 如果成功，会重定向到微信授权页面，不需要处理成功情况
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

          {/* 输入手机号 */}
          {mode === 'phone' && (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-200/80 mb-2">
                  手机号
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300/60" size={18} />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    placeholder="请输入11位手机号"
                    required
                    maxLength={11}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-sea-accent focus:ring-2 focus:ring-sea-accent/20 transition-all"
                  />
                </div>
                <p className="mt-1 text-xs text-blue-200/40">我们将发送验证码到您的手机</p>
              </div>

              <button
                type="submit"
                disabled={loading || !phone}
                className="w-full py-3 bg-sea-accent text-sea-dark font-bold rounded-xl hover:bg-sea-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-neon-amber"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>发送中...</span>
                  </>
                ) : (
                  <span>发送验证码</span>
                )}
              </button>

              {/* 分隔线 */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-blue-200/40">或</span>
                </div>
              </div>

              {/* 微信登录按钮 */}
              <button
                type="button"
                onClick={handleWeChatLogin}
                disabled={loading}
                className="w-full py-3 bg-[#07C160] text-white font-bold rounded-xl hover:bg-[#06AD56] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>跳转中...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.496-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm6.281 3.336c-1.892-.104-3.942.376-5.524 1.63-1.522 1.2-2.396 3.148-2.169 5.018.107.877.586 1.66 1.303 2.2.855.644 1.918.95 2.985.838a8.16 8.16 0 0 0 2.604-.732.864.864 0 0 1 .717-.098l1.902 1.114a.326.326 0 0 0 .167.054c.16 0 .29-.132.29-.295 0-.072-.029-.142-.048-.213l-.39-1.48a.59.59 0 0 1 .213-.665c1.717-1.278 2.756-3.143 2.756-5.2 0-3.582-3.405-6.47-7.6-6.47zm-4.218 3.336c.519 0 .94.427.94.953a.948.948 0 0 1-.94.953.948.948 0 0 1-.94-.953c0-.526.421-.953.94-.953zm4.218 0c.519 0 .94.427.94.953a.948.948 0 0 1-.94.953.948.948 0 0 1-.94-.953c0-.526.421-.953.94-.953z"/>
                    </svg>
                    <span>微信登录</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* 输入验证码 */}
          {mode === 'verify' && (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-200/80 mb-2">
                  验证码
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300/60" size={18} />
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setCode(value);
                    }}
                    placeholder="请输入6位验证码"
                    required
                    maxLength={6}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-sea-accent focus:ring-2 focus:ring-sea-accent/20 transition-all text-center text-2xl tracking-widest"
                  />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-blue-200/60">
                    已发送到：{phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}
                  </p>
                  {countdown > 0 ? (
                    <span className="text-xs text-blue-200/40">
                      {countdown}秒后可重发
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={loading}
                      className="text-xs text-sea-accent hover:text-sea-accent/80 transition-colors disabled:opacity-50"
                    >
                      重新发送
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBackToPhone}
                  disabled={loading}
                  className="flex-1 py-3 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 disabled:opacity-50 transition-all border border-white/10"
                >
                  返回
                </button>
                <button
                  type="submit"
                  disabled={loading || code.length !== 6}
                  className="flex-1 py-3 bg-sea-accent text-sea-dark font-bold rounded-xl hover:bg-sea-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-neon-amber"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>验证中...</span>
                    </>
                  ) : (
                    <span>登录</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* 底部提示 */}
        <p className="text-center mt-6 text-blue-200/40 text-xs">
          {mode === 'phone' ? '使用手机号或微信登录' : '验证码将发送到您的手机'}
        </p>
      </motion.div>
    </div>
  );
};
