import React, { useState, useRef, useEffect } from 'react';
import { useLocalization } from '../contexts/LanguageContext';
import githubLight from '../assets/githubLight.svg';
import LinkedInLight from '../assets/linkedinLight.svg';
import githubNight from '../assets/githubNight.svg';
import LinkedInNight from '../assets/linkedinNight.svg';
import { useTheme } from '../contexts/ThemeContext';
import { useScrollAnimation, useParallax, useHoverEffect } from '../hooks/useScrollAnimation';

const Hero = () => {
  const { darkMode } = useTheme();
  const { serverData } = useLocalization();
  const bio = serverData.bio;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const heroImageRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Enhanced animation hooks
  const [titleRef, titleVisible] = useScrollAnimation({ delay: 100 });
  const [subtitleRef, subtitleVisible] = useScrollAnimation({ delay: 300 });
  const [textRef, textVisible] = useScrollAnimation({ delay: 500 });
  const [buttonsRef, buttonsVisible] = useScrollAnimation({ delay: 700 });
  const [imageRef, imageVisible] = useScrollAnimation({ delay: 400 });
  
  // Parallax effects for background elements
  const [bg1Ref, bg1Transform] = useParallax(0.2);
  const [bg2Ref, bg2Transform] = useParallax(0.4);
  const [bg3Ref, bg3Transform] = useParallax(0.6);

  // Advanced hover effect for the main content
  const { elementRef: contentRef, isHovered: contentHovered, mousePosition: contentMouse, handlers: contentHandlers } = useHoverEffect();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    // Animasyon için görünürlüğü ayarla
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(timer);
    };
  }, []);

  // 3D efekt için fare hareketini izle
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isHovering && heroImageRef.current) {
        const rect = heroImageRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        setMousePosition({ x: mouseX, y: mouseY });
        
        // Fare pozisyonuna göre rotasyon hesapla
        const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 8;
        const rotateX = ((centerY - mouseY) / (rect.height / 2)) * 8;
        
        setRotation({ x: rotateX, y: rotateY });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovering]);

  const scrollToFooter = () => {
    const footerSection = document.querySelector('#footer');
    if (footerSection) {
      footerSection.scrollIntoView({ behavior: "smooth" });
      const emailElement = document.querySelector('.email-link');
      if (emailElement) {
        emailElement.classList.add('animate-flash', 'text-red-500');
        setTimeout(() => {
          emailElement.classList.remove('animate-flash', 'text-red-500');
        }, 4000);
      }
    }
  };

  // Paralaks efekti için fare pozisyonuna göre transform hesapla
  const calculateParallaxTransform = (depth = 1) => {
    if (!isHovering) return { transform: 'translate(0, 0)' };
    
    const moveX = (mousePosition.x - window.innerWidth / 2) * 0.01 * depth;
    const moveY = (mousePosition.y - window.innerHeight / 2) * 0.01 * depth;
    
    return {
      transform: `translate(${moveX}px, ${moveY}px)`,
      transition: 'transform 0.1s ease-out',
    };
  };

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row gap-8 max-w-[85%] xl:max-w-8xl mx-auto py-32 justify-between items-center overflow-visible">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Enhanced gradient circles with parallax */}
          <div 
            ref={bg1Ref}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 dark:bg-secondary-500/10 rounded-full blur-3xl animate-float"
            style={{ transform: bg1Transform }}
          ></div>
          <div 
            ref={bg2Ref}
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary-500/10 dark:bg-primary-500/10 rounded-full blur-2xl animate-pulse-slow"
            style={{ transform: bg2Transform }}
          ></div>
          
          {/* Enhanced animated grid pattern */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
            <div className="absolute inset-0 animate-gradient-shift" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${darkMode === 'dark' ? '#ffffff' : '#000000'} 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          {/* Enhanced floating elements with better animations */}
          <div 
            ref={bg3Ref}
            className="absolute top-1/3 right-1/3 w-32 h-32 rounded-blob bg-accent-500/5 dark:bg-accent-400/5 animate-morph hover-magnetic"
            style={{ transform: `${bg3Transform} ${calculateParallaxTransform(2).transform}` }}
          ></div>
          <div 
            className="absolute bottom-1/3 left-1/3 w-40 h-40 rounded-blob bg-highlight-500/5 dark:bg-highlight-400/5 animate-morph"
            style={{...calculateParallaxTransform(1.5), animationDelay: '2s'}}
          ></div>
          <div 
            className="absolute top-2/3 right-1/4 w-24 h-24 border-2 border-primary-500/10 dark:border-primary-400/10 rounded-full animate-spin-slow hover-glow"
            style={calculateParallaxTransform(3)}
          ></div>
          
          {/* New floating particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-primary-500/20 dark:bg-secondary-500/20 rounded-full animate-float`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div 
        ref={contentRef}
        className={`text-left space-y-8 w-full lg:w-1/2 relative z-10`}
        {...contentHandlers}
        style={{
          transform: contentHovered ? `perspective(1000px) rotateX(${contentMouse.y * 0.02}deg) rotateY(${contentMouse.x * 0.02}deg)` : 'none',
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="space-y-6">
          <div 
            ref={titleRef}
            className={`inline-block transition-all duration-1000 transform ${
              titleVisible ? 'animate-slide-in-left' : 'opacity-0 -translate-x-12'
            }`}
          >
            <span className="text-primary-700 dark:text-secondary-300 text-lg sm:text-xl font-semibold tracking-wider relative group hover-glow">
              ————— {bio.fullName}
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </span>
          </div>
          
          <h1 
            ref={subtitleRef}
            className={`text-gray-900 dark:text-gray-300 font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-tight transition-all duration-1000 transform ${
              subtitleVisible ? 'animate-slide-in-bottom' : 'opacity-0 translate-y-12'
            }`}
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-secondary-600 dark:from-primary-400 dark:to-secondary-300 animate-gradient-shift text-shadow-glow hover-magnetic">
              {bio.tagline1}
            </span>
            <span className="block mt-2 relative group hover-3d">
              {bio.tagline2}
              <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </span>
          </h1>
          
          <p 
            ref={textRef}
            className={`mt-6 text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:max-w-2xl leading-relaxed group transition-all duration-1000 transform ${
              textVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'
            }`}
          >
            {bio.introText}
            <div className="w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 mt-2"></div>
          </p>
        </div>

        <nav 
          ref={buttonsRef}
          className={`flex flex-wrap gap-4 mt-8 mb-8 lg:mb-0 transition-all duration-1000 transform ${
            buttonsVisible ? 'animate-stagger-fade' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={scrollToFooter}
            className="btn-enhanced group relative w-full sm:w-auto px-8 py-3 bg-primary-700 dark:bg-secondary-300 text-white dark:text-slate-950 font-bold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-glow-soft hover:scale-105 hover-magnetic ripple-effect"
          >
            <span className="relative z-10">{bio.workWithMe}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-secondary-200 dark:to-secondary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>

          <a
            href={bio.socialLinks.github}
            className="btn-enhanced group flex items-center justify-center w-full sm:w-auto px-8 py-3 border-2 border-primary-700 dark:border-secondary-300 text-primary-700 dark:text-secondary-300 font-bold rounded-lg transition-all duration-300 hover:shadow-glow-soft hover:scale-105 hover:bg-primary-50 dark:hover:bg-secondary-900/20 glass-enhanced hover-magnetic"
          >
            {darkMode === 'dark' ? (
              <img src={githubNight} className="w-6 h-6 mr-3 transition-transform group-hover:scale-110 group-hover:rotate-12 hover-glow" />
            ) : (
              <img src={githubLight} className="w-6 h-6 mr-3 transition-transform group-hover:scale-110 group-hover:rotate-12 hover-glow" />
            )}
            <span className="relative">
              {bio.codeRepo}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-700 dark:bg-secondary-300 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </a>

          <a
            href={bio.socialLinks.linkedin}
            className="btn-enhanced group flex items-center justify-center w-full sm:w-auto px-8 py-3 border-2 border-primary-700 dark:border-secondary-300 text-primary-700 dark:text-secondary-300 font-bold rounded-lg transition-all duration-300 hover:shadow-glow-soft hover:scale-105 hover:bg-primary-50 dark:hover:bg-secondary-900/20 glass-enhanced hover-magnetic"
          >
            {darkMode === 'dark' ? (
              <img src={LinkedInNight} className="w-6 h-6 mr-3 transition-transform group-hover:scale-110 group-hover:rotate-12 hover-glow" />
            ) : (
              <img src={LinkedInLight} className="w-6 h-6 mr-3 transition-transform group-hover:scale-110 group-hover:rotate-12 hover-glow" />
            )}
            <span className="relative">
              {bio.socialProfile}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-700 dark:bg-secondary-300 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </a>

          <div className="relative w-full sm:w-auto" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="btn-enhanced group flex items-center justify-center w-full px-8 py-3 border-2 border-primary-700 dark:border-secondary-300 text-primary-700 dark:text-secondary-300 font-bold rounded-lg transition-all duration-300 hover:shadow-glow-soft hover:scale-105 hover:bg-primary-50 dark:hover:bg-secondary-900/20 glass-enhanced hover-magnetic ripple-effect"
            >
              <span className="mr-2 transition-transform duration-300 group-hover:rotate-12 animate-bounce-slow hover-glow">📄</span>
              <span className="relative">
                {serverData.lang === "TÜRKÇE" ? "CV'yi İndir" : "Download CV"}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-700 dark:bg-secondary-300 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-full sm:w-48 bg-white dark:bg-dark-100 shadow-xl border border-gray-200 dark:border-dark-300 rounded-lg z-[9999] animate-elastic-in glass-enhanced">
                <div className="p-1">
                  <a
                    href="/cv-tr.pdf"
                    download
                    className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors duration-200 rounded-md group hover-magnetic"
                  >
                    <span className="relative">
                      Türkçe CV
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-700 dark:bg-secondary-300 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                  <a
                    href="/cv-en.pdf"
                    download
                    className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors duration-200 rounded-md group hover-magnetic"
                  >
                    <span className="relative">
                      English CV
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-700 dark:bg-secondary-300 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>

      <div 
        ref={imageRef}
        className={`relative mt-20 lg:mt-0 group w-full lg:w-1/2 flex justify-center lg:justify-end lg:pr-8 transition-all duration-1000 transform ${
          imageVisible ? 'animate-zoom-in' : 'opacity-0 scale-50'
        }`} 
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setRotation({ x: 0, y: 0 });
        }}
      >
        <div className="relative z-0 perspective hover-3d">
          <div 
            className="relative preserve-3d transition-all duration-500 hover-magnetic"
            style={{
              transform: isHovering ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.02)` : 'rotateX(0) rotateY(0) scale(1)',
              transition: isHovering ? 'none' : 'transform 0.5s ease-out'
            }}
          >
            <img
              ref={heroImageRef}
              className="rounded-2xl w-full max-w-[450px] max-h-[375px] object-cover shadow-2xl transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-neon-purple dark:group-hover:shadow-neon glass-enhanced"
              src="../image.png"
              alt="Hero image"
            />
            
            {/* Enhanced overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-secondary-500/10 dark:from-primary-500/20 dark:to-secondary-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-shift"></div>
            
            {/* Enhanced 3D effect layers */}
            <div 
              className="absolute inset-0 rounded-2xl border-2 border-white/20 dark:border-white/10 transform preserve-3d backface-hidden shadow-glow-soft"
              style={{ 
                transform: 'translateZ(20px)',
                opacity: isHovering ? 0.5 : 0,
                transition: 'opacity 0.5s ease'
              }}
            ></div>
            <div 
              className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary-500/5 to-secondary-500/5 dark:from-primary-500/10 dark:to-secondary-500/10 transform preserve-3d backface-hidden animate-shimmer"
              style={{ 
                transform: 'translateZ(10px)',
                opacity: isHovering ? 1 : 0,
                transition: 'opacity 0.5s ease'
              }}
            ></div>
            
            {/* Enhanced decorative elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 dark:from-primary-500/10 dark:to-secondary-500/10 rounded-2xl -z-10 blur-xl transition-all duration-500 group-hover:blur-2xl animate-pulse-slow"></div>
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 dark:from-primary-500/5 dark:to-secondary-500/5 rounded-2xl -z-20 blur-2xl transition-all duration-500 group-hover:blur-3xl"></div>
            
            {/* Enhanced floating elements */}
            <div 
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-500/10 dark:bg-secondary-500/10 rounded-full blur-2xl transition-all duration-500 group-hover:scale-120 animate-float"
              style={calculateParallaxTransform(2)}
            ></div>
            <div 
              className="absolute -top-6 -right-6 w-32 h-32 bg-secondary-500/10 dark:bg-primary-500/10 rounded-full blur-2xl transition-all duration-500 group-hover:scale-120 animate-pulse-slow"
              style={calculateParallaxTransform(1.5)}
            ></div>
            
            {/* Enhanced floating particles */}
            <div 
              className="absolute -top-8 -left-8 w-16 h-16 bg-primary-500/30 dark:bg-primary-400/20 rounded-full blur-md animate-float hover-glow"
              style={calculateParallaxTransform(3)}
            ></div>
            <div 
              className="absolute -bottom-10 -right-6 w-20 h-20 bg-secondary-500/30 dark:bg-secondary-400/20 rounded-full blur-md animate-pulse-slow hover-magnetic" 
              style={{...calculateParallaxTransform(2.5), animationDelay: '1s'}}
            ></div>
            
            {/* Enhanced corner accents */}
            <div 
              className="absolute -top-1 -left-1 w-6 h-6 bg-primary-500/50 dark:bg-primary-400/30 rounded-md transform rotate-45 animate-pulse-slow hover-glow" 
              style={{...calculateParallaxTransform(4), animationDelay: '0.5s'}}
            ></div>
            <div 
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary-500/50 dark:bg-secondary-400/30 rounded-md transform rotate-45 animate-pulse-slow hover-glow" 
              style={{...calculateParallaxTransform(4), animationDelay: '1.5s'}}
            ></div>
            
            {/* Enhanced 3D effect elements */}
            <div 
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-accent-500/40 dark:bg-accent-400/30 transform preserve-3d backface-hidden animate-bounce-slow hover-magnetic"
              style={{ 
                transform: 'translateZ(30px) translateX(5px)',
                opacity: isHovering ? 1 : 0,
                transition: 'opacity 0.5s ease',
                animationDelay: '0.7s'
              }}
            ></div>
            <div 
              className="absolute -bottom-3 -left-3 w-8 h-8 rounded-full bg-highlight-500/40 dark:bg-highlight-400/30 transform preserve-3d backface-hidden animate-bounce-slow hover-magnetic"
              style={{ 
                transform: 'translateZ(25px) translateX(-5px)',
                opacity: isHovering ? 1 : 0,
                transition: 'opacity 0.5s ease',
                animationDelay: '1.2s'
              }}
            ></div>
            
            {/* Enhanced light effect */}
            <div 
              className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 to-white/20 dark:from-white/0 dark:to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"
              style={{ 
                transform: `rotate3d(${-rotation.x/10}, ${rotation.y/10}, 0, 20deg)`,
                transformOrigin: 'center',
                mixBlendMode: 'soft-light'
              }}
            ></div>
            
            {/* New magical sparkles */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full animate-pulse"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${1 + Math.random()}s`,
                  opacity: isHovering ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
