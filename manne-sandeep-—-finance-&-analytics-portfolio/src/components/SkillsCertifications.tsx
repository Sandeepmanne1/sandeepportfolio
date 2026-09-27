import React, { useEffect, useRef, useState } from 'react';

export const SkillsCertifications: React.FC = () => {
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

  const financeSkills = [
    'Financial Analysis', 'Budgeting & Forecasting', 'Ratio Analysis',
    'Financial Reporting', 'Excel-Based Data Modeling', 'Market Research', 'Variance Analysis',
  ];

  const technicalTools = [
    'MS Excel (Advanced)', 'Python (Data Analysis)', 'Financial Modeling', 'MS PowerPoint',
  ];

  const certifications = [
    { issuer: 'Kotak Neo', title: 'Financial Markets', desc: 'Foundational and market dynamics certification', color: 'from-purple-500 to-violet-600' },
    { issuer: 'LinkedIn Learning', title: 'Advanced Excel for Finance Professionals', desc: 'Formulas, lookup models, sensitivity tables & macros', color: 'from-indigo-500 to-blue-600' },
    { issuer: 'Kotak Neo', title: 'Python for Data Analysis', desc: 'Data cleansing, numerical computation & time series', color: 'from-cyan-500 to-sky-600' },
    { issuer: 'LinkedIn Learning', title: 'Financial Modeling Foundations', desc: '3-statement integrated modeling & valuation', color: 'from-emerald-500 to-teal-600' },
  ];

  const strengths = [
    'Critical thinking & quantitative problem solving',
    'Meticulous attention to detail & mathematical accuracy',
    'Structured financial reporting & executive documentation',
    'Cross-functional communication & collaborative drive',
  ];

  return (
    <section ref={sectionRef} className="py-20 border-t border-white/5 relative" id="skills">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400 block mb-2 font-bold">06 // DOMAIN COMPETENCIES</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Skills & Certifications</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Finance Skills & Tools */}
          <div className="tilt-card bg-[#0d0d14] p-6 rounded-3xl border border-white/6 hover:border-purple-500/40 transition-colors card-hover-lift"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s' }}>
            <h3 className="text-sm font-mono uppercase tracking-wider text-purple-400 font-bold mb-5 flex items-center gap-2">
              <span>📊</span> Professional Finance Skills
            </h3>
            <div className="flex flex-wrap gap-2.5 mb-8">
              {financeSkills.map((skill, i) => (
                <span key={skill} className="skill-pill px-3 py-1.5 rounded-xl bg-[#171724] border border-white/6 text-xs text-slate-300"
                  style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.4s ease ' + (0.2 + i * 0.05) + 's' }}>
                  {skill}
                </span>
              ))}
            </div>

            <h3 className="text-sm font-mono uppercase tracking-wider text-purple-400 font-bold mb-4 flex items-center gap-2">
              <span>⚙️</span> Technical Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {technicalTools.map((tool, i) => (
                <span key={tool} className="skill-pill px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs font-mono text-purple-200"
                  style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.4s ease ' + (0.4 + i * 0.08) + 's' }}>
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Certifications */}
          <div className="tilt-card bg-[#0d0d14] p-6 rounded-3xl border border-white/6 hover:border-purple-500/40 transition-colors card-hover-lift"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s' }}>
            <h3 className="text-sm font-mono uppercase tracking-wider text-purple-400 font-bold mb-5 flex items-center gap-2">
              <span>📜</span> Verified Certifications
            </h3>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <div key={cert.title}
                  className="p-3.5 rounded-2xl bg-[#141420] border border-white/5 hover:border-purple-500/40 transition-all group card-hover-lift"
                  style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(20px)', transition: 'opacity 0.5s ease ' + (0.3 + i * 0.1) + 's, transform 0.5s ease ' + (0.3 + i * 0.1) + 's' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={'w-1.5 h-1.5 rounded-full bg-gradient-to-r ' + cert.color} />
                    <span className="text-[10px] uppercase font-mono text-purple-400 font-semibold">{cert.issuer}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">{cert.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{cert.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Strengths + Languages */}
          <div className="tilt-card bg-[#0d0d14] p-6 rounded-3xl border border-white/6 hover:border-purple-500/40 transition-colors flex flex-col justify-between card-hover-lift"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s' }}>
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-purple-400 font-bold mb-5 flex items-center gap-2">
                <span>🌟</span> Core Strengths
              </h3>
              <div className="space-y-2.5">
                {strengths.map((st, i) => (
                  <div key={st}
                    className="flex items-start gap-3 p-3 rounded-xl bg-[#141420] border border-white/5 hover:border-purple-400/30 transition-all group"
                    style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-15px)', transition: 'opacity 0.5s ease ' + (0.4 + i * 0.1) + 's, transform 0.5s ease ' + (0.4 + i * 0.1) + 's' }}>
                    <span className="text-purple-400 font-bold text-sm mt-0.5 group-hover:scale-110 transition-transform">✓</span>
                    <span className="text-xs text-slate-300 leading-relaxed">{st}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">Languages</h4>
              <div className="flex gap-3">
                {[{ lang: 'Telugu', level: 'Native' }, { lang: 'English', level: 'Proficient' }].map((l) => (
                  <div key={l.lang} className="flex-1 p-3 rounded-xl bg-[#141420] text-center border border-white/5 hover:border-purple-500/40 transition-all hover:scale-105">
                    <span className="block text-sm font-bold text-white">{l.lang}</span>
                    <span className="text-[10px] text-purple-400 font-mono">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
