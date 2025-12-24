# ✅ 立即执行这些步骤

## 🎯 当前状态
- ✅ Git 仓库已初始化
- ✅ 文件已添加到暂存区
- ⚠️ 需要配置 Git 用户信息才能提交

---

## 📝 步骤 1：配置 Git 用户信息（必须）

在终端执行这两条命令（替换为你的信息）：

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

## 📝 步骤 2：提交文件

配置完成后，执行：

```bash
git commit -m "Initial commit: 石斑鱼项目 - 在压力深海，学会呼吸"
```

---

## 📝 步骤 3：在 GitHub 创建仓库

### 3.1 打开浏览器

访问：**https://github.com/new**

### 3.2 填写信息

- **Repository name**: `shibanyu`
- **Description**: `石斑鱼 - 在压力深海，学会呼吸`
- **Visibility**: ✅ **Public**
- ⚠️ **不要勾选**任何初始化选项

### 3.3 创建

点击 **"Create repository"**

### 3.4 复制 URL

GitHub 会显示类似这样的 URL：
```
https://github.com/your-username/shibanyu.git
```
**复制这个 URL**

---

## 📝 步骤 4：连接并推送

在终端执行（替换 `your-username` 和 `shibanyu` 为你的实际值）：

```bash
git remote add origin https://github.com/your-username/shibanyu.git
git branch -M main
git push -u origin main
```

**如果提示输入密码：**
- Username: 你的 GitHub 用户名
- Password: 使用 **Personal Access Token**

**如何创建 Token：**
1. GitHub → 右上角头像 → Settings
2. Developer settings → Personal access tokens → Tokens (classic)
3. Generate new token → 勾选 `repo` → Generate
4. 复制 token（只显示一次）
5. 在推送时作为密码使用

---

## 📝 步骤 5：验证

访问：`https://github.com/your-username/shibanyu`

应该能看到所有代码文件 ✅

---

## 🚀 步骤 6：在 Netlify 导入

### 6.1 访问 Netlify

打开：**https://www.netlify.com** 并登录

### 6.2 导入项目

1. 点击 **"Add new site"**
2. 选择 **"Import an existing project"**
3. 点击 **"GitHub"**
4. 授权 Netlify（选择 All repositories）
5. 找到并选择 `shibanyu` 仓库

### 6.3 配置部署

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Install command**: `npm install --legacy-peer-deps` ⚠️ 重要！

### 6.4 添加环境变量

添加两个：
- `VITE_SUPABASE_URL` = 你的 Supabase URL
- `VITE_SUPABASE_ANON_KEY` = 你的 Supabase Key

### 6.5 部署

点击 **"Deploy site"**

---

## ✅ 完成！

部署成功后，你会得到 Netlify URL！

---

## 🆘 如果卡在某一步

告诉我具体在哪一步，我会帮你解决！

