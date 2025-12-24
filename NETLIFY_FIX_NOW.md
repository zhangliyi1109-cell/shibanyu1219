# 🔧 立即修复 Netlify 错误

## 🐛 错误原因

错误信息：
```
Base directory does not exist: /opt/build/repo/npm install --legacy-peer-deps
```

**问题：** `npm install --legacy-peer-deps` 被错误地填到了 **Base directory** 字段，而不是 **Install command** 字段。

---

## ✅ 立即修复步骤

### 在 Netlify 网页界面中：

1. **进入站点设置**
   - 在 Netlify 控制台，点击你的站点名称
   - 点击顶部或左侧的 **"Site settings"**（站点设置）

2. **找到构建设置**
   - 左侧菜单 → **"Build & deploy"**（构建和部署）
   - 点击 **"Build settings"**（构建设置）

3. **编辑设置**
   - 找到 **"Build settings"** 部分
   - 点击 **"Edit settings"**（编辑设置）按钮

4. **修改设置** ⚠️ **重要！**

   找到以下字段并修改：

   **Base directory（基础目录）：**
   - 应该：**留空** 或 填写 `/`
   - ❌ 错误：`npm install --legacy-peer-deps`
   - ✅ 正确：**留空**

   **Install command（安装命令）：**
   - 应该：`npm install --legacy-peer-deps`
   - ✅ 正确：`npm install --legacy-peer-deps`

   **Build command（构建命令）：**
   - 应该：`npm run build`
   - ✅ 正确：`npm run build`

   **Publish directory（发布目录）：**
   - 应该：`dist`
   - ✅ 正确：`dist`

5. **保存设置**
   - 点击 **"Save"**（保存）按钮

6. **重新部署**
   - 点击 **"Trigger deploy"**（触发部署）
   - 选择 **"Deploy site"**（部署站点）
   - 或等待自动重新部署（如果已连接 GitHub）

---

## 📝 正确的设置应该是：

```
Base directory: [留空]
Install command: npm install --legacy-peer-deps
Build command: npm run build
Publish directory: dist
```

---

## 🎯 快速检查清单

- [ ] Base directory 是**空的**（不是 `npm install --legacy-peer-deps`）
- [ ] Install command 是 `npm install --legacy-peer-deps`
- [ ] Build command 是 `npm run build`
- [ ] Publish directory 是 `dist`
- [ ] 已保存设置
- [ ] 已触发重新部署

---

## 🔍 如何找到这些设置？

### 路径：
```
Netlify 控制台
  → 点击你的站点
  → Site settings（站点设置）
  → Build & deploy（构建和部署）
  → Build settings（构建设置）
  → Edit settings（编辑设置）
```

---

## ✅ 修复后

修复并重新部署后，你应该看到：
- ✅ Initializing 阶段成功
- ✅ Building 阶段成功
- ✅ 网站可以访问

---

## 🆘 如果还是失败

告诉我：
1. 你修改了哪些设置？
2. 新的错误信息是什么？
3. 我会继续帮你解决！

