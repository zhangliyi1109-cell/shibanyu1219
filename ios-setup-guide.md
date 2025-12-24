# iOS 应用上架指南

## 📱 准备工作

### 1. 系统要求
- macOS（必须，用于构建 iOS 应用）
- Xcode 14.0 或更高版本
- Apple Developer 账号（$99/年）

### 2. 安装依赖

```bash
# 确保已安装所有依赖
npm install

# 构建项目
npm run build

# 添加 iOS 平台（需要在 macOS 上执行）
npx cap add ios

# 同步到 iOS 项目
npm run cap:sync
```

## 🛠️ iOS 项目配置

### 1. 打开 Xcode 项目

```bash
npm run cap:ios
```

或者手动打开：
```bash
open ios/App/App.xcworkspace
```

### 2. 配置项目信息

在 Xcode 中：

1. **选择项目** → **General**
   - Display Name: `石斑鱼`
   - Bundle Identifier: `com.shibanyu.app`
   - Version: `1.0.0`
   - Build: `1`

2. **Signing & Capabilities**
   - 选择你的 Team（Apple Developer 账号）
   - 启用 "Automatically manage signing"

### 3. 配置 Info.plist

在 `ios/App/App/Info.plist` 中添加：

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <false/>
    <key>NSExceptionDomains</key>
    <dict>
        <key>your-supabase-url.supabase.co</key>
        <dict>
            <key>NSIncludesSubdomains</key>
            <true/>
            <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
            <false/>
            <key>NSTemporaryExceptionRequiresForwardSecrecy</key>
            <false/>
        </dict>
    </dict>
</dict>

<key>UIViewControllerBasedStatusBarAppearance</key>
<false/>

<key>UIStatusBarStyle</key>
<string>UIStatusBarStyleLightContent</string>

<key>UISupportedInterfaceOrientations</key>
<array>
    <string>UIInterfaceOrientationPortrait</string>
    <string>UIInterfaceOrientationPortraitUpsideDown</string>
</array>

<key>UISupportedInterfaceOrientations~ipad</key>
<array>
    <string>UIInterfaceOrientationPortrait</string>
    <string>UIInterfaceOrientationPortraitUpsideDown</string>
    <string>UIInterfaceOrientationLandscapeLeft</string>
    <string>UIInterfaceOrientationLandscapeRight</string>
</array>
```

### 4. 配置图标和启动页

#### 应用图标
- 准备 1024x1024 的图标
- 使用 [App Icon Generator](https://www.appicon.co/) 生成所有尺寸
- 将图标拖放到 Xcode 的 AppIcon 资源中

#### 启动页
- 在 `ios/App/App/Assets.xcassets/LaunchImage.imageset/` 中添加启动图片
- 或使用 LaunchScreen.storyboard（推荐）

### 5. 配置权限

在 `Info.plist` 中添加权限说明（如果需要）：

```xml
<key>NSUserTrackingUsageDescription</key>
<string>我们需要您的同意以提供个性化体验</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>需要访问相册以保存图片</string>
```

## 📦 构建和测试

### 1. 在模拟器中测试

```bash
# 在 Xcode 中选择模拟器
# 点击运行按钮（⌘R）
```

### 2. 在真机上测试

1. 连接 iPhone/iPad
2. 在 Xcode 中选择设备
3. 点击运行
4. 首次运行需要在设备上信任开发者证书

### 3. 构建 Archive

1. 在 Xcode 中选择 **Product** → **Archive**
2. 等待构建完成
3. 在 Organizer 中查看 Archive

## 🚀 提交到 App Store

### 1. 准备 App Store Connect

1. 登录 [App Store Connect](https://appstoreconnect.apple.com/)
2. 创建新应用：
   - 名称: `石斑鱼`
   - 主要语言: `简体中文`
   - Bundle ID: `com.shibanyu.app`
   - SKU: `shibanyu-001`

### 2. 填写应用信息

#### 基本信息
- **名称**: 石斑鱼
- **副标题**: 在压力深海，学会呼吸
- **类别**: 生产力 / 生活方式
- **内容版权**: 你的版权信息
- **年龄分级**: 4+

#### 描述
```
石斑鱼是一款帮助你在工作压力中保持平衡的应用。

主要功能：
- 📊 实时计算工作时薪，让你了解时间的价值
- 🎯 每日目标管理，提升工作效率
- 💬 AI 智能对话，提供情绪支持
- 🐟 深海邻居卡片系统，记录工作伙伴

在压力的深海中，学会呼吸，游向自由。
```

#### 关键词
```
工作,压力,时间管理,效率,生产力,心理健康,平衡,生活
```

#### 截图要求
- iPhone 6.7" (iPhone 14 Pro Max): 1290 x 2796
- iPhone 6.5" (iPhone 11 Pro Max): 1242 x 2688
- iPhone 5.5" (iPhone 8 Plus): 1242 x 2208
- iPad Pro 12.9": 2048 x 2732

至少需要 3 组截图（不同尺寸）

### 3. 上传构建版本

1. 在 Xcode 中：
   - **Product** → **Archive**
   - 点击 **Distribute App**
   - 选择 **App Store Connect**
   - 选择 **Upload**
   - 等待上传完成

2. 在 App Store Connect 中：
   - 选择你的应用
   - 进入 **TestFlight** 或 **App Store** 标签
   - 选择构建版本

### 4. 提交审核

1. 填写所有必需信息
2. 选择构建版本
3. 回答审核问题
4. 点击 **提交审核**

## ✅ 审核清单

- [ ] 应用图标已设置（1024x1024）
- [ ] 启动页已配置
- [ ] 所有功能在真机上测试通过
- [ ] 隐私政策链接（如需要）
- [ ] 应用描述和截图已准备
- [ ] 关键词已优化
- [ ] 年龄分级已设置
- [ ] 联系信息已填写
- [ ] 支持 URL 已设置
- [ ] 构建版本已上传

## 🔧 常见问题

### Q: 构建失败怎么办？
A: 检查：
- Xcode 版本是否最新
- 证书和配置文件是否正确
- Bundle ID 是否唯一

### Q: 审核被拒怎么办？
A: 常见原因：
- 缺少隐私政策
- 功能描述不清晰
- 截图不符合要求
- 需要登录但没有测试账号

### Q: 如何更新应用？
A: 
1. 更新版本号
2. 重新构建 Archive
3. 上传新版本
4. 在 App Store Connect 中提交更新

## 📝 版本更新流程

1. 更新 `package.json` 中的版本号
2. 更新 `capacitor.config.ts` 中的版本
3. 更新 Xcode 项目中的版本号
4. 构建并测试
5. 提交审核

## 🎉 上架后

- 监控应用表现
- 收集用户反馈
- 定期更新功能
- 优化性能和体验

祝你的应用上架顺利！🎊

