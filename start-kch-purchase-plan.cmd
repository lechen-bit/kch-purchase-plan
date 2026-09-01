@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Run install-windows.cmd first.
  pause
  exit /b 1
)

powershell -NoProfile -Command "try { $r=Invoke-WebRequest 'http://127.0.0.1:4173/health' -UseBasicParsing -TimeoutSec 1; if($r.StatusCode -eq 200){exit 0}else{exit 1} } catch { exit 1 }"
if errorlevel 1 (
  start "KCH Purchase Plan Server" /min cmd /c "cd /d ""%~dp0"" ^&^& node server.mjs"
  timeout /t 2 /nobreak >nul
)

start "" "http://127.0.0.1:4173/"
exit /b 0
