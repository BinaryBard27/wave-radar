# WaveRadar Full-Stack Setup Guide

## Project Structure

```
SAR/
├── waveradarapi/              # Backend API
│   ├── main.py                # FastAPI server
│   ├── requirements.txt       # Python dependencies
│   ├── results/               # Image assets folder
│   │   ├── feature_importance.png
│   │   └── placeholder_map.png
│   └── README.md              # API setup instructions
│
├── index.html                 # Dashboard page
├── reports.html               # AI Insights page
├── analytics.html             # Analytics page
├── script.js                  # Frontend JavaScript
└── SETUP.md                   # This file
```

## Quick Start

### Step 1: Setup Backend API

1. **Navigate to API directory:**
   ```bash
   cd waveradarapi
   ```

2. **Create and activate virtual environment:**
   ```bash
   python -m venv venv
   # Windows:
   venv\Scripts\activate
   # Mac/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Add image assets:**
   - Copy your analytics chart to `waveradarapi/results/feature_importance.png`
   - Copy your flood map to `waveradarapi/results/placeholder_map.png`

5. **Start the API server:**
   ```bash
   python main.py
   ```
   - Server will run on `http://127.0.0.1:8000`
   - Verify by visiting `http://127.0.0.1:8000` in your browser

### Step 2: Setup Frontend

1. **Open a new terminal window** (keep API server running)

2. **Navigate to project root:**
   ```bash
   cd SAR
   ```

3. **Start a local web server:**
   - **Option 1: Python HTTP Server**
     ```bash
     python -m http.server 8081
     ```
   - **Option 2: VS Code Live Server**
     - Right-click `index.html` → "Open with Live Server"
   - **Option 3: Node.js http-server**
     ```bash
     npm install -g http-server
     http-server -p 8081
     ```

4. **Open in browser:**
   - Navigate to `http://127.0.0.1:8081`
   - You should see the WaveRadar dashboard

## Testing

### Backend Tests
- ✅ Visit `http://127.0.0.1:8000` - Should show API info
- ✅ Visit `http://127.0.0.1:8000/api/dashboard/keystats` - Should return JSON with stats
- ✅ Visit `http://127.0.0.1:8000/api/reports/aiinsights` - Should return JSON with insights
- ✅ Visit `http://127.0.0.1:8000/api/analytics/featureimportance` - Should display chart image
- ✅ Visit `http://127.0.0.1:8000/api/maps/analysis_image/assam` - Should display map image

### Frontend Tests
- ✅ Dashboard page shows statistics (not zeros)
- ✅ Dashboard page displays flood map
- ✅ Reports page shows 5 AI insight cards
- ✅ Analytics page displays feature importance chart
- ✅ Browser console (F12) shows no errors
- ✅ All confidence bars animate smoothly

## Troubleshooting

### Backend Issues

**Port 8000 already in use:**
- Find and kill the process using port 8000
- Or change port in `main.py` and update `script.js`

**Images not loading (404 errors):**
- Verify images exist in `waveradarapi/results/`
- Check file names are exact: `feature_importance.png`, `placeholder_map.png`
- Restart the server after adding images

### Frontend Issues

**Dashboard shows "0" values:**
- Check browser console (F12) for errors
- Verify API server is running
- Verify API URL in `script.js` matches your backend port
- Test API endpoints directly in browser

**CORS errors:**
- Backend is configured to allow all origins
- If issues persist, check API server is running
- Verify `API_BASE_URL` in `script.js` is correct

**Images not displaying:**
- Check browser console for 404 errors
- Verify images exist in `waveradarapi/results/`
- Test image endpoints directly: `http://127.0.0.1:8000/api/analytics/featureimportance`

## Next Steps

1. **Add real image assets** to `waveradarapi/results/`
2. **Customize data** in `waveradarapi/main.py` endpoints
3. **Style adjustments** in HTML files and CSS
4. **Deploy to production** (see deployment section in API README)

## Support

- Check browser console (F12) for errors
- Verify API server is running
- Test API endpoints directly
- Review `waveradarapi/README.md` for API-specific issues



