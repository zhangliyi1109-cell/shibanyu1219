import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase 配置
// 请替换为你的 Supabase 项目 URL 和 Anon Key
// 这些值可以在 Supabase 项目设置中找到
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// 检查配置是否存在
const hasSupabaseConfig = SUPABASE_URL && SUPABASE_ANON_KEY;

if (!hasSupabaseConfig) {
  console.warn('Supabase 配置缺失，将使用 localStorage 作为存储后端。如需使用 Supabase，请设置环境变量 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY');
}

// 创建 Supabase 客户端（只有在配置存在时才创建真正的客户端）
// 如果配置不存在，创建一个最小化的占位符对象，避免运行时错误
let supabaseInstance: SupabaseClient;

if (hasSupabaseConfig) {
  supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    db: {
      schema: 'public',
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    },
  });
} else {
  // 创建一个占位符客户端，所有方法都会返回错误但不会崩溃应用
  supabaseInstance = createClient('https://placeholder.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTIwMDAsImV4cCI6MTk2MDc2ODAwMH0.placeholder') as SupabaseClient;
}

export const supabase = supabaseInstance;

// 数据库表名
export const TABLES = {
  SETTINGS: 'user_settings',
  GOALS: 'daily_goals',
  ACHIEVEMENTS: 'daily_achievements',
  CARDS: 'colleague_cards',
  TAGS: 'custom_tags',
  MERIT: 'merit_count',
} as const;

