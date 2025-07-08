import React, { useState, useRef, useEffect } from 'react';

const InteractiveSkillCard = ({ skill, index, categoryIndex }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // 3D rotasyon efekti için fare hareketini izle
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 5;
    const rotateX = ((centerY - mouseY) / (rect.height / 2)) * 5;
    
    setRotation({ x: rotateX, y: rotateY });
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };
  
  // Animasyon için görünürlük kontrolü
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className={`group perspective h-full transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ 
        transitionDelay: `${(categoryIndex * 3 + index) * 100}ms`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="relative p-6 sm:p-8 bg-white dark:bg-dark-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 preserve-3d h-full flex flex-col"
        style={{
          transform: isHovered ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : 'rotateX(0) rotateY(0)',
          transition: isHovered ? 'none' : 'transform 0.5s ease-out'
        }}
      >
        {/* Skill content */}
        <div className="relative z-10 flex-1">
          <div className="flex items-center mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-primary-700 dark:text-secondary-300 group-hover:text-primary-600 dark:group-hover:text-secondary-200 transition-colors duration-300">
              {skill.skillName}
            </h3>
          </div>
          
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed min-h-[4.5rem]">
            {skill.skillDetails}
          </p>

          <div className="mt-6 sm:mt-8 h-1 w-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transform origin-left transition-transform duration-700 ease-in-out"
              style={{ 
                transform: isHovered ? 'scaleX(1)' : 'scaleX(0)'
              }}
            ></div>
          </div>
        </div>

        {/* Decorative elements */}
        <div 
          className="absolute -top-2 -left-2 w-10 sm:w-14 h-10 sm:h-14 bg-primary-100/30 dark:bg-primary-900/20 rounded-lg transform transition-transform duration-500"
          style={{ 
            transform: isHovered ? 'rotate(0deg)' : 'rotate(12deg)'
          }}
        ></div>
        <div 
          className="absolute -bottom-2 -right-2 w-10 sm:w-14 h-10 sm:h-14 bg-secondary-100/30 dark:bg-secondary-900/20 rounded-lg transform transition-transform duration-500"
          style={{ 
            transform: isHovered ? 'rotate(0deg)' : 'rotate(-12deg)'
          }}
        ></div>
        
        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 dark:from-primary-500/10 dark:to-secondary-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Shine effect */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer"
            style={{
              background: `linear-gradient(90deg, transparent, ${isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'}, transparent)`,
              backgroundSize: '200% 100%',
              animation: isHovered ? 'shimmer 1.5s infinite' : 'none'
            }}
          ></div>
        </div>
        
        {/* 3D effect elements */}
        <div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary-500/50 dark:bg-primary-400/50 rounded-full transition-all duration-500"
          style={{ opacity: isHovered ? 1 : 0 }}
        ></div>
        <div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-secondary-500/50 dark:bg-secondary-400/50 rounded-full transition-all duration-500"
          style={{ opacity: isHovered ? 1 : 0 }}
        ></div>
      </div>
    </div>
  );
};

export default InteractiveSkillCard; 