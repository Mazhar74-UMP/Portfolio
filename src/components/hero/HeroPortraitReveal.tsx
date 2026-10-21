import React, { useEffect, useRef, useCallback } from 'react';

// =========================================================================
// SETTINGS AT THE TOP OF THE FILE
// =========================================================================
const CELL_SIZE = 7; // Cell size in px (desktop: 7, mobile: 9)
const CHAR_RAMP = " .`',-~:;=+!|/{}<>01oasYXCZ#@$%MW8B"; // Luminance-to-character ramp with code chars
const COLOR_MODE: 'lime' | 'photo-tint' = 'lime'; // 'lime' | 'photo-tint'
const WAVE_SPEED = 2.2; // Speed of expansion wave from cursor
const GLOW_RADIUS = 95; // Cursor radial glow radius in px
const FLICKER_AMOUNT = 0.04; // Fraction of characters flickering near cursor per frame
const INVERT_BRIGHTNESS = false; // Invert luminance mapping

interface HeroPortraitRevealProps {
  motionReduced?: boolean;
}

interface CellData {
  col: number;
  row: number;
  x: number;
  y: number;
  lum: number;
  charIndex: number;
  threshold: number;
  dx: number;
  dy: number;
  cr: number;
  cg: number;
  cb: number;
}

export const HeroPortraitReveal: React.FC<HeroPortraitRevealProps> = ({ motionReduced = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Animation & simulation state stored in refs for 60fps performance
  const stateRef = useRef({
    waveProgress: 0,
    pointerX: 0,
    pointerY: 0,
    targetPointerX: 0,
    targetPointerY: 0,
    isPointerInside: false,
    maxCornerDist: 400,
    cells: [] as CellData[],
    cols: 0,
    rows: 0,
    cellW: 7,
    cellH: 12,
    canvasW: 0,
    canvasH: 0,
    dpr: 1,
    animating: false,
    lastTime: performance.now(),
    imageObj: null as HTMLImageElement | null,
    rafId: 0,
  });

  // 1. Process image pixels into grid data (computed once)
  const computeGrid = useCallback((img: HTMLImageElement, width: number, height: number) => {
    const isMobile = width < 768;
    const cellW = isMobile ? 9 : CELL_SIZE;
    // Monospace font character aspect ratio (approx 0.58 width/height)
    const cellH = Math.max(8, Math.round(cellW / 0.58));

    const cols = Math.floor(width / cellW);
    const rows = Math.floor(height / cellH);

    if (cols <= 0 || rows <= 0) return;

    // Offscreen canvas to sample luminance and colors
    const offCanvas = document.createElement('canvas');
    offCanvas.width = cols;
    offCanvas.height = rows;
    const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
    if (!offCtx) return;

    offCtx.drawImage(img, 0, 0, cols, rows);
    const imgData = offCtx.getImageData(0, 0, cols, rows).data;

    const ramp = CHAR_RAMP;
    const rampLen = ramp.length;
    const cells: CellData[] = [];

    // Pseudo-random hash for spatial offsets and threshold stagger
    const hash = (x: number, y: number, seed: number) => {
      const v = Math.sin(x * 12.9898 + y * 78.233 + seed * 37.719) * 43758.5453;
      return v - Math.floor(v);
    };

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = (r * cols + c) * 4;
        const alpha = imgData[idx + 3] / 255;

        // Skip completely transparent outer background pixels
        if (alpha < 0.06) continue;

        const red = imgData[idx];
        const green = imgData[idx + 1];
        const blue = imgData[idx + 2];

        // Perceptual luminance calculation (ITU-R BT.709)
        let lum = Math.sqrt(
          (red / 255) * 0.2126 +
          (green / 255) * 0.7152 +
          (blue / 255) * 0.0722
        ) * alpha;

        if (INVERT_BRIGHTNESS) {
          lum = Math.max(0, 1 - lum);
        }

        // Map to character index
        const charIndex = Math.min(rampLen - 1, Math.max(1, Math.round(lum * (rampLen - 1))));

        cells.push({
          col: c,
          row: r,
          x: c * cellW,
          y: r * cellH,
          lum,
          charIndex,
          threshold: hash(c, r, 0) * 0.35, // threshold variation for organic edge entry
          dx: (hash(c, r, 1) * 2 - 1) * 6, // subtle drift offset
          dy: (hash(c, r, 2) * 2 - 1) * 6,
          cr: red,
          cg: green,
          cb: blue,
        });
      }
    }

    const state = stateRef.current;
    state.cells = cells;
    state.cols = cols;
    state.rows = rows;
    state.cellW = cellW;
    state.cellH = cellH;
    state.canvasW = width;
    state.canvasH = height;
    state.maxCornerDist = Math.hypot(width, height);
  }, []);

  // 2. Render Loop (Only runs while transitioning or active)
  const renderFrame = useCallback((now: number) => {
    const canvas = canvasRef.current;
    const imgEl = imgRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state = stateRef.current;
    const dt = Math.min(0.06, (now - state.lastTime) / 1000);
    state.lastTime = now;

    // Smooth lerp pointer coords towards target
    state.pointerX += (state.targetPointerX - state.pointerX) * 0.25;
    state.pointerY += (state.targetPointerY - state.pointerY) * 0.25;

    // Progress wave expansion / retraction
    const waveTarget = state.isPointerInside ? 1.0 : 0.0;
    const waveSpeed = state.isPointerInside ? WAVE_SPEED : 1.6;

    if (state.waveProgress < waveTarget) {
      state.waveProgress = Math.min(waveTarget, state.waveProgress + waveSpeed * dt);
    } else if (state.waveProgress > waveTarget) {
      state.waveProgress = Math.max(waveTarget, state.waveProgress - waveSpeed * dt);
    }

    const progress = state.waveProgress;
    const dpr = state.dpr;
    const width = state.canvasW;
    const height = state.canvasH;

    // Fade underlying photo smoothly as characters take over
    if (imgEl) {
      imgEl.style.opacity = `${Math.max(0, 1.0 - progress * 1.15)}`;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    if (progress > 0.001) {
      const cells = state.cells;
      const cellW = state.cellW;
      const cellH = state.cellH;
      const ramp = CHAR_RAMP;
      const rampLen = ramp.length;
      const ptrX = state.pointerX;
      const ptrY = state.pointerY;
      const maxDist = state.maxCornerDist;
      const isLime = COLOR_MODE === 'lime';
      const flickerAmt = FLICKER_AMOUNT;

      ctx.font = `600 ${cellH}px "JetBrains Mono", Courier, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Wave expansion front: 0 -> 1.4 guarantees whole body is covered
      const waveFront = progress * 1.42;

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];

        // Distance from cursor
        const dx = cell.x + cellW * 0.5 - ptrX;
        const dy = cell.y + cellH * 0.5 - ptrY;
        const dist = Math.hypot(dx, dy);
        const normDist = dist / maxDist;

        // Individual cell transition value based on expanding radial wave + threshold stagger
        const cellFront = waveFront - normDist - cell.threshold;
        const cellT = Math.max(0, Math.min(1, cellFront / 0.28));

        if (cellT <= 0.005) continue;

        // Cubic ease for smooth character emergence
        const easeT = cellT * cellT * (3 - 2 * cellT);

        // Organic position drift during entry
        const drawX = cell.x + cellW * 0.5 + cell.dx * (1 - easeT);
        const drawY = cell.y + cellH * 0.5 + cell.dy * (1 - easeT);

        // Pick character (with subtle cursor-proximity flicker)
        let cIdx = cell.charIndex;
        if (dist < GLOW_RADIUS * 1.4 && Math.random() < flickerAmt) {
          cIdx = Math.floor(Math.random() * rampLen);
        }
        const char = ramp[cIdx] || '1';

        // Color & alpha modulation
        const charAlpha = easeT * Math.min(1.0, 0.35 + cell.lum * 0.75);

        if (isLime) {
          ctx.fillStyle = `rgba(200, 255, 0, ${charAlpha})`;
        } else {
          // Photo-tint mode: mix lime (#c8ff00) with photo's sampled RGB
          const mixR = Math.round(200 * 0.65 + cell.cr * 0.35);
          const mixG = Math.round(255 * 0.65 + cell.cg * 0.35);
          const mixB = Math.round(0 * 0.65 + cell.cb * 0.35);
          ctx.fillStyle = `rgba(${mixR}, ${mixG}, ${mixB}, ${charAlpha})`;
        }

        ctx.fillText(char, drawX, drawY);
      }

      // Cursor Radial Glow & Light Flicker
      if (state.isPointerInside) {
        const flicker = 1.0 + (Math.random() - 0.5) * 0.16;
        const glowRadius = GLOW_RADIUS * flicker;
        const glow = ctx.createRadialGradient(ptrX, ptrY, 0, ptrX, ptrY, glowRadius);
        glow.addColorStop(0, 'rgba(200, 255, 0, 0.22)');
        glow.addColorStop(0.45, 'rgba(200, 255, 0, 0.07)');
        glow.addColorStop(1, 'rgba(200, 255, 0, 0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(ptrX, ptrY, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();

    // Continue loop if active or transitioning
    if (progress > 0.0001 || state.isPointerInside) {
      state.rafId = requestAnimationFrame(renderFrame);
    } else {
      state.animating = false;
      if (imgEl) imgEl.style.opacity = '1';
    }
  }, []);

  const startAnimation = useCallback(() => {
    const state = stateRef.current;
    if (!state.animating) {
      state.animating = true;
      state.lastTime = performance.now();
      state.rafId = requestAnimationFrame(renderFrame);
    }
  }, [renderFrame]);

  // Handle pointer enter/move
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (motionReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const state = stateRef.current;
    state.targetPointerX = x;
    state.targetPointerY = y;
    if (!state.isPointerInside) {
      state.pointerX = x;
      state.pointerY = y;
      state.isPointerInside = true;
    }
    startAnimation();
  };

  const handlePointerLeave = () => {
    const state = stateRef.current;
    state.isPointerInside = false;
    startAnimation();
  };

  // Touch device toggle support
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (motionReduced || !e.touches[0]) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const state = stateRef.current;
    state.targetPointerX = x;
    state.targetPointerY = y;
    state.pointerX = x;
    state.pointerY = y;

    // Toggle on tap
    state.isPointerInside = !state.isPointerInside;
    startAnimation();
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (motionReduced || !e.touches[0]) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const state = stateRef.current;
    state.targetPointerX = touch.clientX - rect.left;
    state.targetPointerY = touch.clientY - rect.top;
    state.isPointerInside = true;
    startAnimation();
  };

  // 3. Initialize & Handle Resize
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      if (w <= 0 || h <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      stateRef.current.dpr = dpr;

      if (stateRef.current.imageObj) {
        computeGrid(stateRef.current.imageObj, w, h);
      }
    };

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    // Preload & process image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/images/portrait-main-cutout.webp';
    img.onload = () => {
      stateRef.current.imageObj = img;
      updateSize();
    };
    img.onerror = () => {
      // Fallback to png cutout
      img.src = '/images/portrait-main-cutout.png';
      img.onload = () => {
        stateRef.current.imageObj = img;
        updateSize();
      };
    };

    // Pause when off-screen
    const intersectionObserver = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (!entry.isIntersecting && stateRef.current.animating) {
        cancelAnimationFrame(stateRef.current.rafId);
        stateRef.current.animating = false;
      }
    }, { rootMargin: '100px' });
    intersectionObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (stateRef.current.rafId) {
        cancelAnimationFrame(stateRef.current.rafId);
      }
    };
  }, [computeGrid]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className="relative rounded-2xl overflow-hidden max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] w-full border border-surface-border/60 bg-dark-950/40 backdrop-blur-sm shadow-2xl transition-all duration-300 hover:border-lime/40 select-none touch-pan-y cursor-crosshair group"
      style={{ aspectRatio: '799 / 1024' }}
    >
      {/* Base Clean Photo (Zero distortion, fades out as characters expand) */}
      <img
        ref={imgRef}
        src="/images/portrait-main-cutout.webp"
        alt="Mazhar Husain Shaikh"
        className="absolute inset-0 w-full h-full object-contain mx-auto filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] pointer-events-none transition-opacity duration-200"
        style={{ opacity: motionReduced ? 1 : undefined }}
      />

      {/* 2D ASCII & Code Character Canvas Overlay */}
      {!motionReduced && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />
      )}

      {/* Subtle Bottom Ambient Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none z-20" />
    </div>
  );
};
