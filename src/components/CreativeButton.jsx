import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

function CreativeButton({
  text = "Discover more",
  className = "",
  onClick
}) {
  const buttonRef = useRef(null);
  const bgRef = useRef(null);
  const textWhiteRef = useRef(null);
  const textBlackRef = useRef(null);
  const iconRef = useRef(null);
  const timeline = useRef(null);

  useEffect(() => {
    // Initialize the timeline
    timeline.current = gsap.timeline({ paused: true });
    
    // Set initial states
    gsap.set(bgRef.current, { yPercent: 100 });
    gsap.set(textBlackRef.current, { yPercent: 120, opacity: 0 });
    gsap.set(iconRef.current, { yPercent: 100, opacity: 0 });
    
    // Create the animation sequence
    timeline.current
      .to(bgRef.current, { 
        yPercent: 0, 
        duration: 0.5, 
        ease: "power2.out" 
      }, 0)
      .to(textWhiteRef.current, { 
        yPercent: -120, 
        duration: 0.5, 
        ease: "power2.out" 
      }, 0)
      .to(textBlackRef.current, { 
        yPercent: 0, 
        opacity: 1, 
        duration: 0.5, 
        ease: "power2.out" 
      }, 0.1)
      .to(iconRef.current, { 
        yPercent: 0, 
        opacity: 1, 
        duration: 0.4, 
        ease: "back.out(1.7)" 
      }, 0.2);
      
    // Clean up
    return () => {
      if (timeline.current) {
        timeline.current.kill();
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeline.current) {
      timeline.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (timeline.current) {
      timeline.current.reverse();
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`relative overflow-hidden rounded-full border border-white/20 px-8 py-4 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Background slide effect */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-white"/>
      
      {/* Text container */}
      <div className="relative flex items-center justify-between w-fit">
        {/* First text that slides up and out */}
        <span 
          ref={textWhiteRef}
          className="text-white font-medium"
        >
          {text}
        </span>
        
        {/* Second text that slides up and in */}
        <span 
          ref={textBlackRef}
          className="absolute left-0 text-black font-medium"
        >
          {text}
        </span>
        
        {/* Icon */}
      </div>
    </button>
  );
}

export default CreativeButton;