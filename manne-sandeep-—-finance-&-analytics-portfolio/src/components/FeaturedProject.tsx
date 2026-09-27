import React, { useEffect, useRef, useState } from 'react';
import { PROFILE_DATA } from '../types.ts';

export const FeaturedProject: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [showSandbox, setShowSandbox] = useState(false);
  const [beta, setBeta] = useState<number>(1.15);
  const [riskFreeRate, setRiskFreeRate] = useState<number>(6.5);
  const [marketReturn, setMarketReturn] = useState<number>(13.5);
  const [portfolioVol, setPortfolioVol] = useState<number>(16.0);

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

  const expectedReturn = riskFreeRate + beta * (marketReturn - riskFreeRate);
  const sharpeRatio = portfolioVol > 0 ? (expectedReturn - riskFreeRate) / portfolioVol : 0;

  const highlights = [
    { label: 'Risk Metrics Analyzed', value: 'Beta, Volatility, VaR', color: 'text-purple-300' },
    { label: 'Data Modeling Core', value: 'Correlation & Regression', color: 'text-indigo-300' },
    { label: 'Target Deliverable', value: 'Investment Advisory Deck', color: 'text-emerald-400' },
  ];

  const points = [
    'Analyzed multi-year historical stock price patterns and trends to evaluate directional market behavior across diverse sector indexes.',
    'Computed fundamental and statistical return metrics, beta risk coefficients, standard deviation, and correlation matrices to evaluate downside risk.',
    'Modeled portfolio optimization formulas in MS Excel & Python, determining the optimal Sharpe ratio and balanced asset allocations.',
    'Designed dynamic visualizations, candlestick dashboards, and structured investment decision-making summary decks.',
  ];

  return (
    <section ref={sectionRef} className="py-20 border-t border-white/5 relative" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400 block mb-2 font-bold">03 // RESEARCH & MODELING</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Featured Project</h2>
          </div>
          <p className="text-sm font-mono text-slate-400 mt-2 md:mt-0">Academic & Quantitative Portfolio Work</p>
        </div>

        {/* Project Card */}
        <div className="tilt-card relative bg-gradient-to-br from-[#10101c] via-[#0d0d14] to-[#07070a] rounded-3xl p-6 sm:p-10 border border-purple-500/35 shadow-[0_0_60px_-15px_rgba(168,85,247,0.4)] overflow-hidden"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s' }}>
          {/* Decorative orbs */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-float-reverse" />
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none animate-float" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-400/30 text-purple-300 text-xs font-mono mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400" />
                </span>
                Academic Research Project • Anurag University (2024)
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight">
                Analysis of Stock Market Trends
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                A comprehensive quantitative study evaluating equities, macroeconomic indicators, and systematic market fluctuations to evaluate volatility and construct balanced investment portfolios.
              </p>

              <ul className="space-y-3 mb-8">
                {points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300"
                    style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-20px)', transition: 'opacity 0.5s ease ' + (0.3 + i * 0.1) + 's, transform 0.5s ease ' + (0.3 + i * 0.1) + 's' }}>
                    <span className="text-purple-400 font-bold mt-0.5 shrink-0">✦</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {['Microsoft Excel', 'Python', 'Statistical Modeling', 'Risk-Return Analysis'].map((tech, i) => (
                  <span key={tech} className="skill-pill px-3 py-1 rounded-md bg-[#1a1a28] text-purple-300 text-xs font-mono border border-purple-500/20"
                    style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.4s ease ' + (0.5 + i * 0.08) + 's' }}>
                    {tech}
                  </span>
                ))}
              </div>

              <button type="button" onClick={() => setShowSandbox(prev => !prev)}
                className="inline-flex items-center gap-2 text-xs font-mono text-purple-300 hover:text-white bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 px-4 py-2 rounded-xl transition-all cursor-pointer hover:scale-[1.02]">
                <span className={showSandbox ? 'rotate-180' : ''} style={{ display: 'inline-block', transition: 'transform 0.3s ease' }}>▼</span>
                <span>{showSandbox ? 'Hide' : 'Try'} Interactive CAPM Model Sandbox</span>
              </button>
            </div>

            {/* Key Highlights Box */}
            <div className="lg:col-span-5 bg-[#09090f]/80 p-6 rounded-2xl border border-white/6 shadow-inner">
              <h4 className="text-xs uppercase font-mono text-slate-400 tracking-wider mb-4 border-b border-white/5 pb-2">Key Modeling Parameters</h4>
              <div className="space-y-3 font-mono text-xs">
                {highlights.map((h, i) => (
                  <div key={h.label} className="p-3 rounded-xl bg-[#141420] border border-white/5 flex items-center justify-between hover:border-purple-400/40 transition-colors"
                    style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(20px)', transition: 'opacity 0.5s ease ' + (0.3 + i * 0.12) + 's, transform 0.5s ease ' + (0.3 + i * 0.12) + 's' }}>
                    <span className="text-slate-400">{h.label}</span>
                    <span className={"font-bold " + h.color}>{h.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-slate-400 leading-relaxed">
                Utilized empirical quantitative techniques to evaluate capital market trends and portfolio diversification opportunities.
              </div>
            </div>
          </div>

          {/* CAPM Sandbox */}
          {showSandbox && (
            <div className="mt-8 pt-6 border-t border-purple-500/25 font-mono text-xs" style={{ animation: 'fadeSlideUp 0.4s ease both' }}>
              <div className="mb-4">
                <span className="text-xs font-bold text-white uppercase tracking-wider block">Interactive CAPM & Sharpe Ratio Simulator</span>
                <span className="text-[11px] text-slate-400">Formula: E(R) = R_f + β × (R_m - R_f) | Sharpe = (E(R) - R_f) / σ</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Risk-Free Rate (R_f)', value: riskFreeRate, min: 3, max: 10, step: 0.1, setter: setRiskFreeRate, suffix: '%' },
                  { label: 'Market Return (R_m)', value: marketReturn, min: 8, max: 22, step: 0.5, setter: setMarketReturn, suffix: '%' },
                  { label: 'Asset Beta (β)', value: beta, min: 0.4, max: 2.5, step: 0.05, setter: setBeta, suffix: '' },
                  { label: 'Volatility (σ)', value: portfolioVol, min: 8, max: 35, step: 0.5, setter: setPortfolioVol, suffix: '%' },
                ].map((ctrl) => (
                  <div key={ctrl.label} className="p-3 rounded-xl bg-[#141422] border border-white/8">
                    <label className="block text-[10px] text-slate-400 mb-2">
                      {ctrl.label}: <span className="text-purple-300 font-bold">{ctrl.value.toFixed(ctrl.step < 0.1 ? 2 : 1)}{ctrl.suffix}</span>
                    </label>
                    <input type="range" min={ctrl.min} max={ctrl.max} step={ctrl.step} value={ctrl.value}
                      onChange={(e) => ctrl.setter(parseFloat(e.target.value))}
                      className="w-full accent-purple-400 cursor-pointer" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl bg-[#090910] border border-purple-500/35">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Expected Annual Return E(R):</span>
                  <span className="text-emerald-400 font-bold text-lg">{expectedReturn.toFixed(2)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Computed Sharpe Ratio:</span>
                  <span className="text-purple-300 font-bold text-lg">{sharpeRatio.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
