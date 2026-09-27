import React, { useEffect, useRef, useState } from 'react';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
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

  const services = [
    {
      title: 'Financial Analysis & Ratio Evaluation',
      desc: 'Rigorous scrutiny of financial statements assessing solvency, liquidity, profitability margins, and operating efficiency to unearth business performance drivers.',
      tags: ['Ratio Reports', '3-Statement Analysis'],
      color: 'from-purple-500 to-violet-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Financial Modeling & Valuation',
      desc: 'Structured DCF valuation models, dynamic multi-scenario forecasts, sensitivity tables, and interactive assumptions built in Excel for corporate decision-makers.',
      tags: ['DCF Models', 'Sensitivity Tables'],
      color: 'from-indigo-500 to-blue-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Market Research & Equity Trends',
      desc: 'Quantitative evaluation of capital market patterns, beta risk indices, competitive peer benchmarking, and macroeconomic impact reviews for smart equities analysis.',
      tags: ['Beta & Volatility', 'Peer Benchmarking'],
      color: 'from-cyan-500 to-sky-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Excel Automation & Reporting',
      desc: 'Transformation of disaggregated raw figures into automated spreadsheets, advanced lookup architectures, pivot reporting, and executive visualization summaries.',
      tags: ['Excel Dashboards', 'Automated Tracking'],
      color: 'from-emerald-500 to-teal-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Budgeting & Variance Analysis',
      desc: 'Detailed revenue & expenditure budgeting, periodic variance diagnostics, cash flow tracking, and disciplined financial control mechanisms for operational teams.',
      tags: ['Variance Diagnostics', 'Cash Flow Models'],
      color: 'from-amber-500 to-orange-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Portfolio Risk & Allocation',
      desc: 'Asset mix optimization strategies, Sharpe ratio calculation, correlation matrix analysis, and quantitative risk containment using Python and statistical toolkits.',
      tags: ['Sharpe Ratio', 'Python Risk Models'],
      color: 'from-fuchsia-500 to-pink-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 border-t border-white/5 relative overflow-hidden" id="services">
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/4 blur-[120px] pointer-events-none rounded-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400 block mb-2 font-bold">04 // ADVISORY & ANALYTICAL EXPERTISE</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Services Offered</h2>
          </div>
          <p className="text-sm font-mono text-slate-400 mt-2 md:mt-0">Custom Financial & Data Analytics Solutions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((srv, i) => (
            <div key={srv.title} onClick={() => onSelectService(srv.title)}
              className="tilt-card animated-border relative p-6 rounded-3xl bg-[#0d0d14] border border-white/6 hover:border-purple-500/30 hover:bg-[#13131e] transition-all duration-300 group flex flex-col justify-between shadow-lg cursor-pointer card-hover-lift"
              style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.5s ease ' + (i * 0.08) + 's, transform 0.5s ease ' + (i * 0.08) + 's' }}>
              {/* Ambient glow on hover */}
              <div className={"absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-r " + srv.color + " opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-500 pointer-events-none"} />

              <div>
                {/* Icon */}
                <div className={"relative w-12 h-12 rounded-2xl bg-gradient-to-br " + srv.color + " p-0.5 mb-5 group-hover:scale-110 transition-transform shadow-lg"}>
                  <div className="w-full h-full rounded-2xl bg-[#0d0d14] flex items-center justify-center text-white">
                    {srv.icon}
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-purple-300 transition-colors leading-tight">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {srv.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 font-mono text-[11px] items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {srv.tags.map((tag, j) => (
                    <span key={tag} className={"px-2.5 py-1 rounded-lg border border-white/6 " + (j === 0 ? 'text-purple-300 bg-purple-950/30' : 'text-slate-400 bg-[#141420]')}>
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                  Inquire →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
