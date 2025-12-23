# 🔗 Netlify 连接 GitHub 仓库指南

## ⚠️ 问题说明

如果你在 Netlify 中找不到你的项目，可能是因为：

1. **项目还没有推送到 GitHub**（只是本地提交了）
2. **GitHub 仓库还没有创建**
3. **需要先完成 GitHub 上传步骤**

---

## ✅ 解决方案：先上传到 GitHub

### 步骤 1：配置 Git 用户信息（如果还没配置）

```bash
git config --global user.name "你的名字"
git config --global user.email "your-email@example.com"
```

### 步骤 2：提交文件（如果还没提交）

```bash
git commit -m "Initial commit: 石斑鱼项目 - 在压力深海，学会呼吸"
```

### 步骤 3：在 GitHub 创建仓库

1. 访问 [github.com/new](https://github.com/new)
2. 登录你的 GitHub 账号
3. 填写信息：
   - **Repository name**: `shibanyu`（或你喜欢的名称）
   - **Description**: `石斑鱼 - 在压力深海，学会呼吸`
   - **Visibility**: Public 或 Private
   - ⚠️ **不要**勾选任何初始化选项
4. 点击 **"Create repository"**

### 步骤 4：推送代码到 GitHub

复制 GitHub 显示的命令并执行（替换用户名和仓库名）：

```bash
git remote add origin https://github.com/your-username/shibanyu.git
git branch -M main
git push -u origin main
```

**如果提示输入密码：**
- Username: 你的 GitHub 用户名
- Password: 使用 **Personal Access Token**（不是密码）

**如何创建 Token：**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → 勾选 `repo` → Generate
3. 复制 token 作为密码使用

### 步骤 5：验证上传成功

访问你的仓库 URL：
```
https://github.com/your-username/shibanyu
```

你应该能看到所有代码文件。

---

## 🚀 然后在 Netlify 中导入

### 方法 1：通过网页导入（推荐）

1. **访问 Netlify**
   - 打开 [netlify.com](https://www.netlify.com)
   - 确保已登录

2. **导入项目**
   - 点击 **"Add new site"**
   - 选择 **"Import an existing project"**
   - 点击 **"GitHub"**（或 GitLab/Bitbucket）

3. **授权 Netlify**
   - 如果首次使用，会要求授权 Netlify 访问 GitHub
   - 点击 **"Authorize Netlify"**
   - 选择要授权的仓库（可以选择所有仓库，或只选择特定仓库）

4. **选择仓库**
   - 在仓库列表中，找到你的 `shibanyu` 仓库
   - 如果找不到：
     - 检查是否已推送到 GitHub
     - 刷新页面
     - 检查授权是否成功

5. **配置部署**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Install command: `npm install --legacy-peer-deps` ⚠️ **重要！**

6. **添加环境变量**
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

7. **部署**
   - 点击 **"Deploy site"**

---

## 🔍 如果还是找不到仓库

### 检查清单：

- [ ] ✅ 代码已推送到 GitHub（访问 github.com 能看到仓库）
- [ ] ✅ Netlify 已授权访问 GitHub
- [ ] ✅ 刷新了 Netlify 页面
- [ ] ✅ 检查仓库是 Public 还是 Private（Private 需要额外授权）
- [ ] ✅ 在 GitHub 中确认仓库已创建

### 解决方法：

1. **重新授权 Netlify**
   - Netlify → User settings → Connected accounts
   - 断开 GitHub 连接
   - 重新连接并授权

2. **检查仓库可见性**
   - 如果是 Private 仓库，确保 Netlify 有权限访问
   - 或者将仓库改为 Public（临时测试）

3. **使用仓库 URL 直接导入**
   - 在 Netlify 导入页面
   - 尝试直接输入仓库 URL：
     ```
     https://github.com/your-username/shibanyu
     ```

---

## 💡 最简单的方法：使用 GitHub Desktop

如果命令行不熟悉：

1. **下载 GitHub Desktop**
   - [desktop.github.com](https://desktop.github.com)

2. **上传到 GitHub**
   - 打开 GitHub Desktop
   - File → Add Local Repository
   - 选择你的项目文件夹
   - 点击 "Publish repository"
   - 填写信息并发布

3. **然后在 Netlify 导入**
   - 现在应该能在 Netlify 中看到仓库了

---

## 🎯 完整流程总结

```
本地项目
   ↓
配置 Git 用户信息
   ↓
提交到本地 Git
   ↓
在 GitHub 创建仓库
   ↓
推送到 GitHub
   ↓
在 Netlify 中导入 GitHub 仓库
   ↓
配置并部署
```

---

## 📚 相关文档

- **GitHub 上传指南**: `GITHUB_SETUP_COMPLETE.md`
- **Netlify 部署指南**: `NETLIFY_START.md`

---

## 🆘 需要帮助？

如果还是找不到：
1. 确认代码已推送到 GitHub
2. 检查 Netlify 授权设置
3. 尝试刷新页面或重新登录
4. 使用 GitHub Desktop 上传（最简单）

