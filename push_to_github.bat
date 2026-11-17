@echo off
title Push Electricity Bill Calculation to GitHub
cd /d "%~dp0"
echo ================================================================
echo   Automated Git & GitHub Operations (Project 12.a)
echo   Target Account: shruti22-svg (shrutibhagavatham@gmail.com)
echo ================================================================
echo.

git config user.name "shruti22-svg"
git config user.email "shrutibhagavatham@gmail.com"

git branch -M main
git add .
git commit -m "Update Electricity Bill Calculation project"
git push origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ================================================================
    echo [SUCCESS] Source code successfully pushed to GitHub!
    echo Repository: https://github.com/shruti22-svg/electricity-bill-calculation
    echo ================================================================
) else (
    echo.
    echo [ERROR] Git push failed. Please check your credentials or network.
)
pause
