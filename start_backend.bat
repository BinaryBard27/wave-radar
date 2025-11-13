@echo off
echo ========================================
echo Starting WaveRadar Backend API Server
echo ========================================
echo.

cd waveradarapi

echo Checking for virtual environment...
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing/updating dependencies...
pip install -r requirements.txt --quiet

echo.
echo ========================================
echo Starting API server on http://127.0.0.1:8000
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

python main.py

pause



