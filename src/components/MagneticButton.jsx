import React, { useRef, useState, useEffect } from 'react';

const MagneticButton = ({ children, onClick, className, href, target }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const dist = Math.hypot(clientX - centerX, clientY - centerY);
      if (dist < 80) {
        const pull = 0.05; 
        const x = (clientX - centerX) * pull;
        const y = (clientY - centerY) * pull;
        setPosition({ x, y });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const style = { 
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' 
  };
  return href ? (
    <a href={href} target={target} ref={ref} style={style} className={`transition-colors duration-300 ${className || ''}`}>{children}</a>
  ) : (
    <button onClick={onClick} ref={ref} style={style} className={`transition-colors duration-300 ${className || ''}`}>{children}</button>
  );
};
export default MagneticButton;
