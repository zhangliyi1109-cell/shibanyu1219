# 🎯 完整上传步骤 - 解决 Netlify 找不到项目的问题

## 🔍 问题原因

你在 Netlify 中找不到项目，是因为：
- ❌ 项目还没有推送到 GitHub
- ❌ GitHub 仓库还没有创建
- ✅ 文件已添加到 Git，但还没有提交和推送

---

## ✅ 解决步骤（按顺序执行）

### 步骤 1：配置 Git 用户信息 ⚠️ 必须先做

在终端执行（替换为你的信息）：

```bash
git config --global user.name "你的名字"
git config --global user.email "your-email@example.com"
```

**示例：**
```bash
git config --global user.name "张三"
git config --global user.email "zhangsan@gmail.com"
```

**验证配置：**
```bash
git config --global user.name
git config --global user.email
```

---

### 步骤 2：提交文件到本地 Git

```bash
git commit -m "Initial commit: 石斑鱼项目 - 在压力深海，学会呼吸"
```

---

### 步骤 3：在 GitHub 创建仓库

1. **访问 GitHub**
   - 打开 [github.com/new](https://github.com/new)
   - 确保已登录

2. **创建新仓库**
   - **Repository name**: `shibanyu`（或你喜欢的名称）
   - **Description**: `石斑鱼 - 在压力深海，学会呼吸`
   - **Visibility**: 
     - ✅ **Public**（推荐，Netlify 更容易访问）
     - ⬜ Private
   - ⚠️ **重要**：不要勾选以下选项：
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license
   - 点击 **"Create repository"**

3. **复制仓库 URL**
   - GitHub 会显示类似这样的 URL：
     ```
     https://github.com/your-username/shibanyu.git
     ```
   - 复制这个 URL

---

### 步骤 4：连接 GitHub 并推送代码

在项目目录的终端执行（替换 `your-username` 和 `shibanyu`）：

```bash
# 添加远程仓库
git remote add origin https://github.com/your-username/shibanyu.git

# 重命名分支为 main
git branch -M main

# 推送到 GitHub
git push -u origin main
```

**如果提示输入用户名和密码：**
- **Username**: 你的 GitHub 用户名
- **Password**: 使用 **Personal Access Token**（不是密码）

**如何创建 Personal Access Token：**
1. GitHub → 右上角头像 → **Settings**
2. 左侧菜单 → **Developer settings**
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token (classic)**
5. 填写：
   - **Note**: `Netlify Deployment`
   - **Expiration**: 选择过期时间（或 No expiration）
   - **Select scopes**: 勾选 **`repo`**（完整仓库访问权限）
6. 点击 **"Generate token"**
7. **复制 token**（只显示一次，请保存好）
8. 在推送时，密码处粘贴这个 token

---

### 步骤 5：验证上传成功

访问你的仓库 URL：
```
https://github.com/your-username/shibanyu
```

你应该能看到：
- ✅ 所有源代码文件
- ✅ 配置文件
- ✅ README.md
- ❌ 没有 node_modules、dist、.env（这些被 .gitignore 忽略了）

---

### 步骤 6：在 Netlify 中导入

现在项目已经在 GitHub 上了，可以在 Netlify 中导入：

1. **访问 Netlify**
   - 打开 [netlify.com](https://www.netlify.com)
   - 确保已登录

2. **导入项目**
   - 点击 **"Add new site"**
   - 选择 **"Import an existing project"**
   - 点击 **"GitHub"**

3. **授权 Netlify**
   - 如果首次使用，会要求授权
   - 点击 **"Authorize Netlify"**
   - 选择要授权的仓库：
     - ✅ **All repositories**（推荐，方便以后）
     - 或 ⬜ **Only select repositories** → 选择 `shibanyu`

4. **选择仓库**
   - 现在应该能看到你的 `shibanyu` 仓库了
   - 点击选择它

5. **配置部署**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Install command**: `npm install --legacy-peer-deps` ⚠️ **重要！**

6. **添加环境变量**
   - 点击 **"Show advanced"**
   - 在 **"Environment variables"** 中添加：
     - Key: `VITE_SUPABASE_URL`
     - Value: `https://your-project-id.supabase.co`
     - Key: `VITE_SUPABASE_ANON_KEY`
     - Value: `your-anon-key-here`

7. **部署**
   - 点击 **"Deploy site"**
   - 等待构建完成（约 1-3 分钟）

---

## 🎉 完成！

部署成功后，你会得到一个 Netlify URL，例如：
```
https://your-site-name-12345.netlify.app
```

---

## 🐛 如果还是找不到仓库

### 检查清单：

- [ ] ✅ 代码已推送到 GitHub（访问 github.com 能看到仓库）
- [ ] ✅ 在 GitHub 中确认仓库已创建
- [ ] ✅ Netlify 已授权访问 GitHub
- [ ] ✅ 刷新了 Netlify 页面
- [ ] ✅ 检查仓库是 Public（Private 可能需要额外设置）

### 解决方法：

1. **重新授权 Netlify**
   - Netlify → User settings → Connected accounts
   - 断开 GitHub 连接
   - 重新连接并授权

2. **检查仓库可见性**
   - 如果是 Private 仓库，确保 Netlify 有权限访问
   - 或者将仓库改为 Public（临时测试）

3. **使用仓库搜索**
   - 在 Netlify 导入页面
   - 使用搜索框搜索仓库名 `shibanyu`

---

## 💡 最简单的方法：使用 GitHub Desktop

如果命令行不熟悉，使用 GitHub Desktop：

1. **下载 GitHub Desktop**
   - [desktop.github.com](https://desktop.github.com)

2. **上传到 GitHub**
   - 打开 GitHub Desktop
   - File → Add Local Repository
   - 选择你的项目文件夹
   - 点击 "Publish repository"
   - 填写信息并发布

3. **然后在 Netlify 导入**
   - 现在应该能看到仓库了

---

## 📚 相关文档

- **GitHub 上传**: `GITHUB_SETUP_COMPLETE.md`
- **Netlify 部署**: `NETLIFY_START.md`
- **GitHub + Netlify**: `NETLIFY_GITHUB_SETUP.md`

