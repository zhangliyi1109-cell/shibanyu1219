import { supabase } from './supabaseClient';
import { User, Session, AuthError } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  phone?: string;
  email?: string;
  user_metadata?: {
    name?: string;
    avatar_url?: string;
  };
}

export interface AuthState {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
}

// 获取当前用户
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error('获取用户失败:', error);
      return null;
    }
    if (!user) return null;
    
    return {
      id: user.id,
      phone: user.phone,
      email: user.email,
      user_metadata: user.user_metadata,
    };
  } catch (error) {
    console.error('获取用户异常:', error);
    return null;
  }
}

// 获取当前会话
export async function getCurrentSession(): Promise<Session | null> {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error('获取会话失败:', error);
      return null;
    }
    return session;
  } catch (error) {
    console.error('获取会话异常:', error);
    return null;
  }
}

// 发送手机验证码
export async function sendOTP(phone: string): Promise<{ error: AuthError | null }> {
  try {
    // 格式化手机号（确保包含国家代码，例如 +86）
    const formattedPhone = phone.startsWith('+') ? phone : `+86${phone}`;
    
    const { error } = await supabase.auth.signInWithOtp({
      phone: formattedPhone,
    });

    return { error };
  } catch (error) {
    console.error('发送验证码异常:', error);
    return { error: error as AuthError };
  }
}

// 验证手机验证码（登录/注册）
export async function verifyOTP(phone: string, token: string): Promise<{ user: AuthUser | null; error: AuthError | null }> {
  try {
    // 格式化手机号
    const formattedPhone = phone.startsWith('+') ? phone : `+86${phone}`;
    
    const { data, error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token,
      type: 'sms',
    });

    if (error) {
      return { user: null, error };
    }

    return {
      user: data.user ? {
        id: data.user.id,
        phone: data.user.phone,
        email: data.user.email,
        user_metadata: data.user.user_metadata,
      } : null,
      error: null,
    };
  } catch (error) {
    console.error('验证码验证异常:', error);
    return {
      user: null,
      error: error as AuthError,
    };
  }
}

// 登出
export async function signOut(): Promise<{ error: AuthError | null }> {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    console.error('登出异常:', error);
    return { error: error as AuthError };
  }
}

// 重新发送验证码
export async function resendOTP(phone: string): Promise<{ error: AuthError | null }> {
  return sendOTP(phone);
}

// 监听认证状态变化
export function onAuthStateChange(callback: (user: AuthUser | null, session: Session | null) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    const user = session?.user ? {
      id: session.user.id,
      phone: session.user.phone,
      email: session.user.email,
      user_metadata: session.user.user_metadata,
    } : null;
    callback(user, session);
  });
}

