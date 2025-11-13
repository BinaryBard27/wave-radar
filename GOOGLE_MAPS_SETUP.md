# Google Maps API Setup Guide

## Overview
WaveRadar uses Google Maps API for interactive 3D maps. If you don't have a Google Maps API key, the application will automatically use Leaflet (OpenStreetMap) as a fallback.

## Getting a Google Maps API Key

### Step 1: Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Create Project" or select an existing project
3. Give your project a name (e.g., "WaveRadar")

### Step 2: Enable Google Maps API
1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Maps JavaScript API"
3. Click on it and click "Enable"
4. Also enable "Maps Drawing API" (optional, for drawing tools)

### Step 3: Create API Key
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy your API key
4. (Recommended) Click "Restrict Key" to restrict it to your domain

### Step 4: Configure API Key
1. Open `config.js` in the project root
2. Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```javascript
   GOOGLE_MAPS_API_KEY: 'YOUR_ACTUAL_API_KEY_HERE',
   ```

## Features Available with Google Maps

- ✅ 3D satellite imagery
- ✅ Interactive flood overlays
- ✅ Drawing tools
- ✅ Custom markers
- ✅ Info windows
- ✅ Street view integration
- ✅ Terrain view

## Features Available with Leaflet (Fallback)

- ✅ Interactive maps
- ✅ Flood overlays
- ✅ Markers
- ✅ Popups
- ✅ OpenStreetMap tiles
- ❌ No 3D view
- ❌ No street view

## API Key Restrictions (Recommended)

For security, restrict your API key:

1. **Application restrictions:**
   - HTTP referrers: Add your domain (e.g., `localhost:8081/*`, `yourdomain.com/*`)

2. **API restrictions:**
   - Restrict to: "Maps JavaScript API" and "Maps Drawing API"

## Testing

1. Start the backend server: `start_backend.bat`
2. Start the frontend server: `start_frontend.bat`
3. Open browser: `http://127.0.0.1:8081`
4. Check browser console (F12):
   - If Google Maps loads: `✅ Google Maps API loaded`
   - If using fallback: `ℹ️  Google Maps API not configured, using Leaflet fallback`

## Troubleshooting

### ❌ "This page can't load Google Maps correctly"
- **Solution:** Check your API key is correct in `config.js`
- **Solution:** Verify API key restrictions allow your domain
- **Solution:** Check API is enabled in Google Cloud Console

### ❌ "RefererNotAllowedMapError"
- **Solution:** Add your domain to API key restrictions
- **Solution:** For localhost, add `localhost:8081/*` to HTTP referrers

### ❌ Map not displaying
- **Solution:** Check browser console for errors
- **Solution:** Verify API key is not expired
- **Solution:** Check billing is enabled in Google Cloud Console

### ✅ Using Leaflet Fallback
- If you don't want to use Google Maps, the app will automatically use Leaflet
- No configuration needed - it works out of the box
- Features are limited but still functional

## Cost

### Google Maps API Pricing
- **Free tier:** $200 credit per month
- **Maps JavaScript API:** $7 per 1,000 loads
- **Maps Drawing API:** Free

### Leaflet (OpenStreetMap)
- **Cost:** Free (no API key needed)
- **Limitations:** No 3D view, limited features

## Recommendation

- **Development:** Use Leaflet (free, no setup)
- **Production:** Use Google Maps API (better features, 3D view)
- **Testing:** Try both to see which works better for your needs

## Next Steps

1. Get Google Maps API key (optional)
2. Configure in `config.js`
3. Restart frontend server
4. Test the map functionality
5. Set up API key restrictions for security

---

**Note:** The application works perfectly without a Google Maps API key using the Leaflet fallback. The API key is only needed for advanced 3D features and satellite imagery.



