import React, { useEffect, useRef, useState } from 'react';
import { PROFILE_DATA } from '../types.ts';

interface IntroScreenProps {
  onEnterPortfolio: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onEnterPortfolio }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const sparkRef = useRef<SVGCircleElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const penRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<'Active Tracing' | 'Completed' | 'Replaying'>('Active Tracing');
  const [speed, setSpeed] = useState<number>(1); // 1x or 2x
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    const pen = penRef.current;
    const spark = sparkRef.current;
    const svg = svgRef.current;

    if (!path || !pen || !svg) return;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength} ${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    const baseDuration = 6000 / speed;

    function updateCoordinates(progress: number) {
      if (!path || !pen || !svg) return;
      const currentLength = progress * pathLength;
      const pt = path.getPointAtLength(currentLength);

      path.style.strokeDashoffset = `${pathLength - currentLength}`;

      if (spark) {
        spark.setAttribute('cx', String(pt.x));
        spark.setAttribute('cy', String(pt.y));
      }

      const svgRect = svg.getBoundingClientRect();
      const viewBox = svg.viewBox.baseVal;

      const scaleX = svgRect.width / viewBox.width;
      const scaleY = svgRect.height / viewBox.height;

      const screenX = svgRect.left + pt.x * scaleX;
      const screenY = svgRect.top + pt.y * scaleY;

      // Stylus tip offset
      const penTipOffsetX = 24;
      const penTipOffsetY = 147;

      pen.style.transform = `translate3d(${screenX - penTipOffsetX}px, ${
        screenY - penTipOffsetY
      }px, 0)`;
    }

    function animate(timestamp: number) {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      let progress = elapsed / baseDuration;

      if (progress >= 1) {
        progress = 1;
        updateCoordinates(1);
        setStatus('Completed');
        return;
      }

      // Smooth cubic ease-in-out
      const easeProgress =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;

      updateCoordinates(easeProgress);
      animFrameRef.current = requestAnimationFrame(animate);
    }

    setStatus('Active Tracing');
    startTimeRef.current = null;
    animFrameRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!path) return;
      const currentOffset = parseFloat(path.style.strokeDashoffset) || 0;
      const prog = 1 - currentOffset / pathLength;
      updateCoordinates(Math.max(0, Math.min(1, prog || 0.1)));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [speed]);

  const handleReplay = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (pathRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDashoffset = `${pathLength}`;
    }
    startTimeRef.current = null;
    setStatus('Replaying');

    const path = pathRef.current;
    const pen = penRef.current;
    const spark = sparkRef.current;
    const svg = svgRef.current;
    if (!path || !pen || !svg) return;

    const pathLength = path.getTotalLength();
    const duration = 5500 / speed;

    function step(ts: number) {
      if (!path || !pen || !svg) return;
      if (!startTimeRef.current) startTimeRef.current = ts;
      const elapsed = ts - startTimeRef.current;
      let p = elapsed / duration;

      if (p >= 1) {
        p = 1;
        path.style.strokeDashoffset = '0';
        setStatus('Completed');
        return;
      }

      const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
      const curLen = ease * pathLength;
      const pt = path.getPointAtLength(curLen);
      path.style.strokeDashoffset = `${pathLength - curLen}`;

      if (spark) {
        spark.setAttribute('cx', String(pt.x));
        spark.setAttribute('cy', String(pt.y));
      }

      const svgRect = svg.getBoundingClientRect();
      const viewBox = svg.viewBox.baseVal;
      const screenX = svgRect.left + pt.x * (svgRect.width / viewBox.width);
      const screenY = svgRect.top + pt.y * (svgRect.height / viewBox.height);

      pen.style.transform = `translate3d(${screenX - 24}px, ${screenY - 147}px, 0)`;
      animFrameRef.current = requestAnimationFrame(step);
    }

    animFrameRef.current = requestAnimationFrame(step);
  };

  return (
    <div className="relative h-screen w-screen bg-[#050508] bg-grid-pattern flex flex-col justify-between overflow-hidden select-none">
      {/* Ambient Backdrop Spots */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10"
      >
        <div className="w-[900px] h-[450px] bg-purple-950/20 rounded-full blur-[140px] transform scale-110"></div>
        <div className="absolute w-[500px] h-[250px] bg-sky-950/15 rounded-full blur-[100px]"></div>
      </div>

      {/* Top Header */}
      <header className="w-full px-6 sm:px-12 md:px-14 py-8 flex items-start justify-between z-30">
        <div className="space-y-1">
          <h1 className="text-white text-base md:text-lg font-bold tracking-[0.22em] uppercase font-sans">
            {PROFILE_DATA.name}
          </h1>
          <p className="text-purple-300/80 text-xs md:text-sm font-normal tracking-wide">
            Finance <span className="opacity-50">×</span> Data Analytics{' '}
            <span className="opacity-50">×</span> Investment Modeling
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onEnterPortfolio}
            type="button"
            className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium tracking-wider text-gray-300 bg-[#0c0c14]/80 border border-white/10 hover:border-purple-400/50 hover:text-white transition-all duration-300 shadow-lg hover:shadow-purple-500/10 backdrop-blur-md cursor-pointer"
          >
            <span>Skip intro</span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </button>
        </div>
      </header>

      {/* Center Animated Stage */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-4 overflow-hidden">
        <div className="relative w-full max-w-6xl flex flex-col items-center justify-center">
          {/* Big Sculpted Text & SVG Trace Layer */}
          <div className="relative flex items-center justify-center select-none w-full">
            <span className="sculpted-text text-[72px] sm:text-[130px] md:text-[200px] lg:text-[260px] leading-none font-bold tracking-tight select-none">
              portfolio
            </span>

            {/* SVG Motion Canvas */}
            <svg
              ref={svgRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 1000 320"
            >
              <defs>
                <linearGradient id="neonGlowGrad" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="40%" stopColor="#a855f7" />
                  <stop offset="70%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>

                <filter id="laserGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Faint blueprint guide trace */}
              <path
                className="stroke-white/5 fill-none"
                d="M 95 188 C 115 110 145 105 162 178 C 175 228 200 230 220 178 C 240 120 275 118 290 178 C 308 232 342 225 365 170 C 385 125 410 118 435 178 C 452 225 480 230 500 176 C 518 108 535 78 555 176 C 572 230 598 226 620 176 C 640 118 668 112 690 176 C 710 230 735 230 760 174 C 778 122 805 115 832 176 C 850 225 878 225 905 175"
                strokeDasharray="4 6"
                strokeWidth="1.5"
              />

              {/* Active Glowing Laser Trace Path */}
              <path
                ref={pathRef}
                className="drawing-path-glow fill-none"
                d="M 95 188 C 115 110 145 105 162 178 C 175 228 200 230 220 178 C 240 120 275 118 290 178 C 308 232 342 225 365 170 C 385 125 410 118 435 178 C 452 225 480 230 500 176 C 518 108 535 78 555 176 C 572 230 598 226 620 176 C 640 118 668 112 690 176 C 710 230 735 230 760 174 C 778 122 805 115 832 176 C 850 225 878 225 905 175"
                stroke="url(#neonGlowGrad)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3.2"
              />

              {/* Spark particle at pen nib */}
              <circle
                ref={sparkRef}
                r="4.5"
                fill="#f0abfc"
                filter="url(#laserGlow)"
                cx="95"
                cy="188"
              />
            </svg>

            {/* Realistic Animated Digital Fountain Pen / Stylus */}
            <div
              ref={penRef}
              className="absolute pointer-events-none z-40 transition-opacity duration-300"
              style={{
                top: 0,
                left: 0,
                transform: 'translate3d(95px, 188px, 0)',
                willChange: 'transform',
              }}
            >
              <div
                className="relative flex items-end justify-center"
                style={{
                  transformOrigin: '0% 100%',
                  transform: 'rotate(-35deg) translate(-1px, 1px)',
                  filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.85))',
                }}
              >
                <svg
                  width="48"
                  height="150"
                  viewBox="0 0 48 150"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="penBarrelGrad"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#1e1b2e" />
                      <stop offset="35%" stopColor="#3b3754" />
                      <stop offset="70%" stopColor="#1c1a29" />
                      <stop offset="100%" stopColor="#0d0d14" />
                    </linearGradient>
                    <linearGradient id="nibGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="50%" stopColor="#e2e8f0" />
                      <stop offset="100%" stopColor="#7e22ce" />
                    </linearGradient>
                  </defs>

                  {/* Stylus Body */}
                  <path
                    d="M 20 5 L 28 5 L 30 75 L 18 75 Z"
                    fill="url(#penBarrelGrad)"
                  />
                  <path d="M 21 0 L 27 0 L 27 5 L 21 5 Z" fill="#94a3b8" />
                  {/* Tech Accent Ring */}
                  <rect x="18" y="75" width="12" height="4" fill="#a855f7" />
                  {/* Grip Section */}
                  <path
                    d="M 18 79 L 30 79 L 28 115 L 20 115 Z"
                    fill="#1e1e2d"
                  />
                  {/* Stylus Cone Collar */}
                  <path
                    d="M 20 115 L 28 115 L 26 130 L 22 130 Z"
                    fill="#475569"
                  />
                  {/* Fountain Nib */}
                  <path
                    d="M 22 130 L 26 130 L 25 144 L 24 147 L 23 144 Z"
                    fill="url(#nibGrad)"
                    stroke="#c084fc"
                    strokeWidth="0.5"
                  />
                  {/* Breather Hole & Slit */}
                  <circle cx="24" cy="137" r="0.9" fill="#0f0f15" />
                  <line
                    x1="24"
                    y1="137"
                    x2="24"
                    y2="147"
                    stroke="#38bdf8"
                    strokeWidth="0.6"
                  />
                  {/* Glowing Laser Emitter */}
                  <circle
                    className="nib-glow-emitter"
                    cx="24"
                    cy="147"
                    r="3"
                    fill="#ffffff"
                  />
                </svg>

                {/* Ambient Spark Plume */}
                <div className="absolute bottom-0 left-[21px] w-2 h-2 rounded-full bg-cyan-300 blur-[2px] -z-10 animate-ping opacity-75"></div>
              </div>
            </div>
          </div>

          {/* Interactive Controls Below Main Type */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 opacity-95 transition-opacity">
            <button
              onClick={handleReplay}
              type="button"
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider text-purple-300/90 bg-[#0d0d17]/90 border border-purple-500/30 hover:border-purple-400 hover:text-white hover:bg-purple-950/40 transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
            >
              <span className="text-sm">↺</span>
              <span>Replay trace</span>
            </button>

            <button
              onClick={() => setSpeed((prev) => (prev === 1 ? 1.8 : 1))}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider text-gray-400 bg-[#0e0e16]/80 border border-white/5 hover:border-white/20 transition-all duration-200 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>
                Pen State:{' '}
                <span className="text-gray-200 font-semibold">{status}</span>
                <span className="ml-1 text-[10px] text-purple-400">
                  ({speed === 1 ? '1x' : '1.8x'})
                </span>
              </span>
            </button>

            <button
              onClick={onEnterPortfolio}
              type="button"
              className="flex items-center gap-2 px-5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider text-white bg-gradient-to-r from-purple-700/80 to-indigo-700/80 border border-purple-400/40 hover:border-purple-300 hover:shadow-[0_0_18px_rgba(168,85,247,0.4)] transition-all duration-200 cursor-pointer active:scale-95"
            >
              <span>Enter Portfolio</span>
              <span className="text-xs">↗</span>
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Telemetry Bar */}
      <footer className="w-full px-6 md:px-12 py-4 border-t border-white/[0.05] bg-[#050508]/90 backdrop-blur-md z-30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] font-mono tracking-[0.2em] text-gray-500 uppercase">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 status-dot"></span>
            <span className="text-emerald-400/90 font-medium tracking-[0.18em]">
              INITIALIZING FINANCIAL ARCHIVE
            </span>
            <span className="text-gray-700 hidden sm:inline">// SYSTEM READY</span>
          </div>

          <div className="text-gray-400 font-medium tracking-[0.24em] text-center">
            AUTHENTIC PORTFOLIO OS <span className="text-purple-400/80 mx-1">•</span>{' '}
            MANNE SANDEEP
          </div>

          <div className="flex items-center gap-1.5 text-gray-500 tracking-[0.16em]">
            <span>17.3850° N</span>
            <span>•</span>
            <span>78.4867° E</span>
            <span className="text-gray-600 ml-1 hidden lg:inline">
              // HYDERABAD, IN
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
