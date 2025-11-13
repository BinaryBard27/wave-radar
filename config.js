/* ===============================================
   WaveRadar Configuration
   =============================================== */

// Google Maps API Configuration
// Get your API key from: https://console.cloud.google.com/google/maps-apis
const CONFIG = {
    // Google Maps API Key (replace with your own)
    GOOGLE_MAPS_API_KEY: 'YOUR_API_KEY_HERE',
    
    // API Base URL
    API_BASE_URL: 'http://127.0.0.1:8000',
    
    // Map Settings
    MAP_CENTER: [26.2006, 92.9376], // Assam, India
    MAP_ZOOM: 8,
    MAP_TYPE: 'satellite',
    
    // Globe Settings
    GLOBE_AUTO_ROTATE: true,
    GLOBE_ROTATION_SPEED: 0.002,
    
    // Feature Flags
    USE_GOOGLE_MAPS: true, // Set to false to use Leaflet fallback
    USE_STATIC_IMAGE: false, // Set to true to use static image from results folder instead of interactive map
    USE_STATIC_IMAGE_OVERLAY: true, // Set to true to overlay static image on top of interactive map
    USE_3D_GLOBE: true,
    
    // Update Intervals (in milliseconds)
    STATS_UPDATE_INTERVAL: 30000, // 30 seconds
    MAP_UPDATE_INTERVAL: 60000, // 1 minute
};

// Export config
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

// Make config available globally
window.CONFIG = CONFIG;

