# WaveRadar API Setup Guide

## Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

## Installation

1. **Navigate to the API directory:**
   ```bash
   cd waveradarapi
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On Mac/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Adding Image Assets

Before running the server, you need to add the required images to the `results/` folder:

1. **Feature Importance Chart:**
   - Place your analytics chart as `waveradarapi/results/feature_importance.png`
   - This image will be displayed on the Analytics page

2. **Dashboard Map:**
   - Place your flood analysis map as `waveradarapi/results/placeholder_map.png`
   - This image will be displayed on the Dashboard page
   - Recommended format: PNG (for transparency support)
   - Crop to show only the interactive flood map area

## Running the Server

1. **Start the API server:**
   ```bash
   python main.py
   ```

2. **Verify the server is running:**
   - Open your browser and visit: `http://127.0.0.1:8000`
   - You should see the API information JSON
   - Test endpoints:
     - `http://127.0.0.1:8000/api/dashboard/keystats`
     - `http://127.0.0.1:8000/api/reports/aiinsights`
     - `http://127.0.0.1:8000/api/analytics/featureimportance`
     - `http://127.0.0.1:8000/api/maps/analysis_image/assam`

## API Endpoints

- `GET /` - Health check and API information
- `GET /api/dashboard/keystats` - Dashboard statistics (flooded area, population, etc.)
- `GET /api/reports/aiinsights` - AI-generated insights for reports
- `GET /api/maps/analysis_image/{region}` - Flood analysis map image
- `GET /api/analytics/featureimportance` - Feature importance chart

## Troubleshooting

### Port Already in Use
If port 8000 is already in use:
- Change the port in `main.py`: `uvicorn.run(app, host="127.0.0.1", port=8001)`
- Update `script.js` with the new port: `const API_BASE_URL = "http://127.0.0.1:8001"`

### Images Not Loading
- Verify images exist in `waveradarapi/results/` folder
- Check file names are exact (case-sensitive): `feature_importance.png` and `placeholder_map.png`
- Restart the server after adding images

### CORS Errors
- The API is configured to allow all origins (`allow_origins=["*"]`)
- For production, update `main.py` to specify your frontend domain



