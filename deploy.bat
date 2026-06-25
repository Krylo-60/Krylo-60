@echo off
echo ==================================================
echo    Krishiv PB README Auto-Deploy System
echo ==================================================
echo.

:: Initialize local git if not present
if not exist .git (
    echo Initializing local git repository...
    git init
    git remote add origin https://github.com/Krylo-60/Krylo-60.git
    git checkout -b main
)

echo Syncing with GitHub...
git fetch origin main
git pull origin main --rebase --strategy-option=theirs

echo Staging files...
git add -A

echo Committing...
git commit -m "feat: upgrade profile README and add custom cyber music player dashboard"

echo Pushing...
git push -u origin main

echo ==================================================
echo    SUCCESS: Profile README pushed to GitHub!
echo    Check it out: https://github.com/Krylo-60
echo ==================================================
