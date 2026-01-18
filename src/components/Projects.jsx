import React, { useState, useEffect, useRef } from 'react';
import { themeConfig as cfg } from '../themeConfig';
import { MousePointer2 } from 'lucide-react';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [showHint, setShowHint] = useState(true);
  const hintTimerRef = useRef(null);

  useEffect(() => {
    if (activeProject) {
      setShowHint(false);
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    } else {
      hintTimerRef.current = setTimeout(() => {
        setShowHint(true);
      }, 7000);
    }
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, [activeProject]);

  return (
    <section id="section-projects" className="relative h-screen flex items-center justify-center overflow-hidden bg-black px-6">
        
        <div className="absolute inset-0 z-0 transition-opacity duration-700 pointer-events-none">
             {/* OTHERS: Темный градиент (insta-live-gradient) */}
             <div className={`absolute inset-0 insta-live-gradient transition-opacity duration-700 ${activeProject === 'others' ? 'opacity-100' : 'opacity-0'}`} />
             {/* Легкое затемнение, чтобы текст читался лучше */}
             <div className={`absolute inset-0 bg-black transition-opacity duration-700 ${activeProject === 'others' ? 'opacity-20' : 'opacity-0'}`} />

             {cfg.categories.map((cat) => (
                 <div key={cat.id} className={`absolute inset-0 transition-opacity duration-700 ${activeProject === cat.id && cat.id !== 'others' ? 'opacity-100' : 'opacity-0'}`}>
                      {cat.id !== 'others' && (
                        <video src={`/assets/videos/${cat.id}_preview.webm`} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                      )}
                 </div>
             ))}
        </div>
        
        <div className="container mx-auto relative z-10 py-24">
            <h2 className="font-monument text-[10px] md:text-xs text-white/30 mb-12 text-center md:text-left tracking-widest uppercase">
                PROJECT ARCHIVE
            </h2>
            
            <div className="flex flex-col gap-1 relative w-fit mx-auto md:mx-0">
                {cfg.categories.map((cat, index) => (
                    <div 
                        key={cat.id} 
                        onMouseEnter={() => setActiveProject(cat.id)} 
                        onMouseLeave={() => setActiveProject(null)} 
                        onClick={() => cat.link && window.open(cat.link, '_blank')}
                        className="group cursor-pointer flex flex-col md:flex-row md:items-center gap-2 md:gap-8 py-1 w-fit relative"
                    >
                        {/* ТУТОРИАЛ - Анимация mouse-tutorial-anim (только наведение) */}
                        {showHint && index === 0 && (
                            <div className="absolute left-[90%] top-[90%] z-50 pointer-events-none mouse-tutorial-anim">
                                <MousePointer2 size={40} fill="white" className="text-black rotate-[-15deg] drop-shadow-xl" />
                            </div>
                        )}

                        <div className="relative shrink-0 flex items-center">
                            <div className="absolute inset-0 -inset-x-4 bg-black/40 blur-lg rounded-full scale-y-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                            
                            <h3 className={`relative z-10 font-pipec uppercase whitespace-nowrap transition-all duration-500 text-3xl md:text-5xl tracking-wide
                                ${activeProject && activeProject !== cat.id ? 'opacity-30 blur-[1px] text-white/40' : 'opacity-100 text-white'} 
                                ${activeProject === cat.id ? 'translate-x-2' : ''}`}>
                                {cat.label} {cat.link && <span className="text-sm align-top opacity-50 font-monument ml-1">↗</span>}
                            </h3>
                            <div className={`h-[1px] transition-all duration-500 ease-out mt-1 ${activeProject === cat.id ? 'w-full opacity-100' : 'w-0 opacity-0'}`} style={{ backgroundColor: cat.color }} />
                        </div>

                        <div className={`transition-all duration-700 max-w-lg ${activeProject === cat.id ? 'opacity-60 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
                             <p className="font-monument text-xs md:text-sm text-white leading-relaxed">
                                 {cat.description}
                             </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};
export default Projects;
