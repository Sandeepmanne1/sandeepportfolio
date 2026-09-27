import React, { useState } from 'react';
import { PROFILE_DATA } from '../types.ts';

interface FooterProps {
  onOpenResume: () => void;
  onOpenInquiry: (type?: string) => void;
  onShowIntro: () => void;
  onNotify: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenResume,
  onOpenInquiry,
  onShowIntro,
  onNotify,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopied(true);
    onNotify('Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="pt-24 pb-14 border-t border-surfaceBorder bg-[#050508] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/10 blur-[140px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
          {/* Pill Badge */}
          <div className="relative mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-mono shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="tracking-wide">Available for Finance & Analytics Roles</span>
            </div>
          </div>

          {/* Large Impact Headline */}
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 text-center leading-[1.08] uppercase">
            DRIVING PRECISION.
            <br />
            DELIVERING{' '}
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-white bg-clip-text text-transparent">
              CAPITAL GROWTH.
            </span>
          </h2>

          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-mono font-semibold tracking-widest uppercase mb-12">
            <span className="text-purple-300">FINANCE</span>
            <span className="text-slate-600">•</span>
            <span className="text-purple-300">DATA ANALYTICS</span>
            <span className="text-slate-600">•</span>
            <span className="text-purple-300">FINANCIAL MODELING</span>
            <span className="text-slate-600">•</span>
            <span className="text-purple-300">EQUITY RESEARCH</span>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 w-full max-w-3xl">
            {/* LinkedIn */}
            <a
              href={PROFILE_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#12121a] hover:bg-[#1a1a26] text-slate-200 hover:text-white border border-surfaceBorder hover:border-purple-500/40 font-semibold text-sm px-6 py-3.5 rounded-2xl transition-all hover:scale-[1.02] shadow-sm"
            >
              <span>LinkedIn</span>
              <svg
                className="w-3.5 h-3.5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
            </a>

            {/* Download Resume */}
            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 bg-[#12121a] hover:bg-[#1a1a26] text-slate-200 hover:text-white border border-surfaceBorder hover:border-purple-500/40 font-semibold text-sm px-6 py-3.5 rounded-2xl transition-all hover:scale-[1.02] shadow-sm group cursor-pointer"
            >
              <span>Download Resume</span>
              <svg
                className="w-4 h-4 text-purple-400 group-hover:translate-y-0.5 transition-transform"
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
            </button>

            {/* Send Email with Copy */}
            <div className="inline-flex items-center gap-1 bg-[#12121a] border border-surfaceBorder hover:border-purple-500/40 rounded-2xl p-1 transition-all shadow-sm">
              <button
                type="button"
                onClick={() => onOpenInquiry('Email Inquiry')}
                className="inline-flex items-center gap-2 text-slate-200 hover:text-white font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-white/5 transition-all cursor-pointer"
              >
                <svg
                  className="w-4 h-4 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                <span>Send Email</span>
              </button>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-purple-300 hover:bg-white/5 transition-colors relative group cursor-pointer"
                title="Copy Email Address"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#1b1b26] text-purple-300 border border-purple-500/30 text-[10px] font-mono rounded shadow-md pointer-events-none hidden group-hover:block whitespace-nowrap">
                  {copied ? 'Copied!' : 'Copy'}
                </span>
              </button>
            </div>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${PROFILE_DATA.whatsappNumber}?text=Hi%20Sandeep%2C%20I%20am%20reaching%20out%20regarding%20your%20Finance%20%26%20Valuation%20portfolio.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#12121a] hover:bg-[#1a1a26] text-slate-200 hover:text-white border border-surfaceBorder hover:border-emerald-500/40 font-semibold text-sm px-6 py-3.5 rounded-2xl transition-all hover:scale-[1.02] shadow-sm group"
              title="Chat with Manne Sandeep on WhatsApp"
            >
              <svg
                className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path>
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-surfaceBorder/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-white font-medium">{PROFILE_DATA.name}</span>
            <span>•</span>
            <span className="text-purple-400">{PROFILE_DATA.degree}</span>
            <span>•</span>
            <span>{PROFILE_DATA.location}</span>
            <span>•</span>
            <span className="text-slate-300 font-semibold">{PROFILE_DATA.phone}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={onShowIntro}
              type="button"
              className="hover:text-purple-400 transition-colors cursor-pointer"
            >
              ↺ Replay Intro
            </button>
            <a
              href={PROFILE_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors"
            >
              LinkedIn Profile ↗
            </a>
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="hover:text-purple-400 transition-colors"
            >
              {PROFILE_DATA.email}
            </a>
            <a href="#about" className="hover:text-purple-400 transition-colors">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
