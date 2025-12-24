# 🔍 在 Netlify 中找到 Install command

## 📍 Install command 的位置

在新版 Netlify 界面中，**Install command** 可能不在主设置页面，需要展开高级选项。

---

## 🎯 方法 1：查找 "Show advanced" 或 "Advanced"

### 步骤：

1. **在 Build settings 页面**
   - 你当前看到的页面（有 Base directory, Build command 等）

2. **向下滚动页面**
   - 查找 **"Show advanced"** 或 **"Advanced"** 按钮/链接
   - 通常在页面底部或右侧

3. **点击展开**
   - 点击后会出现更多选项，包括 **"Install command"**

---

## 🎯 方法 2：通过 Environment variables 设置

如果找不到 Install command 字段，可以通过环境变量设置：

### 步骤：

1. **在同一页面，找到 "Environment variables" 部分**
   - 可能在页面下方
   - 或点击左侧菜单的 **"Environment variables"**

2. **添加环境变量**
   - 点击 **"Add variable"**
   - Key: `NPM_FLAGS`
   - Value: `--legacy-peer-deps`
   - 点击 **"Add variable"**

---

## 🎯 方法 3：使用 .npmrc 文件（推荐）

最简单的方法：我已经创建了 `.npmrc` 文件，只需要推送到 GitHub。

### 如果推送失败，手动创建：

1. **在项目根目录创建 `.npmrc` 文件**
2. **内容：**
   ```
   legacy-peer-deps=true
   ```
3. **提交并推送**

---

## 🎯 方法 4：检查是否有 "Dependencies" 或 "Install" 部分

在 Build settings 页面，查找：
- **"Dependencies"** 部分
- **"Install"** 部分
- **"Pre-install"** 或 **"Post-install"** 部分

---

## 📸 你在页面上看到了什么？

请告诉我：
1. 页面底部有没有 **"Show advanced"** 按钮？
2. 有没有看到 **"Environment variables"** 部分？
3. 页面右侧有没有其他选项或标签？

---

## ✅ 临时解决方案

如果实在找不到 Install command，我们可以：

1. **更新 framer-motion 版本**（支持 React 19）
2. **或者使用 .npmrc 文件**（我已经创建了，需要推送）

告诉我你看到了什么，我会提供更具体的指导！


