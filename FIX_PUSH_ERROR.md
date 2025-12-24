# 🔧 修复 Git 推送错误

## 🐛 错误分析

你遇到的错误：
```
error: RPC failed; curl 55 Send failure: Connection was reset
fatal: the remote end hung up unexpectedly
```

**原因：**
- 网络连接中断
- 文件太大导致超时
- GitHub 服务器临时问题

---

## ✅ 解决方案

### 方法 1：增加缓冲区大小（推荐）

在终端执行：

```bash
git config --global http.postBuffer 524288000
```

然后重新推送：

```bash
git push -u origin main
```

### 方法 2：使用 SSH 代替 HTTPS

如果 HTTPS 一直有问题，可以改用 SSH：

1. **生成 SSH 密钥**（如果还没有）：
```bash
ssh-keygen -t ed25519 -C "zhangliyi1109@gmail.com"
```

2. **添加 SSH 密钥到 GitHub**：
   - 复制公钥：`cat ~/.ssh/id_ed25519.pub`
   - GitHub → Settings → SSH and GPG keys → New SSH key
   - 粘贴公钥并保存

3. **更改远程仓库 URL**：
```bash
git remote set-url origin git@github.com:your-username/shibanyu.git
```

4. **重新推送**：
```bash
git push -u origin main
```

### 方法 3：分批推送（如果文件太大）

如果项目文件很大，可以尝试：

```bash
# 先推送少量提交
git push -u origin main --verbose

# 如果还是失败，尝试增加超时时间
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999
```

### 方法 4：检查网络并重试

1. 检查网络连接
2. 等待几分钟后重试
3. 使用 VPN（如果在某些地区）

---

## 🚀 快速修复步骤

### 步骤 1：增加缓冲区

```bash
git config --global http.postBuffer 524288000
```

### 步骤 2：重新推送

```bash
git push -u origin main
```

### 步骤 3：如果还是失败

检查是否已经推送成功：

```bash
git ls-remote origin
```

如果能看到你的提交，说明已经成功了！

---

## 🔍 验证是否成功

访问你的 GitHub 仓库：
```
https://github.com/your-username/shibanyu
```

如果能看到所有文件，说明推送成功了！

---

## 💡 提示

- 网络不稳定时，可以多次尝试
- 如果文件很大，考虑使用 SSH
- 检查 `.gitignore` 确保没有上传大文件（如 node_modules）

---

## 🆘 如果还是不行

告诉我具体的错误信息，我会提供更针对性的解决方案！

