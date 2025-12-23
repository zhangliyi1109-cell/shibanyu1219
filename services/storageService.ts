import { Achievement, ColleagueCard, DailyGoal, UserSettings } from "../types";
import { DEFAULT_SETTINGS, COLLEAGUE_TAGS } from "../constants";
import { SupabaseService } from "./supabaseService";
import { migrateToSupabase, isMigrated } from "./migrationService";

// 检查是否有 Supabase 配置
const hasSupabaseConfig = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

// 使用 Supabase 存储的配置（只有在配置存在时才启用）
const USE_SUPABASE = hasSupabaseConfig;

// localStorage 后备方案（用于兼容或离线模式）
const DB_KEYS = {
  SETTINGS: 'wsk_db_settings',
  GOALS: 'wsk_db_goals',
  ACHIEVEMENTS: 'wsk_db_achievements',
  CARDS: 'wsk_db_cards',
  TAGS: 'wsk_db_tags',
  MERIT: 'wsk_db_merit_count',
};

const getTable = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveTable = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// 初始化：检查并执行迁移
let migrationChecked = false;
const ensureMigration = async () => {
  if (!migrationChecked && USE_SUPABASE && !isMigrated()) {
    migrationChecked = true;
    try {
      await migrateToSupabase();
    } catch (error) {
      console.error('数据迁移失败，将使用 localStorage:', error);
    }
  }
};

export const StorageService = {
  // 初始化（在应用启动时调用）
  init: async () => {
    if (USE_SUPABASE) {
      await ensureMigration();
    }
  },

  // --- SETTINGS ---
  getSettings: async (defaultValue = DEFAULT_SETTINGS): Promise<UserSettings> => {
    if (USE_SUPABASE) {
      await ensureMigration();
      try {
        return await SupabaseService.getSettings(defaultValue);
      } catch (error) {
        console.error('从 Supabase 获取设置失败，使用 localStorage:', error);
        const saved = localStorage.getItem(DB_KEYS.SETTINGS);
        return saved ? JSON.parse(saved) : defaultValue;
      }
    }
    const saved = localStorage.getItem(DB_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : defaultValue;
  },

  saveSettings: async (settings: UserSettings): Promise<void> => {
    if (USE_SUPABASE) {
      await ensureMigration();
      try {
        await SupabaseService.saveSettings(settings);
        // 同时保存到 localStorage 作为备份
        localStorage.setItem(DB_KEYS.SETTINGS, JSON.stringify(settings));
        return;
      } catch (error) {
        console.error('保存到 Supabase 失败，使用 localStorage:', error);
      }
    }
    localStorage.setItem(DB_KEYS.SETTINGS, JSON.stringify(settings));
  },

  // --- GOALS (Multiple Daily Targets) ---
  getGoalsByDate: async (dateStr: string): Promise<DailyGoal[]> => {
    if (USE_SUPABASE) {
      await ensureMigration();
      try {
        return await SupabaseService.getGoalsByDate(dateStr);
      } catch (error) {
        console.error('从 Supabase 获取目标失败，使用 localStorage:', error);
        const all = getTable<DailyGoal>(DB_KEYS.GOALS);
        return all.filter(g => g.date === dateStr);
      }
    }
    const all = getTable<DailyGoal>(DB_KEYS.GOALS);
    return all.filter(g => g.date === dateStr);
  },

  addGoal: async (goal: DailyGoal): Promise<void> => {
    if (USE_SUPABASE) {
      await ensureMigration();
      try {
        await SupabaseService.addGoal(goal);
        // 同时保存到 localStorage 作为备份
        const all = getTable<DailyGoal>(DB_KEYS.GOALS);
        saveTable(DB_KEYS.GOALS, [...all, goal]);
        return;
      } catch (error) {
        console.error('保存到 Supabase 失败，使用 localStorage:', error);
      }
    }
    const all = getTable<DailyGoal>(DB_KEYS.GOALS);
    saveTable(DB_KEYS.GOALS, [...all, goal]);
  },

  updateGoal: async (updatedGoal: DailyGoal): Promise<void> => {
    if (USE_SUPABASE) {
      await ensureMigration();
      try {
        await SupabaseService.updateGoal(updatedGoal);
        // 同时更新 localStorage
        const all = getTable<DailyGoal>(DB_KEYS.GOALS);
        const index = all.findIndex(g => g.id === updatedGoal.id);
        if (index !== -1) {
          all[index] = updatedGoal;
          saveTable(DB_KEYS.GOALS, all);
        }
        return;
      } catch (error) {
        console.error('更新 Supabase 失败，使用 localStorage:', error);
      }
    }
    const all = getTable<DailyGoal>(DB_KEYS.GOALS);
    const index = all.findIndex(g => g.id === updatedGoal.id);
    if (index !== -1) {
      all[index] = updatedGoal;
      saveTable(DB_KEYS.GOALS, all);
    }
  },

  deleteGoal: async (id: string): Promise<void> => {
    if (USE_SUPABASE) {
      await ensureMigration();
      try {
        await SupabaseService.deleteGoal(id);
        // 同时更新 localStorage
        const all = getTable<DailyGoal>(DB_KEYS.GOALS);
        const filtered = all.filter(g => g.id !== id);
        saveTable(DB_KEYS.GOALS, filtered);
        return;
      } catch (error) {
        console.error('从 Supabase 删除失败，使用 localStorage:', error);
      }
    }
    const all = getTable<DailyGoal>(DB_KEYS.GOALS);
    const filtered = all.filter(g => g.id !== id);
    saveTable(DB_KEYS.GOALS, filtered);
  },
  
  getAllGoals: async (): Promise<DailyGoal[]> => {
    if (USE_SUPABASE) {
      await ensureMigration();
      try {
        return await SupabaseService.getAllGoals();
      } catch (error) {
        console.error('从 Supabase 获取所有目标失败，使用 localStorage:', error);
        return getTable<DailyGoal>(DB_KEYS.GOALS);
      }
    }
    return getTable<DailyGoal>(DB_KEYS.GOALS);
  },

  // --- ACHIEVEMENTS (Highlights) ---
  getAchievements: async (): Promise<Achievement[]> => {
    if (USE_SUPABASE) {
      await ensureMigration();
      try {
        return await SupabaseService.getAchievements();
      } catch (error) {
        console.error('从 Supabase 获取事件记录失败，使用 localStorage:', error);
        return getTable<Achievement>(DB_KEYS.ACHIEVEMENTS);
      }
    }
    return getTable<Achievement>(DB_KEYS.ACHIEVEMENTS);
  },
  
  getAchievementsByDate: async (dateStr: string): Promise<Achievement[]> => {
    if (USE_SUPABASE) {
      await ensureMigration();
      try {
        return await SupabaseService.getAchievementsByDate(dateStr);
      } catch (error) {
        console.error('从 Supabase 获取事件记录失败，使用 localStorage:', error);
        const all = getTable<Achievement>(DB_KEYS.ACHIEVEMENTS);
        return all.filter(a => a.date === dateStr).sort((a, b) => b.timestamp - a.timestamp);
      }
    }
    const all = getTable<Achievement>(DB_KEYS.ACHIEVEMENTS);
    return all.filter(a => a.date === dateStr).sort((a, b) => b.timestamp - a.timestamp);
  },

  addAchievement: async (item: Achievement): Promise<void> => {
    if (USE_SUPABASE) {
      await ensureMigration();
      try {
        await SupabaseService.addAchievement(item);
        // 同时保存到 localStorage
        const all = getTable<Achievement>(DB_KEYS.ACHIEVEMENTS);
        saveTable(DB_KEYS.ACHIEVEMENTS, [item, ...all]);
        return;
      } catch (error) {
        console.error('保存到 Supabase 失败，使用 localStorage:', error);
      }
    }
    const all = getTable<Achievement>(DB_KEYS.ACHIEVEMENTS);
    saveTable(DB_KEYS.ACHIEVEMENTS, [item, ...all]);
  },

  // --- COLLEAGUE CARDS ---
  getColleagueCards: async (): Promise<ColleagueCard[]> => {
    if (USE_SUPABASE) {
      await ensureMigration();
      try {
        return await SupabaseService.getColleagueCards();
      } catch (error) {
        console.error('从 Supabase 获取深海邻居资料失败，使用 localStorage:', error);
        return getTable<ColleagueCard>(DB_KEYS.CARDS);
      }
    }
    return getTable<ColleagueCard>(DB_KEYS.CARDS);
  },
  
  saveColleagueCards: async (cards: ColleagueCard[]): Promise<void> => {
    if (USE_SUPABASE) {
      await ensureMigration();
      try {
        await SupabaseService.saveColleagueCards(cards);
        // 同时保存到 localStorage
        saveTable(DB_KEYS.CARDS, cards);
        return;
      } catch (error) {
        console.error('保存到 Supabase 失败，使用 localStorage:', error);
      }
    }
    saveTable(DB_KEYS.CARDS, cards);
  },

  // --- TAGS (Customizable) ---
  getTags: async (): Promise<string[]> => {
    if (USE_SUPABASE) {
      await ensureMigration();
      try {
        return await SupabaseService.getTags();
      } catch (error) {
        console.error('从 Supabase 获取标签失败，使用 localStorage:', error);
        const saved = localStorage.getItem(DB_KEYS.TAGS);
        return saved ? JSON.parse(saved) : COLLEAGUE_TAGS;
      }
    }
    const saved = localStorage.getItem(DB_KEYS.TAGS);
    return saved ? JSON.parse(saved) : COLLEAGUE_TAGS;
  },
  
  addTag: async (newTag: string): Promise<void> => {
    if (USE_SUPABASE) {
      await ensureMigration();
      try {
        await SupabaseService.addTag(newTag);
        // 同时更新 localStorage
        const currentTags = await StorageService.getTags();
        if (!currentTags.includes(newTag)) {
          const updated = [...currentTags, newTag];
          localStorage.setItem(DB_KEYS.TAGS, JSON.stringify(updated));
        }
        return;
      } catch (error) {
        console.error('保存到 Supabase 失败，使用 localStorage:', error);
      }
    }
    const currentTags = await StorageService.getTags();
    if (!currentTags.includes(newTag)) {
      const updated = [...currentTags, newTag];
      localStorage.setItem(DB_KEYS.TAGS, JSON.stringify(updated));
    }
  },

  // --- MERIT COUNTER ---
  getMeritCount: async (): Promise<number> => {
    if (USE_SUPABASE) {
      await ensureMigration();
      try {
        return await SupabaseService.getMeritCount();
      } catch (error) {
        console.error('从 Supabase 获取功德计数失败，使用 localStorage:', error);
        const saved = localStorage.getItem(DB_KEYS.MERIT);
        return saved ? parseInt(saved, 10) : 0;
      }
    }
    const saved = localStorage.getItem(DB_KEYS.MERIT);
    return saved ? parseInt(saved, 10) : 0;
  },
  
  saveMeritCount: async (count: number): Promise<void> => {
    if (USE_SUPABASE) {
      await ensureMigration();
      try {
        await SupabaseService.saveMeritCount(count);
        // 同时保存到 localStorage
        localStorage.setItem(DB_KEYS.MERIT, count.toString());
        return;
      } catch (error) {
        console.error('保存到 Supabase 失败，使用 localStorage:', error);
      }
    }
    localStorage.setItem(DB_KEYS.MERIT, count.toString());
  },
};