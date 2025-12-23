# 部署快速参考

## 🚀 一键部署命令

### Vercel
```bash
npm run deploy:vercel
# 或
vercel --prod
```

### Netlify
```bash
npm run deploy:netlify
# 或
netlify deploy --prod
```

### Surge.sh
```bash
npm run deploy:surge
# 或
npm run build && cd dist && surge
```

### Firebase
```bash
npm run deploy:firebase
# 或
npm run build && firebase deploy --only hosting
```

### GitHub Pages
```bash
npm run deploy:github
# 或使用 GitHub Actions（推荐，已配置）
```

---

## 📦 已配置的平台

| 平台 | 配置文件 | 状态 |
|------|---------|------|
| ✅ Vercel | `vercel.json` | 已配置 |
| ✅ Netlify | `netlify.toml` | 已配置 |
| ✅ Cloudflare Pages | `cloudflare-pages.json` | 已配置 |
| ✅ GitHub Pages | `.github/workflows/deploy-pages.yml` | 已配置 |
| ✅ Firebase Hosting | `firebase.json`, `.firebaserc` | 已配置 |
| ✅ Surge.sh | `surge.json` | 已配置 |
| ✅ Railway | `railway.json` | 已配置 |
| ✅ Render | `render.yaml` | 已配置 |

---

## 🔑 环境变量（所有平台都需要）

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## 📖 详细文档

- **快速部署**：查看 `QUICK_DEPLOY.md`
- **全平台指南**：查看 `DEPLOY_ALL_PLATFORMS.md`
- **详细说明**：查看 `DEPLOY.md`

---

## ⚡ 最快部署方式

1. **Cloudflare Pages**（推荐，免费无限）
   - 访问 https://pages.cloudflare.com
   - 连接 GitHub 仓库
   - 配置环境变量
   - 完成！

2. **Vercel**（推荐，功能丰富）
   - 访问 https://vercel.com
   - 导入 GitHub 仓库
   - 配置环境变量
   - 完成！

---

## 🎯 选择建议

- **想要免费无限流量** → Cloudflare Pages
- **想要最简单** → Vercel 或 Netlify
- **想要最快速度** → Cloudflare Pages 或 Vercel
- **想要 GitHub 集成** → GitHub Pages
- **想要 Google 服务** → Firebase Hosting

