"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * ScrollVideo — Ultra-smooth scroll-driven image sequence.
 *
 * Preloads all frame images into memory, then draws the appropriate frame
 * onto a <canvas> based on scroll position. This is the same technique
 * Apple uses on their product pages — zero jank, instant response.
 *
 * Frames: public/frames/ezgif-frame-001.jpg to ezgif-frame-041.jpg (41 frames)
 */

const TOTAL_FRAMES = 41;

/** Build the URL for a given frame index (1-based) */
function getFrameSrc(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/frames/ezgif-frame-${padded}.jpg`;
}

export default function ScrollVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef<number>(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // ── Preload all frame images ──
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const onLoad = () => {
      loaded++;
      setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
      if (loaded === TOTAL_FRAMES) {
        imagesRef.current = images;
        setIsLoaded(true);
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i + 1);
      img.onload = onLoad;
      img.onerror = onLoad; // Count errors too so loading always completes
      images[i] = img;
    }
  }, []);

  // ── Resize canvas to fill viewport ──
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // ── Draw frame with object-fit: cover behavior ──
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas || !images.length) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const img = images[frameIndex];
    if (!img || !img.complete || !img.naturalWidth) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const imgAspect = iw / ih;
    const canvasAspect = cw / ch;

    let drawW: number, drawH: number, offsetX: number, offsetY: number;

    if (canvasAspect > imgAspect) {
      // Canvas wider — fit width, crop height
      drawW = cw;
      drawH = cw / imgAspect;
      offsetX = 0;
      offsetY = (ch - drawH) / 2;
    } else {
      // Canvas taller — fit height, crop width
      drawH = ch;
      drawW = ch * imgAspect;
      offsetX = (cw - drawW) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }, []);

  // ── Scroll → frame index mapping + rAF render loop ──
  useEffect(() => {
    if (!isLoaded) return;

    // Draw initial frame
    drawFrame(0);

    const onScroll = () => {
      const vh = window.innerHeight;
      // Map scroll 0 → 3vh to frame 0 → last frame
      const progress = Math.min(Math.max(window.scrollY / (vh * 3), 0), 1);
      const frameIndex = Math.min(
        Math.round(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );

      // Only redraw if frame actually changed
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        // Use rAF for jank-free rendering
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Set initial frame based on current scroll

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [isLoaded, drawFrame]);

  return (
    <div className="video-container">
      {/* Loading progress */}
      {!isLoaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a0a0a",
            zIndex: 3,
            gap: "1.25rem",
          }}
        >
          <div className="loading-spinner" />
          <p
            style={{
              color: "#555",
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            Carregando... {loadProgress}%
          </p>
          {/* Progress bar */}
          <div
            style={{
              width: "12rem",
              height: "2px",
              background: "rgba(255,255,255,0.08)",
              borderRadius: "1px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${loadProgress}%`,
                height: "100%",
                background: "#E31837",
                borderRadius: "1px",
                transition: "width 0.15s ease",
              }}
            />
          </div>
        </div>
      )}

      {/* Canvas renders frames — instant response, zero jank */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* Dark vignette overlay for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(10, 10, 10, 0.55) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </div>
  );
}
