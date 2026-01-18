import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Mail, ArrowUp } from 'lucide-react';

import MagneticButton from './components/MagneticButton';
import Marquee from './components/Marquee';
import Hero from './components/Hero';
import Projects from './components/Projects';
import AboutContact from './components/AboutContact';

export default function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [appStage, setAppStage] = useState('loading'); 
  
  const currentSectionRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const sections = ['section-hero', 'section-projects', 'section-contact'];

  // ЛОГИКА ЗАГРУЗКИ
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 8; 
      if (progress >= 100) {
        progress = 100;
        setLoadingProgress(100);
        clearInterval(interval);
        
        setTimeout(() => {
          setAppStage('speedup'); 
          setTimeout(() => setAppStage('normal'), 800); 
        }, 100);
      } else {
        setLoadingProgress(progress);
      }
    }, 50); 
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (index) => {
    if (index < 0 || index >= sections.length) return;
    currentSectionRef.current = index;
    const el = document.getElementById(sections[index]);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleWheel = (e) => {
      if (appStage !== 'normal') return;
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTimeRef.current < 500) return;
      if (Math.abs(e.deltaY) < 20) return;
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = currentSectionRef.current + direction;
      if (nextIndex >= 0 && nextIndex < sections.length) {
        lastScrollTimeRef.current = now;
        scrollToSection(nextIndex);
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [appStage]);

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  const t = {
    ru: { role: "Видеограф • Монтажер", about: "Я создаю визуальные миры. Базируюсь в Астане. Специализируюсь на динамичной съемке и глубоком монтаже. Каждый проект — это история, рассказанная через объектив." },
    en: { role: "Videographer • Editor", about: "I create visual worlds. Based in Astana. Specializing in dynamic shooting and deep editing. Every project is a story told through the lens." }
  };

  // Флаг видимости для контента
  const isContentVisible = appStage === 'normal';

  return (
    <div className="min-h-screen font-sans selection:bg-red-600 bg-black text-white overflow-hidden relative">

      {/* Бегущая строка - ПЛАВНОЕ ПОЯВЛЕНИЕ (opacity duration-2000) */}
      <div className={`fixed top-0 w-full z-50 transition-opacity duration-[2000ms] ease-out ${isContentVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Marquee />
      </div>

      <div className={`fixed bottom-8 right-8 z-[100] flex flex-col gap-3 items-center transition-opacity duration-[2000ms] ease-out ${isContentVisible ? 'opacity-100' : 'opacity-0'}`}>
          <MagneticButton onClick={() => scrollToSection(0)} className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/40 hover:bg-white/20 backdrop-blur-sm transition-all"><ArrowUp size={24} /></MagneticButton>
          <MagneticButton onClick={() => scrollToSection(2)} className="w-14 h-14 flex items-center justify-center rounded-full shadow-xl bg-white text-black hover:scale-105 transition-all"><Mail size={24} /></MagneticButton>
      </div>

      <div className="transition-all duration-700">
        <Hero t={t.en} appStage={appStage} loadingProgress={loadingProgress} />
        <Projects />
        <AboutContact t={t.en} />
      </div>
    </div>
  );
}
