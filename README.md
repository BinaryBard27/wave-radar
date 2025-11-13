🌊 WaveRadar — Flood Monitoring & Prediction Dashboard

Real-time flood prediction powered by satellite data, AI, and a full-stack architecture.
Built in a 48-hour sprint using FastAPI, Vanilla JS, and Sentinel-1 SAR (simulated) data.


Example visualization generated from simulated Sentinel-1 satellite data.

🚀 Overview

WaveRadar is a full-stack prototype for flood detection and prediction using satellite imagery.
It combines a Python FastAPI backend and a dynamic JavaScript frontend to simulate real-time flood analytics — including affected area, population impact, and feature-based predictions.

⚙️ Key Features

🛰️ Satellite-Driven Insights — Built to process Sentinel-1 SAR data (simulated for prototype).

🧠 AI-Powered Reports — Dynamically generated flood risk insights.

📊 Interactive Dashboard — Displays key metrics and analytics charts in real time.

🔗 Decoupled Architecture — Frontend (Vanilla JS) fully independent from backend (FastAPI).

🧩 Tech Stack

Frontend: HTML5 • CSS3 • Vanilla JS (ES6+)
Backend: Python • FastAPI • Uvicorn
Data: Sentinel-1 SAR (Simulated JSON + PNG)
Tools: Git • GitHub • Cursor

🧠 API Endpoints
Endpoint	Description
/api/dashboard/key-stats	Returns key flood metrics
/api/reports/ai-insights	Returns AI-generated insights
/api/analytics/feature-importance	Serves chart image
/api/maps/analysis_image/{region}	Serves flood map by region
💻 Run Locally

Backend

cd waveradar-api
pip install -r requirements.txt
python main.py
# Runs on http://127.0.0.1:8000


Frontend

cd sar-flood-watch-main
python -m http.server 8081
# Open http://127.0.0.1:8081

🌎 Vision

WaveRadar demonstrates how satellite imagery + AI + web systems can be used to predict and visualize floods — helping cities prepare for extreme weather with actionable insights.
