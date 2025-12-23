# Supabase 数据库设置指南

本项目使用 Supabase 作为数据库存储方案，用于存储用户的所有数据（薪资、工作时间、目标、每日事件记录、深海邻居资料等）。

## 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com/)
2. 注册/登录账号
3. 点击 "New Project" 创建新项目
4. 填写项目信息（名称、数据库密码等）
5. 等待项目创建完成（约 2 分钟）

## 2. 获取 API 密钥

1. 在 Supabase 项目页面，点击左侧菜单的 "Settings"（设置）
2. 选择 "API"
3. 复制以下信息：
   - **Project URL**（项目 URL）
   - **anon public** key（匿名公钥）

## 3. 配置环境变量

1. 在项目根目录创建 `.env` 文件（如果不存在）
2. 将 `.env.example` 的内容复制到 `.env`
3. 填入你的 Supabase 配置：

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. 创建数据库表

1. 在 Supabase 项目页面，点击左侧菜单的 "SQL Editor"
2. 点击 "New query"
3. 打开项目中的 `supabase/migrations/001_initial_schema.sql` 文件
4. 复制所有 SQL 代码
5. 粘贴到 Supabase SQL Editor 中
6. 点击 "Run" 执行 SQL

这将创建以下表：
- `user_settings` - 用户设置（薪资、工作时间、目标等）
- `daily_goals` - 每日目标
- `daily_achievements` - 每日事件记录
- `colleague_cards` - 深海邻居资料
- `custom_tags` - 自定义标签
- `merit_count` - 功德计数

## 5. 验证设置

1. 启动开发服务器：`npm run dev`
2. 打开应用
3. 在浏览器控制台查看是否有错误
4. 如果之前有 localStorage 数据，会自动迁移到 Supabase

## 6. 数据迁移

应用首次启动时会自动检测 localStorage 中的数据，并自动迁移到 Supabase。迁移过程会在浏览器控制台显示进度。

如果需要手动触发迁移，可以在浏览器控制台执行：

```javascript
import { migrateToSupabase } from './services/migrationService';
await migrateToSupabase();
```

## 7. 多用户支持（可选）

当前实现使用固定的 `user_id = 'default'`。如果需要支持多用户：

1. 集成 Supabase Auth
2. 修改 `services/supabaseClient.ts` 中的 `CURRENT_USER_ID`
3. 启用 Row Level Security (RLS)（在 SQL 脚本中取消注释相关代码）
4. 创建 RLS 策略

## 故障排除

### 问题：无法连接到 Supabase

- 检查 `.env` 文件中的配置是否正确
- 确认 Supabase 项目状态为 "Active"
- 检查网络连接

### 问题：SQL 执行失败

- 确保 SQL 脚本完整复制
- 检查是否有语法错误
- 查看 Supabase SQL Editor 的错误信息

### 问题：数据迁移失败

- 检查浏览器控制台的错误信息
- 确认 Supabase 表已正确创建
- 检查网络连接

## 回退到 localStorage

如果不想使用 Supabase，可以在 `services/storageService.ts` 中将 `USE_SUPABASE` 设置为 `false`：

```typescript
const USE_SUPABASE = false;
```

这样应用会继续使用 localStorage 存储数据。

