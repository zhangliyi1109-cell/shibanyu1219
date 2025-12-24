# 📍 Netlify Install command 位置指南

## 🔍 在新版 Netlify 中查找 Install command

### 方法 1：查找 "Show advanced" 或 "Advanced" 按钮

1. **在当前页面（Build settings）**
2. **向下滚动**，查找：
   - **"Show advanced"** 按钮
   - **"Advanced"** 链接或标签
   - **"More options"** 按钮
3. **点击展开**，应该能看到 **"Install command"** 字段

---

### 方法 2：通过 Environment variables 设置（推荐）

如果找不到 Install command，可以通过环境变量：

1. **在同一页面，查找 "Environment variables" 部分**
   - 可能在页面下方
   - 或点击左侧菜单的 **"Environment variables"**

2. **添加环境变量**
   - 点击 **"Add variable"** 或 **"New variable"**
   - **Key**: `NPM_FLAGS`
   - **Value**: `--legacy-peer-deps`
   - 点击 **"Add variable"**

---

### 方法 3：使用 .npmrc 文件（最简单，已创建）

我已经创建了 `.npmrc` 文件，只需要推送到 GitHub，Netlify 会自动使用它。

**如果推送失败，可以手动创建：**

1. 在项目根目录创建 `.npmrc` 文件
2. 内容：`legacy-peer-deps=true`
3. 提交并推送

---

## ✅ 最简单的解决方案

### 方案 A：推送 .npmrc 文件（推荐）

我已经创建了 `.npmrc` 文件，只需要推送：

```bash
git push
```

如果推送失败（网络问题），可以：
- 等待网络恢复
- 或使用 GitHub Desktop 推送
- 或手动在 GitHub 网页上创建 `.npmrc` 文件

### 方案 B：在 Netlify 添加环境变量

1. Build settings 页面 → 查找 **"Environment variables"**
2. 添加：
   - Key: `NPM_FLAGS`
   - Value: `--legacy-peer-deps`

### 方案 C：更新 framer-motion（长期方案）

更新到支持 React 19 的版本，但可能需要测试兼容性。

---

## 🎯 你现在应该做什么？

### 最快的方法：

1. **尝试推送代码**（如果网络恢复）
   ```bash
   git push
   ```

2. **或者在 Netlify 添加环境变量**
   - 找到 Environment variables 部分
   - 添加 `NPM_FLAGS = --legacy-peer-deps`

3. **或者告诉我你在页面上看到了什么**
   - 有没有看到 "Environment variables"？
   - 有没有看到 "Show advanced"？
   - 我可以提供更具体的指导

---

## 📝 当前状态

- ✅ `.npmrc` 文件已创建（本地）
- ✅ `netlify.toml` 已更新
- ⚠️ 需要推送到 GitHub（网络问题）
- ⚠️ 或在 Netlify 网页界面设置

---

告诉我你在 Netlify 页面上看到了什么，我会提供更具体的指导！


