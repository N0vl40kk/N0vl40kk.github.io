import React, { useMemo, useRef, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = ({ t, appStage, loadingProgress }) => {
  // --- ГЕНЕРАЦИЯ: 1-48 ПО ПОРЯДКУ ---
  const { columnsData, targetSpeeds } = useMemo(() => {
    const COLS = 8;
    const ROWS_PER_COL = 6;
    
    // Итого 8 * 6 = 48 ячеек. Идеально под 48 видео.
    
    const cols = [];
    const speeds = [];

    let counter = 1;

    for (let c = 0; c < COLS; c++) {
      const colVideos = [];
      for (let r = 0; r < ROWS_PER_COL; r++) {
        colVideos.push(counter);
        counter++;
      }
      cols.push({ videos: colVideos });
      
      // Скорости
      speeds.push({
          fast: 0.3 + Math.random() * 0.3,
          slow: 0.015 + Math.random() * 0.02
      });
    }

    return { columnsData: cols, targetSpeeds: speeds };
  }, []);

  // --- JS PHYSICS ENGINE ---
  const colRefs = useRef([]);
  const positions = useRef(Array(8).fill(0));
  const currentSpeeds = useRef(Array(8).fill(0)); 

  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      const isFastMode = appStage === 'loading' || appStage === 'speedup';
      columnsData.forEach((_, i) => {
        const target = isFastMode ? targetSpeeds[i].fast : targetSpeeds[i].slow;
        currentSpeeds.current[i] += (target - currentSpeeds.current[i]) * 0.02;
        positions.current[i] -= currentSpeeds.current[i];
        
        // Сброс при -50% для зацикливания
        if (positions.current[i] <= -50) positions.current[i] += 50;

        if (colRefs.current[i]) {
            colRefs.current[i].style.transform = `translate3d(0, ${positions.current[i]}%, 0)`;
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [appStage, columnsData, targetSpeeds]);

  const isLoaded = appStage === 'normal';

  return (
    <section id="section-hero" className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-8">
        
        {/* ВИДЕО ФОН */}
        <div className={`absolute inset-0 z-0 pointer-events-none flex justify-center gap-2 md:gap-3 -ml-[10vw] w-[120vw] h-[120vh] -mt-[10vh] transition-opacity duration-700 ease-out ${appStage !== 'loading' ? 'opacity-60' : 'opacity-0'}`} 
               style={{ transform: `rotate(-3deg) scale(1.1)` }}>
              
              {columnsData.map((col, colIndex) => (
                  <div key={colIndex} className="relative w-full h-full overflow-hidden">
                      <div ref={el => colRefs.current[colIndex] = el} className="flex flex-col gap-2 md:gap-3 will-change-transform">
                          {/* Оригинал */}
                          {col.videos.map((vidIdx, i) => (
                             <div key={`orig-${i}`} className="aspect-[9/16] w-full rounded-sm overflow-hidden bg-zinc-800 border border-white/5">
                                <video src={`/assets/videos/grid_${vidIdx}.webm`} autoPlay muted loop playsInline className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                             </div>
                          ))}
                          {/* Дубликат для лупа (те же видео) */}
                          {col.videos.map((vidIdx, i) => (
                             <div key={`dup-${i}`} className="aspect-[9/16] w-full rounded-sm overflow-hidden bg-zinc-800 border border-white/5">
                                <video src={`/assets/videos/grid_${vidIdx}.webm`} autoPlay muted loop playsInline className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                             </div>
                          ))}
                      </div>
                  </div>
              ))}
        </div>
          
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
          
        <div className="relative z-20 text-center px-4 flex flex-col items-center w-full max-w-4xl">
              
              {/* РОЛЬ */}
              <div className={`inline-block mb-8 px-5 py-2 border rounded-full font-monument tracking-[0.1em] uppercase opacity-0 backdrop-blur-sm border-white/20 text-white text-[10px] md:text-xs transition-all duration-700 ease-out ${isLoaded ? '!opacity-100 translate-y-0' : 'translate-y-4'}`}>
                  {t.role}
              </div>
              
              {/* ЛОГОТИП */}
              <h1 
                  className={`font-monument uppercase text-white text-5xl md:text-[7rem] tracking-tight leading-none mb-6 drop-shadow-2xl opacity-0 transition-all duration-700 ease-out ${isLoaded ? '!opacity-100 scale-100' : 'scale-105'}`}
                  style={{ fontFamily: "'Monument Extended', sans-serif" }} 
              >
                  NXXSHOT
              </h1>

              {/* ПОДЗАГОЛОВОК */}
              <p className={`font-monument text-white/80 text-sm md:text-xl mb-12 tracking-wide opacity-0 transition-all duration-700 ease-out ${isLoaded ? '!opacity-100 translate-y-0' : 'translate-y-4'}`}>
                  VISUAL STORIES
              </p>

              {/* ЛОАДЕР */}
              <div className={`w-64 md:w-80 h-[2px] bg-white/10 relative overflow-hidden rounded-full transition-opacity duration-500 ${!isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                  <div 
                      className="absolute h-full bg-red-600 transition-all duration-300 ease-out" 
                      style={{ width: `${loadingProgress}%` }}
                  />
              </div>

              {/* СТРЕЛКА */}
              <div className={`mt-12 animate-bounce opacity-0 text-white transition-opacity duration-700 delay-200 ${isLoaded ? '!opacity-50' : ''}`}>
                  <ArrowDown size={32} />
              </div>
        </div>
    </section>
  );
};
export default Hero;
