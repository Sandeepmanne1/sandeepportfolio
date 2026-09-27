import React from 'react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  onNotify,
}) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const certText = `===============================================================
OFFICIAL INTERNSHIP COMPLETION CERTIFICATE
VIJAY SALES (INDIA) PRIVATE LIMITED
South Region Retail Division — Hyderabad, India
===============================================================

Credential Reference ID: VS-SRD-2025-0842
Date of Issuance: August 31, 2025

TO WHOM IT MAY CONCERN:

This is to certify that MR. MANNE SANDEEP has successfully 
completed a comprehensive professional internship in:
SALES OPERATIONS & MARKET RESEARCH
from June 01, 2025 to August 31, 2025.

Key Contributions & Demonstrated Competencies:
1. Sales Volume Modeling & Daily Executive Reporting in MS Excel.
2. Market & Regional Electronics Pricing Trend Benchmarking.
3. Frontline Commercial Operations and Customer Touchpoints.
4. Billing, Audit Checklists, and Invoice Discrepancy Resolution.
5. Weekly Analytical Presentations for Regional Branch Management.

During his tenure, Manne Sandeep exhibited exceptional analytical 
discipline, accuracy, work ethic, and dedication.

Authorized Signatory,
Regional Human Resources Director
Vijay Sales (India) Pvt. Ltd., South Region
===============================================================`;

    const blob = new Blob([certText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Vijay_Sales_Internship_Certificate_Manne_Sandeep.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onNotify('Certificate downloaded successfully!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#0e0e16] border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_45px_rgba(168,85,247,0.35)] text-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <button
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#181824] hover:bg-[#232336] text-slate-400 hover:text-white flex items-center justify-center border border-purple-500/20 transition-colors"
          onClick={onClose}
          type="button"
          aria-label="Close certificate modal"
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              Internship Completion Certificate
            </h3>
            <p className="text-xs text-purple-300 font-mono">
              Vijay Sales (India) Private Limited • South Region
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
          Official verification of internship completion in Sales Operations & Market
          Research at Vijay Sales (India) Private Limited, validating retail sales
          tracking, Excel analysis, and cross-functional reporting.
        </p>

        {/* Certificate Card Simulation */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#151522] to-[#0c0c14] border border-purple-500/30 mb-6 font-mono text-xs relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-surfaceBorder/60 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] text-purple-300 font-bold tracking-wider">
                VERIFIED CREDENTIAL
              </span>
            </div>
            <span className="text-[10px] text-slate-400">ID: VS-SRD-2025-0842</span>
          </div>

          <div className="space-y-1.5 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Awarded To:</span>
              <span className="text-white font-bold">MANNE SANDEEP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Role:</span>
              <span className="text-purple-300">Sales & Market Research Intern</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Tenure:</span>
              <span className="text-emerald-400">06/2025 – 08/2025 (3 Months)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Division:</span>
              <span className="text-slate-300">South Region Retail Division, Hyderabad</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 font-mono text-xs">
          <div className="p-3 rounded-xl bg-[#141420] border border-purple-500/20">
            <span className="text-[10px] text-slate-500 uppercase block mb-0.5">
              Ref Number
            </span>
            <span className="text-purple-300 font-medium">VS-SRD-2025-0842</span>
          </div>
          <div className="p-3 rounded-xl bg-[#141420] border border-purple-500/20">
            <span className="text-[10px] text-slate-500 uppercase block mb-0.5">
              Tenure Duration
            </span>
            <span className="text-emerald-400 font-medium">June 2025 – August 2025</span>
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
            <span>Download Certificate</span>
          </button>
          <button
            onClick={() => {
              window.print();
              onNotify('Opening certificate print view...');
            }}
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
            <span>Print Verification ↗</span>
          </button>
        </div>
      </div>
    </div>
  );
};
