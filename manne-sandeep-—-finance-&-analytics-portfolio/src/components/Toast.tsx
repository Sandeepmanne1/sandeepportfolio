import React from 'react';

interface ToastProps {
  message: string | null;
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, visible }) => {
  if (!message) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 bg-[#12101a] border border-purple-500/40 text-slate-200 px-4 py-3 rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.35)] flex items-center gap-3 font-mono text-xs transition-all duration-300 pointer-events-none ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
    >
      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
      <span>{message}</span>
    </div>
  );
};
