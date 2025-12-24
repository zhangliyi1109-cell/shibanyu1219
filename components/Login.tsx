import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fish, Phone, Lock, User, Loader2 } from 'lucide-react';
import { sendOTP, verifyOTP, resendOTP, AuthUser } from '../services/authService';

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
          使用手机号登录，验证码将发送到您的手机
        </p>
      </motion.div>
    </div>
  );
};
