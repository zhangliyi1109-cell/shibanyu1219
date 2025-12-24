# 快速配置手机号登录（解决 "Unsupported phone provider" 错误）

## ⚡ 5分钟快速配置

### 步骤 1：启用 Phone 认证（1分钟）

1. 打开 [Supabase 控制台](https://app.supabase.com)
2. 选择你的项目
3. 点击左侧菜单 **Authentication** → **Providers**
4. 找到 **Phone** 这一行
5. **打开开关**（Toggle 按钮）

### 步骤 2：配置 Twilio（3分钟）

#### 2.1 注册 Twilio（如果还没有）

1. 访问 https://www.twilio.com/try-twilio
2. 点击 "Sign up"
3. 填写信息并验证邮箱
4. 验证手机号（会收到验证码）

#### 2.2 获取凭证

登录 Twilio 后：

1. 在 Dashboard 首页可以看到：
   - **Account SID**（类似：ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx）
   - **Auth Token**（点击眼睛图标显示，类似：your_auth_token_here）

2. 复制这两个值

#### 2.3 在 Supabase 中配置

1. 回到 Supabase 控制台
2. 进入 **Settings** → **Auth** → **SMS**
3. 在 **SMS Provider** 下拉菜单中选择 **Twilio**
4. 填入：
   - **Twilio Account SID**: 粘贴 Account SID
   - **Twilio Auth Token**: 粘贴 Auth Token
5. 点击 **Save**

### 步骤 3：测试（1分钟）

1. 刷新你的应用页面
2. 输入手机号（例如：15190329679）
3. 点击"发送验证码"
4. 应该能收到验证码短信

## ✅ 完成！

现在手机号登录应该可以正常工作了。

## 🆘 如果还有问题

### 检查清单

- [ ] Phone 提供商开关已打开
- [ ] Twilio Account SID 已填入（没有多余空格）
- [ ] Twilio Auth Token 已填入（没有多余空格）
- [ ] 已点击 Save 保存
- [ ] Twilio 账号已激活（验证了邮箱和手机）

### 常见错误

**"Invalid credentials"**
- 检查 Twilio Account SID 和 Auth Token 是否正确
- 确保没有多余的空格

**"Account not active"**
- Twilio 账号需要验证邮箱和手机号
- 检查 Twilio 邮箱中的验证链接

**仍然显示 "Unsupported phone provider"**
- 确保 Phone 提供商开关已打开
- 刷新 Supabase 页面重新检查
- 清除浏览器缓存后重试

## 💰 费用说明

- **Twilio 免费试用**：通常有 $15-20 的免费额度
- **中国短信价格**：约 $0.01-0.05/条
- **免费额度**：足够开发测试使用

## 📞 需要帮助？

查看详细文档：
- `PHONE_AUTH_FIX.md` - 详细错误修复指南
- `SMS_AUTH_SETUP.md` - 完整配置说明

