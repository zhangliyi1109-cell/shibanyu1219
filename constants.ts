
import { UserSettings } from "./types";

// Using placeholder descriptions for the 4 images provided by the user
export const AVATAR_OPTIONS = [
  { id: 'work', label: '深潜办公', desc: '认真打工中', url: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=200' }, 
  { id: 'commute', label: '背包出海', desc: '准时营业中', url: 'https://images.unsplash.com/photo-1534131707746-25d604851a1f?auto=format&fit=crop&q=80&w=200' }, 
  { id: 'listen', label: '浅游放松', desc: '专注摸鱼中', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200' }, 
  { id: 'relax', label: '陆地假想', desc: '离岸梦想中', url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=200' }  
];

export const DEFAULT_SETTINGS: UserSettings = {
  preTaxMonthlySalary: 25000,
  salaryMonths: 13,
  workDaysPerMonth: 22,
  startTime: "09:30",
  endTime: "18:30",
  currencySymbol: "¥",
  avatar: 'work',
  freedomGoalName: "游向彼岸",
  freedomGoalTargetAmount: 30000,
  freedomGoalIcon: 'mountain'
};

export const MERIT_TEXTS = [
  "鱼食补给 +1", "大白鲨视线 -1", "鱼鳍强度 +1", "深海抗压 +5",
  "废话拦截 +1", "心率减缓 -1", "离岸进度 +0.01%", "深潜深度 +10m"
];

export const COLLEAGUE_TAGS = [
  "深海大白鲨", "甩锅乌贼", "会议水母", "Excel 仙人鱼", "零食供应商", "摸鱼锦鲤"
];
