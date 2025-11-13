# WaveRadar Quick Start Guide

## ✅ What's Been Created

### Backend API (`waveradarapi/`)
- ✅ FastAPI server (`main.py`) with 4 endpoints
- ✅ Python dependencies (`requirements.txt`)
- ✅ Results directory for images (`results/`)
- ✅ API documentation (`README.md`)

### Frontend (`root directory`)
- ✅ Dashboard page (`index.html`) with stats and map
- ✅ Reports page (`reports.html`) with AI insights
- ✅ Analytics page (`analytics.html`) with feature importance chart
- ✅ JavaScript integration (`script.js`)
- ✅ All CSS styles included

## 🚀 Quick Start (5 Minutes)

### 1. Start Backend (Terminal 1)
```bash
cd waveradarapi
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
python main.py
```
✅ Server running on `http://127.0.0.1:8000`

### 2. Add Image Assets (One-time setup)
Copy your images to:
- `waveradarapi/results/feature_importance.png` (analytics chart)
- `waveradarapi/results/placeholder_map.png` (dashboard map)

### 3. Start Frontend (Terminal 2)
```bash
cd SAR  # project root
python -m http.server 8081
```
✅ Frontend running on `http://127.0.0.1:8081`

### 4. Open in Browser
Navigate to: `http://127.0.0.1:8081`

## 🧪 Test Your Setup

### Backend Tests
1. Visit `http://127.0.0.1:8000` → Should show API info
2. Visit `http://127.0.0.1:8000/api/dashboard/keystats` → Should return JSON
3. Visit `http://127.0.0.1:8000/api/reports/aiinsights` → Should return JSON
4. Visit `http://127.0.0.1:8000/api/analytics/featureimportance` → Should show chart
5. Visit `http://127.0.0.1:8000/api/maps/analysis_image/assam` → Should show map

### Frontend Tests
1. ✅ Dashboard shows statistics (2,847 sq km, 89,432 people, etc.)
2. ✅ Dashboard displays flood map
3. ✅ Reports page shows 5 AI insight cards
4. ✅ Analytics page displays feature importance chart
5. ✅ Browser console (F12) shows no errors
6. ✅ All confidence bars animate smoothly

## 📁 File Structure

```
SAR/
├── waveradarapi/
│   ├── main.py                    # FastAPI server
│   ├── requirements.txt           # Dependencies
│   ├── results/                   # Image assets
│   │   ├── feature_importance.png # (add your image)
│   │   └── placeholder_map.png    # (add your image)
│   └── README.md                  # API docs
│
├── index.html                     # Dashboard page
├── reports.html                   # AI Insights page
├── analytics.html                 # Analytics page
├── script.js                      # Frontend JavaScript
├── SETUP.md                       # Detailed setup guide
└── QUICK_START.md                 # This file
```

## 🔧 Configuration

### Change API Port
If port 8000 is busy:
1. Edit `waveradarapi/main.py`: Change `port=8000` to `port=8001`
2. Edit `script.js`: Change `API_BASE_URL` to `"http://127.0.0.1:8001"`

### Change Frontend Port
If port 8081 is busy:
```bash
python -m http.server 8082  # Use any available port
```

## 🐛 Troubleshooting

### Backend Issues
- **Port already in use**: Change port in `main.py` and `script.js`
- **Images not loading**: Verify images exist in `waveradarapi/results/`
- **Module not found**: Run `pip install -r requirements.txt`

### Frontend Issues
- **Dashboard shows "0"**: Check API server is running
- **CORS errors**: Backend allows all origins, verify API URL
- **Images not displaying**: Check browser console for 404 errors

## 📝 Next Steps

1. **Add real images** to `waveradarapi/results/`
2. **Customize data** in `waveradarapi/main.py`
3. **Style adjustments** in HTML files
4. **Deploy to production** (see `SETUP.md`)

## 🎯 Success Checklist

- [ ] Backend server running without errors
- [ ] All 4 API endpoints return correct data
- [ ] Frontend displays live data (not zeros)
- [ ] Dashboard map image loads
- [ ] Analytics chart loads
- [ ] AI insights display with confidence bars
- [ ] No console errors in browser
- [ ] Responsive design works on mobile

## 📚 Documentation

- **API Documentation**: `waveradarapi/README.md`
- **Detailed Setup**: `SETUP.md`
- **This Guide**: `QUICK_START.md`

---

**Need Help?** Check browser console (F12) for errors and verify API server is running.



