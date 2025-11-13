/* ===============================================
   WaveRadar Frontend - API Integration Script
   =============================================== */

// API base URL - use config if available, otherwise default
const API_BASE_URL = (window.CONFIG && window.CONFIG.API_BASE_URL) || "http://127.0.0.1:8000";

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    console.log("🌊 WaveRadar Frontend Initializing...");
    
    // --- THIS IS THE FIX ---
    // We removed the "checkLibraries" part and now
    // we call the functions immediately.
    
    loadDashboardStats();
    loadAiInsights();
    loadDashboardMap();
    loadFeatureImportanceChart();
    
    console.log("✅ All data fetch requests initiated");
});

// ============================================
// FUNCTION 1: Load Dashboard Statistics
// ============================================

    


// ============================================
// FUNCTION 1: Load Dashboard Statistics
// ============================================
function loadDashboardStats() {
    console.log("📊 Fetching dashboard statistics...");
    
    fetch(`${API_BASE_URL}/api/dashboard/keystats`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("✅ Dashboard stats received:", data);
            
            // Update Flooded Area card
            updateElement("floodedareavalue", data.floodedArea.value.toLocaleString());
            updateElement("floodedareachange", data.floodedArea.change);
            updateElement("floodedareatrend", data.floodedArea.trend);
            
            // Update Population Impacted card
            updateElement("populationimpactedvalue", data.populationImpacted.value.toLocaleString());
            updateElement("populationimpactedchange", data.populationImpacted.change);
            updateElement("populationimpactedtrend", data.populationImpacted.trend);
            
            // Update Affected Villages card
            updateElement("affectedvillagesvalue", data.affectedVillages.value.toLocaleString());
            updateElement("affectedvillageschange", data.affectedVillages.change);
            updateElement("affectedvillagestrend", data.affectedVillages.trend);
            
            // Update Rainfall card
            updateElement("rainfallvalue", data.rainfall.value.toLocaleString());
            updateElement("rainfallchange", data.rainfall.change);
            updateElement("rainfalltrend", data.rainfall.trend);
            
            console.log("✅ Dashboard stats updated in UI");
        })
        .catch(error => {
            console.error("❌ Error loading dashboard stats:", error);
            showError("dashboardstatserror", "Unable to load statistics");
        });
}

// ============================================
// FUNCTION 2: Load AI Insights
// ============================================
function loadAiInsights() {
    const container = document.getElementById("aiinsightslist");
    
    // Skip if this page doesn't have the insights container
    if (!container) {
        console.log("ℹ️  AI Insights container not found on this page");
        return;
    }
    
    console.log("🤖 Fetching AI insights...");
    container.innerHTML = '<div class="loading">Loading AI insights...</div>';
    
    fetch(`${API_BASE_URL}/api/reports/aiinsights`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("✅ AI Insights received:", data.insights.length, "insights");
            
            // Clear loading message
            container.innerHTML = "";
            
            // Build insight cards
            data.insights.forEach((insight, index) => {
                const card = document.createElement("div");
                card.className = "aiinsightcard";
                card.innerHTML = `
                    <div class="cardheader">
                        <h3>${insight.title}</h3>
                        <span class="confidencebadge ${getConfidenceClass(insight.confidence)}">
                            ${insight.confidence}% confidence
                        </span>
                    </div>
                    <p class="insightdescription">${insight.description}</p>
                    <div class="insightmeta">
                        <span class="prioritybadge priority${insight.priority}">
                            ${insight.priority.toUpperCase()}
                        </span>
                        <span class="categorytag">${insight.category}</span>
                    </div>
                    <div class="confidencebarbackground">
                        <div class="confidencebarforeground" 
                             style="width: ${insight.confidence}%;">
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
            
            console.log("✅ AI Insights rendered to UI");
        })
        .catch(error => {
            console.error("❌ Error loading AI insights:", error);
            container.innerHTML = '<div class="error">Unable to load AI insights</div>';
        });
}

// ============================================
// FUNCTION 3: Load Dashboard Map
// ============================================
function loadDashboardMap() {
    // Skip if using Google Maps (map is initialized in map-engine.js)
    const mapContainer = document.getElementById("earth-engine-map");
    if (!mapContainer) {
        console.log("ℹ️  Dashboard map container not found on this page");
        return;
    }
    
    console.log("🗺️  Dashboard map will be initialized by map-engine.js");
    
    // Hide loading message when map is ready
    if (window.earthEngineMap && window.earthEngineMap.map) {
        const loading = document.getElementById("map-loading");
        if (loading) {
            loading.style.display = "none";
        }
    }
}

// ============================================
// FUNCTION 4: Load Feature Importance Chart
// ============================================
function loadFeatureImportanceChart() {
    const chartImage = document.getElementById("featureimportancechart");
    
    // Skip if this page doesn't have the chart
    if (!chartImage) {
        console.log("ℹ️  Feature importance chart not found on this page");
        return;
    }
    
    console.log("📈 Loading feature importance chart...");
    
    const imageUrl = `${API_BASE_URL}/api/analytics/featureimportance`;
    
    // Set image source
    chartImage.src = imageUrl;
    chartImage.alt = "Feature Importance Analysis";
    
    // Handle load success
    chartImage.onload = () => {
        console.log("✅ Feature importance chart loaded successfully");
    };
    
    // Handle load error
    chartImage.onerror = () => {
        console.error("❌ Failed to load feature importance chart");
        chartImage.alt = "Chart unavailable";
        chartImage.style.display = "none";
    };
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
  Safely update an HTML element's text content
 */
function updateElement(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    } else {
        console.warn(`⚠️  Element not found: ${elementId}`);
    }
}

/**
  Display error message in specified container
 */
function showError(containerId, message) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `<div class="error">${message}</div>`;
    }
}

/**
  Get CSS class based on confidence level
 */
function getConfidenceClass(confidence) {
    if (confidence >= 90) return "highconfidence";
    if (confidence >= 75) return "mediumconfidence";
    return "lowconfidence";
}

/**
  Format large numbers with commas
 */
function formatNumber(num) {
    return num.toLocaleString("en-US");
}

console.log("📝 WaveRadar script loaded and ready");

