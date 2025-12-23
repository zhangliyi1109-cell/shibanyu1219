# 全平台部署指南

本项目支持部署到多个平台。以下是各平台的详细配置步骤。

---

## 🌟 平台对比

| 平台 | 免费额度 | 速度 | 易用性 | 推荐度 |
|------|---------|------|--------|--------|
| **Vercel** | 100GB/月 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Netlify** | 100GB/月 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Cloudflare Pages** | 无限 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **GitHub Pages** | 1GB | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **Firebase Hosting** | 10GB/月 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Surge.sh** | 无限 | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## 1. Vercel 部署 ⭐ 推荐

### 配置已就绪 ✅

配置文件：`vercel.json`

### 部署步骤：

#### 方法 A：网页部署（最简单）

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub/GitLab/Bitbucket 登录
3. 点击 "New Project"
4. 导入你的仓库
5. 配置：
   - **Framework Preset**: Vite
   - **Install Command**: `npm install --legacy-peer-deps`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. **环境变量**：
   ```
   VITE_SUPABASE_URL = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = your-anon-key
   ```
7. 点击 "Deploy"

#### 方法 B：CLI 部署

```bash
# 安装
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 生产环境
vercel --prod
```

---

## 2. Netlify 部署

### 配置已就绪 ✅

配置文件：`netlify.toml`

### 部署步骤：

#### 方法 A：网页部署

1. 访问 [netlify.com](https://netlify.com)
2. 登录（GitHub/GitLab/Bitbucket）
3. 点击 "Add new site" → "Import an existing project"
4. 选择仓库
5. 构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Install command**: `npm install --legacy-peer-deps`
6. **环境变量**（Advanced → Environment variables）：
   ```
   VITE_SUPABASE_URL = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = your-anon-key
   ```
7. 点击 "Deploy site"

#### 方法 B：CLI 部署

```bash
# 安装
npm i -g netlify-cli

# 登录
netlify login

# 初始化
netlify init

# 部署
netlify deploy --prod
```

---

## 3. Cloudflare Pages 部署 ⭐ 推荐（免费无限）

### 配置已就绪 ✅

配置文件：`cloudflare-pages.json`

### 部署步骤：

1. 访问 [Cloudflare Pages](https://pages.cloudflare.com)
2. 登录 Cloudflare 账号
3. 点击 "Create a project"
4. 连接 Git 仓库
5. 构建设置：
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`（默认）
6. **环境变量**（Environment variables）：
   ```
   VITE_SUPABASE_URL = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = your-anon-key
   ```
7. 点击 "Save and Deploy"

### 优势：
- ✅ 完全免费，无流量限制
- ✅ 全球 CDN，速度快
- ✅ 自动 HTTPS
- ✅ 自定义域名支持

---

## 4. GitHub Pages 部署

### 配置已就绪 ✅

配置文件：`.github/workflows/deploy-pages.yml`

### 部署步骤：

1. **安装 gh-pages**（可选，如果使用 GitHub Actions 则不需要）
   ```bash
   npm install --save-dev gh-pages
   ```

2. **更新 package.json**（如果使用 npm script 方式）
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **配置 GitHub Secrets**（Settings → Secrets and variables → Actions）：
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

4. **启用 GitHub Pages**：
   - 仓库 Settings → Pages
   - Source: GitHub Actions

5. **推送代码**（自动触发部署）
   ```bash
   git add .
   git commit -m "Setup GitHub Pages"
   git push
   ```

6. **访问网站**：`https://your-username.github.io/your-repo-name/`

### 注意事项：
- GitHub Pages 是静态托管，不支持服务端环境变量
- 需要使用 GitHub Actions 在构建时注入环境变量
- 或者使用客户端配置（不推荐，会暴露密钥）

---

## 5. Firebase Hosting 部署

### 配置已就绪 ✅

配置文件：`firebase.json`, `.firebaserc`

### 部署步骤：

1. **安装 Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **登录 Firebase**
   ```bash
   firebase login
   ```

3. **初始化项目**（如果还没初始化）
   ```bash
   firebase init hosting
   ```
   选择：
   - What do you want to use as your public directory? → `dist`
   - Configure as a single-page app? → `Yes`
   - Set up automatic builds and deploys with GitHub? → `No`（可选）

4. **更新 .firebaserc**
   编辑 `.firebaserc`，将 `your-firebase-project-id` 替换为你的 Firebase 项目 ID

5. **构建项目**
   ```bash
   npm run build
   ```

6. **设置环境变量**（在 Firebase Console）
   - 项目设置 → 环境变量
   - 添加 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`

7. **部署**
   ```bash
   firebase deploy --only hosting
   ```

8. **访问网站**：`https://your-project-id.web.app`

---

## 6. Surge.sh 部署（最简单）

### 配置已就绪 ✅

配置文件：`surge.json`

### 部署步骤：

1. **安装 Surge**
   ```bash
   npm install -g surge
   ```

2. **构建项目**
   ```bash
   npm run build
   ```

3. **部署**
   ```bash
   cd dist
   surge
   ```
   首次使用需要：
   - 创建账号（输入邮箱和密码）
   - 选择域名（或使用随机域名）

4. **更新配置**（可选）
   编辑 `surge.json`，设置自定义域名：
   ```json
   {
     "project": "dist",
     "domain": "your-custom-domain.surge.sh"
   }
   ```

5. **访问网站**：`https://your-project-name.surge.sh`

### 注意事项：
- Surge 不支持环境变量
- 需要手动修改代码或使用其他方式配置 Supabase

---

## 7. Railway 部署

### 部署步骤：

1. 访问 [railway.app](https://railway.app)
2. 使用 GitHub 登录
3. 点击 "New Project"
4. 选择 "Deploy from GitHub repo"
5. 选择你的仓库
6. 配置：
   - **Build Command**: `npm run build`
   - **Start Command**: `npx serve dist -p $PORT`
7. **环境变量**：
   ```
   VITE_SUPABASE_URL = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = your-anon-key
   ```
8. 部署会自动开始

---

## 8. Render 部署

### 部署步骤：

1. 访问 [render.com](https://render.com)
2. 使用 GitHub 登录
3. 点击 "New" → "Static Site"
4. 连接仓库
5. 配置：
   - **Name**: 你的项目名
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
6. **环境变量**：
   ```
   VITE_SUPABASE_URL = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = your-anon-key
   ```
7. 点击 "Create Static Site"

---

## 🔧 通用配置说明

### 环境变量

所有平台都需要配置以下环境变量：

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `VITE_SUPABASE_URL` | Supabase 项目 URL | `https://xxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase Anon Key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

**重要**：变量名必须以 `VITE_` 开头才能在构建时被注入。

### 构建命令

所有平台使用相同的构建命令：
```bash
npm install --legacy-peer-deps  # 安装依赖
npm run build                   # 构建项目
```

### 输出目录

构建产物在 `dist` 目录。

---

## 📋 部署检查清单

部署前确保：

- [ ] Supabase 项目已创建并配置
- [ ] 数据库表已创建（执行了 SQL 迁移）
- [ ] 项目本地构建成功（`npm run build`）
- [ ] 环境变量已配置
- [ ] 自定义域名已配置（如需要）
- [ ] HTTPS 已启用（通常自动）

---

## 🆘 常见问题

### Q: 环境变量未生效？
A: 确保变量名以 `VITE_` 开头，并重新构建部署。

### Q: 路由 404 错误？
A: 确保配置了 SPA 路由重定向（所有路由指向 index.html）。

### Q: 构建失败？
A: 检查是否使用了 `--legacy-peer-deps` 安装依赖。

### Q: Supabase 连接失败？
A: 检查环境变量是否正确配置，Supabase 项目是否激活。

---

## 🎯 推荐方案

**最佳选择**：
1. **Cloudflare Pages** - 免费无限流量，速度快
2. **Vercel** - 功能丰富，部署简单
3. **Netlify** - 功能强大，适合复杂项目

**简单快速**：
- **Surge.sh** - 最简单，但功能有限

**企业级**：
- **Firebase Hosting** - Google 支持，功能全面

---

## 📚 更多资源

- [Vercel 文档](https://vercel.com/docs)
- [Netlify 文档](https://docs.netlify.com)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages)
- [GitHub Pages 文档](https://docs.github.com/pages)

