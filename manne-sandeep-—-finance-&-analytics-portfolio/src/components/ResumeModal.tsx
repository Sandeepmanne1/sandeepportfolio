import React from 'react';
import { PROFILE_DATA } from '../types.ts';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  onNotify,
}) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    // Generate a printable/downloadable HTML/text document representation
    const resumeText = `================================================
MANNE SANDEEP — CURRICULUM VITAE
Finance • Financial Modeling • Data Analytics
Hyderabad, India | +91 6301737085 | mannesandeep43@gmail.com
LinkedIn: https://www.linkedin.com/in/Mannesandeep4
================================================

PROFESSIONAL SUMMARY:
Detail-oriented MBA student specializing in Finance with advanced Excel proficiency, financial analysis and reporting acumen. Eager to contribute to high-impact financial analysis, research, and corporate finance roles.

EDUCATION:
- Master of Business Administration (MBA - Finance), Anurag University, Hyderabad (2024–2026, Pursuing)
- Bachelor of Commerce (Computer Applications), Babu Jagjeevan Ram Govt. Degree College, Osmania University (2021–2024, 83.4%)
- Intermediate (MEC), Sri Medhavi Junior College (2019–2021, 80.3%)
- Secondary School Certificate (SSC), Sacred Heart High School (2016–2019, 83.0%)

EXPERIENCE:
- Sales & Market Research Intern | Vijay Sales (India) Pvt. Ltd. (06/2025 – 08/2025)
  * Frontline sales analytics, customer journey data gathering, Excel volume tracking
  * Regional electronics demand and pricing benchmarking
  * Weekly financial reconciliation and invoice auditing

FEATURED RESEARCH & PROJECTS:
- Analysis of Stock Market Trends (Anurag University, 2024)
  * Multi-year historical volatility, Beta coefficients, VaR, correlation & Sharpe ratio optimization in Excel & Python.

TECHNICAL SKILLS & TOOLS:
- Financial Analysis, Valuation Modeling (DCF), Ratio Analysis, Budgeting & Variance Diagnostics
- MS Excel (Advanced Lookups, Macros, Pivot Tables), Python (Pandas, NumPy, Matplotlib), MS PowerPoint

CERTIFICATIONS:
- Financial Markets — Kotak Neo
- Advanced Excel for Finance Professionals — LinkedIn Learning
- Python for Data Analysis — Kotak Neo
- Financial Modeling Foundations — LinkedIn Learning
================================================`;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Manne_Sandeep_Resume_MBA_Finance.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onNotify('Resume downloaded successfully!');
  };

  const handleOpenPrintView = () => {
    window.print();
    onNotify('Opening print preview...');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#0e0e16] border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_45px_rgba(168,85,247,0.35)] text-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <button
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#181824] hover:bg-[#232336] text-slate-400 hover:text-white flex items-center justify-center border border-purple-500/20 transition-colors"
          onClick={onClose}
          type="button"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Curriculum Vitae / Resume</h3>
            <p className="text-xs text-purple-300 font-mono">
              {PROFILE_DATA.name} • {PROFILE_DATA.degree} Specialist
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
          Comprehensive career document outlining financial analysis acumen, investment
          modeling, stock trend quantitative research, academic background, and certified
          tool proficiencies.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 font-mono text-xs">
          <div className="p-3 rounded-xl bg-[#141420] border border-purple-500/20">
            <span className="text-[10px] text-slate-500 uppercase block mb-0.5">
              Format & Status
            </span>
            <span className="text-purple-300 font-medium">Verified PDF & Text Document</span>
          </div>
          <div className="p-3 rounded-xl bg-[#141420] border border-purple-500/20">
            <span className="text-[10px] text-slate-500 uppercase block mb-0.5">
              Location & Availability
            </span>
            <span className="text-emerald-400 font-medium">Hyderabad, India • Available</span>
          </div>
        </div>

        {/* Education & Core Tools summary preview */}
        <div className="bg-[#12121c] p-3.5 rounded-xl border border-white/5 mb-6 text-xs text-slate-300 space-y-1.5 font-mono">
          <div className="flex justify-between text-slate-400">
            <span>Primary Focus:</span>
            <span className="text-purple-300">Financial Modeling & Equity Trends</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Institutions:</span>
            <span className="text-slate-200">Anurag Univ & Osmania Univ</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Core Tooling:</span>
            <span className="text-emerald-400">MS Excel (Advanced) • Python</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleDownload}
            type="button"
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            <span>Download Document</span>
          </button>
          <button
            onClick={handleOpenPrintView}
            type="button"
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#181824] hover:bg-[#232336] text-slate-200 hover:text-white border border-purple-500/20 text-xs font-semibold px-5 py-3 rounded-xl transition-all cursor-pointer"
          >
            <svg
              className="w-4 h-4 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <path
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            <span>Print / Save as PDF ↗</span>
          </button>
        </div>
      </div>
    </div>
  );
};
