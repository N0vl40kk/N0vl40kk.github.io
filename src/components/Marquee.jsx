import React from 'react';

const Marquee = () => {
  const text = " CREATIVE DIRECTOR • VIDEO PRODUCTION • VISUAL ARTS • POST PRODUCTION •";
  const content = Array(12).fill(text).join(" ");

  return (
    <div className="w-full pointer-events-none overflow-hidden py-3 bg-black border-b border-white/10">
      <div className="marquee-container">
        <div className="marquee-content">
           <span className="font-monument text-[10px] md:text-xs text-white/80 tracking-[0.2em] uppercase px-4">
             {content}
           </span>
           <span className="font-monument text-[10px] md:text-xs text-white/80 tracking-[0.2em] uppercase px-4">
             {content}
           </span>
        </div>
      </div>
    </div>
  );
};
export default Marquee;
