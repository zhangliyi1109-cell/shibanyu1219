# Netlify 部署详细指南

## 📋 部署前准备

1. ✅ 项目已构建成功（`dist` 目录存在）
2. ✅ Netlify 配置文件已就绪（`netlify.toml`）
3. ⚠️ 需要 Supabase 配置（环境变量）

---

## 🚀 方法一：通过网页部署（推荐，最简单）

### 步骤 1：准备 Git 仓库

如果项目还没有推送到 Git 仓库，需要先推送：

```bash
# 初始化 Git（如果还没有）
git init

# 添加文件
git add .

# 提交
git commit -m "Initial commit"

# 推送到 GitHub/GitLab/Bitbucket
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

### 步骤 2：访问 Netlify

1. 访问 [netlify.com](https://www.netlify.com)
2. 点击右上角 **"Sign up"** 或 **"Log in"**
3. 使用以下方式之一登录：
   - GitHub（推荐）
   - GitLab
   - Bitbucket
   - Email

### 步骤 3：导入项目

1. 登录后，点击 **"Add new site"**
2. 选择 **"Import an existing project"**
3. 选择你的 Git 提供商（GitHub/GitLab/Bitbucket）
4. 授权 Netlify 访问你的仓库
5. 选择你的项目仓库

### 步骤 4：配置构建设置

Netlify 会自动检测到 `netlify.toml` 配置文件，但你可以确认或修改：

**基本设置：**
- **Branch to deploy**: `main` 或 `master`
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Install command**: `npm install --legacy-peer-deps` ⚠️ **重要！**

**高级设置（点击 "Show advanced"）：**
- **Base directory**: `/`（默认）
- **Environment variables**: 见下一步

### 步骤 5：配置环境变量

在部署前，必须配置 Supabase 环境变量：

1. 在构建设置页面，找到 **"Environment variables"** 部分
2. 点击 **"New variable"**，添加以下变量：

   **变量 1：**
   - **Key**: `VITE_SUPABASE_URL`
   - **Value**: `https://your-project-id.supabase.co`
   - **Scopes**: 选择 `Production`, `Deploy previews`, `Branch deploys`

   **变量 2：**
   - **Key**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: `your-anon-key-here`
   - **Scopes**: 选择 `Production`, `Deploy previews`, `Branch deploys`

3. 点击 **"Add variable"** 保存每个变量

### 步骤 6：部署

1. 确认所有设置正确
2. 点击 **"Deploy site"** 按钮
3. 等待构建完成（约 1-3 分钟）

### 步骤 7：获取网站地址

部署完成后，你会看到：
- **网站 URL**: `https://random-name-12345.netlify.app`
- 可以点击 **"Site settings"** → **"Change site name"** 修改为自定义名称

---

## 💻 方法二：通过 CLI 部署

### 步骤 1：安装 Netlify CLI

```bash
npm install -g netlify-cli
```

### 步骤 2：登录 Netlify

```bash
netlify login
```

这会打开浏览器，完成登录授权。

### 步骤 3：初始化项目（首次部署）

```bash
# 在项目根目录执行
netlify init
```

按照提示操作：
- **Create & configure a new site**（创建新站点）
- **Team**: 选择你的团队（或个人）
- **Site name**: 输入站点名称（或留空使用随机名称）
- **Build command**: `npm run build`
- **Directory to deploy**: `dist`
- **Netlify functions folder**: 留空（不需要）

### 步骤 4：配置环境变量

```bash
# 设置环境变量
netlify env:set VITE_SUPABASE_URL "https://your-project-id.supabase.co"
netlify env:set VITE_SUPABASE_ANON_KEY "your-anon-key-here"
```

或者通过网页设置：
1. 访问 [app.netlify.com](https://app.netlify.com)
2. 选择你的站点
3. **Site settings** → **Environment variables**
4. 添加变量

### 步骤 5：构建并部署

```bash
# 构建项目
npm run build

# 部署到生产环境
netlify deploy --prod
```

或者使用快捷命令：
```bash
npm run deploy:netlify
```

---

## 🔧 方法三：使用 Netlify CLI 快速部署（最简单）

如果你已经配置好环境变量，可以直接使用：

```bash
# 一键部署
npm run deploy:netlify
```

这个命令会：
1. 构建项目
2. 部署到 Netlify 生产环境

---

## 📝 Netlify 配置文件说明

项目中的 `netlify.toml` 文件包含以下配置：

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

**说明：**
- `command`: 构建命令
- `publish`: 发布目录（构建产物）
- `redirects`: SPA 路由重定向（所有路由指向 index.html）
- `NODE_VERSION`: Node.js 版本

---

## ✅ 部署后检查

### 1. 访问网站

打开你的 Netlify 网站 URL，检查是否正常加载。

### 2. 检查控制台

1. 打开浏览器开发者工具（F12）
2. 查看 **Console** 标签
3. 确认没有错误信息
4. 检查是否有 Supabase 连接警告

### 3. 测试功能

- ✅ 打开设置页面，保存用户配置
- ✅ 添加每日目标
- ✅ 添加事件记录
- ✅ 添加深海邻居资料
- ✅ 测试所有功能是否正常

### 4. 检查 Netlify 日志

1. 在 Netlify 控制台，点击 **"Deploys"**
2. 查看最新的部署日志
3. 确认构建成功，没有错误

---

## 🔄 更新部署

### 自动部署（推荐）

如果你连接了 Git 仓库，每次推送代码到主分支，Netlify 会自动重新部署。

```bash
git add .
git commit -m "Update features"
git push
```

### 手动部署

```bash
# 使用 CLI
netlify deploy --prod

# 或使用 npm 脚本
npm run deploy:netlify
```

---

## 🎨 自定义域名

### 添加自定义域名

1. 在 Netlify 控制台，选择你的站点
2. 点击 **"Domain settings"**
3. 点击 **"Add custom domain"**
4. 输入你的域名（如 `yourdomain.com`）
5. 按照提示配置 DNS 记录

### DNS 配置

添加以下 DNS 记录：

**类型 A：**
- **Name**: `@` 或 `yourdomain.com`
- **Value**: Netlify 提供的 IP 地址

**类型 CNAME：**
- **Name**: `www`
- **Value**: `your-site-name.netlify.app`

---

## 🔐 环境变量管理

### 查看环境变量

```bash
netlify env:list
```

### 添加环境变量

```bash
netlify env:set KEY_NAME "value"
```

### 删除环境变量

```bash
netlify env:unset KEY_NAME
```

### 通过网页管理

1. **Site settings** → **Environment variables**
2. 可以添加、编辑、删除变量
3. 可以为不同环境设置不同值

---

## 🐛 常见问题

### 问题 1：构建失败

**错误**: `npm ERR! Missing script: "build"`

**解决**:
- 确认 `package.json` 中有 `build` 脚本
- 检查 Netlify 的构建命令是否正确

### 问题 2：环境变量未生效

**错误**: Supabase 连接失败

**解决**:
- 确认环境变量名以 `VITE_` 开头
- 重新部署站点
- 检查环境变量的作用域设置

### 问题 3：路由 404 错误

**错误**: 刷新页面后出现 404

**解决**:
- 确认 `netlify.toml` 中有重定向配置
- 检查 `[[redirects]]` 部分是否正确

### 问题 4：依赖安装失败

**错误**: Peer dependency conflicts

**解决**:
- 在 Netlify 设置中，将 Install command 改为：
  ```
  npm install --legacy-peer-deps
  ```

---

## 📊 Netlify 功能

### 免费版功能

- ✅ 100GB 带宽/月
- ✅ 300 构建分钟/月
- ✅ 自动 HTTPS
- ✅ 自定义域名
- ✅ 表单处理（100 提交/月）
- ✅ 分支预览
- ✅ 持续部署

### 付费版功能

- 更多带宽和构建时间
- 更多表单提交
- 优先支持
- 团队协作功能

---

## 🎯 下一步

1. ✅ 部署完成
2. ✅ 测试功能
3. ⬜ 配置自定义域名（可选）
4. ⬜ 设置通知（可选）
5. ⬜ 配置表单（如果需要）

---

## 📚 相关资源

- [Netlify 文档](https://docs.netlify.com)
- [Netlify CLI 文档](https://cli.netlify.com)
- [Netlify 社区](https://community.netlify.com)

---

## 🆘 需要帮助？

如果遇到问题：
1. 查看 Netlify 部署日志
2. 检查浏览器控制台错误
3. 查看 [Netlify 文档](https://docs.netlify.com)
4. 访问 [Netlify 社区](https://community.netlify.com)

