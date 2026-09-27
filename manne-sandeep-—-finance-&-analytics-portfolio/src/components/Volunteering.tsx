import React, { useEffect, useRef, useState } from 'react';

export const Volunteering: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activities = [
    { icon: '🌱', label: 'Community Development' },
    { icon: '📣', label: 'Awareness Campaigns' },
    { icon: '🤝', label: 'Socio-civic Welfare' },
    { icon: '🎓', label: 'Collegiate Outreach' },
  ];

  return (
    <section ref={sectionRef} className="py-20 border-t border-white/5 relative overflow-hidden" id="volunteering">
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[600px] h-40 bg-purple-600/5 blur-[80px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400 block mb-2 font-bold">07 // COMMUNITY & ENGAGEMENT</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Volunteering</h2>
        </div>

        <div className="tilt-card relative bg-gradient-to-r from-[#0d0d14] via-[#13131e] to-[#0d0d14] rounded-3xl p-6 sm:p-8 border border-white/6 hover:border-purple-500/30 transition-all shadow-lg overflow-hidden card-hover-lift"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s' }}>
          {/* Animated background glow */}
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl animate-float pointer-events-none" />

          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            {/* NSS Badge */}
            <div className="shrink-0 relative">
              <div className="w-24 h-24 rounded-2xl bg-purple-900/20 border border-purple-500/30 text-purple-400 font-mono font-bold text-3xl shadow-[0_0_30px_rgba(168,85,247,0.2)] flex items-center justify-center glow-pulse">
                NSS
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 border-2 border-[#0d0d14] flex items-center justify-center">
                <span className="text-[8px] font-bold text-black">✓</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400" />
                </span>
                Active Contributor
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">National Service Scheme (NSS)</h3>
              <p className="text-xs font-mono text-purple-300 mb-3">Anurag University Chapter</p>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Actively engaged in grassroots community development initiatives, organizing awareness campaigns, socio-civic welfare programs, and collegiate outreach events aimed at social impact.
              </p>

              {/* Activity Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {activities.map((act, i) => (
                  <span key={act.label}
                    className="skill-pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141420] border border-white/6 text-xs text-slate-300"
                    style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 0.4s ease ' + (0.4 + i * 0.1) + 's, transform 0.4s ease ' + (0.4 + i * 0.1) + 's' }}>
                    <span>{act.icon}</span>
                    <span>{act.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
