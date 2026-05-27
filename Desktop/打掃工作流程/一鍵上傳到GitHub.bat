@echo off
chcp 65001 > nul
title 🧹 打掃工作流程製作器 - 一鍵上傳至 GitHub
echo ====================================================================
echo   🧹 打掃工作流程製作器 - 一鍵上傳至 GitHub 腳本
echo ====================================================================
echo.

:: 檢查是否已經初始化過 git
if not exist .git (
    echo [系統提示] 正在初始化 Git 本地倉庫...
    git init
    git branch -M main
) else (
    echo [系統提示] Git 倉庫已存在，準備進行檔案更新...
)

:: 建立 .gitignore
echo *.tmp > .gitignore
echo *.log >> .gitignore
echo .DS_Store >> .gitignore
echo thumbs.db >> .gitignore

:: 暫存並提交所有檔案
echo [系統提示] 正在將檔案加入提交列表...
git add .
git commit -m "feat: init/update cleaning workflow creator"

echo.
echo ====================================================================
echo   * 請先至您個人的 GitHub (https://github.com) 
echo     點擊「New」建立一個名為「cleaning-workflow」的公開專案倉庫。
echo   * 建立後，請複製您的專案 URL 網址。
echo     (例如: https://github.com/您的帳號名稱/cleaning-workflow.git)
echo ====================================================================
echo.

set /p repo_url="* 請在此貼上您的 GitHub 專案 URL，然後按 Enter： "

if "%repo_url%"=="" (
    echo [錯誤] 貼上的網址為空！請重新執行此腳本。
    pause
    exit
)

:: 設定 remote
git remote remove origin >nul 2>nul
git remote add origin %repo_url%

echo.
echo [系統提示] 正在將檔案推送至 GitHub...
echo [系統提示] 這時瀏覽器可能會跳出 GitHub 登入驗證，請依提示完成驗證！
echo.
git push -u origin main --force

echo.
echo ====================================================================
echo   🎉 上傳成功！您的打掃流程網頁已成功部署至您的 GitHub。
echo.
echo   * 如何啟動免費的線上「GitHub Pages」功能讓大家線上遊玩？
echo   1. 請打開您的瀏覽器，進到該 GitHub 專案頁面。
echo   2. 點選右上角的「⚙️ Settings」(設定)。
echo   3. 點選左側選單的「Pages」標籤。
echo   4. 在「Build and deployment -> Branch」下，將分支選為「main」，點選「Save」。
echo   5. 稍等約一分鐘重新整理，網頁最上方就會出現您的專案線上專屬網址！
echo ====================================================================
echo.
pause
