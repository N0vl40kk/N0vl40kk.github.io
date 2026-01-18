import React, { forwardRef } from 'react';
import { Mail, Phone, Send, MessageCircle } from 'lucide-react';
import { themeConfig as cfg } from '../themeConfig';
import MagneticButton from './MagneticButton';

const Footer = forwardRef((props, ref) => {
  return (
    <footer ref={ref} id="section-footer" className="h-screen flex flex-col items-center justify-center border-t border-white/5 relative z-40 px-6 text-center overflow-hidden bg-black">
        <h2 className="font-pipec mb-16 uppercase tracking-tighter pressed-text text-white text-4xl md:text-5xl">CONTACT</h2>
        <div className="flex flex-wrap justify-center gap-4 font-mono text-xs relative z-10">
            <MagneticButton href="https://wa.me/77766806526" target="_blank" className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full text-white/80 hover:text-white hover:border-[#25D366] hover:shadow-[0_0_15px_rgba(37,211,102,0.3)] bg-black/50 backdrop-blur-sm"><Phone size={14} className="text-[#25D366]" /> WhatsApp</MagneticButton>
            <MagneticButton href="https://t.me/nxxbruh" target="_blank" className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full text-white/80 hover:text-white hover:border-[#0088cc] hover:shadow-[0_0_15px_rgba(0,136,204,0.3)] bg-black/50 backdrop-blur-sm"><Send size={14} className="text-[#0088cc]" /> Telegram</MagneticButton>
            <MagneticButton href="mailto:zhengisbayy@gmail.com" className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full text-white/80 hover:text-white hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] bg-black/50 backdrop-blur-sm"><Mail size={14} /> Gmail</MagneticButton>
            <MagneticButton className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full cursor-default text-white/80 hover:border-[#5865F2] hover:shadow-[0_0_15px_rgba(88,101,242,0.3)] bg-black/50 backdrop-blur-sm"><MessageCircle size={14} className="text-[#5865F2]" /> Discord</MagneticButton>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[25vh] bg-white/10 blur-[90px] rounded-full pointer-events-none" />
        <p className="mt-20 text-[10px] font-mono opacity-20 tracking-[1em] uppercase relative z-10 text-white">© {new Date().getFullYear()} NXXSHOT</p>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;
