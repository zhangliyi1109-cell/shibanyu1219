# 快速部署指南

## ✅ 构建成功！

项目已经成功构建，构建产物在 `dist` 目录中。

## 🚀 快速部署到 Vercel（推荐）

### 方法 1：通过网页部署（最简单）

1. **访问 [vercel.com](https://vercel.com)** 并使用 GitHub/GitLab/Bitbucket 账号登录

2. **导入项目**
   - 点击 "New Project"
   - 选择你的 Git 仓库（如果没有，先推送到 GitHub）
   - 点击 "Import"

3. **配置项目**
   - Framework Preset: **Vite**
   - Root Directory: `./`（默认）
   - Build Command: `npm run build`（默认）
   - Output Directory: `dist`（默认）
   - Install Command: `npm install --legacy-peer-deps`（重要！）

4. **添加环境变量**
   在 "Environment Variables" 部分添加：
   ```
   VITE_SUPABASE_URL = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = your-anon-key-here
   ```

5. **点击 "Deploy"**

6. **等待部署完成**（约 1-2 分钟）

7. **访问你的网站**：`https://your-project.vercel.app`

---

### 方法 2：通过 CLI 部署

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署（首次会询问配置）
vercel

# 4. 配置环境变量（在 Vercel 网页控制台）
# 添加 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY

# 5. 生产环境部署
vercel --prod
```

---

## 📦 部署到 Netlify

### 通过网页部署：

1. 访问 [netlify.com](https://netlify.com)
2. 点击 "Add new site" → "Import an existing project"
3. 连接你的 Git 仓库
4. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Advanced build settings → Environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
5. 点击 "Deploy site"

---

## 🔧 本地预览构建结果

部署前，你可以先在本地预览构建结果：

```bash
npm run preview
```

然后访问 `http://localhost:4173`

---

## ⚠️ 重要提示

1. **环境变量必须配置**
   - 确保在部署平台配置了 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`
   - 否则应用无法连接到数据库

2. **Supabase 数据库**
   - 确保已经在 Supabase 中执行了数据库迁移脚本
   - 脚本位置：`supabase/migrations/001_initial_schema.sql`

3. **安装命令**
   - 如果使用 Vercel，建议在项目设置中将 Install Command 改为：
     ```
     npm install --legacy-peer-deps
     ```

---

## 📝 部署检查清单

- [ ] Supabase 项目已创建
- [ ] 数据库表已创建（执行了 SQL 迁移脚本）
- [ ] `.env` 文件已配置（本地开发用）
- [ ] 项目已构建成功（`npm run build`）
- [ ] 部署平台环境变量已配置
- [ ] 部署后测试了基本功能

---

## 🎉 部署完成后的操作

1. 访问你的网站
2. 打开浏览器开发者工具（F12）
3. 检查控制台是否有错误
4. 测试功能：
   - ✅ 保存用户设置
   - ✅ 添加每日目标
   - ✅ 添加事件记录
   - ✅ 添加深海邻居资料

---

## 🆘 遇到问题？

查看 `DEPLOY.md` 获取更详细的部署说明和故障排除指南。

