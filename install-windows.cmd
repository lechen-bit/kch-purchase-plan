@echo off
setlocal
cd /d "%~dp0"

echo.
echo ========================================
echo   KCH Purchase Plan - First-time Setup
echo ========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js is not installed.
  echo Install Node.js 18 or newer from https://nodejs.org/
  pause
  exit /b 1
)

where py >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Python 3 is not installed or the Python Launcher is unavailable.
  echo Install Python 3 from https://www.python.org/downloads/
  echo During installation, select "Add Python to PATH".
  pause
  exit /b 1
)

echo [1/3] Checking JavaScript files...
node --check app.js
if errorlevel 1 goto :failed
node --check server.mjs
if errorlevel 1 goto :failed

echo [2/3] Installing the Excel import component...
py -3 -m pip install -r requirements.txt
if errorlevel 1 goto :failed

echo [3/3] Preparing local data...
if not exist "data-store.json" copy /Y "data-store.example.json" "data-store.json" >nul

echo.
echo Setup completed successfully.
echo From now on, double-click start-kch-purchase-plan.cmd.
echo.
pause
exit /b 0

:failed
echo.
echo [ERROR] Setup did not complete. Please send this window screenshot to the administrator.
pause
exit /b 1
