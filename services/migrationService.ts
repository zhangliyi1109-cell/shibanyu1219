import { SupabaseService } from './supabaseService';
import { StorageService } from './storageService';
import { Achievement, ColleagueCard, DailyGoal, UserSettings } from '../types';
import { DEFAULT_SETTINGS, COLLEAGUE_TAGS } from '../constants';

// 迁移标记键
const MIGRATION_KEY = 'wsk_db_migrated_to_supabase';

/**
 * 检查是否已经迁移到 Supabase
 */
export const isMigrated = (): boolean => {
  return localStorage.getItem(MIGRATION_KEY) === 'true';
};

/**
 * 标记迁移完成
 */
const markMigrated = (): void => {
  localStorage.setItem(MIGRATION_KEY, 'true');
};

/**
 * 从 localStorage 迁移数据到 Supabase
 */
export const migrateToSupabase = async (): Promise<void> => {
  if (isMigrated()) {
    console.log('数据已迁移到 Supabase');
    return;
  }

  try {
    console.log('开始迁移数据到 Supabase...');

    // 1. 迁移用户设置
    try {
      const settings = StorageService.getSettings(DEFAULT_SETTINGS);
      await SupabaseService.saveSettings(settings);
      console.log('✓ 用户设置已迁移');
    } catch (error) {
      console.error('迁移用户设置失败:', error);
    }

    // 2. 迁移每日目标
    try {
      const goals = StorageService.getAllGoals();
      for (const goal of goals) {
        await SupabaseService.addGoal(goal);
      }
      console.log(`✓ 已迁移 ${goals.length} 个每日目标`);
    } catch (error) {
      console.error('迁移每日目标失败:', error);
    }

    // 3. 迁移每日事件记录
    try {
      const achievements = StorageService.getAchievements();
      for (const achievement of achievements) {
        await SupabaseService.addAchievement(achievement);
      }
      console.log(`✓ 已迁移 ${achievements.length} 个事件记录`);
    } catch (error) {
      console.error('迁移事件记录失败:', error);
    }

    // 4. 迁移深海邻居资料
    try {
      const cards = StorageService.getColleagueCards();
      if (cards.length > 0) {
        await SupabaseService.saveColleagueCards(cards);
      }
      console.log(`✓ 已迁移 ${cards.length} 个深海邻居资料`);
    } catch (error) {
      console.error('迁移深海邻居资料失败:', error);
    }

    // 5. 迁移自定义标签
    try {
      const tags = StorageService.getTags();
      const defaultTagsSet = new Set(COLLEAGUE_TAGS);
      const customTags = tags.filter((tag) => !defaultTagsSet.has(tag));
      if (customTags.length > 0) {
        await SupabaseService.saveTags(tags);
      }
      console.log(`✓ 已迁移 ${customTags.length} 个自定义标签`);
    } catch (error) {
      console.error('迁移标签失败:', error);
    }

    // 6. 迁移功德计数
    try {
      const meritCount = StorageService.getMeritCount();
      if (meritCount > 0) {
        await SupabaseService.saveMeritCount(meritCount);
      }
      console.log(`✓ 已迁移功德计数: ${meritCount}`);
    } catch (error) {
      console.error('迁移功德计数失败:', error);
    }

    // 标记迁移完成
    markMigrated();
    console.log('✓ 数据迁移完成！');
  } catch (error) {
    console.error('数据迁移过程中出现错误:', error);
    throw error;
  }
};

