# Image Usage from Results Folder

## 📁 Images from Results Folder

The WaveRadar application uses images from the `waveradarapi/results/` folder in the following ways:

### 1. ✅ Feature Importance Chart (Analytics Page)
- **File:** `feature_importance.png`
- **Status:** ✅ **USED** - Loads from results folder
- **Endpoint:** `/api/analytics/featureimportance`
- **Location:** Analytics page (`analytics.html`)
- **How it works:**
  - Frontend loads image from: `http://127.0.0.1:8000/api/analytics/featureimportance`
  - Backend serves image from: `waveradarapi/results/feature_importance.png`
  - If file doesn't exist, backend generates a placeholder image

### 2. ✅ Dashboard Map Image
- **File:** `placeholder_map.png`
- **Status:** ✅ **USED** - Can be used as overlay or standalone
- **Endpoint:** `/api/maps/analysis_image/{region}`
- **Location:** Dashboard page (`index.html`)
- **How it works:**
  - **Option 1:** Static image mode - Display image directly from results folder
  - **Option 2:** Overlay mode - Overlay image on top of Google Maps/Leaflet
  - **Option 3:** Interactive map only - Use Google Maps/Leaflet without static image
  - If file doesn't exist, backend generates a placeholder image

## 🔧 Configuration Options

### Option 1: Use Static Image Only
Set in `config.js`:
```javascript
USE_STATIC_IMAGE: true,  // Use static image instead of interactive map
USE_STATIC_IMAGE_OVERLAY: false,
```

### Option 2: Use Static Image as Overlay
Set in `config.js`:
```javascript
USE_STATIC_IMAGE: false,  // Use interactive map
USE_STATIC_IMAGE_OVERLAY: true,  // Overlay static image on top
```

### Option 3: Use Interactive Map Only (Default)
Set in `config.js`:
```javascript
USE_STATIC_IMAGE: false,
USE_STATIC_IMAGE_OVERLAY: false,
```

## 📝 How to Use Your Images

### Step 1: Add Images to Results Folder
1. Place your images in `waveradarapi/results/`:
   - `feature_importance.png` - Analytics chart
   - `placeholder_map.png` - Dashboard map

### Step 2: Configure Usage (Optional)
Edit `config.js`:
```javascript
const CONFIG = {
    // ... other config ...
    
    // Use static image instead of interactive map
    USE_STATIC_IMAGE: false,
    
    // Overlay static image on interactive map
    USE_STATIC_IMAGE_OVERLAY: true,
};
```

### Step 3: Restart Backend
```bash
cd waveradarapi
python main.py
```

### Step 4: Test
- **Analytics page:** Should display `feature_importance.png`
- **Dashboard page:** Should display `placeholder_map.png` (depending on config)

## 🔍 Current Status

### ✅ What's Working
1. **Feature Importance Chart:**
   - ✅ Loads from `waveradarapi/results/feature_importance.png`
   - ✅ Displays on Analytics page
   - ✅ Backend generates placeholder if file missing

2. **Dashboard Map:**
   - ✅ Backend serves `waveradarapi/results/placeholder_map.png`
   - ✅ Can be used as static image
   - ✅ Can be used as overlay on interactive map
   - ✅ Backend generates placeholder if file missing

### ⚙️ Configuration Modes

#### Mode 1: Static Image Only
```javascript
USE_STATIC_IMAGE: true
USE_STATIC_IMAGE_OVERLAY: false
```
- Displays static image from results folder
- No interactive map
- Best for: Showing your custom flood analysis images

#### Mode 2: Static Image Overlay
```javascript
USE_STATIC_IMAGE: false
USE_STATIC_IMAGE_OVERLAY: true
```
- Interactive map (Google Maps/Leaflet)
- Static image overlaid on top (semi-transparent)
- Best for: Combining your analysis with map context

#### Mode 3: Interactive Map Only (Default)
```javascript
USE_STATIC_IMAGE: false
USE_STATIC_IMAGE_OVERLAY: false
```
- Interactive map only
- No static image
- Best for: Full interactivity with Google Maps/Leaflet

## 🎯 Recommended Setup

### For Development (No Images)
```javascript
USE_STATIC_IMAGE: false,
USE_STATIC_IMAGE_OVERLAY: false,
```
- Uses interactive map
- Works without images in results folder

### For Production (With Your Images)
```javascript
USE_STATIC_IMAGE: false,
USE_STATIC_IMAGE_OVERLAY: true,
```
- Uses interactive map
- Overlays your custom flood analysis image
- Best of both worlds!

### For Static Display (Image Only)
```javascript
USE_STATIC_IMAGE: true,
USE_STATIC_IMAGE_OVERLAY: false,
```
- Shows only your custom image
- No interactive features
- Simplest setup

## 📊 Image Requirements

### Feature Importance Chart
- **File:** `feature_importance.png`
- **Format:** PNG (recommended)
- **Size:** Any (recommended: 800x600 or larger)
- **Location:** `waveradarapi/results/feature_importance.png`

### Dashboard Map
- **File:** `placeholder_map.png`
- **Format:** PNG (recommended)
- **Size:** Any (recommended: 800x600 or larger)
- **Location:** `waveradarapi/results/placeholder_map.png`

## 🐛 Troubleshooting

### Images Not Displaying
1. **Check file exists:**
   ```bash
   ls waveradarapi/results/
   ```

2. **Check file names:**
   - Must be exact: `feature_importance.png`
   - Must be exact: `placeholder_map.png`
   - Case-sensitive!

3. **Check backend is running:**
   ```bash
   # Test endpoint
   curl http://127.0.0.1:8000/api/analytics/featureimportance
   ```

4. **Check browser console:**
   - Open browser console (F12)
   - Look for image loading errors
   - Check network tab for 404 errors

### Static Image Overlay Not Showing
1. **Check config:**
   ```javascript
   USE_STATIC_IMAGE_OVERLAY: true
   ```

2. **Check image URL:**
   - Verify `staticImageUrl` in config
   - Test URL directly in browser

3. **Check map bounds:**
   - Image overlay uses Assam, India bounds
   - Adjust bounds in `map-engine.js` if needed

## 📚 Summary

### ✅ Images ARE Used
- **Feature Importance Chart:** ✅ Always uses `feature_importance.png`
- **Dashboard Map:** ✅ Can use `placeholder_map.png` (configurable)

### 🔧 Configuration Options
- **Static Image Only:** Display image directly
- **Static Image Overlay:** Overlay on interactive map
- **Interactive Map Only:** No static image (default)

### 🎯 Best Practice
1. Add your images to `waveradarapi/results/`
2. Configure in `config.js`:
   - `USE_STATIC_IMAGE_OVERLAY: true` (recommended)
3. Restart backend server
4. Test in browser

---

**Note:** The backend automatically generates placeholder images if files are missing, so the application works even without images in the results folder!



