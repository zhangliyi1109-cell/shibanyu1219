# 🔧 Netlify 手动修复依赖冲突

## ⚠️ 如果推送失败（网络问题）

如果 `git push` 一直失败，可以在 Netlify 网页界面中手动设置：

### 方法：在 Netlify 网页界面中设置 Install command

1. **进入站点设置**
   - Netlify 控制台 → 你的站点 → **"Site settings"**

2. **找到构建设置**
   - **"Build & deploy"** → **"Build settings"**

3. **编辑设置**
   - 点击 **"Edit settings"**

4. **设置 Install command**
   - 找到 **"Install command"** 字段
   - 输入：`npm install --legacy-peer-deps`
   - ⚠️ **确保 Base directory 是空的**

5. **保存并重新部署**
   - 点击 **"Save"**
   - 点击 **"Trigger deploy"** → **"Deploy site"**

---

## ✅ 正确的设置

```
Base directory: [留空]
Install command: npm install --legacy-peer-deps
Build command: npm run build
Publish directory: dist
```

---

## 🎯 为什么需要这个？

错误信息显示：
```
npm error ERESOLVE could not resolve
npm error While resolving: framer-motion@10.16.4
```

这是因为：
- `framer-motion@10.16.4` 需要 React 18
- 项目使用 React 19
- 需要 `--legacy-peer-deps` 来忽略这个冲突

---

## 📝 两种解决方案

### 方案 1：推送代码（推荐）

如果推送成功，`.npmrc` 文件会自动处理这个问题。

### 方案 2：在 Netlify 网页界面设置

如果推送失败，直接在 Netlify 设置 Install command。

两种方法都可以解决问题！

