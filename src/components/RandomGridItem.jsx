import React, { useRef, useEffect, useState, memo } from 'react';

const RandomGridItem = memo(({ initialIndex, onReady }) => {
  const videoRef = useRef(null);
  const isReadyRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  const notifyReady = () => {
    if (!isReadyRef.current && onReady) {
      isReadyRef.current = true;
      onReady();
    }
  };

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && videoEl.readyState >= 3) {
             videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(videoEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
      const videoEl = videoRef.current;
      if (!videoEl) return;
      if (isVisible) videoEl.play().catch(() => {});
      else videoEl.pause();
  }, [isVisible]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
        videoRef.current.playbackRate = 1.0;
        if (videoRef.current.duration > 0) {
            videoRef.current.currentTime = Math.random() * videoRef.current.duration;
        }
    }
  };

  const handlePlaying = () => notifyReady();

  return (
    <video
      ref={videoRef}
      // Вернули простую логику: ID приходит сверху
      src={`/assets/videos/grid_${initialIndex}.webm`}
      onLoadedMetadata={handleLoadedMetadata}
      onPlaying={handlePlaying}
      muted
      loop
      playsInline
      preload="metadata"
      className="w-full h-full object-cover opacity-70 will-change-transform"
      onError={(e) => {
          e.target.style.display = 'none';
          notifyReady(); 
      }}
    />
  );
});

export default RandomGridItem;
