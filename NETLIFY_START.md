# 🚀 Netlify 部署 - 快速开始

## ✅ 准备工作已完成

- ✅ Netlify 配置文件已就绪（`netlify.toml`）
- ✅ 项目已构建成功（`dist` 目录）
- ✅ 部署脚本已添加（`npm run deploy:netlify`）

---

## 📋 部署步骤（3 种方法）

### 方法 1：网页部署（最简单，推荐）⭐

#### 步骤 1：准备 Git 仓库

如果项目还没有推送到 Git：

```bash
git init
git add .
git commit -m "Ready for Netlify deployment"
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

#### 步骤 2：访问 Netlify

1. 打开 [netlify.com](https://www.netlify.com)
2. 点击 **"Sign up"** 或 **"Log in"**
3. 使用 **GitHub** 登录（推荐）

#### 步骤 3：导入项目

1. 点击 **"Add new site"** → **"Import an existing project"**
2. 选择 **"GitHub"**（或 GitLab/Bitbucket）
3. 授权 Netlify 访问你的仓库
4. 选择你的项目仓库

#### 步骤 4：配置构建设置

Netlify 会自动读取 `netlify.toml`，但请确认：

- **Build command**: `npm run build` ✅
- **Publish directory**: `dist` ✅
- **Install command**: `npm install --legacy-peer-deps` ⚠️ **重要！**

**如何设置 Install command：**
1. 点击 **"Show advanced"**
2. 在 **"Install command"** 中输入：
   ```
   npm install --legacy-peer-deps
   ```

#### 步骤 5：添加环境变量

在部署前，**必须**添加环境变量：

1. 在构建设置页面，找到 **"Environment variables"**
2. 点击 **"New variable"**，添加：

   **变量 1：**
   - Key: `VITE_SUPABASE_URL`
   - Value: `https://your-project-id.supabase.co`
   - Scopes: ✅ Production, ✅ Deploy previews, ✅ Branch deploys

   **变量 2：**
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: `your-anon-key-here`
   - Scopes: ✅ Production, ✅ Deploy previews, ✅ Branch deploys

3. 点击 **"Add variable"** 保存

#### 步骤 6：部署

1. 点击 **"Deploy site"**
2. 等待构建完成（约 1-3 分钟）
3. 部署成功后，你会看到网站 URL

#### 步骤 7：访问网站

你的网站地址类似：`https://your-site-name-12345.netlify.app`

可以点击 **"Site settings"** → **"Change site name"** 修改为自定义名称。

---

### 方法 2：CLI 部署（快速）

#### 步骤 1：安装 Netlify CLI

```bash
npm install -g netlify-cli
```

#### 步骤 2：登录

```bash
netlify login
```

会打开浏览器完成登录。

#### 步骤 3：初始化（首次）

```bash
netlify init
```

按照提示：
- 选择 **"Create & configure a new site"**
- 选择团队
- 输入站点名称（或留空）

#### 步骤 4：设置环境变量

```bash
netlify env:set VITE_SUPABASE_URL "https://your-project-id.supabase.co"
netlify env:set VITE_SUPABASE_ANON_KEY "your-anon-key-here"
```

#### 步骤 5：部署

```bash
npm run deploy:netlify
```

或：

```bash
npm run build
netlify deploy --prod
```

---

### 方法 3：拖拽部署（最简单，但无自动部署）

1. 访问 [app.netlify.com/drop](https://app.netlify.com/drop)
2. 将 `dist` 文件夹拖拽到页面
3. 等待上传和部署完成
4. ⚠️ **注意**：此方法无法配置环境变量，需要手动修改代码

---

## ✅ 部署后检查

### 1. 测试网站

访问你的 Netlify URL，检查：
- ✅ 页面正常加载
- ✅ 没有控制台错误（F12）
- ✅ 功能正常（保存设置、添加目标等）

### 2. 检查部署日志

在 Netlify 控制台：
1. 点击 **"Deploys"**
2. 查看最新部署的日志
3. 确认构建成功

### 3. 验证环境变量

在浏览器控制台（F12），应该看到：
- 没有 Supabase 配置缺失的警告
- 可以正常连接 Supabase

---

## 🔄 更新部署

### 自动部署（推荐）

如果你连接了 Git 仓库，每次推送代码会自动部署：

```bash
git add .
git commit -m "Update features"
git push
```

### 手动部署

```bash
npm run deploy:netlify
```

---

## 🎨 自定义域名

1. Netlify 控制台 → **"Domain settings"**
2. 点击 **"Add custom domain"**
3. 输入你的域名
4. 按照提示配置 DNS

---

## 🐛 常见问题

### Q: 构建失败，提示依赖冲突？

**A:** 确保 Install command 设置为：
```
npm install --legacy-peer-deps
```

### Q: 环境变量未生效？

**A:** 
- 确认变量名以 `VITE_` 开头
- 重新部署站点
- 检查环境变量的作用域

### Q: 路由 404 错误？

**A:** `netlify.toml` 已配置重定向，如果还有问题，检查配置文件。

---

## 📚 详细文档

查看 `NETLIFY_DEPLOY.md` 获取更详细的说明。

---

## 🎉 完成！

部署成功后，你的网站就可以通过 Netlify URL 访问了！

需要帮助？查看 [Netlify 文档](https://docs.netlify.com) 或 [Netlify 社区](https://community.netlify.com)。

