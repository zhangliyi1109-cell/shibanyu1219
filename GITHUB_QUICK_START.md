# ⚡ GitHub 上传 - 快速开始

## 🚀 最快方法（3 步）

### 1. 初始化并提交

```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. 在 GitHub 创建仓库

1. 访问 [github.com/new](https://github.com/new)
2. 填写仓库名：`shibanyu`
3. 选择 Public
4. **不要**勾选任何初始化选项
5. 点击 "Create repository"

### 3. 推送代码

复制 GitHub 显示的命令（类似下面），在项目目录执行：

```bash
git remote add origin https://github.com/your-username/shibanyu.git
git branch -M main
git push -u origin main
```

**完成！** 🎉

---

## 💡 如果提示需要认证

使用 Personal Access Token：

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → 勾选 `repo` → Generate
3. 复制 token，在推送时作为密码使用

---

## 📖 详细步骤

查看 `GITHUB_UPLOAD.md` 获取完整指南。

