@echo off
echo ========================================
echo Starting WaveRadar Frontend Server
echo ========================================
echo.
echo Starting web server on http://127.0.0.1:8081
echo.
echo Press Ctrl+C to stop the server
echo.

python -m http.server 8081

pause



