/**
 * =========================================================================
 * code-reveal.js
 * Image-to-Character Reveal Effect inspired by Razorpay AI Builders.
 * Converts image pixels to luminance-mapped monospace characters expanding
 * outward from cursor position as a wave, returning to photo when cursor leaves.
 *
 * SETTINGS EXPOSED AT TOP:
 * =========================================================================
 */

(function () {
  'use strict';

  // SETTINGS AT TOP OF FILE
  const HERO_PORTRAIT_CONFIG = {
    CELL_SIZE: 7, // Cell size in px (desktop: 7, mobile: 9)
    CHAR_RAMP: " .`',-~:;=+!|/{}<>01oasYXCZ#@$%MW8B",
    COLOR_MODE: 'lime', // 'lime' | 'photo-tint'
    WAVE_SPEED: 2.2, // Speed of expansion wave from cursor
    GLOW_RADIUS: 95, // Cursor radial glow radius in px
    FLICKER_AMOUNT: 0.04, // Fraction of characters flickering near cursor per frame
    INVERT_BRIGHTNESS: false,
  };

  class RazorpayAsciiReveal {
    constructor(container) {
      this.container = container;
      this.img = container.querySelector('img');
      this.canvas = null;
      this.ctx = null;
      this.cells = [];
      this.waveProgress = 0;
      this.pointerX = 0;
      this.pointerY = 0;
      this.targetPointerX = 0;
      this.targetPointerY = 0;
      this.isPointerInside = false;
      this.maxCornerDist = 400;
      this.animating = false;
      this.lastTime = performance.now();
      this.rafId = null;
      this.dpr = 1;

      this.init();
    }

    init() {
      let canvas = this.container.querySelector('canvas.code-reveal__canvas');
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.className = 'code-reveal__canvas';
        canvas.style.position = 'absolute';
        canvas.style.inset = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '10';
        this.container.appendChild(canvas);
      }
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');

      const setupImage = () => {
        this.updateSize();
      };

      if (this.img) {
        if (this.img.complete && this.img.naturalWidth > 0) {
          setupImage();
        } else {
          this.img.addEventListener('load', setupImage);
        }
      }

      this.boundPointerMove = this.onPointerMove.bind(this);
      this.boundPointerLeave = this.onPointerLeave.bind(this);
      this.boundTouchStart = this.onTouchStart.bind(this);
      this.boundTouchMove = this.onTouchMove.bind(this);

      this.container.addEventListener('pointermove', this.boundPointerMove);
      this.container.addEventListener('pointerenter', this.boundPointerMove);
      this.container.addEventListener('pointerleave', this.boundPointerLeave);
      this.container.addEventListener('touchstart', this.boundTouchStart, { passive: true });
      this.container.addEventListener('touchmove', this.boundTouchMove, { passive: true });

      this.resizeObserver = new ResizeObserver(() => this.updateSize());
      this.resizeObserver.observe(this.container);
    }

    updateSize() {
      if (!this.container || !this.canvas || !this.img) return;
      const rect = this.container.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      if (w <= 0 || h <= 0) return;

      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = Math.floor(w * this.dpr);
      this.canvas.height = Math.floor(h * this.dpr);
      this.canvasW = w;
      this.canvasH = h;
      this.maxCornerDist = Math.hypot(w, h);

      this.computeGrid(w, h);
    }

    computeGrid(width, height) {
      const isMobile = width < 768;
      const cellW = isMobile ? 9 : HERO_PORTRAIT_CONFIG.CELL_SIZE;
      const cellH = Math.max(8, Math.round(cellW / 0.58));
      const cols = Math.floor(width / cellW);
      const rows = Math.floor(height / cellH);

      if (cols <= 0 || rows <= 0) return;

      const offCanvas = document.createElement('canvas');
      offCanvas.width = cols;
      offCanvas.height = rows;
      const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.drawImage(this.img, 0, 0, cols, rows);
      const imgData = offCtx.getImageData(0, 0, cols, rows).data;

      const ramp = HERO_PORTRAIT_CONFIG.CHAR_RAMP;
      const rampLen = ramp.length;
      const cells = [];

      const hash = (x, y, seed) => {
        const v = Math.sin(x * 12.9898 + y * 78.233 + seed * 37.719) * 43758.5453;
        return v - Math.floor(v);
      };

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = (r * cols + c) * 4;
          const alpha = imgData[idx + 3] / 255;
          if (alpha < 0.06) continue;

          const red = imgData[idx];
          const green = imgData[idx + 1];
          const blue = imgData[idx + 2];

          let lum = Math.sqrt(
            (red / 255) * 0.2126 +
            (green / 255) * 0.7152 +
            (blue / 255) * 0.0722
          ) * alpha;

          if (HERO_PORTRAIT_CONFIG.INVERT_BRIGHTNESS) {
            lum = Math.max(0, 1 - lum);
          }

          const charIndex = Math.min(rampLen - 1, Math.max(1, Math.round(lum * (rampLen - 1))));

          cells.push({
            x: c * cellW,
            y: r * cellH,
            lum,
            charIndex,
            threshold: hash(c, r, 0) * 0.35,
            dx: (hash(c, r, 1) * 2 - 1) * 6,
            dy: (hash(c, r, 2) * 2 - 1) * 6,
            cr: red,
            cg: green,
            cb: blue,
          });
        }
      }

      this.cells = cells;
      this.cellW = cellW;
      this.cellH = cellH;
    }

    onPointerMove(e) {
      const rect = this.container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.targetPointerX = x;
      this.targetPointerY = y;
      if (!this.isPointerInside) {
        this.pointerX = x;
        this.pointerY = y;
        this.isPointerInside = true;
      }
      this.startLoop();
    }

    onPointerLeave() {
      this.isPointerInside = false;
      this.startLoop();
    }

    onTouchStart(e) {
      if (!e.touches[0]) return;
      const rect = this.container.getBoundingClientRect();
      const t = e.touches[0];
      const x = t.clientX - rect.left;
      const y = t.clientY - rect.top;
      this.targetPointerX = x;
      this.targetPointerY = y;
      this.pointerX = x;
      this.pointerY = y;
      this.isPointerInside = !this.isPointerInside;
      this.startLoop();
    }

    onTouchMove(e) {
      if (!e.touches[0]) return;
      const rect = this.container.getBoundingClientRect();
      const t = e.touches[0];
      this.targetPointerX = t.clientX - rect.left;
      this.targetPointerY = t.clientY - rect.top;
      this.isPointerInside = true;
      this.startLoop();
    }

    startLoop() {
      if (!this.animating) {
        this.animating = true;
        this.lastTime = performance.now();
        this.rafId = requestAnimationFrame(this.render.bind(this));
      }
    }

    render(now) {
      if (!this.ctx) return;
      const dt = Math.min(0.06, (now - this.lastTime) / 1000);
      this.lastTime = now;

      this.pointerX += (this.targetPointerX - this.pointerX) * 0.25;
      this.pointerY += (this.targetPointerY - this.pointerY) * 0.25;

      const waveTarget = this.isPointerInside ? 1.0 : 0.0;
      const waveSpeed = this.isPointerInside ? HERO_PORTRAIT_CONFIG.WAVE_SPEED : 1.6;

      if (this.waveProgress < waveTarget) {
        this.waveProgress = Math.min(waveTarget, this.waveProgress + waveSpeed * dt);
      } else if (this.waveProgress > waveTarget) {
        this.waveProgress = Math.max(waveTarget, this.waveProgress - waveSpeed * dt);
      }

      const progress = this.waveProgress;
      const ctx = this.ctx;
      const dpr = this.dpr;
      const w = this.canvasW;
      const h = this.canvasH;

      if (this.img) {
        this.img.style.opacity = `${Math.max(0, 1.0 - progress * 1.15)}`;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      if (progress > 0.001) {
        const cells = this.cells;
        const cellW = this.cellW;
        const cellH = this.cellH;
        const ramp = HERO_PORTRAIT_CONFIG.CHAR_RAMP;
        const rampLen = ramp.length;
        const ptrX = this.pointerX;
        const ptrY = this.pointerY;
        const maxDist = this.maxCornerDist;
        const isLime = HERO_PORTRAIT_CONFIG.COLOR_MODE === 'lime';
        const flickerAmt = HERO_PORTRAIT_CONFIG.FLICKER_AMOUNT;

        ctx.font = `600 ${cellH}px "JetBrains Mono", Courier, monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const waveFront = progress * 1.42;

        for (let i = 0; i < cells.length; i++) {
          const cell = cells[i];
          const dx = cell.x + cellW * 0.5 - ptrX;
          const dy = cell.y + cellH * 0.5 - ptrY;
          const dist = Math.hypot(dx, dy);
          const normDist = dist / maxDist;

          const cellFront = waveFront - normDist - cell.threshold;
          const cellT = Math.max(0, Math.min(1, cellFront / 0.28));
          if (cellT <= 0.005) continue;

          const easeT = cellT * cellT * (3 - 2 * cellT);
          const drawX = cell.x + cellW * 0.5 + cell.dx * (1 - easeT);
          const drawY = cell.y + cellH * 0.5 + cell.dy * (1 - easeT);

          let cIdx = cell.charIndex;
          if (dist < HERO_PORTRAIT_CONFIG.GLOW_RADIUS * 1.4 && Math.random() < flickerAmt) {
            cIdx = Math.floor(Math.random() * rampLen);
          }
          const char = ramp[cIdx] || '1';
          const charAlpha = easeT * Math.min(1.0, 0.35 + cell.lum * 0.75);

          if (isLime) {
            ctx.fillStyle = `rgba(200, 255, 0, ${charAlpha})`;
          } else {
            const mixR = Math.round(200 * 0.65 + cell.cr * 0.35);
            const mixG = Math.round(255 * 0.65 + cell.cg * 0.35);
            const mixB = Math.round(0 * 0.65 + cell.cb * 0.35);
            ctx.fillStyle = `rgba(${mixR}, ${mixG}, ${mixB}, ${charAlpha})`;
          }

          ctx.fillText(char, drawX, drawY);
        }

        if (this.isPointerInside) {
          const flicker = 1.0 + (Math.random() - 0.5) * 0.16;
          const glowRadius = HERO_PORTRAIT_CONFIG.GLOW_RADIUS * flicker;
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

      if (progress > 0.0001 || this.isPointerInside) {
        this.rafId = requestAnimationFrame(this.render.bind(this));
      } else {
        this.animating = false;
        if (this.img) this.img.style.opacity = '1';
      }
    }

    disable() {
      this.isPointerInside = false;
      this.waveProgress = 0;
      if (this.rafId) cancelAnimationFrame(this.rafId);
      this.animating = false;
      if (this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (this.img) this.img.style.opacity = '1';
    }

    enable() {
      this.updateSize();
    }
  }

  const instances = [];

  window.CodeReveal = {
    CONFIG: HERO_PORTRAIT_CONFIG,
    init(target) {
      const elements = target ? (typeof target === 'string' ? document.querySelectorAll(target) : [target]) : document.querySelectorAll('[data-code-reveal]');
      elements.forEach(el => {
        if (!el.__asciiReveal) {
          const inst = new RazorpayAsciiReveal(el);
          el.__asciiReveal = inst;
          instances.push(inst);
        }
      });
    },
    enable() {
      instances.forEach(i => i.enable());
    },
    disable() {
      instances.forEach(i => i.disable());
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.CodeReveal.init());
  } else {
    setTimeout(() => window.CodeReveal.init(), 60);
  }
})();
