# 微信登录配置指南

## ✅ 已实现的功能

1. **微信登录按钮**
   - 在登录界面添加了微信登录按钮
   - 使用微信品牌绿色 (#07C160)
   - 点击后跳转到微信授权页面

2. **OAuth 集成**
   - 使用 Supabase OAuth 功能
   - 支持微信授权流程
   - 自动处理回调

## 🔧 Supabase 配置

### 方法 1：使用 Supabase 内置微信支持（如果可用）

Supabase 可能在某些版本中支持微信，但通常需要自定义配置。

### 方法 2：配置自定义 OAuth 提供商（推荐）

由于 Supabase 可能不直接支持微信，需要配置自定义 OAuth：

#### 步骤 1：注册微信开放平台

1. 访问 [微信开放平台](https://open.weixin.qq.com/)
2. 注册开发者账号（需要企业资质）
3. 创建网站应用或移动应用
4. 获取 **AppID** 和 **AppSecret**

#### 步骤 2：配置回调 URL

在微信开放平台中配置：
- 授权回调域名：`your-domain.com`
- 回调 URL：`https://your-project.supabase.co/auth/v1/callback`

#### 步骤 3：在 Supabase 中配置

由于 Supabase 可能不直接支持微信，有几种方案：

**方案 A：使用自定义 OAuth（需要 Supabase Enterprise）**

1. 进入 Supabase 控制台
2. **Settings** → **Auth** → **Providers**
3. 添加自定义 OAuth 提供商
4. 配置：
   - Provider: Custom
   - Authorization URL: `https://open.weixin.qq.com/connect/qrconnect`
   - Token URL: `https://api.weixin.qq.com/sns/oauth2/access_token`
   - User Info URL: `https://api.weixin.qq.com/sns/userinfo`
   - Client ID: 你的微信 AppID
   - Client Secret: 你的微信 AppSecret

**方案 B：使用第三方服务（推荐）**

使用 Authing、Auth0 等第三方认证服务作为中间层：

1. 在 Authing 中配置微信登录
2. 在 Supabase 中配置 Authing 作为 OAuth 提供商
3. 用户通过 Authing 使用微信登录

**方案 C：自定义实现（高级）**

1. 创建后端 API 处理微信 OAuth
2. 获取微信用户信息后，使用 Supabase Admin API 创建用户
3. 返回自定义 token

## 📝 微信开放平台申请

### 所需材料

1. **企业资质**（网站应用需要）
   - 营业执照
   - 组织机构代码证
   - 法人身份证

2. **应用信息**
   - 应用名称
   - 应用简介
   - 应用图标
   - 网站域名

### 审核时间

- 通常需要 1-7 个工作日
- 审核通过后才能使用

## 🔄 替代方案

如果无法申请微信开放平台，可以考虑：

### 方案 1：使用微信小程序

1. 注册微信小程序（个人也可以）
2. 在小程序中实现登录
3. 通过小程序获取用户信息
4. 同步到 Supabase

### 方案 2：使用手机号绑定

1. 用户使用手机号登录
2. 在设置中绑定微信
3. 后续可以使用微信快速登录

### 方案 3：使用其他社交登录

Supabase 原生支持：
- Google
- GitHub
- Apple
- Facebook
- Twitter

可以先实现这些，微信作为后续功能。

## 🚀 快速测试（开发环境）

如果暂时无法配置微信，可以：

1. **注释微信登录按钮**（临时）
2. **使用其他 OAuth 提供商测试**
3. **等待微信审核通过后再启用**

## 📚 相关文档

- [微信开放平台文档](https://developers.weixin.qq.com/doc/)
- [Supabase OAuth 文档](https://supabase.com/docs/guides/auth/social-login)
- [Supabase 自定义 OAuth](https://supabase.com/docs/guides/auth/social-login/auth-custom-oauth)

## ⚠️ 重要提示

1. **企业资质要求**
   - 网站应用需要企业资质
   - 个人开发者可以使用小程序

2. **审核要求**
   - 必须通过微信审核
   - 应用需要符合微信规范

3. **费用**
   - 微信开放平台注册免费
   - 但需要企业资质

4. **回调 URL**
   - 必须配置正确的回调域名
   - 否则无法完成授权

## 🎯 当前状态

- ✅ 微信登录按钮已添加
- ✅ OAuth 流程已实现
- ⚠️ 需要在 Supabase 中配置微信 OAuth 提供商
- ⚠️ 需要微信开放平台账号和审核

## 🔧 临时方案

如果暂时无法使用微信登录，可以：

1. 隐藏微信登录按钮（修改 `components/Login.tsx`）
2. 或显示"微信登录（即将推出）"提示
3. 先使用手机号登录功能

等微信审核通过后再启用。

