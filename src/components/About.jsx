import React from 'react';
import { themeConfig as cfg } from '../themeConfig';

const About = ({ t }) => {
  return (
    <section id="section-about" className="h-screen flex items-center justify-center border-t border-white/5 relative z-40 px-6 text-center bg-black">
        <div className="max-w-3xl mx-auto">
            <h2 className="font-mono text-[10px] uppercase tracking-[1em] opacity-30 mb-8 text-white">BIOGRAPHY</h2>
            <p className="font-sans font-light leading-relaxed tracking-tight italic text-white/70 text-lg md:text-xl">{t.about}</p>
            <div className="mt-12 w-16 h-px bg-red-600 mx-auto opacity-30"></div>
        </div>
    </section>
  );
};

export default About;
