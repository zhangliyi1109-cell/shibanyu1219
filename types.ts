
export interface UserSettings {
  preTaxMonthlySalary: number;
  salaryMonths: number;
  workDaysPerMonth: number;
  startTime: string;
  endTime: string;
  currencySymbol: string;
  avatar: string; // Path or key for the selected fish avatar
  
  freedomGoalName: string;
  freedomGoalTargetAmount: number;
  freedomGoalIcon: 'mountain' | 'bag' | 'plane' | 'computer';
}

export interface DailyGoal {
  id: string;
  date: string;
  text: string;
  isCompleted: boolean;
  createdAt: number;
}

export interface Achievement {
  id: string;
  text: string;
  aiFeedback: string;
  timestamp: number;
  date: string;
}

export interface ColleagueCard {
  id: string;
  name: string;
  tag: string;
  strengths: string; // 优点
  weaknesses: string; // 缺点
  rarity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  DISCOVERY = 'discovery',
  CHAT = 'chat'
}
