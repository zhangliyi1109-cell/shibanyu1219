@echo off
echo ========================================
echo 上传项目到 GitHub
echo ========================================
echo.

echo [1/5] 检查 Git 状态...
git status
echo.

echo [2/5] 添加所有文件...
git add .
echo.

echo [3/5] 提交更改...
git commit -m "Initial commit: 石斑鱼项目 - 在压力深海，学会呼吸"
echo.

echo [4/5] 请按照以下步骤操作：
echo.
echo 1. 访问 https://github.com/new
echo 2. 创建新仓库（不要初始化）
echo 3. 复制仓库 URL
echo 4. 运行以下命令：
echo    git remote add origin YOUR_REPO_URL
echo    git branch -M main
echo    git push -u origin main
echo.
echo ========================================
echo 或者使用 GitHub Desktop / VS Code 的图形界面
echo ========================================
pause

