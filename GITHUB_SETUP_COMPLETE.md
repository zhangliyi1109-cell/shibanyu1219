# 🎯 GitHub 上传 - 完整步骤

## ✅ 已完成

- ✅ Git 仓库已初始化
- ✅ 文件已添加到暂存区
- ⚠️ 需要配置 Git 用户信息才能提交

---

## 📝 步骤 1：配置 Git 用户信息（只需一次）

在终端执行以下命令（替换为你的信息）：

```bash
git config --global user.name "你的名字"
git config --global user.email "your-email@example.com"
```

**示例：**
```bash
git config --global user.name "张三"
git config --global user.email "zhangsan@example.com"
```

**注意：**
- `user.email` 最好使用你的 GitHub 账号邮箱
- `--global` 表示全局配置，所有项目都会使用
- 如果只想为这个项目配置，去掉 `--global`

---

## 📝 步骤 2：提交文件

配置完成后，执行：

```bash
git commit -m "Initial commit: 石斑鱼项目 - 在压力深海，学会呼吸"
```

---

## 📝 步骤 3：在 GitHub 创建仓库

1. 访问 [github.com/new](https://github.com/new)
2. 登录你的 GitHub 账号
3. 填写仓库信息：
   - **Repository name**: `shibanyu`（或你喜欢的名称）
   - **Description**: `石斑鱼 - 在压力深海，学会呼吸`
   - **Visibility**: 
     - ✅ **Public**（公开，推荐）
     - ⬜ Private（私有）
   - ⚠️ **重要**：不要勾选以下选项：
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license
4. 点击 **"Create repository"**

---

## 📝 步骤 4：连接远程仓库并推送

GitHub 创建仓库后会显示命令，复制并执行：

```bash
git remote add origin https://github.com/your-username/shibanyu.git
git branch -M main
git push -u origin main
```

**替换说明：**
- `your-username` → 你的 GitHub 用户名
- `shibanyu` → 你的仓库名

---

## 🔐 步骤 5：认证（如果需要）

如果提示输入用户名和密码：

### 方法 A：使用 Personal Access Token（推荐）

1. **创建 Token：**
   - GitHub → Settings → Developer settings
   - Personal access tokens → Tokens (classic)
   - Generate new token (classic)
   - 填写 Note: `Git Push`
   - 选择过期时间
   - 勾选权限：**`repo`**（完整仓库访问权限）
   - 点击 "Generate token"
   - **复制 token**（只显示一次，请保存）

2. **使用 Token：**
   - Username: 你的 GitHub 用户名
   - Password: 粘贴刚才复制的 token

### 方法 B：使用 GitHub Desktop（最简单）

如果命令行认证有问题，使用 GitHub Desktop：

1. 下载 [GitHub Desktop](https://desktop.github.com)
2. 安装并登录
3. File → Add Local Repository
4. 选择你的项目文件夹
5. 点击 "Publish repository"
6. 填写信息并发布

---

## ✅ 验证上传成功

上传后，访问你的仓库：
```
https://github.com/your-username/shibanyu
```

你应该能看到：
- ✅ 所有源代码文件
- ✅ 配置文件
- ✅ README.md
- ❌ 没有 node_modules、dist、.env（这些被 .gitignore 忽略了）

---

## 🚀 上传后的下一步

### 1. 连接 Netlify（自动部署）

1. 访问 [netlify.com](https://www.netlify.com)
2. 登录并点击 "Add new site"
3. 选择 "Import an existing project"
4. 选择 GitHub，授权并选择你的仓库
5. 配置环境变量并部署

### 2. 后续更新代码

每次修改代码后：

```bash
git add .
git commit -m "描述你的更改"
git push
```

Netlify 会自动检测并重新部署！

---

## 🐛 常见问题

### Q: 提示 "fatal: not a git repository"

**A:** 确保在项目根目录执行命令

### Q: 提示 "remote origin already exists"

**A:** 先删除旧的远程仓库：
```bash
git remote remove origin
```
然后重新添加。

### Q: 推送时提示认证失败

**A:** 
- 使用 Personal Access Token 而不是密码
- 或者使用 GitHub Desktop

### Q: 如何查看已配置的用户信息？

**A:** 
```bash
git config --global user.name
git config --global user.email
```

---

## 📚 详细文档

- **完整上传指南**: `GITHUB_UPLOAD.md`
- **快速开始**: `GITHUB_QUICK_START.md`
- **Netlify 部署**: `NETLIFY_START.md`

---

## 💡 提示

**最快的方法：**
1. 配置 Git 用户信息（步骤 1）
2. 提交文件（步骤 2）
3. 使用 GitHub Desktop 发布（最简单）

**最灵活的方法：**
使用命令行，可以完全控制每个步骤。

---

## 🎉 完成！

上传成功后，你的代码就安全地备份在 GitHub 上了！

