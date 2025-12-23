import { createClient } from '@supabase/supabase-js';

// Supabase 配置
// 请替换为你的 Supabase 项目 URL 和 Anon Key
// 这些值可以在 Supabase 项目设置中找到
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Supabase 配置缺失，请设置环境变量 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY');
}

// 创建 Supabase 客户端
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 数据库表名
export const TABLES = {
  SETTINGS: 'user_settings',
  GOALS: 'daily_goals',
  ACHIEVEMENTS: 'daily_achievements',
  CARDS: 'colleague_cards',
  TAGS: 'custom_tags',
  MERIT: 'merit_count',
} as const;

