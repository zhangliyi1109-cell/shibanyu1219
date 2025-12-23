# 🚀 立即完成 GitHub 上传 - 详细步骤

## 📋 第一步：配置 Git 用户信息

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

---

## 📋 第二步：提交文件

在项目目录执行：

```bash
git commit -m "Initial commit: 石斑鱼项目 - 在压力深海，学会呼吸"
```

---

## 📋 第三步：在 GitHub 创建仓库

### 1. 访问 GitHub

打开浏览器，访问：**https://github.com/new**

### 2. 填写仓库信息

- **Repository name**: `shibanyu`（或你喜欢的名称）
- **Description**: `石斑鱼 - 在压力深海，学会呼吸`
- **Visibility**: ✅ **Public**（推荐）
- ⚠️ **不要勾选**：README、.gitignore、license

### 3. 创建仓库

点击 **"Create repository"**

### 4. 复制仓库 URL

创建后，GitHub 会显示类似这样的 URL：
```
https://github.com/your-username/shibanyu.git
```
**复制这个 URL**

---

## 📋 第四步：连接并推送

在项目目录的终端执行（替换 `your-username` 和 `shibanyu`）：

```bash
# 添加远程仓库
git remote add origin https://github.com/your-username/shibanyu.git

# 重命名分支
git branch -M main

# 推送代码
git push -u origin main
```

**如果提示输入密码：**
- Username: 你的 GitHub 用户名
- Password: 使用 **Personal Access Token**（不是密码）

**创建 Token：**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → 勾选 `repo` → Generate
3. 复制 token 作为密码使用

---

## 📋 第五步：验证上传成功

访问：`https://github.com/your-username/shibanyu`

应该能看到所有代码文件 ✅

---

## 🚀 第六步：在 Netlify 中导入

### 1. 访问 Netlify

打开：**https://www.netlify.com** 并登录

### 2. 导入项目

- 点击 **"Add new site"**
- 选择 **"Import an existing project"**
- 点击 **"GitHub"**

### 3. 授权 Netlify

- 点击 **"Authorize Netlify"**
- 选择 **"All repositories"**（或只选择 shibanyu）

### 4. 选择仓库

- 在列表中找到 `shibanyu`
- 点击选择

### 5. 配置部署

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Install command**: `npm install --legacy-peer-deps` ⚠️ 重要！

### 6. 添加环境变量

添加两个变量：
- `VITE_SUPABASE_URL` = 你的 Supabase URL
- `VITE_SUPABASE_ANON_KEY` = 你的 Supabase Key

### 7. 部署

点击 **"Deploy site"**，等待完成！

---

## ✅ 完成！

部署成功后，你会得到一个 Netlify URL，例如：
`https://your-site-name.netlify.app`

---

## 🆘 需要帮助？

如果遇到问题，告诉我具体在哪一步卡住了！

