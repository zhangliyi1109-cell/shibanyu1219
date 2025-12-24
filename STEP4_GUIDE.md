# 📝 步骤 4：连接并推送 - 详细说明

## ⚠️ 执行步骤 4 之前需要完成：

1. ✅ 配置 Git 用户信息
2. ✅ 提交文件到本地 Git
3. ✅ 在 GitHub 创建仓库

---

## 🔍 检查当前状态

让我先检查你是否完成了前面的步骤...

---

## 📋 如果还没完成前面的步骤：

### 步骤 1：配置 Git 用户信息

在终端执行：

```bash
git config --global user.name "你的名字"
git config --global user.email "your-email@example.com"
```

### 步骤 2：提交文件

```bash
git commit -m "Initial commit: 石斑鱼项目"
```

### 步骤 3：在 GitHub 创建仓库

1. 访问：https://github.com/new
2. 填写仓库名：`shibanyu`
3. 选择 Public
4. 不要勾选任何初始化选项
5. 点击 "Create repository"
6. **复制显示的仓库 URL**（类似 `https://github.com/your-username/shibanyu.git`）

---

## 🚀 步骤 4：连接并推送（执行这一步）

### 4.1 添加远程仓库

在终端执行（**替换 `your-username` 和 `shibanyu` 为你的实际值**）：

```bash
git remote add origin https://github.com/your-username/shibanyu.git
```

**示例：**
如果你的 GitHub 用户名是 `zhangsan`，仓库名是 `shibanyu`，则执行：
```bash
git remote add origin https://github.com/zhangsan/shibanyu.git
```

### 4.2 重命名分支为 main

```bash
git branch -M main
```

### 4.3 推送到 GitHub

```bash
git push -u origin main
```

### 4.4 处理认证（如果需要）

如果提示输入用户名和密码：

**Username**: 输入你的 GitHub 用户名

**Password**: 使用 **Personal Access Token**（不是密码）

**如何创建 Token：**
1. GitHub → 右上角头像 → Settings
2. Developer settings → Personal access tokens → Tokens (classic)
3. Generate new token → 勾选 `repo` → Generate
4. 复制 token（只显示一次）
5. 在推送时作为密码使用

---

## ✅ 验证成功

推送成功后，访问：
```
https://github.com/your-username/shibanyu
```

应该能看到所有代码文件！

---

## 🆘 常见错误

### 错误：remote origin already exists

**解决：**
```bash
git remote remove origin
git remote add origin https://github.com/your-username/shibanyu.git
```

### 错误：Authentication failed

**解决：**
- 使用 Personal Access Token 而不是密码
- 确认 Token 权限包含 `repo`

---

## 📝 告诉我

1. 你是否已经配置了 Git 用户信息？
2. 你是否已经提交了文件？
3. 你是否已经在 GitHub 创建了仓库？
4. 你的 GitHub 仓库 URL 是什么？

告诉我这些信息，我可以帮你执行步骤 4！

