# 手机号登录错误修复指南

## ❌ 错误信息

**"Unsupported phone provider"** 或 **"不支持的手机提供商"**

## 🔍 问题原因

这个错误表示 Supabase 的短信服务没有配置。需要：

1. **启用 Phone 认证提供商**
2. **配置短信服务**（Twilio、MessageBird 等）

## ✅ 解决步骤

### 步骤 1：启用 Phone 认证

1. 登录 [Supabase 控制台](https://app.supabase.com)
2. 选择你的项目
3. 进入 **Authentication** → **Providers**
4. 找到 **Phone** 提供商
5. **打开开关**启用 Phone 认证

### 步骤 2：配置短信服务

#### 选项 A：使用 Twilio（推荐生产环境）

1. **注册 Twilio 账号**
   - 访问 [Twilio](https://www.twilio.com/)
   - 注册账号（需要验证手机号）
   - 获取免费试用额度

2. **获取 Twilio 凭证**
   - Account SID
   - Auth Token
   - Phone Number（可选，用于发送短信）

3. **在 Supabase 中配置**
   - 进入 **Settings** → **Auth** → **SMS**
   - 选择 **Twilio**
   - 填入：
     - Account SID
     - Auth Token
   - 保存

#### 选项 B：使用 Supabase 默认服务（仅开发/测试）

1. 在 **Settings** → **Auth** → **SMS** 中
2. 选择 **Default** 或 **Test**
3. 注意：有发送限制，仅适合测试

#### 选项 C：使用其他服务商

Supabase 还支持：
- MessageBird
- Vonage (Nexmo)
- Textlocal
- 自定义 Webhook

### 步骤 3：测试

1. 刷新应用页面
2. 输入手机号
3. 点击"发送验证码"
4. 应该能收到验证码短信

## 🚨 如果仍然报错

### 检查清单

- [ ] Phone 提供商已启用
- [ ] 短信服务已配置（Twilio 或其他）
- [ ] Twilio 凭证正确（如果使用 Twilio）
- [ ] Twilio 账号已激活（如果使用 Twilio）
- [ ] 网络连接正常

### 常见问题

**Q: Twilio 需要付费吗？**
A: Twilio 有免费试用额度，之后按条计费（中国约 $0.01-0.05/条）

**Q: 可以使用其他短信服务吗？**
A: 可以，Supabase 支持多种服务商，或使用自定义 Webhook

**Q: 开发环境可以不配置吗？**
A: 可以暂时使用邮箱登录，或配置 Twilio 免费额度

## 🔄 临时解决方案

如果暂时无法配置短信服务，可以：

### 方案 1：使用邮箱登录（临时）

修改登录方式，暂时使用邮箱+密码登录。

### 方案 2：使用其他 OAuth

使用 Supabase 原生支持的 OAuth：
- Google
- GitHub
- Apple

### 方案 3：本地测试模式

在 Supabase 中启用测试模式（仅开发环境）。

## 📝 配置完成后

1. 刷新应用
2. 重新测试手机号登录
3. 应该能正常发送和接收验证码

## 🎯 快速配置（Twilio）

1. 注册 Twilio：https://www.twilio.com/try-twilio
2. 获取 Account SID 和 Auth Token
3. 在 Supabase 中配置
4. 测试发送短信

**预计时间：** 10-15 分钟

## 💡 提示

- Twilio 免费试用额度通常足够开发测试
- 生产环境建议使用 Twilio 或其他专业服务
- 可以设置短信发送频率限制防止滥用

