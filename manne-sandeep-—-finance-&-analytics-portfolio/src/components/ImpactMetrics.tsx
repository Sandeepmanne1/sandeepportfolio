import React, { useEffect, useRef, useState } from 'react';

interface MetricItem {
  target: number;
  suffix: string;
  label: string;
  color: string;
  barHeight: number; // 1–10 scale for chart bar
}

export const ImpactMetrics: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);

  const metrics: MetricItem[] = [
    { target: 456, suffix: '+', label: 'Financial Models & Data Points Analyzed', color: 'from-purple-500 to-violet-600', barHeight: 9 },
    { target: 91,  suffix: '+', label: 'Market & Equity Research Reports',          color: 'from-indigo-500 to-blue-600', barHeight: 7 },
    { target: 83,  suffix: '%+', label: 'Academic Performance (B.Com & SSC)',        color: 'from-cyan-500 to-sky-600',   barHeight: 6 },
    { target: 15,  suffix: '+', label: 'Core Financial Tools & Methodologies',       color: 'from-fuchsia-500 to-pink-600', barHeight: 4 },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1800;
          const startTime = performance.now();

          function step(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4); // quartic ease-out

            setCounts(metrics.map((m) => Math.floor(ease * m.target)));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCounts(metrics.map((m) => m.target));
            }
          }

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="py-20 border-t border-white/5 relative overflow-hidden"
      id="metrics"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-12">
          <div className="flex items-center gap-3">
            {/* Wave bars */}
            <div className="flex items-end gap-[3px] h-8">
              <div className="w-1 rounded-t bg-purple-500 wave-bar-1" />
              <div className="w-1 rounded-t bg-violet-500 wave-bar-2" />
              <div className="w-1 rounded-t bg-indigo-500 wave-bar-3" />
              <div className="w-1 rounded-t bg-purple-500 wave-bar-4" />
              <div className="w-1 rounded-t bg-fuchsia-500 wave-bar-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400 font-bold">01 / IMPACT & SCALE</span>
              <p className="text-xs text-slate-500 font-mono mt-0.5">Quantified professional footprint</p>
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-600 tracking-widest uppercase">DATA SPREAD • ARCHIVE METRICS</div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((m, idx) => (
            <div
              key={m.label}
              className="tilt-card animated-border relative bg-[#0d0d14] rounded-2xl p-6 border border-white/8 hover:border-purple-500/40 transition-all duration-300 group shadow-lg card-hover-lift"
              style={{
                opacity: hasAnimated ? 1 : 0,
                transform: hasAnimated ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease ${idx * 0.12}s, transform 0.6s ease ${idx * 0.12}s, box-shadow 0.3s ease`,
              }}
            >
              {/* Ambient glow top */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-r ${m.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} />

              {/* Mini bar chart visual */}
              <div className="flex items-end gap-[3px] h-8 mb-5 opacity-50 group-hover:opacity-80 transition-opacity">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 rounded-t bg-gradient-to-t ${m.color}`}
                    style={{
                      height: hasAnimated ? `${Math.max(4, Math.floor(Math.random() * 28 + 6))}px` : '4px',
                      transition: `height 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1 + i * 0.06}s`,
                    }}
                  />
                ))}
              </div>

              <div className={`text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-br ${m.color} bg-clip-text text-transparent mb-2 tabular-nums`}>
                {counts[idx]}{m.suffix}
              </div>
              <p className="text-xs text-slate-400 font-medium leading-snug mb-4">
                {m.label}
              </p>
              <div className={`w-full h-0.5 bg-gradient-to-r ${m.color} opacity-30 group-hover:opacity-80 transition-opacity rounded-full`} />
            </div>
          ))}
        </div>

        {/* Marquee ticker */}
        <div className="mt-12 overflow-hidden border-y border-white/5 py-3 relative">
          <div className="marquee-track flex items-center gap-8 whitespace-nowrap font-mono text-[11px] text-slate-600 uppercase tracking-widest">
            {[
              'Financial Analysis', 'DCF Modeling', 'Portfolio Optimization', 'Sharpe Ratio',
              'Beta Coefficient', 'Market Research', 'Excel Automation', 'Python Analytics',
              'Equity Research', 'Risk Assessment', 'Variance Analysis', 'Budgeting',
              'Financial Analysis', 'DCF Modeling', 'Portfolio Optimization', 'Sharpe Ratio',
              'Beta Coefficient', 'Market Research', 'Excel Automation', 'Python Analytics',
              'Equity Research', 'Risk Assessment', 'Variance Analysis', 'Budgeting',
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-8">
                <span>{item}</span>
                <span className="text-purple-800">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

