# 部署指南

本项目可以部署到多个平台。以下是详细的部署步骤。

## 部署前准备

1. **确保 Supabase 已配置**
   - 完成 Supabase 项目设置
   - 执行数据库迁移脚本
   - 获取 Supabase URL 和 Anon Key

2. **构建项目**
   ```bash
   npm run build
   ```
   构建产物会在 `dist` 目录中。

## 部署选项

### 方案 1: Vercel（推荐）⭐

Vercel 对 Vite 项目有很好的支持，部署简单快速。

#### 步骤：

1. **安装 Vercel CLI**（可选）
   ```bash
   npm i -g vercel
   ```

2. **通过网页部署**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub/GitLab/Bitbucket 账号登录
   - 点击 "New Project"
   - 导入你的项目仓库
   - 配置环境变量：
     - `VITE_SUPABASE_URL` = 你的 Supabase 项目 URL
     - `VITE_SUPABASE_ANON_KEY` = 你的 Supabase Anon Key
   - 点击 "Deploy"

3. **通过 CLI 部署**
   ```bash
   vercel
   ```
   按照提示操作，首次部署会要求登录。

#### 环境变量配置：
在 Vercel 项目设置中添加：
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

### 方案 2: Netlify

Netlify 也是一个很好的选择，支持自动部署。

#### 步骤：

1. **安装 Netlify CLI**（可选）
   ```bash
   npm i -g netlify-cli
   ```

2. **通过网页部署**
   - 访问 [netlify.com](https://netlify.com)
   - 使用 GitHub/GitLab/Bitbucket 账号登录
   - 点击 "Add new site" → "Import an existing project"
   - 选择你的仓库
   - 构建设置：
     - Build command: `npm run build`
     - Publish directory: `dist`
   - 添加环境变量：
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - 点击 "Deploy site"

3. **通过 CLI 部署**
   ```bash
   netlify deploy --prod
   ```

---

### 方案 3: GitHub Pages

适合开源项目，免费但功能有限。

#### 步骤：

1. **安装 gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **更新 package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **部署**
   ```bash
   npm run deploy
   ```

4. **配置 GitHub Pages**
   - 在 GitHub 仓库设置中启用 Pages
   - 选择 `gh-pages` 分支作为源

**注意**：GitHub Pages 不支持环境变量，需要手动修改代码或使用其他方式。

---

### 方案 4: Cloudflare Pages

Cloudflare Pages 提供全球 CDN，速度快。

#### 步骤：

1. 访问 [Cloudflare Pages](https://pages.cloudflare.com)
2. 连接你的 Git 仓库
3. 构建设置：
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`
4. 添加环境变量：
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. 点击 "Save and Deploy"

---

### 方案 5: 静态文件托管

如果只需要简单的静态托管，可以使用：

- **Surge.sh**
  ```bash
   npm install -g surge
   npm run build
   surge dist
   ```

- **Firebase Hosting**
  ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   npm run build
   firebase deploy
   ```

---

## 环境变量配置

所有部署平台都需要配置以下环境变量：

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `VITE_SUPABASE_URL` | Supabase 项目 URL | `https://xxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase Anon Key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

**重要**：环境变量必须以 `VITE_` 开头才能在 Vite 构建时被注入。

---

## 部署后检查

1. 访问部署的网址
2. 打开浏览器开发者工具（F12）
3. 检查控制台是否有错误
4. 测试功能：
   - 保存用户设置
   - 添加每日目标
   - 添加事件记录
   - 添加深海邻居资料

---

## 常见问题

### 问题：环境变量未生效

- 确保变量名以 `VITE_` 开头
- 重新构建项目
- 清除浏览器缓存

### 问题：路由 404 错误

- 确保配置了 SPA 路由重定向（所有路由指向 index.html）
- Vercel 和 Netlify 的配置文件已包含此配置

### 问题：Supabase 连接失败

- 检查环境变量是否正确配置
- 确认 Supabase 项目状态为 Active
- 检查 Supabase 的 API 设置

---

## 推荐部署平台对比

| 平台 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| Vercel | 速度快、自动 HTTPS、CDN | 免费版有构建时间限制 | ⭐⭐⭐⭐⭐ |
| Netlify | 功能丰富、表单支持 | 免费版带宽有限 | ⭐⭐⭐⭐ |
| Cloudflare Pages | 全球 CDN、速度快 | 功能相对简单 | ⭐⭐⭐⭐ |
| GitHub Pages | 免费、简单 | 不支持环境变量、功能有限 | ⭐⭐⭐ |

---

## 快速开始（Vercel）

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel

# 4. 配置环境变量（在 Vercel 网页控制台）
# 添加 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY

# 5. 重新部署
vercel --prod
```

部署完成后，你会获得一个公开的 URL，例如：`https://your-project.vercel.app`

