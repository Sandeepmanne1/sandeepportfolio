import React, { useEffect, useRef, useState } from 'react';

interface WorkExperienceProps {
  onOpenCertificate: () => void;
}

export const WorkExperience: React.FC<WorkExperienceProps> = ({
  onOpenCertificate,
}) => {
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

  const responsibilities = [
    {
      num: '01',
      title: 'Sales Operations',
      desc: 'Assisted in frontline sales operations, customer journey touchpoints, and active interaction across high-traffic retail outlet environments.',
      icon: '🛒',
    },
    {
      num: '02',
      title: 'Data Gathering & Excel',
      desc: 'Collected and rigorously maintained sales volume data for daily executive tracking and consolidated reporting using Microsoft Excel.',
      icon: '📊',
    },
    {
      num: '03',
      title: 'Market & Demand Research',
      desc: 'Supported targeted market research initiatives analyzing consumer preferences, competitor pricing, and regional electronics demand patterns.',
      icon: '🔍',
    },
    {
      num: '04',
      title: 'Analytical Performance Reviews',
      desc: 'Synthesized raw sales metrics into coherent analytical presentations for weekly internal managerial reviews and KPI tracking.',
      icon: '📈',
    },
    {
      num: '05',
      title: 'Financial Documentation',
      desc: 'Managed systematic invoice checking, foundational financial records, audit checklists, and billing discrepancy resolutions.',
      icon: '🧾',
    },
    {
      num: '06',
      title: 'Regional Coordination',
      desc: 'Coordinated cross-department communication between warehouse logistics, inventory managers, and regional commercial sales teams.',
      icon: '🤝',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 border-t border-white/5 relative overflow-hidden"
      id="experience"
    >
      {/* Ambient glow */}
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-80 h-80 bg-purple-700/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div
          className="mb-12"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400 block mb-2 font-bold">
            02 // PROFESSIONAL BACKGROUND
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work Experience
          </h2>
        </div>

        {/* Main Experience Card */}
        <div
          className="tilt-card bg-[#0d0d14] rounded-3xl p-6 sm:p-8 border border-white/8 hover:border-purple-500/30 transition-all shadow-lg"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
          }}
        >
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-mono mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400" />
                </span>
                Sales & Market Research Intern
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                Vijay Sales (India) Private Limited
              </h3>
              <p className="text-sm text-slate-400 mt-1">South Region Retail Division</p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-end justify-between md:justify-center gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-white/5 text-slate-300 text-xs font-mono font-medium border border-white/8">
                  06/2025 – 08/2025
                </span>
                <span className="text-xs text-purple-400 font-mono">Hyderabad, India</span>
              </div>

              <button
                type="button"
                onClick={onOpenCertificate}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-purple-500/40 bg-purple-600/10 hover:bg-purple-600/25 text-purple-300 hover:text-white transition-all text-xs font-mono font-medium shadow-sm hover:scale-[1.02] active:scale-95 group cursor-pointer"
                title="View & Download Internship Certificate"
              >
                <svg className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span>Experience Certificate</span>
                <span className="bg-purple-900/50 text-[10px] px-1.5 py-0.5 rounded text-purple-200 border border-purple-500/30 font-bold">PDF</span>
              </button>
            </div>
          </div>

          {/* Skills progress bars */}
          {inView && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-5 border-b border-white/5">
              {[
                { label: 'Excel', pct: 88 },
                { label: 'Market Research', pct: 80 },
                { label: 'Data Analysis', pct: 75 },
                { label: 'Documentation', pct: 85 },
              ].map((skill, i) => (
                <div key={skill.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">{skill.label}</span>
                    <span className="text-purple-400 font-semibold">{skill.pct}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full"
                      style={{
                        width: `${skill.pct}%`,
                        animation: `progressFill 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s both`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Responsibilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
            {responsibilities.map((item, i) => (
              <div
                key={item.num}
                className="tilt-card p-4 rounded-2xl bg-[#141420]/80 border border-white/5 hover:border-purple-500/40 hover:bg-[#181828] transition-all group card-hover-lift"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease ${0.2 + i * 0.08}s, transform 0.5s ease ${0.2 + i * 0.08}s`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-purple-400 font-mono text-xs font-bold">{item.num}</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5 group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
