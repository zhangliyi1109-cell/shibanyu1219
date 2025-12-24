import { supabase } from './supabaseClient';
import { User, Session, AuthError } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
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

// 注册（邮箱+密码）
export async function signUp(email: string, password: string, name?: string): Promise<{ user: AuthUser | null; error: AuthError | null }> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || email.split('@')[0],
        },
      },
    });

    if (error) {
      return { user: null, error };
    }

    return {
      user: data.user ? {
        id: data.user.id,
        email: data.user.email,
        user_metadata: data.user.user_metadata,
      } : null,
      error: null,
    };
  } catch (error) {
    console.error('注册异常:', error);
    return {
      user: null,
      error: error as AuthError,
    };
  }
}

// 登录（邮箱+密码）
export async function signIn(email: string, password: string): Promise<{ user: AuthUser | null; error: AuthError | null }> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { user: null, error };
    }

    return {
      user: data.user ? {
        id: data.user.id,
        email: data.user.email,
        user_metadata: data.user.user_metadata,
      } : null,
      error: null,
    };
  } catch (error) {
    console.error('登录异常:', error);
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

// 重置密码
export async function resetPassword(email: string): Promise<{ error: AuthError | null }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  } catch (error) {
    console.error('重置密码异常:', error);
    return { error: error as AuthError };
  }
}

// 监听认证状态变化
export function onAuthStateChange(callback: (user: AuthUser | null, session: Session | null) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    const user = session?.user ? {
      id: session.user.id,
      email: session.user.email,
      user_metadata: session.user.user_metadata,
    } : null;
    callback(user, session);
  });
}

