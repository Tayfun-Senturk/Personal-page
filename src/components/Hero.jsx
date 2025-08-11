import React, { useState, useRef, useEffect } from 'react';
import { useLocalization } from '../contexts/LanguageContext';
import githubLight from '../assets/githubLight.svg';
import LinkedInLight from '../assets/linkedinLight.svg';
import githubNight from '../assets/githubNight.svg';
import LinkedInNight from '../assets/linkedinNight.svg';
import { useTheme } from '../contexts/ThemeContext';

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
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    // Sayfa başlığı ve açıklama güncelleme
    const title = `${bio.fullName} — ${bio.tagline1}`;
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', `${bio.introText}`);
  }, [bio.fullName, bio.tagline1, bio.introText]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(timer);
    };
  }, []);

  // Typewriter effect for tagline2
  useEffect(() => {
    setTypedText('');
    let index = 0;
    const text = bio.tagline2 || '';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!text) return;
    if (prefersReducedMotion) {
      setTypedText(text);
      return;
    }
    const id = setInterval(() => {
      index += 1;
      setTypedText(text.slice(0, index));
      if (index >= text.length) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [bio.tagline2]);

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
        const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 8;
        const rotateX = ((centerY - mouseY) / (rect.height / 2)) * 8;
        setRotation({ x: rotateX, y: rotateY });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering]);

  const scrollToFooter = () => {
    const footerSection = document.querySelector('#footer');
    if (footerSection) {
      footerSection.scrollIntoView({ behavior: 'smooth' });
      const emailElement = document.querySelector('.email-link');
      if (emailElement) {
        emailElement.classList.add('animate-flash', 'text-red-500');
        setTimeout(() => emailElement.classList.remove('animate-flash', 'text-red-500'), 4000);
      }
    }
  };

  const scrollToSkills = () => {
    const target = document.getElementById('skills');
    if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
  };

  const calculateParallaxTransform = (depth = 1) => {
    if (!isHovering) return { transform: 'translate(0, 0)' };
    const moveX = (mousePosition.x - window.innerWidth / 2) * 0.01 * depth;
    const moveY = (mousePosition.y - window.innerHeight / 2) * 0.01 * depth;
    return { transform: `translate(${moveX}px, ${moveY}px)`, transition: 'transform 0.1s ease-out' };
  };

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row gap-8 max-w-[85%] xl:max-w-8xl mx-auto py-32 justify-between items-center overflow-visible">
      {/* Arka plan dekoratif öğeleri */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Gradient circles */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 dark:bg-secondary-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary-500/10 dark:bg-primary-500/10 rounded-full blur-2xl animate-pulse-slow"></div>
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${darkMode === 'dark' ? '#ffffff' : '#000000'} 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          {/* Yeni eklenen animasyonlu arka plan öğeleri */}
          <div className="absolute top-1/3 right-1/3 w-32 h-32 rounded-blob bg-accent-500/5 dark:bg-accent-400/5 animate-morph" style={calculateParallaxTransform(2)}></div>
          <div className="absolute bottom-1/3 left-1/3 w-40 h-40 rounded-blob bg-highlight-500/5 dark:bg-highlight-400/5 animate-morph" style={{...calculateParallaxTransform(1.5), animationDelay: '2s'}}></div>
          <div className="absolute top-2/3 right-1/4 w-24 h-24 border border-primary-500/10 dark:border-primary-400/10 rounded-full animate-spin-slow" style={calculateParallaxTransform(3)}></div>
        </div>
      </div>

      <div className={`text-left space-y-8 w-full lg:w-1/2 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="space-y-6">
          <div className="inline-block">
            <span className="text-primary-700 dark:text-secondary-300 text-lg sm:text-xl font-semibold tracking-wider relative group">
              ————— {bio.fullName}
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </span>
          </div>
          <h1 className="text-gray-900 dark:text-gray-300 font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-tight">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-secondary-600 dark:from-primary-400 dark:to-secondary-300 animate-gradient text-shadow-glow">
              {bio.tagline1}
            </span>
            <span className="block mt-2 relative group">
              {typedText}
              <span className="inline-block w-0.5 h-8 align-middle ml-1 bg-primary-600 dark:bg-secondary-300 animate-flash" aria-hidden="true"></span>
              <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </span>
          </h1>
          <p className="mt-6 text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:max-w-2xl leading-relaxed group">
            {bio.introText}
            <div className="w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 mt-2"></div>
          </p>
        </div>
        <nav className="flex flex-wrap gap-4 mt-8 mb-8 lg:mb-0">
          <button onClick={scrollToFooter} className="group relative w-full sm:w-auto px-8 py-3 bg-primary-700 dark:bg-secondary-300 text-white dark:text-slate-950 font-bold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <span className="relative z-10">{bio.workWithMe}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-secondary-200 dark:to-secondary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>
          <a href={bio.socialLinks.github} className="group flex items-center justify-center w-full sm:w-auto px-8 py-3 border-2 border-primary-700 dark:border-secondary-300 text-primary-700 dark:text-secondary-300 font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-primary-50 dark:hover:bg-secondary-900/20">
            {darkMode === 'dark' ? (<img src={githubNight} className="w-6 h-6 mr-3 transition-transform group-hover:scale-110 group-hover:rotate-12" />) : (<img src={githubLight} className="w-6 h-6 mr-3 transition-transform group-hover:scale-110 group-hover:rotate-12" />)}
            <span className="relative">{bio.codeRepo}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-700 dark:bg-secondary-300 transition-all duration-300 group-hover:w-full"></span></span>
          </a>
          <a href={bio.socialLinks.linkedin} className="group flex items-center justify-center w-full sm:w-auto px-8 py-3 border-2 border-primary-700 dark:border-secondary-300 text-primary-700 dark:text-secondary-300 font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-primary-50 dark:hover:bg-secondary-900/20">
            {darkMode === 'dark' ? (<img src={LinkedInNight} className="w-6 h-6 mr-3 transition-transform group-hover:scale-110 group-hover:rotate-12" />) : (<img src={LinkedInLight} className="w-6 h-6 mr-3 transition-transform group-hover:scale-110 group-hover:rotate-12" />)}
            <span className="relative">{bio.socialProfile}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-700 dark:bg-secondary-300 transition-all duration-300 group-hover:w-full"></span></span>
          </a>
          <div className="relative w-full sm:w-auto" ref={dropdownRef}>
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="group flex items-center justify-center w-full px-8 py-3 border-2 border-primary-700 dark:border-secondary-300 text-primary-700 dark:text-secondary-300 font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-primary-50 dark:hover:bg-secondary-900/20">
              <span className="mr-2 transition-transform duration-300 group-hover:rotate-12 animate-bounce-slow">📄</span>
              <span className="relative">{serverData.lang === 'TÜRKÇE' ? "CV'yi İndir" : 'Download CV'}<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-700 dark:bg-secondary-300 transition-all duration-300 group-hover:w-full"></span></span>
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-full sm:w-48 bg-white dark:bg-dark-100 shadow-xl border border-gray-200 dark:border-dark-300 rounded-lg z-[9999] animate-fade-in">
                <div className="p-1">
                  <a href="/cv-tr.pdf" download className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors duration-200 rounded-md group"><span className="relative">Türkçe CV<span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-700 dark:bg-secondary-300 transition-all duration-300 group-hover:w-full"></span></span></a>
                  <a href="/cv-en.pdf" download className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-200 transition-colors duration-200 rounded-md group"><span className="relative">English CV<span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-700 dark:bg-secondary-300 transition-all duration-300 group-hover:w-full"></span></span></a>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>

      <div ref={heroImageRef} className={`relative mt-20 lg:mt-0 group w-full lg:w-1/2 flex justify-center lg:justify-end lg:pr-8 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{transitionDelay: '200ms'}} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => { setIsHovering(false); setRotation({ x: 0, y: 0 }); }}>
        <div className="relative z-0 perspective">
          <div className="relative preserve-3d transition-all duration-500" style={{ transform: isHovering ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : 'rotateX(0) rotateY(0)', transition: isHovering ? 'none' : 'transform 0.5s ease-out' }}>
            <img className="rounded-2xl w-full max-w-[450px] max-h-[375px] object-cover shadow-2xl transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-neon-purple dark:group-hover:shadow-neon" src="/image.png" srcSet="/image.png 1x, /image.png 2x" sizes="(min-width: 1024px) 450px, 90vw" loading="lazy" decoding="async" fetchpriority="high" alt={`${bio.fullName} portre görseli`} />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-secondary-500/10 dark:from-primary-500/20 dark:to-secondary-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 rounded-2xl border-2 border-white/20 dark:border-white/10 transform preserve-3d backface-hidden" style={{ transform: 'translateZ(20px)', opacity: isHovering ? 0.5 : 0, transition: 'opacity 0.5s ease' }}></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary-500/5 to-secondary-500/5 dark:from-primary-500/10 dark:to-secondary-500/10 transform preserve-3d backface-hidden" style={{ transform: 'translateZ(10px)', opacity: isHovering ? 1 : 0, transition: 'opacity 0.5s ease' }}></div>
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 dark:from-primary-500/10 dark:to-secondary-500/10 rounded-2xl -z-10 blur-xl transition-all duration-500 group-hover:blur-2xl"></div>
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 dark:from-primary-500/5 dark:to-secondary-500/5 rounded-2xl -z-20 blur-2xl transition-all duration-500 group-hover:blur-3xl"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-500/10 dark:bg-secondary-500/10 rounded-full blur-2xl transition-all duration-500 group-hover:scale-120" style={calculateParallaxTransform(2)}></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary-500/10 dark:bg-primary-500/10 rounded-full blur-2xl transition-all duration-500 group-hover:scale-120" style={calculateParallaxTransform(1.5)}></div>
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-primary-500/30 dark:bg-primary-400/20 rounded-full blur-md animate-float" style={calculateParallaxTransform(3)}></div>
            <div className="absolute -bottom-10 -right-6 w-20 h-20 bg-secondary-500/30 dark:bg-secondary-400/20 rounded-full blur-md animate-pulse-slow" style={{...calculateParallaxTransform(2.5), animationDelay: '1s'}}></div>
            <div className="absolute -top-1 -left-1 w-6 h-6 bg-primary-500/50 dark:bg-primary-400/30 rounded-md transform rotate-45 animate-pulse-slow" style={{...calculateParallaxTransform(4), animationDelay: '0.5s'}}></div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary-500/50 dark:bg-secondary-400/30 rounded-md transform rotate-45 animate-pulse-slow" style={{...calculateParallaxTransform(4), animationDelay: '1.5s'}}></div>
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-accent-500/40 dark:bg-accent-400/30 transform preserve-3d backface-hidden animate-bounce-slow" style={{ transform: 'translateZ(30px) translateX(5px)', opacity: isHovering ? 1 : 0, transition: 'opacity 0.5s ease', animationDelay: '0.7s' }}></div>
            <div className="absolute -bottom-3 -left-3 w-8 h-8 rounded-full bg-highlight-500/40 dark:bg-highlight-400/30 transform preserve-3d backface-hidden animate-bounce-slow" style={{ transform: 'translateZ(25px) translateX(-5px)', opacity: isHovering ? 1 : 0, transition: 'opacity 0.5s ease', animationDelay: '1.2s' }}></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 to-white/20 dark:from-white/0 dark:to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: `rotate3d(${-rotation.x/10}, ${rotation.y/10}, 0, 20deg)`, transformOrigin: 'center', mixBlendMode: 'soft-light' }}></div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <button type="button" onClick={scrollToSkills} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary-700 dark:text-secondary-300 animate-bounce focus:outline-none" aria-label="Aşağı Kaydır">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
      </button>

    </section>
  );
};

export default Hero;
