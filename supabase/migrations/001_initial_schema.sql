-- 创建用户设置表
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT UNIQUE NOT NULL, -- 可以用于多用户支持，当前使用 'default'
  pre_tax_monthly_salary NUMERIC NOT NULL DEFAULT 25000,
  salary_months NUMERIC NOT NULL DEFAULT 13,
  work_days_per_month NUMERIC NOT NULL DEFAULT 22,
  start_time TEXT NOT NULL DEFAULT '09:30',
  end_time TEXT NOT NULL DEFAULT '18:30',
  currency_symbol TEXT NOT NULL DEFAULT '¥',
  avatar TEXT NOT NULL DEFAULT 'work',
  freedom_goal_name TEXT NOT NULL DEFAULT '游向彼岸',
  freedom_goal_target_amount NUMERIC NOT NULL DEFAULT 30000,
  freedom_goal_icon TEXT NOT NULL DEFAULT 'mountain',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建每日目标表
CREATE TABLE IF NOT EXISTS daily_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL DEFAULT 'default',
  date DATE NOT NULL,
  text TEXT NOT NULL,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  created_at BIGINT NOT NULL, -- 使用时间戳
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建每日事件记录表
CREATE TABLE IF NOT EXISTS daily_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL DEFAULT 'default',
  text TEXT NOT NULL,
  ai_feedback TEXT NOT NULL DEFAULT '',
  timestamp BIGINT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建深海邻居资料表
CREATE TABLE IF NOT EXISTS colleague_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL DEFAULT 'default',
  name TEXT NOT NULL,
  tag TEXT NOT NULL,
  strengths TEXT NOT NULL DEFAULT '暂未发现闪光点',
  weaknesses TEXT NOT NULL DEFAULT '目前表现良好',
  rarity INTEGER NOT NULL DEFAULT 1 CHECK (rarity >= 1 AND rarity <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建自定义标签表
CREATE TABLE IF NOT EXISTS custom_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL DEFAULT 'default',
  tag TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, tag)
);

-- 创建功德计数表
CREATE TABLE IF NOT EXISTS merit_count (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT UNIQUE NOT NULL DEFAULT 'default',
  count INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_daily_goals_date ON daily_goals(date);
CREATE INDEX IF NOT EXISTS idx_daily_goals_user_date ON daily_goals(user_id, date);
CREATE INDEX IF NOT EXISTS idx_daily_achievements_date ON daily_achievements(date);
CREATE INDEX IF NOT EXISTS idx_daily_achievements_user_date ON daily_achievements(user_id, date);
CREATE INDEX IF NOT EXISTS idx_daily_achievements_timestamp ON daily_achievements(timestamp);
CREATE INDEX IF NOT EXISTS idx_colleague_cards_user ON colleague_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_colleague_cards_rarity ON colleague_cards(rarity);
CREATE INDEX IF NOT EXISTS idx_custom_tags_user ON custom_tags(user_id);

-- 禁用 Row Level Security (RLS) - 当前应用使用单用户模式（user_id = 'default'）
-- 如果需要多用户支持，可以启用 RLS 并创建相应的策略
ALTER TABLE user_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE daily_goals DISABLE ROW LEVEL SECURITY;
ALTER TABLE daily_achievements DISABLE ROW LEVEL SECURITY;
ALTER TABLE colleague_cards DISABLE ROW LEVEL SECURITY;
ALTER TABLE custom_tags DISABLE ROW LEVEL SECURITY;
ALTER TABLE merit_count DISABLE ROW LEVEL SECURITY;

-- 如果 RLS 已启用，可以使用以下策略允许所有操作（仅用于单用户应用）
-- CREATE POLICY "Allow all operations for anon" ON user_settings FOR ALL TO anon USING (true) WITH CHECK (true);
-- CREATE POLICY "Allow all operations for anon" ON daily_goals FOR ALL TO anon USING (true) WITH CHECK (true);
-- CREATE POLICY "Allow all operations for anon" ON daily_achievements FOR ALL TO anon USING (true) WITH CHECK (true);
-- CREATE POLICY "Allow all operations for anon" ON colleague_cards FOR ALL TO anon USING (true) WITH CHECK (true);
-- CREATE POLICY "Allow all operations for anon" ON custom_tags FOR ALL TO anon USING (true) WITH CHECK (true);
-- CREATE POLICY "Allow all operations for anon" ON merit_count FOR ALL TO anon USING (true) WITH CHECK (true);

-- 创建更新时间的触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 为需要 updated_at 的表创建触发器（如果不存在则创建）
DROP TRIGGER IF EXISTS update_user_settings_updated_at ON user_settings;
CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_colleague_cards_updated_at ON colleague_cards;
CREATE TRIGGER update_colleague_cards_updated_at BEFORE UPDATE ON colleague_cards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_merit_count_updated_at ON merit_count;
CREATE TRIGGER update_merit_count_updated_at BEFORE UPDATE ON merit_count
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

