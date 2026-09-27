import React, { useEffect, useRef, useState } from 'react';

export const Education: React.FC = () => {
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

  const educationList = [
    {
      period: '08/2024 – 06/2026 (PURSUING)',
      badge: 'Postgraduate',
      badgeClass: 'bg-purple-900/50 border-purple-500/30 text-purple-200',
      title: 'Master of Business Administration (MBA)',
      specialization: 'Specialization: Finance',
      institution: 'Anurag University',
      location: 'Ghatkesar, Hyderabad, Telangana',
      isFeatured: true,
      icon: '🎓',
      color: 'from-purple-500 to-violet-600',
    },
    {
      period: '08/2021 – 06/2024',
      badge: '83.4% Score',
      badgeClass: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 font-bold',
      title: 'Bachelor of Commerce (Computer Applications)',
      specialization: 'Undergraduate Degree',
      institution: 'Babu Jagjeevan Ram Govt. Degree College',
      location: 'Osmania University Affiliated, Hyderabad',
      isFeatured: false,
      icon: '📚',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      period: '08/2019 – 05/2021',
      badge: '80.3% Score',
      badgeClass: 'bg-indigo-950/60 border-indigo-500/40 text-indigo-300 font-bold',
      title: 'Intermediate (MEC)',
      specialization: 'Mathematics, Economics & Commerce',
      institution: 'Sri Medhavi Junior College',
      location: 'Telangana State Board of Intermediate Education',
      isFeatured: false,
      icon: '🏫',
      color: 'from-indigo-500 to-blue-600',
    },
    {
      period: '06/2016 – 04/2019',
      badge: '83.0% Score',
      badgeClass: 'bg-indigo-950/60 border-indigo-500/40 text-indigo-300 font-bold',
      title: 'Secondary School Certificate (SSC)',
      specialization: 'Class X High School',
      institution: 'Sacred Heart High School',
      location: 'Hyderabad, Telangana',
      isFeatured: false,
      icon: '🏆',
      color: 'from-cyan-500 to-sky-600',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 border-t border-white/5 relative overflow-hidden"
      id="education"
    >
      {/* Ambient decoration */}
      <div className="absolute -right-40 top-1/3 w-80 h-80 bg-indigo-700/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="mb-12"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400 block mb-2 font-bold">
            05 // ACADEMIC FOUNDATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationList.map((edu, i) => (
            <div
              key={edu.title}
              className={`tilt-card relative bg-[#0d0d14] p-6 sm:p-7 rounded-3xl overflow-hidden group card-hover-lift
                ${edu.isFeatured ? 'border border-purple-500/40' : 'border border-white/6'}
              `}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}
            >
              {/* Gradient corner accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br ${edu.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />

              {/* Top row */}
              <div className="flex items-center justify-between text-xs font-mono mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{edu.icon}</span>
                  <span className="text-slate-500">{edu.period}</span>
                </div>
                <span className={`px-2 py-0.5 rounded border text-xs ${edu.badgeClass}`}>
                  {edu.badge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-300 transition-colors leading-tight">
                {edu.title}
              </h3>
              <p className={`text-xs font-mono mb-4 bg-gradient-to-r ${edu.color} bg-clip-text text-transparent font-semibold`}>
                {edu.specialization}
              </p>

              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-200">{edu.institution}</p>
                <p className="text-xs text-slate-500">{edu.location}</p>
              </div>

              {/* Animated bottom bar */}
              <div className="mt-5 h-0.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${edu.color} rounded-full`}
                  style={{
                    width: inView ? '100%' : '0%',
                    transition: `width 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + i * 0.15}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

    {
      period: '08/2024 – 06/2026 (PURSUING)',
      badge: 'Postgraduate',
      badgeClass: 'bg-purple-900/50 border-purple-500/30 text-purple-200',
      title: 'Master of Business Administration (MBA)',
      specialization: 'Specialization: Finance',
      institution: 'Anurag University',
      location: 'Ghatkesar, Hyderabad, Telangana',
      isFeatured: true,
    },
    {
      period: '08/2021 – 06/2024',
      badge: '83.4% Score',
      badgeClass: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 font-bold',
      title: 'Bachelor of Commerce (Computer Applications)',
      specialization: 'Undergraduate Degree',
      institution: 'Babu Jagjeevan Ram Govt. Degree College',
      location: 'Osmania University Affiliated, Hyderabad',
      isFeatured: false,
    },
    {
      period: '08/2019 – 05/2021',
      badge: '80.3% Score',
      badgeClass: 'bg-indigo-950/60 border-indigo-500/40 text-indigo-300 font-bold',
      title: 'Intermediate (MEC)',
      specialization: 'Mathematics, Economics & Commerce',
      institution: 'Sri Medhavi Junior College',
      location: 'Telangana State Board of Intermediate Education',
      isFeatured: false,
    },
    {
      period: '06/2016 – 04/2019',
      badge: '83.0% Score',
      badgeClass: 'bg-indigo-950/60 border-indigo-500/40 text-indigo-300 font-bold',
      title: 'Secondary School Certificate (SSC)',
      specialization: 'Class X High School',
      institution: 'Sacred Heart High School',
      location: 'Hyderabad, Telangana',
      isFeatured: false,
    },
  ];

  return (
    <section
      className="py-20 border-t border-surfaceBorder/50 relative"
      id="education"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-purple-400 block mb-2">
            05 // ACADEMIC FOUNDATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationList.map((edu) => (
            <div
              key={edu.title}
              className={`tilt-card bg-[#0f0f14] p-6 sm:p-7 rounded-3xl relative overflow-hidden group hover:border-purple-400 transition-all shadow-md ${
                edu.isFeatured
                  ? 'border border-purple-500/40'
                  : 'border border-surfaceBorder'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono text-purple-400 mb-3">
                <span>{edu.period}</span>
                <span className={`px-2 py-0.5 rounded border ${edu.badgeClass}`}>
                  {edu.badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                {edu.title}
              </h3>
              <p className="text-xs text-purple-300 font-mono mb-4">
                {edu.specialization}
              </p>
              <p className="text-sm font-medium text-slate-300">{edu.institution}</p>
              <p className="text-xs text-slate-500">{edu.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
