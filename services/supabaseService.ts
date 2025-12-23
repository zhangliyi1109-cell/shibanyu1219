import { supabase, TABLES } from './supabaseClient';
import { Achievement, ColleagueCard, DailyGoal, UserSettings } from '../types';
import { DEFAULT_SETTINGS, COLLEAGUE_TAGS } from '../constants';

// 当前用户ID（可以后续扩展为多用户支持）
const CURRENT_USER_ID = 'default';

// 类型转换辅助函数
const convertGoalFromDB = (row: any): DailyGoal => ({
  id: row.id,
  date: row.date,
  text: row.text,
  isCompleted: row.is_completed,
  createdAt: row.created_at,
});

const convertGoalToDB = (goal: DailyGoal) => ({
  id: goal.id,
  user_id: CURRENT_USER_ID,
  date: goal.date,
  text: goal.text,
  is_completed: goal.isCompleted,
  created_at: goal.createdAt,
});

const convertAchievementFromDB = (row: any): Achievement => ({
  id: row.id,
  text: row.text,
  aiFeedback: row.ai_feedback,
  timestamp: row.timestamp,
  date: row.date,
});

const convertAchievementToDB = (achievement: Achievement) => ({
  id: achievement.id,
  user_id: CURRENT_USER_ID,
  text: achievement.text,
  ai_feedback: achievement.aiFeedback,
  timestamp: achievement.timestamp,
  date: achievement.date,
});

const convertCardFromDB = (row: any): ColleagueCard => ({
  id: row.id,
  name: row.name,
  tag: row.tag,
  strengths: row.strengths,
  weaknesses: row.weaknesses,
  rarity: row.rarity,
});

const convertCardToDB = (card: ColleagueCard) => ({
  id: card.id,
  user_id: CURRENT_USER_ID,
  name: card.name,
  tag: card.tag,
  strengths: card.strengths,
  weaknesses: card.weaknesses,
  rarity: card.rarity,
});

const convertSettingsFromDB = (row: any): UserSettings => ({
  preTaxMonthlySalary: row.pre_tax_monthly_salary,
  salaryMonths: row.salary_months,
  workDaysPerMonth: row.work_days_per_month,
  startTime: row.start_time,
  endTime: row.end_time,
  currencySymbol: row.currency_symbol,
  avatar: row.avatar,
  freedomGoalName: row.freedom_goal_name,
  freedomGoalTargetAmount: row.freedom_goal_target_amount,
  freedomGoalIcon: row.freedom_goal_icon,
});

const convertSettingsToDB = (settings: UserSettings) => ({
  user_id: CURRENT_USER_ID,
  pre_tax_monthly_salary: settings.preTaxMonthlySalary,
  salary_months: settings.salaryMonths,
  work_days_per_month: settings.workDaysPerMonth,
  start_time: settings.startTime,
  end_time: settings.endTime,
  currency_symbol: settings.currencySymbol,
  avatar: settings.avatar,
  freedom_goal_name: settings.freedomGoalName,
  freedom_goal_target_amount: settings.freedomGoalTargetAmount,
  freedom_goal_icon: settings.freedomGoalIcon,
});

export const SupabaseService = {
  // --- SETTINGS (用户设置：薪资、工作时间、目标等) ---
  getSettings: async (defaultValue: UserSettings = DEFAULT_SETTINGS): Promise<UserSettings> => {
    try {
      const { data, error } = await supabase
        .from(TABLES.SETTINGS)
        .select('*')
        .eq('user_id', CURRENT_USER_ID)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // 记录不存在，返回默认值
          return defaultValue;
        }
        throw error;
      }

      return convertSettingsFromDB(data);
    } catch (error) {
      console.error('获取用户设置失败:', error);
      return defaultValue;
    }
  },

  saveSettings: async (settings: UserSettings): Promise<void> => {
    try {
      const dbData = convertSettingsToDB(settings);

      // 先尝试更新
      const { error: updateError } = await supabase
        .from(TABLES.SETTINGS)
        .upsert(dbData, { onConflict: 'user_id' });

      if (updateError) {
        throw updateError;
      }
    } catch (error) {
      console.error('保存用户设置失败:', error);
      throw error;
    }
  },

  // --- GOALS (每日目标) ---
  getGoalsByDate: async (dateStr: string): Promise<DailyGoal[]> => {
    try {
      const { data, error } = await supabase
        .from(TABLES.GOALS)
        .select('*')
        .eq('user_id', CURRENT_USER_ID)
        .eq('date', dateStr)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return (data || []).map(convertGoalFromDB);
    } catch (error) {
      console.error('获取每日目标失败:', error);
      return [];
    }
  },

  getAllGoals: async (): Promise<DailyGoal[]> => {
    try {
      const { data, error } = await supabase
        .from(TABLES.GOALS)
        .select('*')
        .eq('user_id', CURRENT_USER_ID)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return (data || []).map(convertGoalFromDB);
    } catch (error) {
      console.error('获取所有目标失败:', error);
      return [];
    }
  },

  addGoal: async (goal: DailyGoal): Promise<void> => {
    try {
      const dbData = convertGoalToDB(goal);
      const { error } = await supabase.from(TABLES.GOALS).insert(dbData);
      if (error) throw error;
    } catch (error) {
      console.error('添加目标失败:', error);
      throw error;
    }
  },

  updateGoal: async (goal: DailyGoal): Promise<void> => {
    try {
      const dbData = convertGoalToDB(goal);
      const { error } = await supabase
        .from(TABLES.GOALS)
        .update({
          text: dbData.text,
          is_completed: dbData.is_completed,
        })
        .eq('id', goal.id)
        .eq('user_id', CURRENT_USER_ID);

      if (error) throw error;
    } catch (error) {
      console.error('更新目标失败:', error);
      throw error;
    }
  },

  deleteGoal: async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from(TABLES.GOALS)
        .delete()
        .eq('id', id)
        .eq('user_id', CURRENT_USER_ID);

      if (error) throw error;
    } catch (error) {
      console.error('删除目标失败:', error);
      throw error;
    }
  },

  // --- ACHIEVEMENTS (每日事件记录) ---
  getAchievements: async (): Promise<Achievement[]> => {
    try {
      const { data, error } = await supabase
        .from(TABLES.ACHIEVEMENTS)
        .select('*')
        .eq('user_id', CURRENT_USER_ID)
        .order('timestamp', { ascending: false });

      if (error) throw error;
      return (data || []).map(convertAchievementFromDB);
    } catch (error) {
      console.error('获取所有事件记录失败:', error);
      return [];
    }
  },

  getAchievementsByDate: async (dateStr: string): Promise<Achievement[]> => {
    try {
      const { data, error } = await supabase
        .from(TABLES.ACHIEVEMENTS)
        .select('*')
        .eq('user_id', CURRENT_USER_ID)
        .eq('date', dateStr)
        .order('timestamp', { ascending: false });

      if (error) throw error;
      return (data || []).map(convertAchievementFromDB);
    } catch (error) {
      console.error('获取指定日期事件记录失败:', error);
      return [];
    }
  },

  addAchievement: async (achievement: Achievement): Promise<void> => {
    try {
      const dbData = convertAchievementToDB(achievement);
      const { error } = await supabase.from(TABLES.ACHIEVEMENTS).insert(dbData);
      if (error) throw error;
    } catch (error) {
      console.error('添加事件记录失败:', error);
      throw error;
    }
  },

  // --- CARDS (深海邻居资料) ---
  getColleagueCards: async (): Promise<ColleagueCard[]> => {
    try {
      const { data, error } = await supabase
        .from(TABLES.CARDS)
        .select('*')
        .eq('user_id', CURRENT_USER_ID)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(convertCardFromDB);
    } catch (error) {
      console.error('获取深海邻居资料失败:', error);
      return [];
    }
  },

  saveColleagueCards: async (cards: ColleagueCard[]): Promise<void> => {
    try {
      // 先删除该用户的所有卡片
      const { error: deleteError } = await supabase
        .from(TABLES.CARDS)
        .delete()
        .eq('user_id', CURRENT_USER_ID);

      if (deleteError) throw deleteError;

      // 然后插入新卡片
      if (cards.length > 0) {
        const dbData = cards.map(convertCardToDB);
        const { error: insertError } = await supabase.from(TABLES.CARDS).insert(dbData);
        if (insertError) throw insertError;
      }
    } catch (error) {
      console.error('保存深海邻居资料失败:', error);
      throw error;
    }
  },

  addColleagueCard: async (card: ColleagueCard): Promise<void> => {
    try {
      const dbData = convertCardToDB(card);
      const { error } = await supabase.from(TABLES.CARDS).insert(dbData);
      if (error) throw error;
    } catch (error) {
      console.error('添加深海邻居资料失败:', error);
      throw error;
    }
  },

  updateColleagueCard: async (card: ColleagueCard): Promise<void> => {
    try {
      const dbData = convertCardToDB(card);
      const { error } = await supabase
        .from(TABLES.CARDS)
        .update({
          name: dbData.name,
          tag: dbData.tag,
          strengths: dbData.strengths,
          weaknesses: dbData.weaknesses,
          rarity: dbData.rarity,
        })
        .eq('id', card.id)
        .eq('user_id', CURRENT_USER_ID);

      if (error) throw error;
    } catch (error) {
      console.error('更新深海邻居资料失败:', error);
      throw error;
    }
  },

  deleteColleagueCard: async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from(TABLES.CARDS)
        .delete()
        .eq('id', id)
        .eq('user_id', CURRENT_USER_ID);

      if (error) throw error;
    } catch (error) {
      console.error('删除深海邻居资料失败:', error);
      throw error;
    }
  },

  // --- TAGS (标签) ---
  getTags: async (defaultTags: string[] = COLLEAGUE_TAGS): Promise<string[]> => {
    try {
      const { data, error } = await supabase
        .from(TABLES.TAGS)
        .select('tag')
        .eq('user_id', CURRENT_USER_ID)
        .order('created_at', { ascending: true });

      if (error) throw error;
      const tags = (data || []).map((row: any) => row.tag);
      return tags.length > 0 ? tags : defaultTags;
    } catch (error) {
      console.error('获取标签失败:', error);
      return defaultTags;
    }
  },

  saveTags: async (tags: string[]): Promise<void> => {
    try {
      // 先删除该用户的所有标签
      const { error: deleteError } = await supabase
        .from(TABLES.TAGS)
        .delete()
        .eq('user_id', CURRENT_USER_ID);

      if (deleteError) throw deleteError;

      // 然后插入新标签
      if (tags.length > 0) {
        const dbData = tags.map((tag) => ({
          user_id: CURRENT_USER_ID,
          tag,
        }));
        const { error: insertError } = await supabase.from(TABLES.TAGS).insert(dbData);
        if (insertError) throw insertError;
      }
    } catch (error) {
      console.error('保存标签失败:', error);
      throw error;
    }
  },

  addTag: async (newTag: string, defaultTags: string[] = COLLEAGUE_TAGS): Promise<void> => {
    try {
      const currentTags = await SupabaseService.getTags(defaultTags);
      if (!currentTags.includes(newTag)) {
        const { error } = await supabase.from(TABLES.TAGS).insert({
          user_id: CURRENT_USER_ID,
          tag: newTag,
        });
        if (error) throw error;
      }
    } catch (error) {
      console.error('添加标签失败:', error);
      throw error;
    }
  },

  // --- MERIT (功德计数) ---
  getMeritCount: async (): Promise<number> => {
    try {
      const { data, error } = await supabase
        .from(TABLES.MERIT)
        .select('count')
        .eq('user_id', CURRENT_USER_ID)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // 记录不存在，返回0
          return 0;
        }
        throw error;
      }

      return data?.count || 0;
    } catch (error) {
      console.error('获取功德计数失败:', error);
      return 0;
    }
  },

  saveMeritCount: async (count: number): Promise<void> => {
    try {
      const { error } = await supabase.from(TABLES.MERIT).upsert(
        {
          user_id: CURRENT_USER_ID,
          count,
        },
        { onConflict: 'user_id' }
      );

      if (error) throw error;
    } catch (error) {
      console.error('保存功德计数失败:', error);
      throw error;
    }
  },
};

