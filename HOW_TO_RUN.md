# 🚀 How to Run WaveRadar

## Quick Start (Easiest Method)

### Option 1: Using Batch Files (Windows)

1. **Start Backend API:**
   - Double-click `start_backend.bat`
   - Wait for "Starting API server on http://127.0.0.1:8000"
   - Keep this window open

2. **Start Frontend:**
   - Open a **NEW** window/terminal
   - Double-click `start_frontend.bat`
   - Wait for "Starting web server on http://127.0.0.1:8081"

3. **Open in Browser:**
   - Navigate to: `http://127.0.0.1:8081`
   - You should see the WaveRadar dashboard!

---

## Manual Setup (Step-by-Step)

### Step 1: Start Backend API Server

Open **Terminal 1** (PowerShell or Command Prompt):

```bash
# Navigate to API directory
cd waveradarapi

# Create virtual environment (first time only)
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Install dependencies (first time only)
pip install -r requirements.txt

# Start the server
python main.py
```

✅ **Success:** You should see:
```
============================================================
🌊 WaveRadar API Server Starting...
============================================================
INFO:     Uvicorn running on http://127.0.0.1:8000
```

**Keep this terminal window open!**

---

### Step 2: Start Frontend Server

Open **Terminal 2** (NEW window):

```bash
# Make sure you're in the project root (SAR folder)
cd C:\Users\SHERWIN\OneDrive\Documents\Desktop\SAR

# Start web server
python -m http.server 8081
```

✅ **Success:** You should see:
```
Serving HTTP on :: port 8081 (http://[::]:8081/) ...
```

**Keep this terminal window open too!**

---

### Step 3: Open in Browser

1. Open your web browser (Chrome, Edge, Firefox)
2. Navigate to: `http://127.0.0.1:8081`
3. You should see the WaveRadar dashboard!

---

## Verify Everything is Working

### Test Backend API

Open these URLs in your browser:

1. **API Health Check:**
   ```
   http://127.0.0.1:8000
   ```
   Should show: `{"status":"online","service":"WaveRadar API",...}`

2. **Dashboard Stats:**
   ```
   http://127.0.0.1:8000/api/dashboard/keystats
   ```
   Should show: JSON with flooded area, population, etc.

3. **AI Insights:**
   ```
   http://127.0.0.1:8000/api/reports/aiinsights
   ```
   Should show: JSON array with 5 insights

### Test Frontend

1. **Dashboard Page:**
   - Should show: Statistics cards (2,847 sq km, 89,432 people, etc.)
   - Should show: Flood map (or "Loading map..." if images not added)

2. **Reports Page:**
   - Navigate to: `http://127.0.0.1:8081/reports.html`
   - Should show: 5 AI insight cards with confidence bars

3. **Analytics Page:**
   - Navigate to: `http://127.0.0.1:8081/analytics.html`
   - Should show: Feature importance chart (or "Loading chart..." if images not added)

---

## Troubleshooting

### ❌ "Python is not recognized"

**Solution:** Install Python 3.8 or higher from [python.org](https://www.python.org/downloads/)

---

### ❌ "Port 8000 is already in use"

**Solution 1:** Close the program using port 8000
```bash
# Find process using port 8000
netstat -ano | findstr :8000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Solution 2:** Change the port
1. Edit `waveradarapi/main.py`: Change `port=8000` to `port=8001`
2. Edit `script.js`: Change `API_BASE_URL` to `"http://127.0.0.1:8001"`

---

### ❌ "Port 8081 is already in use"

**Solution:** Use a different port
```bash
python -m http.server 8082
```
Then navigate to: `http://127.0.0.1:8082`

---

### ❌ "Module not found" errors

**Solution:** Install dependencies
```bash
cd waveradarapi
venv\Scripts\activate
pip install -r requirements.txt
```

---

### ❌ Dashboard shows "0" values

**Solution:**
1. Check backend server is running (Terminal 1)
2. Open browser console (F12) - check for errors
3. Test API directly: `http://127.0.0.1:8000/api/dashboard/keystats`
4. Verify `API_BASE_URL` in `script.js` matches your backend URL

---

### ❌ Images not displaying (404 errors)

**Solution:**
1. Add images to `waveradarapi/results/`:
   - `feature_importance.png` (analytics chart)
   - `placeholder_map.png` (dashboard map)
2. Restart backend server after adding images
3. Test image URLs directly:
   - `http://127.0.0.1:8000/api/analytics/featureimportance`
   - `http://127.0.0.1:8000/api/maps/analysis_image/assam`

---

### ❌ CORS errors in browser console

**Solution:**
- Backend is already configured to allow all origins
- Verify backend server is running
- Check `API_BASE_URL` in `script.js` is correct

---

## Command Reference

### Backend Commands
```bash
cd waveradarapi
venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### Frontend Commands
```bash
# From project root
python -m http.server 8081
```

### Alternative: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

---

## Next Steps

1. **Add Image Assets:**
   - Copy your images to `waveradarapi/results/`
   - Restart backend server

2. **Customize Data:**
   - Edit `waveradarapi/main.py` to change API responses
   - Edit `script.js` to modify frontend behavior

3. **Deploy to Production:**
   - See `SETUP.md` for deployment instructions

---

## Quick Checklist

- [ ] Python 3.8+ installed
- [ ] Backend server running on port 8000
- [ ] Frontend server running on port 8081
- [ ] Browser opens `http://127.0.0.1:8081`
- [ ] Dashboard shows statistics (not zeros)
- [ ] No errors in browser console (F12)
- [ ] Images added to `waveradarapi/results/` (optional)

---

**Need Help?** Check browser console (F12) for errors and verify both servers are running!



