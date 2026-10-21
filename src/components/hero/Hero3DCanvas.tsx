import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, EyeOff, Sparkles } from 'lucide-react';

// =========================================================================
// TWEAKABLE 3D HERO SETTINGS (Configurable at the top of the component)
// =========================================================================
export const HERO_3D_CONFIG = {
  // Depth displacement strength (modest value 0.040 - 0.052 keeps face realistic and sharp)
  depthStrength: 0.044,

  // Mouse tracking sensitivity for tilt and optical parallax
  mouseSensitivity: 1.05,

  // Speed of subtle organic floating & breathing idle motion
  idleSpeed: 0.45,

  // Default motion state
  defaultMotionEnabled: true,

  // Set to false when foreground <img> is rendered with CodeReveal to avoid duplicate portraits
  renderPortraitMesh: false,
};

// Single portrait configuration with WebP and PNG fallbacks
const PORTRAIT_ASSET = {
  cutout: '/images/portrait-main-cutout.webp',
  cutoutFallback: '/images/portrait-main-cutout.png',
  depth: '/images/portrait-main-depth.webp',
  depthFallback: '/images/portrait-main-depth.png',
  aspectRatio: 799 / 1024,
};

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [motionEnabled, setMotionEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return !window.matchMedia('(prefers-reduced-motion: reduce)').matches && HERO_3D_CONFIG.defaultMotionEnabled;
    }
    return HERO_3D_CONFIG.defaultMotionEnabled;
  });
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    let isDisposed = false;
    let animationFrameId: number;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    // Match portfolio background tone #050507
    scene.fog = new THREE.FogExp2(0x050507, 0.035);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = width < 768;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      container.appendChild(renderer.domElement);
    } catch {
      setWebGlSupported(false);
      return;
    }

    // Main 3D Hero Group
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    // Texture Loader with Progressive Fallback
    const textureLoader = new THREE.TextureLoader();
    let cutoutTexture: THREE.Texture | null = null;
    let depthTexture: THREE.Texture | null = null;

    const setupTexture = (tex: THREE.Texture) => {
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
    };

    // Load Cutout Image
    cutoutTexture = textureLoader.load(
      PORTRAIT_ASSET.cutout,
      () => {
        if (!isDisposed) setIsLoaded(true);
      },
      undefined,
      () => {
        cutoutTexture = textureLoader.load(PORTRAIT_ASSET.cutoutFallback, () => {
          if (!isDisposed) setIsLoaded(true);
        });
        setupTexture(cutoutTexture);
      }
    );
    setupTexture(cutoutTexture);

    // Load Depth Map
    depthTexture = textureLoader.load(
      PORTRAIT_ASSET.depth,
      undefined,
      undefined,
      () => {
        depthTexture = textureLoader.load(PORTRAIT_ASSET.depthFallback);
        setupTexture(depthTexture);
      }
    );
    setupTexture(depthTexture);

    // =========================================================================
    // 3D Depth-Displacement Shaders with Seamless Background Blending & Defringing
    // =========================================================================
    const vertexShader = `
      uniform sampler2D uDepthMap;
      uniform float uDepthStrength;
      uniform vec2 uMouse;
      uniform float uTime;
      uniform float uIdleSpeed;
      uniform float uMotion;
      
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying float vDepth;

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);

        // Sample estimated depth from greyscale depth map
        float rawDepth = texture2D(uDepthMap, uv).r;
        vDepth = rawDepth;

        vec3 pos = position;

        if (uMotion > 0.5) {
          // 1. 3D Depth Displacement along Z (keeps face natural and undistorted)
          float displacement = (rawDepth - 0.5) * (uDepthStrength * 1.8);
          pos.z += displacement;

          // 2. Subtle organic breathing / floating curvature
          float breath = sin(uTime * uIdleSpeed + rawDepth * 2.0) * 0.009;
          pos.y += breath;
          pos.z += cos(uTime * uIdleSpeed * 0.6) * 0.006;
        }

        vec4 worldPos = modelMatrix * vec4(pos, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform sampler2D uDepthMap;
      uniform vec2 uMouse;
      uniform float uDepthStrength;
      uniform float uTime;
      uniform float uMotion;
      uniform float uOpacity;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying float vDepth;

      void main() {
        vec2 uvCoords = vUv;

        // 1. Raymarched / 2.5D Optical Parallax Offset
        if (uMotion > 0.5) {
          vec2 parallaxOffset = uMouse * (vDepth - 0.5) * (uDepthStrength * 0.40);
          uvCoords = clamp(vUv + parallaxOffset, vec2(0.001), vec2(0.999));
        }

        vec4 texColor = texture2D(uTexture, uvCoords);

        // Discard pure transparent outer areas
        if (texColor.a < 0.015) discard;

        // 2. Soft Edge Vignette & Seamless Background Dissolve
        // Fade bottom 30% of the image with a smooth gradient curve so body dissolves into dark background
        float bottomFade = smoothstep(0.0, 0.30, uvCoords.y);

        // Soft top fade
        float topFade = smoothstep(1.0, 0.90, uvCoords.y);

        // Soft left & right side vignette (no hard rectangle box ever visible)
        float distFromCenterX = abs(uvCoords.x - 0.5) * 2.0;
        float sideFade = smoothstep(1.0, 0.70, distFromCenterX);

        float edgeAlpha = bottomFade * topFade * sideFade;

        // 3. Alpha Decontamination: strip light grey/white background bleed from perimeter pixels
        // Target dark background tone (#050507)
        vec3 darkBg = vec3(0.02, 0.02, 0.027);
        float decontamFactor = smoothstep(0.03, 0.70, texColor.a);
        vec3 cleanRgb = mix(darkBg, texColor.rgb, decontamFactor);

        // 4. Color Grading: Deepen contrast and cool tone to match site atmosphere
        cleanRgb = pow(cleanRgb, vec3(1.08));
        cleanRgb *= vec3(0.93, 0.95, 0.99); // subtle cool undertone

        // 5. Cursor-driven Key Light & Electric Lime (#c8ff00) Rim Light
        vec3 lightPos = vec3(uMouse.x * 3.5 + 1.2, uMouse.y * 3.0 + 1.6, 3.2);
        vec3 lightDir = normalize(lightPos - vWorldPosition);

        // Calculate surface normal approximation from depth gradients
        float dX = texture2D(uDepthMap, clamp(uvCoords + vec2(0.004, 0.0), 0.0, 1.0)).r - 
                   texture2D(uDepthMap, clamp(uvCoords - vec2(0.004, 0.0), 0.0, 1.0)).r;
        float dY = texture2D(uDepthMap, clamp(uvCoords + vec2(0.0, 0.004), 0.0, 1.0)).r - 
                   texture2D(uDepthMap, clamp(uvCoords - vec2(0.0, 0.004), 0.0, 1.0)).r;
        vec3 surfaceNormal = normalize(vec3(-dX * 2.2, -dY * 2.2, 1.0));

        // Diffuse factor
        float diff = max(dot(surfaceNormal, lightDir), 0.0);

        // Specular highlight following mouse
        vec3 viewDir = normalize(vec3(0.0, 0.0, 6.5) - vWorldPosition);
        vec3 halfDir = normalize(lightDir + viewDir);
        float spec = pow(max(dot(surfaceNormal, halfDir), 0.0), 18.0) * 0.22;

        // Subtle electric lime rim light on silhouette edges (#c8ff00)
        float rim = 1.0 - max(dot(viewDir, surfaceNormal), 0.0);
        rim = pow(rim, 3.8) * vDepth;
        vec3 limeRim = vec3(0.784, 1.0, 0.0) * (rim * 0.36 + spec * 0.20); // #c8ff00

        vec3 finalColor = cleanRgb * (0.86 + diff * 0.22) + limeRim;
        float finalAlpha = texColor.a * edgeAlpha * uOpacity;

        gl_FragColor = vec4(finalColor, finalAlpha);
      }
    `;

    // =========================================================================
    // Responsive Placement and Sizing: Positioned prominently in right column
    // in place of the Developer Card (and behind text on mobile)
    // =========================================================================
    const getResponsiveConfig = (w: number, h: number) => {
      const visibleHeight = 2.0 * Math.tan((45 * Math.PI) / 360) * 6.5;
      const visibleWidth = visibleHeight * (w / h);

      if (w < 768) {
        // Mobile (< 768px): Single-column stacked layout.
        // Portrait sits softly behind text at low opacity (0.22) so text stays 100% readable.
        return {
          scale: 2.15,
          x: 0.0,
          y: -0.15,
          opacity: 0.22,
        };
      } else if (w < 1024) {
        // Tablet Portrait (768px - 1023px): Single-column stacked layout.
        return {
          scale: 2.10,
          x: 0.0,
          y: -0.12,
          opacity: 0.22,
        };
      } else if (w < 1280) {
        // Tablet Landscape (1024px - 1279px): Two-column layout.
        // Positioned directly in the right column where the Developer Card used to be.
        const padding = 32;
        const contentWidth = w - padding * 2;
        const rightEdge = w - padding;
        const rightColCenter = rightEdge - (contentWidth * (5 / 12)) / 2;
        const pixelOffsetFromCenter = rightColCenter - w / 2;
        const posX = (pixelOffsetFromCenter / w) * visibleWidth;

        return {
          scale: 2.05,
          x: posX,
          y: 0.02,
          opacity: 1.0,
        };
      } else {
        // Desktop (>= 1280px, e.g. 1440px): Full two-column layout.
        // Centered prominently in the right column in place of the Developer Card.
        const padding = 32;
        const contentWidth = 1280 - padding * 2;
        const rightEdge = w / 2 + 640 - padding;
        const rightColCenter = rightEdge - (contentWidth * (5 / 12)) / 2;
        const pixelOffsetFromCenter = rightColCenter - w / 2;
        const posX = (pixelOffsetFromCenter / w) * visibleWidth;

        return {
          scale: 2.45,
          x: posX,
          y: 0.02,
          opacity: 1.0,
        };
      }
    };

    let activeConfig = getResponsiveConfig(width, height);

    const baseMeshW = 1.0;
    const baseMeshH = baseMeshW / PORTRAIT_ASSET.aspectRatio;
    const segments = isMobile ? 32 : 96;

    const portraitGeometry = new THREE.PlaneGeometry(baseMeshW, baseMeshH, segments, segments);
    const portraitMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: cutoutTexture },
        uDepthMap: { value: depthTexture },
        uDepthStrength: { value: HERO_3D_CONFIG.depthStrength },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0 },
        uIdleSpeed: { value: HERO_3D_CONFIG.idleSpeed },
        uMotion: { value: motionEnabled ? 1.0 : 0.0 },
        uOpacity: { value: activeConfig.opacity },
      },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const portraitMesh = new THREE.Mesh(portraitGeometry, portraitMaterial);
    portraitMesh.scale.set(activeConfig.scale, activeConfig.scale, 1);
    portraitMesh.position.set(activeConfig.x, activeConfig.y, 0);
    if (HERO_3D_CONFIG.renderPortraitMesh) {
      heroGroup.add(portraitMesh);
    }

    // =========================================================================
    // Faint Atmospheric Glow behind head & Ambient Particles (No Torus Rings)
    // =========================================================================
    // Subtle lime key glow directly behind the head
    const headGlowLight = new THREE.PointLight(0xc8ff00, 2.0, 6.0);
    headGlowLight.position.set(activeConfig.x, activeConfig.y + 0.5 * (activeConfig.scale / 1.5), -0.4);
    scene.add(headGlowLight);

    // Key Lights positioned relative to portrait
    const keyLimeLight = new THREE.PointLight(0xc8ff00, 2.8, 12);
    keyLimeLight.position.set(activeConfig.x + 1.2, activeConfig.y + 2.0, 3.5);
    scene.add(keyLimeLight);

    const rimLight = new THREE.PointLight(0x38bdf8, 1.8, 10);
    rimLight.position.set(activeConfig.x - 2.5, activeConfig.y - 1.2, -0.5);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.85);
    dirLight.position.set(0, 4, 5);
    scene.add(dirLight);

    // Ambient floating particles behind the scene
    const particleCount = isMobile ? 50 : 120;
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.0 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePos[i] = portraitMesh.position.x + radius * Math.cos(theta) * Math.cos(phi);
      particlePos[i + 1] = portraitMesh.position.y + radius * Math.sin(phi);
      particlePos[i + 2] = radius * Math.sin(theta) * Math.cos(phi) - 0.4;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.016,
      color: 0xc8ff00,
      transparent: true,
      opacity: 0.30,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    heroGroup.add(particleSystem);

    // =========================================================================
    // Mouse Interaction, Smooth Lerping & Scroll Driving
    // =========================================================================
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let targetScroll = 0;
    let currentScroll = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const handlePointerMove = (e: MouseEvent) => {
      if (!motionEnabled) return;
      const sens = HERO_3D_CONFIG.mouseSensitivity;
      targetMouseX = ((e.clientX - windowHalfX) / windowHalfX) * 0.85 * sens;
      targetMouseY = ((e.clientY - windowHalfY) / windowHalfY) * 0.85 * sens;
    };

    const handleScroll = () => {
      targetScroll = (window.scrollY / window.innerHeight) * 1.8;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container || isDisposed) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      // Dynamically update responsive mesh scale, position, and opacity
      activeConfig = getResponsiveConfig(w, h);
      portraitMesh.scale.set(activeConfig.scale, activeConfig.scale, 1);
      portraitMesh.position.x = activeConfig.x;
      portraitMesh.position.y = activeConfig.y;
      portraitMaterial.uniforms.uOpacity.value = activeConfig.opacity;
      headGlowLight.position.x = activeConfig.x;
      headGlowLight.position.y = activeConfig.y + 0.5 * (activeConfig.scale / 1.5);
      keyLimeLight.position.set(activeConfig.x + 1.2, activeConfig.y + 2.0, 3.5);
      rimLight.position.set(activeConfig.x - 2.5, activeConfig.y - 1.2, -0.5);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Easing (Lerp) for mouse and scroll
      if (motionEnabled) {
        currentMouseX += (targetMouseX - currentMouseX) * 0.06;
        currentMouseY += (targetMouseY - currentMouseY) * 0.06;
        currentScroll += (targetScroll - currentScroll) * 0.08;

        // Update Shader Uniforms
        portraitMaterial.uniforms.uTime.value = elapsedTime;
        portraitMaterial.uniforms.uMouse.value.set(currentMouseX, -currentMouseY);
        portraitMaterial.uniforms.uMotion.value = 1.0;

        // 3D Perspective Tilt on portrait mesh (gentle tilt keeps face sharp)
        portraitMesh.rotation.y = currentMouseX * 0.28;
        portraitMesh.rotation.x = currentMouseY * 0.20;

        // Scroll Parallax Driver: moves portrait down, scales, and dims slightly
        portraitMesh.position.y = activeConfig.y - currentScroll * 1.35;
        portraitMesh.position.z = -currentScroll * 0.75;
        portraitMesh.position.x = activeConfig.x;
        headGlowLight.position.y = portraitMesh.position.y + 0.5 * (activeConfig.scale / 1.5);
        headGlowLight.position.x = portraitMesh.position.x;

        // Ambient Floating Particles
        particleSystem.rotation.y = elapsedTime * 0.035;
      } else {
        // Motion is turned off: freeze in clean baseline orientation
        portraitMaterial.uniforms.uMotion.value = 0.0;
        portraitMaterial.uniforms.uMouse.value.set(0, 0);
        portraitMesh.rotation.set(0, 0, 0);
        portraitMesh.position.set(activeConfig.x, activeConfig.y, 0);
        headGlowLight.position.set(activeConfig.x, activeConfig.y + 0.5 * (activeConfig.scale / 1.5), -0.4);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount or when motion toggles
    return () => {
      isDisposed = true;
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      portraitGeometry.dispose();
      portraitMaterial.dispose();
      if (cutoutTexture) cutoutTexture.dispose();
      if (depthTexture) depthTexture.dispose();

      particleGeo.dispose();
      particleMat.dispose();

      renderer.dispose();
      if (container && renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [motionEnabled]);

  return (
    <div className="relative w-full h-full min-h-[460px] lg:min-h-[640px] flex items-center justify-center pointer-events-none">
      {/* Three.js WebGL Canvas Mount */}
      <div
        ref={mountRef}
        className={`absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Atmospheric Faint Glow directly behind head area */}
      <div className="absolute right-[8%] sm:right-[14%] top-[18%] w-80 h-80 sm:w-[450px] sm:h-[450px] rounded-full bg-lime/10 blur-[130px] pointer-events-none -z-10" />

      {/* WebGL Fallback / Initial Paint Placeholder (No hard rectangle) */}
      {HERO_3D_CONFIG.renderPortraitMesh && (!webGlSupported || !isLoaded) && (
        <div className="relative z-10 p-6 text-center max-w-sm pointer-events-auto">
          <img
            src={PORTRAIT_ASSET.cutoutFallback}
            alt="Mazhar Husain Shaikh"
            className="w-48 h-64 object-cover mx-auto filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
          />
        </div>
      )}

      {/* =========================================================================
          Discreet Motion Control Pill (Respects user preference & accessibility)
          ========================================================================= */}
      <div className="absolute bottom-6 right-6 lg:right-12 z-30 pointer-events-auto flex items-center gap-2 p-1 rounded-lg bg-dark-950/80 backdrop-blur-md border border-zinc-800/80 shadow-2xl text-[11px] font-mono">
        <button
          onClick={() => setMotionEnabled(!motionEnabled)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-all ${
            motionEnabled
              ? 'bg-dark-900/90 border-lime/40 text-lime hover:bg-lime/10'
              : 'bg-dark-900/90 border-zinc-700 text-zinc-400 hover:text-zinc-200'
          }`}
          title={motionEnabled ? 'Turn Motion Off' : 'Turn Motion On'}
        >
          {motionEnabled ? (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>Motion: ON</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              <span>Motion: OFF</span>
            </>
          )}
        </button>

        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-dark-900/60 text-zinc-500 text-[10px]">
          <Sparkles className="w-3 h-3 text-lime" />
          <span>3D Parallax</span>
        </div>
      </div>
    </div>
  );
};
