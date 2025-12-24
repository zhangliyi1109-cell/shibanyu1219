# iOS 构建说明

## ⚠️ 重要提示

**iOS 应用构建必须在 macOS 系统上进行！**

如果你使用的是 Windows 系统，你需要：
1. 使用 macOS 虚拟机（VMware/VirtualBox）
2. 使用云 macOS 服务（MacStadium, MacinCloud 等）
3. 使用 Mac 电脑或 Hackintosh

## 📋 快速开始

### 1. 在 macOS 上准备环境

```bash
# 安装 Xcode（从 App Store）
# 安装 Xcode Command Line Tools
xcode-select --install

# 安装 CocoaPods（如果还没有）
sudo gem install cocoapods
```

### 2. 克隆项目并安装依赖

```bash
# 进入项目目录
cd shibanyu1219

# 安装 npm 依赖
npm install

# 构建 Web 应用
npm run build
```

### 3. 添加 iOS 平台

```bash
# 添加 iOS 平台
npx cap add ios

# 同步到 iOS 项目
npx cap sync ios
```

### 4. 打开 Xcode 项目

```bash
# 方式 1: 使用 npm 脚本
npm run cap:ios

# 方式 2: 手动打开
open ios/App/App.xcworkspace
```

### 5. 在 Xcode 中配置

1. 选择项目 → General
   - Display Name: `石斑鱼`
   - Bundle Identifier: `com.shibanyu.app`
   - Version: `1.0.0`

2. Signing & Capabilities
   - 选择你的 Team
   - 启用自动签名

3. 选择目标设备（模拟器或真机）

4. 点击运行按钮（⌘R）

## 🔄 更新流程

每次修改代码后：

```bash
# 1. 构建 Web 应用
npm run build

# 2. 同步到 iOS 项目
npx cap sync ios

# 3. 在 Xcode 中重新运行
```

## 📦 构建发布版本

### 1. 在 Xcode 中

1. 选择 **Product** → **Scheme** → **Edit Scheme**
2. 选择 **Run** → **Build Configuration** → **Release**
3. 选择 **Product** → **Archive**
4. 等待构建完成

### 2. 分发应用

1. 在 Organizer 中选择 Archive
2. 点击 **Distribute App**
3. 选择分发方式：
   - **App Store Connect**（上架 App Store）
   - **Ad Hoc**（内部测试）
   - **Enterprise**（企业分发）
   - **Development**（开发测试）

## 🐛 常见问题

### 问题 1: `npx cap add ios` 失败

**解决方案:**
```bash
# 确保在项目根目录
# 确保已运行 npm run build
npm run build
npx cap add ios
```

### 问题 2: CocoaPods 安装失败

**解决方案:**
```bash
# 更新 CocoaPods
sudo gem install cocoapods

# 清理并重新安装
cd ios/App
pod deintegrate
pod install
cd ../..
```

### 问题 3: 签名错误

**解决方案:**
1. 在 Xcode 中检查 Signing & Capabilities
2. 确保选择了正确的 Team
3. 确保 Bundle ID 唯一

### 问题 4: 构建失败 - 找不到模块

**解决方案:**
```bash
# 清理构建
cd ios/App
rm -rf build
pod install
cd ../..

# 重新同步
npx cap sync ios
```

## 📱 测试清单

- [ ] 应用在模拟器中正常运行
- [ ] 应用在真机上正常运行
- [ ] 所有功能正常工作
- [ ] 安全区域适配正确（iPhone X 及以上）
- [ ] 状态栏显示正确
- [ ] 键盘弹出正常
- [ ] 网络请求正常（Supabase）
- [ ] 数据存储正常
- [ ] 动画流畅
- [ ] 无崩溃和错误

## 🚀 性能优化建议

1. **减少包体积**
   - 使用代码分割（已配置）
   - 压缩图片资源
   - 移除未使用的依赖

2. **优化启动时间**
   - 延迟加载非关键组件
   - 优化初始渲染

3. **内存管理**
   - 及时清理不需要的数据
   - 优化图片加载

## 📞 需要帮助？

如果遇到问题，请检查：
1. Xcode 版本是否最新
2. Capacitor 版本是否最新
3. 所有依赖是否正确安装
4. 网络连接是否正常

祝构建顺利！🎉

