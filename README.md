WaveRadar - Full-Stack Flood Monitoring Dashboard

A full-stack proof-of-concept for a flood monitoring dashboard, featuring a dynamic JavaScript frontend and a simulated Python (FastAPI) backend API. This project was built in a 48-hour sprint.

Project Goal & The "Hollywood" Pivot

The initial goal was a 48-hour sprint to build an end-to-end data pipeline, processing raw Sentinel-1 (SAR) satellite data with Google Earth Engine and Python to train a flood-prediction model.

However, the data-processing pipeline proved to be a major bottleneck. The GEE exports were slow, the multi-gigabyte .tif files were unreliable, and the processing scripts (as seen in the commit history) consistently failed due to data corruption and pipeline complexity.

A strategic pivot was made: Don't let a broken data pipeline block application development.

This project demonstrates the "Hollywood Method" of development. The focus shifted to building a robust, full-stack application architecture. A high-fidelity simulated FastAPI backend was built to serve the exact JSON data and images the frontend design expected. This allowed for parallel development and a successful demonstration of a complete, decoupled, and functional application.

Core Features

Full-Stack Decoupled Architecture: The JavaScript frontend (sar-flood-watch-main) is 100% decoupled from the Python backend (waveradar-api). The frontend is a "dumb" client that only fetches data.

Simulated FastAPI Backend: A high-performance API built with FastAPI that serves (simulated) JSON data and placeholder images, perfectly mimicking a live production environment.

Dynamic Dashboard (index.html): Fetches and displays key metrics (Flooded Area, Population Impacted, etc.) from the /api/dashboard/key-stats endpoint on page load.

Dynamic Reports Page (reports.html): Fetches a list of JSON objects from /api/reports/ai-insights and dynamically renders the HTML for each AI-generated insight card.

Analytics Page (analytics.html): Loads and displays a (simulated) feature importance chart by fetching an image directly from the /api/analytics/feature-importance endpoint.

Technical Stack

Area

Technology

Backend

Python, FastAPI, Uvicorn

Frontend

Vanilla JavaScript (ES6+), HTML5, CSS3

Tooling

Git, GitHub, Cursor

Data (Simulated)

JSON, PNG (served via API)

Directory Structure

flood-watch-project/
├── waveradar-api/           <-- The Python (FastAPI) Backend
│   ├── main.py              <-- The main API logic
│   ├── requirements.txt     <-- Backend dependencies
│   └── results/
│       ├── feature_importance.png  <-- Placeholder chart
│       └── placeholder_map.png     <-- Placeholder map
│
└── sar-flood-watch-main/  <-- The JavaScript (Vanilla) Frontend
    ├── index.html           <-- Main dashboard page
    ├── reports.html         <-- AI reports page
    ├── analytics.html       <-- Analytics chart page
    └── script.js            <-- All frontend data-fetching logic


How to Run (Local Development)

This project requires two terminals to run the frontend and backend simultaneously.

1. Terminal 1: Run the Backend API

# Navigate to the backend folder
cd flood-watch-project/waveradar-api

# Install dependencies
pip install -r requirements.txt

# Run the API server
python main.py

# Your API is now running at [http://127.0.0.1:8000](http://127.0.0.1:8000)
# You can see the docs at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)


2. Terminal 2: Run the Frontend

# Navigate to the frontend folder
cd flood-watch-project/sar-flood-watch-main

# The easiest way to run the frontend is with a simple web server.
# If you have VS Code with the "Live Server" extension:
# Right-click on index.html and select "Open with Live Server".

# If you don't have Live Server, you can use Python's built-in server:
python -m http.server 8081

# Your frontend is now running at [http://127.0.0.1:8081](http://127.0.0.1:8081)


Now, open http://127.0.0.1:8081 in your browser. The JavaScript in script.js will automatically fetch data from your API (running on port 8000) and populate the website.

API Endpoints (Simulated)

The waveradar-api provides the following endpoints:

Method

Path

Description

GET

/api/dashboard/key-stats

Returns JSON object with 4 key metrics for the main dashboard.

GET

/api/reports/ai-insights

Returns a JSON array of AI-generated insights for the reports page.

GET

/api/analytics/feature-importance

Serves the feature_importance.png image file.

GET

/api/maps/analysis_image/{region}

Serves the placeholder_map.png image file for any region.
