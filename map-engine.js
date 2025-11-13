/* ===============================================
   Google Earth Engine Interactive Map
   =============================================== */

class EarthEngineMap {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container ${containerId} not found`);
            return;
        }

        // Use config if available
        const config = window.CONFIG || {};
        this.options = {
            center: options.center || config.MAP_CENTER || [26.2006, 92.9376], // Assam, India
            zoom: options.zoom || config.MAP_ZOOM || 8,
            mapType: options.mapType || config.MAP_TYPE || 'satellite',
            useGoogleMaps: config.USE_GOOGLE_MAPS !== false,
            useStaticImage: config.USE_STATIC_IMAGE || false,
            useStaticImageOverlay: config.USE_STATIC_IMAGE_OVERLAY !== false,
            staticImageUrl: config.API_BASE_URL ? `${config.API_BASE_URL}/api/maps/analysis_image/assam` : 'http://127.0.0.1:8000/api/maps/analysis_image/assam',
            ...options
        };

        this.map = null;
        this.staticImageOverlay = null;
        this.init();
    }

    async init() {
        try {
            // Check if static image should be used instead
            if (this.options.useStaticImage) {
                console.log('Using static image from results folder');
                this.initStaticImage();
                return;
            }

            // Check if Google Maps API is available and enabled
            if (!this.options.useGoogleMaps || typeof google === 'undefined' || !google.maps) {
                console.log('Using Leaflet fallback map');
                this.initFallbackMap();
                return;
            }

            // Initialize Google Maps
            this.map = new google.maps.Map(this.container, {
                center: { lat: this.options.center[0], lng: this.options.center[1] },
                zoom: this.options.zoom,
                mapTypeId: this.options.mapType,
                styles: this.getMapStyles(),
                disableDefaultUI: false,
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                streetViewControl: false,
                rotateControl: true,
                fullscreenControl: true
            });

            // Add 3D terrain
            this.map.setTilt(45);
            this.map.setHeading(0);

            // Add flood overlay
            this.addFloodOverlay();

            // Add static image overlay if enabled
            if (this.options.useStaticImageOverlay) {
                this.addStaticImageOverlay();
            }

            // Add markers
            this.addMarkers();

            // Add drawing tools
            this.addDrawingTools();

            console.log('✅ Google Earth Engine map initialized');
        } catch (error) {
            console.error('Error initializing map:', error);
            this.initFallbackMap();
        }
    }

    initStaticImage() {
        // Display static image from results folder
        const img = document.createElement('img');
        img.src = this.options.staticImageUrl;
        img.alt = 'Flood Analysis Map';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        img.style.borderRadius = '8px';
        
        // Clear container and add image
        this.container.innerHTML = '';
        this.container.appendChild(img);

        // Handle load
        img.onload = () => {
            console.log('✅ Static map image loaded from results folder');
            const loading = document.getElementById('map-loading');
            if (loading) {
                loading.style.display = 'none';
            }
        };

        img.onerror = () => {
            console.error('❌ Failed to load static map image');
            this.container.innerHTML = '<div style="padding: 40px; text-align: center; color: white;">Map image not available</div>';
            const loading = document.getElementById('map-loading');
            if (loading) {
                loading.style.display = 'none';
            }
        };
    }

    addStaticImageOverlay() {
        // Add static image as overlay on top of Google Maps
        if (!this.map || typeof google === 'undefined' || !this.options.staticImageUrl) {
            return;
        }

        // Get image bounds (Assam, India region)
        const bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(24.0, 89.0),
            new google.maps.LatLng(28.0, 96.0)
        );

        // Create ground overlay
        const overlay = new google.maps.GroundOverlay(
            this.options.staticImageUrl,
            bounds,
            {
                opacity: 0.6, // Semi-transparent overlay
                clickable: false
            }
        );

        overlay.setMap(this.map);
        this.staticImageOverlay = overlay;
        console.log('✅ Static image overlay added to map');
    }

    initFallbackMap() {
        // Check if static image should be used
        if (this.options.useStaticImage) {
            this.initStaticImage();
            return;
        }

        // Fallback to Leaflet if Google Maps is not available
        if (typeof L !== 'undefined') {
            this.map = L.map(this.container).setView(this.options.center, this.options.zoom);

            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19
            }).addTo(this.map);

            // Add flood overlay
            this.addFloodOverlayLeaflet();

            // Add static image overlay if enabled
            if (this.options.useStaticImageOverlay) {
                this.addStaticImageOverlayLeaflet();
            }

            console.log('✅ Fallback map (Leaflet) initialized');
        } else {
            // Ultimate fallback - try static image
            if (this.options.staticImageUrl) {
                this.initStaticImage();
            } else {
                // Ultimate fallback - show message
                this.container.innerHTML = `
                    <div style="padding: 40px; text-align: center; color: white;">
                        <h3>Map Loading...</h3>
                        <p>Please ensure Google Maps API is loaded or add static image to results folder</p>
                    </div>
                `;
            }
        }
    }

    addStaticImageOverlayLeaflet() {
        // Add static image overlay to Leaflet map
        if (!this.map || typeof L === 'undefined' || !this.options.staticImageUrl) {
            return;
        }

        // Define image bounds (Assam, India region)
        const bounds = [[24.0, 89.0], [28.0, 96.0]];

        // Create image overlay
        const imageOverlay = L.imageOverlay(
            this.options.staticImageUrl,
            bounds,
            {
                opacity: 0.6,
                interactive: false
            }
        ).addTo(this.map);

        this.staticImageOverlay = imageOverlay;
        console.log('✅ Static image overlay added to Leaflet map');
    }

    getMapStyles() {
        return [
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#1e3a8a' }, { visibility: 'on' }]
            },
            {
                featureType: 'landscape',
                elementType: 'geometry',
                stylers: [{ color: '#065f46' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#374151' }]
            }
        ];
    }

    addFloodOverlay() {
        if (!this.map) return;

        // Create flood polygon (simulated flood area)
        const floodCoords = this.generateFloodCoordinates();
        
        const floodPolygon = new google.maps.Polygon({
            paths: floodCoords,
            strokeColor: '#3b82f6',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#3b82f6',
            fillOpacity: 0.35,
            editable: false,
            draggable: false
        });

        floodPolygon.setMap(this.map);

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 10px;">
                    <h3 style="margin: 0 0 10px 0;">Flood Affected Area</h3>
                    <p><strong>Area:</strong> 2,847 sq km</p>
                    <p><strong>Status:</strong> Active</p>
                    <p><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
                </div>
            `
        });

        // Add click event
        floodPolygon.addListener('click', (event) => {
            infoWindow.setPosition(event.latLng);
            infoWindow.open(this.map);
        });

        this.floodPolygon = floodPolygon;
    }

    addFloodOverlayLeaflet() {
        if (!this.map || typeof L === 'undefined') return;

        const floodCoords = this.generateFloodCoordinatesLeaflet();
        
        const floodPolygon = L.polygon(floodCoords, {
            color: '#3b82f6',
            fillColor: '#3b82f6',
            fillOpacity: 0.35,
            weight: 2
        }).addTo(this.map);

        floodPolygon.bindPopup(`
            <div>
                <h3>Flood Affected Area</h3>
                <p><strong>Area:</strong> 2,847 sq km</p>
                <p><strong>Status:</strong> Active</p>
            </div>
        `);

        this.floodPolygon = floodPolygon;
    }

    generateFloodCoordinates() {
        // Generate coordinates around Assam, India (simulated flood area)
        const center = { lat: this.options.center[0], lng: this.options.center[1] };
        const radius = 0.3; // degrees
        
        const coordinates = [];
        for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2;
            const lat = center.lat + radius * Math.cos(angle) * (0.8 + Math.random() * 0.4);
            const lng = center.lng + radius * Math.sin(angle) * (0.8 + Math.random() * 0.4);
            coordinates.push({ lat, lng });
        }
        return coordinates;
    }

    generateFloodCoordinatesLeaflet() {
        const center = Array.isArray(this.options.center) ? this.options.center : [26.2006, 92.9376];
        const radius = 0.3;
        
        const coordinates = [];
        for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2;
            const lat = center[0] + radius * Math.cos(angle) * (0.8 + Math.random() * 0.4);
            const lng = center[1] + radius * Math.sin(angle) * (0.8 + Math.random() * 0.4);
            coordinates.push([lat, lng]);
        }
        return coordinates;
    }

    addMarkers() {
        if (!this.map || typeof google === 'undefined') return;

        // Add flood monitoring markers
        const markers = [
            { lat: 26.2006, lng: 92.9376, title: 'Flood Zone 1', severity: 'high' },
            { lat: 26.1500, lng: 93.0000, title: 'Flood Zone 2', severity: 'medium' },
            { lat: 26.2500, lng: 92.9000, title: 'Flood Zone 3', severity: 'low' }
        ];

        markers.forEach(markerData => {
            const marker = new google.maps.Marker({
                position: { lat: markerData.lat, lng: markerData.lng },
                map: this.map,
                title: markerData.title,
                icon: this.getMarkerIcon(markerData.severity)
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div style="padding: 10px;">
                        <h3 style="margin: 0 0 10px 0;">${markerData.title}</h3>
                        <p><strong>Severity:</strong> ${markerData.severity}</p>
                        <p><strong>Status:</strong> Monitoring</p>
                    </div>
                `
            });

            marker.addListener('click', () => {
                infoWindow.open(this.map, marker);
            });
        });
    }

    getMarkerIcon(severity) {
        const colors = {
            high: '#ef4444',
            medium: '#f59e0b',
            low: '#10b981'
        };

        return {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: colors[severity] || '#3b82f6',
            fillOpacity: 0.8,
            strokeColor: '#ffffff',
            strokeWeight: 2
        };
    }

    addDrawingTools() {
        if (!this.map || typeof google === 'undefined') return;

        // Add drawing manager
        const drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: null,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                    google.maps.drawing.OverlayType.MARKER,
                    google.maps.drawing.OverlayType.CIRCLE,
                    google.maps.drawing.OverlayType.POLYGON,
                    google.maps.drawing.OverlayType.POLYLINE,
                    google.maps.drawing.OverlayType.RECTANGLE
                ]
            },
            markerOptions: {
                icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
            },
            circleOptions: {
                fillColor: '#3b82f6',
                fillOpacity: 0.35,
                strokeWeight: 2,
                clickable: false,
                editable: true,
                zIndex: 1
            }
        });

        drawingManager.setMap(this.map);
        this.drawingManager = drawingManager;
    }

    updateFloodData(data) {
        // Update flood overlay with new data
        if (this.floodPolygon && this.map) {
            // Update polygon coordinates based on new data
            console.log('Updating flood data:', data);
        }
    }
}

// Initialize map when DOM is ready and libraries are loaded
function initMap() {
    const mapContainer = document.getElementById('earth-engine-map');
    if (mapContainer && (typeof google !== 'undefined' || typeof L !== 'undefined')) {
        window.earthEngineMap = new EarthEngineMap('earth-engine-map', {
            center: [26.2006, 92.9376], // Assam, India
            zoom: 8,
            mapType: 'satellite'
        });
        
        // Hide loading message
        const loading = document.getElementById('map-loading');
        if (loading) {
            setTimeout(() => {
                loading.style.display = 'none';
            }, 1000);
        }
    } else if (mapContainer) {
        // Retry after a delay if libraries aren't loaded yet
        setTimeout(initMap, 500);
    }
}

document.addEventListener('DOMContentLoaded', initMap);
window.addEventListener('load', initMap);

