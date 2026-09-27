import React, { useEffect, useState } from 'react';
import { PROFILE_DATA } from '../types.ts';

interface HeaderProps {
  onOpenResume: () => void;
  onOpenInquiry: (type?: string) => void;
  onShowIntro: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenResume, onOpenInquiry, onShowIntro }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Certificates', href: '#skills', id: 'skills' },
    { label: 'Volunteering', href: '#volunteering', id: 'volunteering' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map(l => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={"sticky top-0 z-50 border-b transition-all duration-300 " + (scrolled ? "backdrop-blur-xl bg-[#060608]/92 border-purple-500/10 shadow-[0_4px_30px_rgba(168,85,247,0.08)]" : "backdrop-blur-md bg-[#060608]/60 border-white/4")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#about" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <img src={PROFILE_DATA.logoUrl} alt="MS Logo" className="w-10 h-10 object-contain rounded-full border border-purple-500/30 shadow-lg shadow-purple-600/30 group-hover:shadow-purple-600/50 transition-shadow" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white tracking-wide group-hover:text-purple-300 transition-colors">{PROFILE_DATA.name}</span>
            <span className="text-[10px] tracking-widest text-slate-400 uppercase font-mono">FINANCE • ANALYTICS • MBA</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-0.5 text-[13px] font-medium text-slate-300 bg-white/3 p-1.5 rounded-full border border-white/6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
              className={"px-3.5 py-1.5 rounded-full transition-all duration-200 " + (activeSection === link.id ? "nav-link-active" : "hover:text-white hover:bg-white/5")}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button onClick={onShowIntro} type="button"
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-400 hover:text-purple-300 px-3 py-1.5 rounded-full hover:bg-white/5 border border-transparent hover:border-purple-500/30 transition-all cursor-pointer"
            title="Watch the laser stylus intro animation">
            <span>↺</span>
            <span>Intro</span>
          </button>

          <button onClick={onOpenResume} type="button"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 hover:text-white px-3.5 py-1.5 rounded-full bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 transition-all hover:scale-[1.02] shadow-sm cursor-pointer"
            title="View & Download Resume (PDF)">
            <svg className="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span>Resume</span>
          </button>

          <a href={PROFILE_DATA.linkedin} target="_blank" rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors hover:text-purple-300">
            <span>LinkedIn</span>
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </a>

          <button type="button" onClick={() => onOpenInquiry('General Connect')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg shadow-purple-600/30 ring-1 ring-purple-300/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer hover:shadow-purple-600/50">
            <span>Connect</span>
            <span className="text-sm font-bold">→</span>
          </button>

          {/* Mobile hamburger */}
          <button type="button" onClick={() => setMobileMenuOpen(prev => !prev)}
            className="xl:hidden inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white bg-white/3 border border-white/6 transition-colors"
            aria-label="Toggle Navigation Menu">
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={"block h-0.5 bg-current rounded-full transition-all duration-300 " + (mobileMenuOpen ? 'rotate-45 translate-y-1.5' : '')} />
              <span className={"block h-0.5 bg-current rounded-full transition-all duration-300 " + (mobileMenuOpen ? 'opacity-0 scale-x-0' : '')} />
              <span className={"block h-0.5 bg-current rounded-full transition-all duration-300 " + (mobileMenuOpen ? '-rotate-45 -translate-y-2' : '')} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={"xl:hidden overflow-hidden transition-all duration-300 " + (mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0')}>
        <div className="bg-[#08080e]/98 border-b border-white/6 px-5 py-4 backdrop-blur-xl">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                className={"py-2.5 text-sm font-medium px-4 rounded-xl transition-colors " + (activeSection === link.id ? "text-purple-300 bg-purple-950/40" : "text-slate-300 hover:text-white hover:bg-white/5")}>
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-white/8 flex flex-wrap gap-2 mt-1">
              <button onClick={() => { setMobileMenuOpen(false); onShowIntro(); }} className="px-3 py-1.5 text-xs font-mono text-purple-300 rounded-lg bg-purple-950/40 border border-purple-500/30">
                ↺ Watch Intro
              </button>
              <button onClick={() => { setMobileMenuOpen(false); onOpenResume(); }} className="px-3 py-1.5 text-xs font-mono text-white rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600">
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
