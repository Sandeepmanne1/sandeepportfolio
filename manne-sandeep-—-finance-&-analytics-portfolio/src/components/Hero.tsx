import React, { useEffect, useRef, useState } from 'react';
import { PROFILE_DATA } from '../types.ts';

interface HeroProps {
  onOpenResume: () => void;
  onOpenInquiry: (type?: string) => void;
}

const TYPING_WORDS = ['actionable insights', 'investment strategies', 'capital growth', 'financial clarity'];

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onOpenInquiry }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [typedIndex, setTypedIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  // References for lanyard & card swing physics
  const badgeWrapperRef = useRef<HTMLDivElement>(null);
  const badgeCardRef = useRef<HTMLDivElement>(null);
  const strapLeftRef = useRef<SVGPathElement>(null);
  const strapRightRef = useRef<SVGPathElement>(null);
  const badgeClipRef = useRef<HTMLDivElement>(null);

  // Typing effect
  useEffect(() => {
    const word = TYPING_WORDS[typedIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && typedText.length < word.length) {
      timeout = setTimeout(() => setTypedText(word.slice(0, typedText.length + 1)), 80);
    } else if (isDeleting && typedText.length > 0) {
      timeout = setTimeout(() => setTypedText(typedText.slice(0, -1)), 45);
    } else if (!isDeleting && typedText.length === word.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedText.length === 0) {
      setIsDeleting(false);
      setTypedIndex((prev) => (prev + 1) % TYPING_WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, typedIndex]);

  // Mount animation
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Lanyard physics
  useEffect(() => {
    const badgeWrapper = badgeWrapperRef.current;
    const badgeCard = badgeCardRef.current;
    const strapLeft = strapLeftRef.current;
    const strapRight = strapRightRef.current;
    const badgeClip = badgeClipRef.current;

    if (!badgeWrapper || !badgeCard) return;

    let targetRotX = 0, targetRotY = 0, currentRotX = 0, currentRotY = 0;
    let swingAngle = 0, swingVelocity = 0;
    let isMouseOver = false;
    let animId: number;

    const handleMouseEnter = () => { isMouseOver = true; };
    const handleMouseLeave = () => { isMouseOver = false; targetRotX = 0; targetRotY = 0; };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = badgeWrapper.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      const distToMouse = Math.hypot(e.clientX - cardCenterX, e.clientY - cardCenterY);
      if (distToMouse < 450) {
        const pull = (e.clientX - cardCenterX) / 450;
        swingVelocity += pull * 0.22;
      }
      if (isMouseOver) {
        const xOffset = (e.clientX - cardCenterX) / (rect.width / 2);
        const yOffset = (e.clientY - cardCenterY) / (rect.height / 2);
        targetRotY = Math.max(-18, Math.min(18, xOffset * 15));
        targetRotX = Math.max(-15, Math.min(15, -yOffset * 12));
      }
    };

    badgeWrapper.addEventListener('mouseenter', handleMouseEnter);
    badgeWrapper.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', handleMouseMove);

    function updatePhysics() {
      swingVelocity += -0.045 * swingAngle;
      swingVelocity *= 0.91;
      swingAngle += swingVelocity;
      currentRotX += (targetRotX - currentRotX) * 0.12;
      currentRotY += (targetRotY - currentRotY) * 0.12;
      const baseFlip = badgeCard?.classList.contains('is-flipped') ? 180 : 0;
      if (badgeCard) badgeCard.style.transform = `rotateY(${baseFlip + currentRotY}deg) rotateX(${currentRotX}deg) rotateZ(${swingAngle * 0.6}deg)`;
      if (badgeClip) badgeClip.style.transform = `translateX(-50%) rotate(${swingAngle * 0.8}deg)`;
      if (strapLeft && strapRight) {
        const midShift = swingAngle * 3.5;
        strapLeft.setAttribute('d', `M 70,0 Q ${85 + midShift},50 ${95 + swingAngle * 1.5},95`);
        strapRight.setAttribute('d', `M 130,0 Q ${115 + midShift},50 ${105 + swingAngle * 1.5},95`);
      }
      animId = requestAnimationFrame(updatePhysics);
    }

    animId = requestAnimationFrame(updatePhysics);
    return () => {
      cancelAnimationFrame(animId);
      badgeWrapper.removeEventListener('mouseenter', handleMouseEnter);
      badgeWrapper.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden" id="about">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-1 h-1 rounded-full bg-purple-400/60 sparkle-1" />
        <div className="absolute top-40 right-32 w-1.5 h-1.5 rounded-full bg-violet-400/50 sparkle-2" />
        <div className="absolute bottom-40 left-1/3 w-1 h-1 rounded-full bg-cyan-400/40 sparkle-3" />
        <div className="absolute top-1/3 left-10 w-2 h-2 rounded-full bg-purple-500/30 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 right-20 w-1.5 h-1.5 rounded-full bg-fuchsia-400/40 animate-float-reverse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Ambient accent */}
            <div className="w-8 h-8 rounded-full border border-purple-500/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(168,85,247,0.3)] glow-pulse"
              style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease' }}>
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500/70 animate-pulse" />
            </div>

            {/* Name */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.08] mb-6"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s' }}>
              MANNE
              <br />
              SANDEEP
            </h1>

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-mono font-medium mb-7 hover:border-purple-400 transition-colors shadow-sm"
              style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.8s ease 0.2s' }}>
              <span className="text-purple-400 animate-spin" style={{ animationDuration: '9s' }}>✦</span>
              <span>Finance × Data Analytics × Financial Modeling</span>
            </div>

            {/* Tagline with typing effect */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-slate-100 max-w-xl leading-snug mb-5"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s' }}>
              I turn complex financial data into{' '}
              <span className="shimmer-text font-bold">{typedText}</span>
              <span className="text-purple-400 animate-pulse">|</span>
            </h2>

            {/* Summary */}
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mb-9"
              style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.8s ease 0.4s' }}>
              {PROFILE_DATA.summary}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10"
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(15px)', transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s' }}>
              <a href="#projects"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-[0_0_45px_-10px_rgba(168,85,247,0.5)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_60px_-5px_rgba(168,85,247,0.5)] cursor-pointer">
                <span>Explore my work</span>
                <span className="text-base">→</span>
              </a>

              <button type="button" onClick={() => onOpenInquiry('Direct Collaboration')}
                className="inline-flex items-center gap-2 bg-[#12121a] hover:bg-[#1a1a26] text-slate-300 hover:text-white border border-white/8 hover:border-slate-600 text-sm font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer">
                <span>Let's connect</span>
                <span className="text-slate-400">↗</span>
              </button>

              <button type="button" onClick={onOpenResume}
                className="inline-flex items-center gap-2 bg-[#171724] hover:bg-purple-950/50 text-purple-200 hover:text-white border border-purple-500/40 text-sm font-semibold px-5 py-3 rounded-xl transition-all hover:scale-[1.02] shadow-sm group cursor-pointer"
                title="Download Manne Sandeep Resume (PDF)">
                <svg className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span>Download Resume (PDF)</span>
              </button>
            </div>

            {/* Meta Footnote */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 pt-3 border-t border-white/5"
              style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.8s ease 0.6s' }}>
              <span className="hover:text-purple-300 transition-colors">{PROFILE_DATA.institution}</span>
              <span className="text-slate-700">•</span>
              <span className="hover:text-purple-300 transition-colors">{PROFILE_DATA.degree}</span>
              <span className="text-slate-700">•</span>
              <span>{PROFILE_DATA.location}</span>
              <span className="text-slate-700">•</span>
              <span className="text-purple-400 font-semibold">📞 {PROFILE_DATA.phone}</span>
            </div>
          </div>

          {/* Right Column: ID Badge */}
          <div ref={badgeWrapperRef} className="lg:col-span-5 flex justify-center lg:justify-end relative perspective-container pt-12 pb-6" id="badge-wrapper">
            {/* Lanyard SVG */}
            <svg className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 pointer-events-none z-10 overflow-visible" viewBox="0 0 200 100">
              <defs>
                <linearGradient id="lanyard-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#6366f1" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
                </linearGradient>
                <filter id="lanyard-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <path ref={strapLeftRef} d="M 70,0 Q 85,50 95,95" fill="none" stroke="url(#lanyard-grad)" strokeWidth="3" filter="url(#lanyard-glow)" />
              <path ref={strapRightRef} d="M 130,0 Q 115,50 105,95" fill="none" stroke="url(#lanyard-grad)" strokeWidth="3" filter="url(#lanyard-glow)" />
              <path d="M 92,60 Q 100,65 108,60" fill="none" stroke="#e0e7ff" strokeWidth="1.2" opacity="0.6" />
              <path d="M 93,75 Q 100,80 107,75" fill="none" stroke="#e0e7ff" strokeWidth="1.2" opacity="0.6" />
            </svg>

            {/* Hanging Clip */}
            <div ref={badgeClipRef} className="absolute top-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
              <div className="w-6 h-8 bg-zinc-800 rounded-t-sm border border-zinc-700 flex items-center justify-center shadow-md">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-purple-400/80 bg-zinc-900 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
              </div>
              <div className="w-12 h-2.5 bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800 border-x border-b border-zinc-500 rounded-b-md shadow-sm" />
            </div>

            {/* Flippable Card */}
            <div ref={badgeCardRef} onClick={() => setIsFlipped(prev => !prev)}
              className={`card-flipper w-full max-w-[370px] relative cursor-pointer select-none ${isFlipped ? 'is-flipped' : ''}`}>
              {/* FRONT */}
              <div className="card-face w-full bg-[#0c0c12] rounded-3xl p-4 sm:p-5 border-2 border-purple-500/40 shadow-[0_10px_40px_-10px_rgba(147,51,234,0.35)] relative backdrop-blur-md transition-shadow duration-300 hover:border-purple-400 hover:shadow-[0_15px_60px_-5px_rgba(168,85,247,0.5)]">
                <div className="w-14 h-2 rounded-full bg-[#1b1b26] mx-auto mb-4 border border-zinc-700/60 shadow-inner" />
                <div className="flex items-center justify-between mb-4 px-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded font-mono tracking-wider shadow-sm">AU</span>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-slate-300 uppercase">ANURAG UNIVERSITY PASS</span>
                  </div>
                  <button type="button" className="inline-flex items-center gap-1 text-[10px] font-mono uppercase bg-[#181824] hover:bg-purple-900/40 text-slate-400 hover:text-purple-300 px-2.5 py-1 rounded-full border border-white/6 transition-all hover:scale-105">
                    <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    <span>FLIP</span>
                  </button>
                </div>

                <div className="relative w-full aspect-[4/4.3] rounded-2xl overflow-hidden bg-zinc-900 border border-white/8 group mb-4">
                  <img src={PROFILE_DATA.photoUrl} alt={PROFILE_DATA.name} className="w-full h-full object-cover object-top filter contrast-[1.03] group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-[#0e0e16]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/8 text-[11px] font-mono">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Financial Analyst</span>
                    </div>
                    <div className="text-slate-400 tracking-wider">Excel • Python</div>
                  </div>
                </div>

                <div className="px-1">
                  <div className="flex items-baseline justify-between mb-0.5">
                    <h3 className="text-xl font-bold text-white tracking-wide">{PROFILE_DATA.name}</h3>
                    <span className="text-[10px] font-mono text-purple-400 font-bold">{PROFILE_DATA.passId}</span>
                  </div>
                  <p className="text-xs text-purple-300 font-mono tracking-tight mb-3">Finance • Analytical Modeling • Stock Trends</p>
                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#14141e] p-2.5 rounded-xl border border-white/6 mb-3 font-mono">
                    <div>
                      <span className="block text-[9px] uppercase text-slate-500">Institution</span>
                      <span className="text-slate-200 font-medium leading-tight">{PROFILE_DATA.institution}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase text-slate-500">Degree & Batch</span>
                      <span className="text-slate-200 font-medium leading-tight">MBA - Fin ({PROFILE_DATA.batch})</span>
                    </div>
                  </div>
                  <div className="flex items-end justify-between pt-1 border-t border-white/5 font-mono">
                    <div className="flex items-center space-x-[2px] opacity-80" title={PROFILE_DATA.passId}>
                      <span className="barcode-line w-1" /><span className="barcode-line w-0.5" /><span className="barcode-line w-1.5" /><span className="barcode-line w-0.5" /><span className="barcode-line w-2" /><span className="barcode-line w-0.5" /><span className="barcode-line w-1" /><span className="barcode-line w-2" /><span className="barcode-line w-0.5" /><span className="barcode-line w-1.5" /><span className="barcode-line w-0.5" /><span className="barcode-line w-2" /><span className="barcode-line w-1" /><span className="barcode-line w-0.5" /><span className="barcode-line w-2" />
                    </div>
                    <div className="text-right">
                      <span className="block text-[9px] text-slate-500">BATCH {PROFILE_DATA.batch}</span>
                      <span className="text-[10px] font-bold text-purple-300 tracking-wider uppercase">HYDERABAD</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BACK */}
              <div className="card-face card-back absolute inset-0 w-full h-full bg-[#0d0d17] rounded-3xl p-5 border-2 border-indigo-500/40 shadow-[0_10px_40px_-10px_rgba(147,51,234,0.35)] flex flex-col justify-between backdrop-blur-md">
                <div className="w-14 h-2 rounded-full bg-[#1b1b26] mx-auto border border-zinc-700/60 shadow-inner" />
                <div className="flex items-center justify-between border-b border-white/6 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center font-bold text-white text-xs shadow-inner">AU</div>
                    <div>
                      <span className="text-xs font-bold text-white block">STUDENT VERIFICATION</span>
                      <span className="text-[9px] font-mono text-purple-300">SECURE DIGITAL IDENTITY</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 opacity-80 blur-[0.5px] animate-pulse" />
                </div>
                <div className="space-y-2.5 my-auto font-mono text-xs">
                  {[
                    { label: 'Primary Focus', value: 'Corporate Finance', color: 'text-purple-300' },
                    { label: 'Specialization', value: 'MBA Finance', color: 'text-cyan-300' },
                    { label: 'Core Tools', value: 'Excel • Python', color: 'text-emerald-400' },
                    { label: 'Contact', value: PROFILE_DATA.phone, color: 'text-slate-200' },
                  ].map((row) => (
                    <div key={row.label} className="p-2.5 rounded-xl bg-[#141422] border border-purple-500/15 flex items-center justify-between hover:border-purple-500/40 transition-colors">
                      <span className="text-slate-400 text-[11px]">{row.label}</span>
                      <span className={"font-semibold " + row.color}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-white/6 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="text-purple-400">Click anywhere to flip back</span>
                  <span className="text-slate-500">PASS ID #2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
