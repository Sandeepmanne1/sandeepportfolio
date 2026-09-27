import React, { useEffect, useState } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { ImpactMetrics } from './components/ImpactMetrics.tsx';
import { WorkExperience } from './components/WorkExperience.tsx';
import { FeaturedProject } from './components/FeaturedProject.tsx';
import { Services } from './components/Services.tsx';
import { Education } from './components/Education.tsx';
import { SkillsCertifications } from './components/SkillsCertifications.tsx';
import { Volunteering } from './components/Volunteering.tsx';
import { Footer } from './components/Footer.tsx';
import { IntroScreen } from './components/IntroScreen.tsx';
import { ResumeModal } from './components/ResumeModal.tsx';
import { CertificateModal } from './components/CertificateModal.tsx';
import { InquiryModal } from './components/InquiryModal.tsx';
import { Toast } from './components/Toast.tsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'intro' | 'portfolio'>('portfolio');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState('Corporate Valuation & Financial Modeling');

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2800);
  };

  const handleOpenInquiry = (type?: string) => {
    if (type) {
      setInquiryType(type);
    }
    setIsInquiryOpen(true);
  };

  // 3D Tilt Effect on cards
  useEffect(() => {
    if (currentScreen !== 'portfolio') return;

    const cards = document.querySelectorAll<HTMLElement>('.tilt-card');
    const cleanups: (() => void)[] = [];

    cards.forEach((card) => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5.5;
        const rotateY = ((x - centerX) / centerX) * 5.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
      };

      const handleMouseLeave = () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      cleanups.push(() => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    });

    return () => {
      cleanups.forEach((c) => c());
    };
  }, [currentScreen]);

  return (
    <div className="min-h-screen bg-[#060608] text-slate-200 font-sans selection:bg-purple-600 selection:text-white">
      {/* Intro Screen View */}
      {currentScreen === 'intro' ? (
        <IntroScreen onEnterPortfolio={() => setCurrentScreen('portfolio')} />
      ) : (
        /* Full Portfolio Website View */
        <div className="relative min-h-screen flex flex-col bg-grid-pattern">
          {/* Ambient Glows */}
          <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-600/10 blur-[130px] pointer-events-none rounded-full z-0"></div>
          <div className="fixed top-1/3 right-10 w-[500px] h-[500px] bg-violet-700/10 blur-[160px] pointer-events-none rounded-full z-0"></div>

          {/* Site Navigation */}
          <Header
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenInquiry={handleOpenInquiry}
            onShowIntro={() => {
              setCurrentScreen('intro');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Main Body Content Sections */}
          <main className="flex-1 relative z-10">
            <Hero
              onOpenResume={() => setIsResumeOpen(true)}
              onOpenInquiry={handleOpenInquiry}
            />

            <ImpactMetrics />

            <WorkExperience
              onOpenCertificate={() => setIsCertificateOpen(true)}
            />

            <FeaturedProject />

            <Services
              onSelectService={(serviceName) => {
                handleOpenInquiry(serviceName);
              }}
            />

            <Education />

            <SkillsCertifications />

            <Volunteering />
          </main>

          {/* Site Footer */}
          <Footer
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenInquiry={handleOpenInquiry}
            onShowIntro={() => {
              setCurrentScreen('intro');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNotify={showNotification}
          />

          {/* Modals & Dialogs */}
          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
            onNotify={showNotification}
          />

          <CertificateModal
            isOpen={isCertificateOpen}
            onClose={() => setIsCertificateOpen(false)}
            onNotify={showNotification}
          />

          <InquiryModal
            isOpen={isInquiryOpen}
            onClose={() => setIsInquiryOpen(false)}
            defaultType={inquiryType}
            onNotify={showNotification}
          />

          {/* Toast Notification */}
          <Toast message={toastMessage} visible={toastVisible} />
        </div>
      )}
    </div>
  );
}
