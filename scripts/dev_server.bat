@echo off
echo Starting Zylo Local Development Server...
echo Opening http://localhost:8000
start http://localhost:8000
python -m http.server --directory ../docs 8000
pause
