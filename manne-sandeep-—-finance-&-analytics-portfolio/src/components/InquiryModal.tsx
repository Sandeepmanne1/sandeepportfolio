import React, { useState, useEffect } from 'react';
import { PROFILE_DATA } from '../types.ts';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: string;
  onNotify: (msg: string) => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'Corporate Valuation & Financial Modeling',
  onNotify,
}) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [inquiryType, setInquiryType] = useState(defaultType);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (defaultType) {
      setInquiryType(defaultType);
    }
  }, [defaultType]);

  if (!isOpen) return null;

  const handleWhatsAppDispatch = () => {
    if (!name.trim()) {
      onNotify('Please enter your name first.');
      return;
    }

    const text = `Hi Sandeep,\n\nI am ${name}${
      company ? ` from ${company}` : ''
    }.\nI am reaching out regarding: *${inquiryType}*.\n\n${
      message ? `Message: ${message}\n\n` : ''
    }Looking forward to connecting!`;

    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/${PROFILE_DATA.whatsappNumber}?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    onNotify('Routing inquiry to WhatsApp...');
    onClose();
  };

  const handleEmailDispatch = () => {
    if (!name.trim()) {
      onNotify('Please enter your name first.');
      return;
    }

    const subject = encodeURIComponent(`Portfolio Inquiry: ${inquiryType} - ${name}`);
    const body = encodeURIComponent(
      `Hi Manne Sandeep,\n\nMy name is ${name}${
        company ? ` from ${company}` : ''
      }.\n\nInquiry Subject: ${inquiryType}\n\nMessage:\n${message || 'I would like to discuss potential finance/analytics opportunities with you.'}\n\nBest regards,\n${name}`
    );

    const mailtoUrl = `mailto:${PROFILE_DATA.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    onNotify('Opening your email client...');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#0e0e16] border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_45px_rgba(168,85,247,0.35)] text-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <button
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#181824] hover:bg-[#232336] text-slate-400 hover:text-white flex items-center justify-center border border-purple-500/20 transition-colors"
          onClick={onClose}
          type="button"
          aria-label="Close inquiry modal"
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Connect with Manne Sandeep</h3>
            <p className="text-xs text-purple-300 font-mono">
              Finance • Valuation • Analytics Inquiries
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
          Directly route your project, corporate valuation requirement, or career
          opportunity to Sandeep via WhatsApp or verified Email dispatch.
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-[#141420] border border-purple-500/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                Company / Role
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Investment Bank / Equity Fund"
                className="w-full bg-[#141420] border border-purple-500/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              Inquiry Type
            </label>
            <select
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value)}
              className="w-full bg-[#141420] border border-purple-500/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
            >
              <option value="Corporate Valuation & Financial Modeling">
                Corporate Valuation & Financial Modeling
              </option>
              <option value="Career & Full-Time Opportunity">
                Career & Full-Time Opportunity (Finance Analyst)
              </option>
              <option value="Equity Research & Market Trends">
                Equity Research & Market Trends
              </option>
              <option value="Excel Automation & Reporting">
                Excel Automation & Reporting
              </option>
              <option value="Advisory & General Connect">
                Advisory & General Connect
              </option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              Message / Scope
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please describe your requirements, project details, or proposed timeline..."
              className="w-full bg-[#141420] border border-purple-500/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleWhatsAppDispatch}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#12121a] hover:bg-[#1a1a26] text-emerald-300 hover:text-white border border-emerald-500/40 font-semibold text-xs px-4 py-3 rounded-xl transition-all shadow-sm group hover:scale-[1.02] cursor-pointer"
            >
              <svg
                className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path>
              </svg>
              <span>Send via WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={handleEmailDispatch}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs px-4 py-3 rounded-xl transition-all shadow-lg shadow-purple-600/30 hover:scale-[1.02] cursor-pointer"
            >
              <svg
                className="w-4 h-4"
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
              <span>Send via Email</span>
            </button>
          </div>
        </form>

        <div className="pt-4 mt-4 border-t border-surfaceBorder/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Direct: {PROFILE_DATA.phone}</span>
          <span className="text-purple-400">{PROFILE_DATA.email}</span>
        </div>
      </div>
    </div>
  );
};
