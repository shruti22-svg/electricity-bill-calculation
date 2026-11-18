@echo off
title Run Electricity Bill App in Docker
cd /d "%~dp0"
echo ================================================================
echo   Building and Running Docker Container
echo   Application Port: 5000 (Host: http://localhost:5000)
echo ================================================================
echo.

docker context use desktop-linux 2>nul
echo [*] Building Docker image...
docker build -t electricity-bill-calculation:latest .

echo [*] Removing any existing container...
docker rm -f electricity-bill-app 2>nul

echo [*] Running container on port 5000...
docker run -d --name electricity-bill-app -p 5000:5000 electricity-bill-calculation:latest

echo [*] Waiting for application to initialize...
timeout /t 3 /nobreak >nul

docker ps --filter "name=electricity-bill-app"
echo.
echo ================================================================
echo [SUCCESS] App is running! Opening browser now...
echo URL: http://localhost:5000
echo ================================================================

start http://localhost:5000
pause
