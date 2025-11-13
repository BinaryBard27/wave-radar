from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
from pathlib import Path

# Initialize FastAPI app
app = FastAPI(
    title="WaveRadar API",
    description="Simulated flood monitoring backend API",
    version="1.0.0"
)

# Enable CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define paths
BASE_DIR = Path(__file__).parent
RESULTS_DIR = BASE_DIR / "results"

# Verify results directory exists
if not RESULTS_DIR.exists():
    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    print(f"⚠️  Created results directory at {RESULTS_DIR}")

# ============================================
# ENDPOINT 1: Dashboard Key Statistics
# ============================================
@app.get("/api/dashboard/keystats")
async def get_dashboard_stats():
    """
    Returns key metrics for the dashboard overview.
    These simulate realtime flood monitoring data.
    """
    return JSONResponse({
        "floodedArea": {
            "value": 2847,  # square kilometers
            "change": "+12.3%",
            "trend": "increasing"
        },
        "populationImpacted": {
            "value": 89432,  # number of people
            "change": "+8.7%",
            "trend": "increasing"
        },
        "affectedVillages": {
            "value": 156,  # count
            "change": "+5.1%",
            "trend": "stable"
        },
        "rainfall": {
            "value": 342.5,  # millimeters
            "change": "+23.4%",
            "trend": "increasing"
        }
    })

# ============================================
# ENDPOINT 2: AI Insights for Reports
# ============================================
@app.get("/api/reports/aiinsights")
async def get_ai_insights():
    """
    Returns AIgenerated insights about flood patterns.
    Each insight includes title, description, and confidence.
    """
    return JSONResponse({
        "insights": [
            {
                "title": "HighRisk Zone Expansion",
                "description": "Satellite analysis indicates floodaffected areas have expanded by 847 sq km in the past 72 hours, primarily in lowlying agricultural regions of Assam.",
                "confidence": 94,
                "priority": "high",
                "category": "prediction"
            },
            {
                "title": "Rainfall Pattern Shift",
                "description": "Monsoon patterns show 23% increase in precipitation compared to seasonal averages, with concentrated rainfall in northeastern districts.",
                "confidence": 89,
                "priority": "medium",
                "category": "weather"
            },
            {
                "title": "Population Displacement Risk",
                "description": "Current flood trajectories suggest potential evacuation requirements for approximately 12,000 residents in vulnerable riverside settlements.",
                "confidence": 87,
                "priority": "high",
                "category": "humanitarian"
            },
            {
                "title": "Infrastructure Impact",
                "description": "Road network analysis indicates 34 critical transportation routes are at risk of submersion within 48 hours based on current water level trends.",
                "confidence": 82,
                "priority": "medium",
                "category": "infrastructure"
            },
            {
                "title": "Agricultural Loss Projection",
                "description": "Crop damage assessment models predict significant impact to paddy fields covering approximately 1,240 hectares in affected regions.",
                "confidence": 91,
                "priority": "medium",
                "category": "economic"
            }
        ],
        "lastUpdated": "2025-11-12T14:30:00Z",
        "modelVersion": "WaveRadarAIv2.1"
    })

# ============================================
# ENDPOINT 3: Dashboard Map Image
# ============================================
@app.get("/api/maps/analysis_image/{region}")
async def get_analysis_map(region: str):
    """
    Returns the flood analysis map image for the dashboard.
    Currently returns the same map regardless of region parameter.
    """
    map_path = RESULTS_DIR / "placeholder_map.png"
    
    if not map_path.exists():
        # Return a default placeholder image instead of 404
        from PIL import Image, ImageDraw, ImageFont
        import io
        
        # Create a placeholder image
        img = Image.new('RGB', (800, 600), color=(26, 30, 62))
        draw = ImageDraw.Draw(img)
        
        # Draw placeholder text
        try:
            font = ImageFont.truetype("arial.ttf", 40)
        except:
            font = ImageFont.load_default()
        
        text = "Flood Analysis Map\n(Image not available)"
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        draw.text(
            ((800 - text_width) / 2, (600 - text_height) / 2),
            text,
            fill=(255, 255, 255),
            font=font
        )
        
        # Convert to bytes
        img_bytes = io.BytesIO()
        img.save(img_bytes, format='PNG')
        img_bytes.seek(0)
        
        from fastapi.responses import Response
        return Response(content=img_bytes.read(), media_type="image/png")
    
    return FileResponse(
        map_path,
        media_type="image/png",
        headers={
            "Content-Disposition": f"inline; filename=flood_map_{region}.png",
            "Cache-Control": "public, max-age=3600"
        }
    )

# ============================================
# ENDPOINT 4: Feature Importance Chart
# ============================================
@app.get("/api/analytics/featureimportance")
async def get_feature_importance():
    """
    Returns the feature importance visualization chart.
    Shows which factors most influence flood predictions.
    """
    chart_path = RESULTS_DIR / "feature_importance.png"
    
    if not chart_path.exists():
        # Return a default placeholder image instead of 404
        from PIL import Image, ImageDraw, ImageFont
        import io
        
        # Create a placeholder image
        img = Image.new('RGB', (800, 600), color=(26, 30, 62))
        draw = ImageDraw.Draw(img)
        
        # Draw placeholder text
        try:
            font = ImageFont.truetype("arial.ttf", 40)
        except:
            font = ImageFont.load_default()
        
        text = "Feature Importance Chart\n(Image not available)"
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        draw.text(
            ((800 - text_width) / 2, (600 - text_height) / 2),
            text,
            fill=(255, 255, 255),
            font=font
        )
        
        # Convert to bytes
        img_bytes = io.BytesIO()
        img.save(img_bytes, format='PNG')
        img_bytes.seek(0)
        
        from fastapi.responses import Response
        return Response(content=img_bytes.read(), media_type="image/png")
    
    return FileResponse(
        chart_path,
        media_type="image/png",
        headers={
            "Content-Disposition": "inline; filename=feature_importance.png",
            "Cache-Control": "public, max-age=3600"
        }
    )

# ============================================
# HEALTH CHECK ENDPOINT
# ============================================
@app.get("/")
async def root():
    """API health check and information endpoint."""
    return {
        "status": "online",
        "service": "WaveRadar API",
        "version": "1.0.0",
        "endpoints": {
            "dashboard_stats": "/api/dashboard/keystats",
            "ai_insights": "/api/reports/aiinsights",
            "map_image": "/api/maps/analysis_image/{region}",
            "analytics_chart": "/api/analytics/featureimportance"
        }
    }

# ============================================
# RUN SERVER
# ============================================
if __name__ == "__main__":
    import uvicorn
    print("=" * 60)
    print("🌊 WaveRadar API Server Starting...")
    print("=" * 60)
    print(f"📁 Results Directory: {RESULTS_DIR}")
    print(f"🗺️  Map Image: {RESULTS_DIR / 'placeholder_map.png'}")
    print(f"📊 Chart Image: {RESULTS_DIR / 'feature_importance.png'}")
    print("=" * 60)
    
    uvicorn.run(
        app,
        host="127.0.0.1",
        port=8000,
        log_level="info"
    )

