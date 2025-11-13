/* ===============================================
   3D Globe Component using Three.js
   =============================================== */

class Globe3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container ${containerId} not found`);
            return;
        }

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.globe = null;
        this.animationId = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetRotationX = 0;
        this.targetRotationY = 0;
        this.currentRotationX = 0;
        this.currentRotationY = 0;

        this.init();
    }

    init() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0a);

        // Create camera
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(0, 0, 5);

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 3, 5);
        this.scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0x3b82f6, 1, 100);
        pointLight.position.set(10, 10, 10);
        this.scene.add(pointLight);

        // Create globe
        this.createGlobe();

        // Add atmosphere
        this.createAtmosphere();

        // Add stars
        this.createStars();

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
        
        // Handle mouse movement
        this.container.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.container.addEventListener('mouseleave', () => this.onMouseLeave());

        // Start animation
        this.animate();
    }

    createGlobe() {
        // Create sphere geometry
        const geometry = new THREE.SphereGeometry(2, 64, 64);

        // Load Earth texture
        const textureLoader = new THREE.TextureLoader();
        
        // Create material with gradient colors (ocean and land)
        const material = new THREE.MeshPhongMaterial({
            color: 0x3b82f6,
            emissive: 0x1a5490,
            emissiveIntensity: 0.2,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });

        // Create globe mesh
        this.globe = new THREE.Mesh(geometry, material);
        this.scene.add(this.globe);

        // Add cloud layer
        const cloudGeometry = new THREE.SphereGeometry(2.02, 64, 64);
        const cloudMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
        this.scene.add(clouds);

        // Animate clouds
        clouds.rotation.y += 0.001;

        // Add continent-like shapes (simplified)
        this.addContinents();
    }

    addContinents() {
        // Create simple continent shapes using custom geometry
        const colors = [0x10b981, 0x059669, 0x047857, 0x065f46];
        
        colors.forEach((color, index) => {
            const continentGeometry = new THREE.SphereGeometry(2.01, 64, 64);
            const material = new THREE.MeshPhongMaterial({
                color: color,
                emissive: color,
                emissiveIntensity: 0.1,
                transparent: true,
                opacity: 0.6
            });
            
            const continent = new THREE.Mesh(continentGeometry, material);
            continent.rotation.y = (index * Math.PI * 2) / colors.length;
            continent.scale.set(1, 0.3, 1);
            this.scene.add(continent);
        });
    }

    createAtmosphere() {
        // Create atmosphere glow effect (simplified version)
        const atmosphereGeometry = new THREE.SphereGeometry(2.15, 64, 64);
        const atmosphereMaterial = new THREE.MeshBasicMaterial({
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.15,
            side: THREE.BackSide
        });
        
        const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
        this.scene.add(atmosphere);
        this.atmosphere = atmosphere;
    }

    createStars() {
        // Create starfield
        const starsGeometry = new THREE.BufferGeometry();
        const starsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.05,
            transparent: true,
            opacity: 0.8
        });

        const starsVertices = [];
        for (let i = 0; i < 10000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starsVertices.push(x, y, z);
        }

        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
        const stars = new THREE.Points(starsGeometry, starsMaterial);
        this.scene.add(stars);
        this.stars = stars;
    }

    onMouseMove(event) {
        const rect = this.container.getBoundingClientRect();
        this.mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.targetRotationY = this.mouseX * 0.5;
        this.targetRotationX = this.mouseY * 0.5;
    }

    onMouseLeave() {
        this.targetRotationX = 0;
        this.targetRotationY = 0;
    }

    onWindowResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        // Smooth rotation interpolation
        this.currentRotationX += (this.targetRotationX - this.currentRotationX) * 0.05;
        this.currentRotationY += (this.targetRotationY - this.currentRotationY) * 0.05;

        // Auto-rotate
        if (this.globe) {
            this.globe.rotation.y += 0.002;
            this.globe.rotation.x = this.currentRotationX;
            this.globe.rotation.y += this.currentRotationY;
        }

        // Rotate scene for dynamic effect
        this.scene.rotation.y += 0.0005;

        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.container.removeChild(this.renderer.domElement);
            this.renderer.dispose();
        }
    }
}

// Initialize globe when DOM is ready and Three.js is loaded
function initGlobe() {
    if (typeof THREE !== 'undefined') {
        const globeContainer = document.getElementById('globe3d-container');
        if (globeContainer && !window.globe3D) {
            try {
                window.globe3D = new Globe3D('globe3d-container');
                console.log('✅ 3D Globe initialized');
            } catch (error) {
                console.error('Error initializing 3D globe:', error);
            }
        }
    } else {
        // Retry after a delay if Three.js isn't loaded yet
        setTimeout(initGlobe, 500);
    }
}

document.addEventListener('DOMContentLoaded', initGlobe);
window.addEventListener('load', initGlobe);

