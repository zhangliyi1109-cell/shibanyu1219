# 📤 上传项目到 GitHub 完整指南

## 📋 准备工作

### 1. 确保已安装 Git

检查 Git 是否已安装：

```bash
git --version
```

如果没有安装，下载：https://git-scm.com/downloads

### 2. 创建 GitHub 账号

如果还没有 GitHub 账号：
1. 访问 [github.com](https://github.com)
2. 点击 "Sign up" 注册账号
3. 完成邮箱验证

---

## 🚀 方法一：使用命令行（推荐）

### 步骤 1：初始化 Git 仓库

在项目根目录打开终端，执行：

```bash
git init
```

### 步骤 2：添加所有文件

```bash
git add .
```

### 步骤 3：提交文件

```bash
git commit -m "Initial commit: 石斑鱼项目"
```

### 步骤 4：在 GitHub 创建仓库

1. 访问 [github.com](https://github.com) 并登录
2. 点击右上角的 **"+"** → **"New repository"**
3. 填写仓库信息：
   - **Repository name**: `shibanyu`（或你喜欢的名称）
   - **Description**: `石斑鱼 - 在压力深海，学会呼吸`
   - **Visibility**: 
     - ✅ Public（公开，推荐）
     - ⬜ Private（私有）
   - ⚠️ **不要**勾选 "Initialize this repository with a README"
   - ⚠️ **不要**添加 .gitignore 或 license（我们已经有了）
4. 点击 **"Create repository"**

### 步骤 5：连接远程仓库

GitHub 会显示仓库 URL，复制它，然后执行：

```bash
git remote add origin https://github.com/your-username/shibanyu.git
```

**注意**：将 `your-username` 替换为你的 GitHub 用户名，`shibanyu` 替换为你的仓库名。

### 步骤 6：推送代码

```bash
git branch -M main
git push -u origin main
```

如果提示输入用户名和密码：
- **Username**: 你的 GitHub 用户名
- **Password**: 使用 Personal Access Token（不是密码）

**如何创建 Personal Access Token：**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 点击 "Generate new token"
3. 选择权限：至少勾选 `repo`
4. 复制生成的 token（只显示一次）

---

## 🖥️ 方法二：使用 GitHub Desktop（图形界面，最简单）

### 步骤 1：下载 GitHub Desktop

访问 [desktop.github.com](https://desktop.github.com) 下载并安装

### 步骤 2：登录 GitHub

打开 GitHub Desktop，使用 GitHub 账号登录

### 步骤 3：添加本地仓库

1. 点击 **"File"** → **"Add Local Repository"**
2. 点击 **"Choose..."**，选择你的项目文件夹
3. 点击 **"Add Repository"**

### 步骤 4：提交更改

1. 在左侧会看到所有更改的文件
2. 在底部填写提交信息：`Initial commit: 石斑鱼项目`
3. 点击 **"Commit to main"**

### 步骤 5：发布到 GitHub

1. 点击右上角的 **"Publish repository"**
2. 填写仓库信息：
   - **Name**: `shibanyu`
   - **Description**: `石斑鱼 - 在压力深海，学会呼吸`
   - **Visibility**: Public 或 Private
3. 点击 **"Publish Repository"**

完成！代码已上传到 GitHub。

---

## 💻 方法三：使用 VS Code / Cursor（推荐给开发者）

### 步骤 1：打开项目

在 VS Code 或 Cursor 中打开项目文件夹

### 步骤 2：初始化 Git

1. 按 `Ctrl+Shift+P`（Mac: `Cmd+Shift+P`）
2. 输入 `Git: Initialize Repository`
3. 选择项目文件夹

### 步骤 3：提交文件

1. 点击左侧的 **Source Control** 图标（或按 `Ctrl+Shift+G`）
2. 点击 **"+"** 将所有文件添加到暂存区
3. 在消息框输入：`Initial commit: 石斑鱼项目`
4. 点击 **"✓ Commit"**

### 步骤 4：发布到 GitHub

1. 点击 **"..."** 菜单
2. 选择 **"Publish to GitHub"**
3. 如果提示登录，使用 GitHub 账号登录
4. 选择：
   - **Repository name**: `shibanyu`
   - **Visibility**: Public 或 Private
5. 点击 **"Publish"**

完成！

---

## 📝 完整命令列表（方法一）

如果你选择使用命令行，这里是完整的命令序列：

```bash
# 1. 初始化 Git 仓库
git init

# 2. 添加所有文件
git add .

# 3. 提交
git commit -m "Initial commit: 石斑鱼项目"

# 4. 重命名分支为 main（如果需要）
git branch -M main

# 5. 添加远程仓库（替换为你的仓库 URL）
git remote add origin https://github.com/your-username/shibanyu.git

# 6. 推送代码
git push -u origin main
```

---

## ⚠️ 重要提示

### 1. .env 文件不会被上传

`.gitignore` 已配置忽略 `.env` 文件，这是正确的，因为：
- `.env` 包含敏感信息（Supabase 密钥）
- 不应该提交到 Git 仓库
- 每个环境（本地、Netlify）需要单独配置

### 2. 不要上传的文件

以下文件/文件夹已被 `.gitignore` 忽略：
- `node_modules/` - 依赖包（可以通过 npm install 重新安装）
- `dist/` - 构建产物（可以重新构建）
- `.env` - 环境变量（包含敏感信息）
- `*.log` - 日志文件

### 3. 需要上传的文件

确保以下重要文件已提交：
- ✅ `package.json` - 项目配置
- ✅ `vite.config.ts` - Vite 配置
- ✅ `netlify.toml` - Netlify 配置
- ✅ `src/` 或 `components/` - 源代码
- ✅ `supabase/migrations/` - 数据库迁移脚本
- ✅ 所有配置文件

---

## 🔄 后续更新代码

上传后，如果需要更新代码：

### 使用命令行：

```bash
# 1. 查看更改
git status

# 2. 添加更改的文件
git add .

# 3. 提交
git commit -m "描述你的更改"

# 4. 推送
git push
```

### 使用 GitHub Desktop：

1. 在 GitHub Desktop 中查看更改
2. 填写提交信息
3. 点击 "Commit to main"
4. 点击 "Push origin"

### 使用 VS Code / Cursor：

1. 在 Source Control 面板查看更改
2. 点击 "+" 添加文件
3. 填写提交信息
4. 点击 "✓ Commit"
5. 点击 "Sync Changes" 或 "Push"

---

## 🐛 常见问题

### Q: 提示 "fatal: not a git repository"

**A:** 需要在项目根目录执行 `git init`

### Q: 提示 "remote origin already exists"

**A:** 先删除旧的远程仓库：
```bash
git remote remove origin
```
然后重新添加。

### Q: 推送时要求输入密码

**A:** 
- 使用 Personal Access Token 而不是密码
- 或者配置 SSH 密钥（更安全）

### Q: 如何配置 SSH 密钥？

**A:** 
1. 生成 SSH 密钥：
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```
2. 复制公钥：
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
3. 添加到 GitHub：Settings → SSH and GPG keys → New SSH key
4. 使用 SSH URL：
   ```bash
   git remote set-url origin git@github.com:your-username/shibanyu.git
   ```

---

## ✅ 验证上传成功

上传后，访问你的 GitHub 仓库 URL：
```
https://github.com/your-username/shibanyu
```

你应该能看到：
- ✅ 所有源代码文件
- ✅ README.md（如果有）
- ✅ package.json
- ✅ 配置文件
- ❌ 没有 node_modules、dist、.env 等被忽略的文件

---

## 🎯 下一步

上传到 GitHub 后：

1. ✅ 代码已备份到云端
2. ✅ 可以分享给其他人
3. ✅ 可以部署到 Netlify（连接 GitHub 仓库）
4. ✅ 可以协作开发

现在你可以：
- 在 Netlify 中导入这个 GitHub 仓库
- 享受自动部署（每次推送代码自动部署）

---

## 📚 相关资源

- [Git 官方文档](https://git-scm.com/doc)
- [GitHub 帮助文档](https://docs.github.com)
- [GitHub Desktop 下载](https://desktop.github.com)

