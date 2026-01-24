@echo off
echo ===================================
echo Zylo Deployment Helper
echo ===================================
echo.
echo This script will add all changes, commit, and push to main.
set /p commit_msg="Enter commit message: "

if "%commit_msg%"=="" (
    echo Commit message cannot be empty.
    goto end
)

git add ..
git commit -m "%commit_msg%"
git push origin main

echo.
echo Done!
:end
pause
