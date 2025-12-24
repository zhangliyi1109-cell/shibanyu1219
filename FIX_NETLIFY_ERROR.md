# 🔧 修复 Netlify 部署错误

## 🐛 错误分析

你遇到的错误：
```
Base directory does not exist: /opt/build/repo/npm install --legacy-peer-deps
```

**原因：**
- `npm install --legacy-peer-deps` 被错误地设置为了 base directory
- 应该在 "Install command" 字段设置，而不是 "Base directory"

---

## ✅ 解决方案

### 方法 1：在 Netlify 网页界面中修改（推荐）

1. **进入站点设置**
   - 在 Netlify 控制台，点击你的站点
   - 点击 **"Site settings"**

2. **找到构建设置**
   - 左侧菜单 → **"Build & deploy"**
   - 点击 **"Build settings"**

3. **检查设置**
   - **Base directory**: 应该**留空**或设置为 `/`（项目根目录）
   - **Install command**: 应该设置为 `npm install --legacy-peer-deps`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

4. **修改设置**
   - 点击 **"Edit settings"**
   - 确保：
     - **Base directory** = **留空**（不要填 `npm install --legacy-peer-deps`）
     - **Install command** = `npm install --legacy-peer-deps`
   - 点击 **"Save"**

5. **重新部署**
   - 点击 **"Trigger deploy"** → **"Deploy site"**

---

### 方法 2：通过 netlify.toml 文件配置

我已经修复了 `netlify.toml` 文件，现在配置是正确的。

**推送更新到 GitHub：**

```bash
git add netlify.toml
git commit -m "Fix netlify.toml configuration"
git push
```

Netlify 会自动检测到更改并重新部署。

---

## 📝 正确的 Netlify 设置

### 在 Netlify 网页界面中：

```
Base directory: [留空或 /]
Install command: [npm install --legacy-peer-deps]
Build command: [npm run build]
Publish directory: [dist]
```

### 在 netlify.toml 文件中：

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**注意：** `netlify.toml` 不支持直接设置 Install command，需要在网页界面中设置。

---

## 🚀 快速修复步骤

### 步骤 1：检查 Netlify 设置

1. 进入站点 → Site settings → Build & deploy → Build settings
2. 点击 "Edit settings"
3. 检查：
   - **Base directory** = 留空
   - **Install command** = `npm install --legacy-peer-deps`
4. 保存

### 步骤 2：重新部署

点击 "Trigger deploy" → "Deploy site"

---

## ✅ 验证

部署成功后，你应该看到：
- ✅ Build 阶段成功
- ✅ 网站可以访问
- ✅ 没有错误信息

---

## 🆘 如果还是失败

告诉我具体的错误信息，我会继续帮你解决！

