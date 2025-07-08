import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLocalization } from '../contexts/LanguageContext';

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { toggleLanguage, serverData } = useLocalization();
  const navbar = serverData.navbar;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef(null);
  const activeButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Aktif bölümü belirle
      const sections = ['skills', 'projects', 'footer'];
      let currentSection = '';
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentSection = section;
          }
        }
      });
      
      setActiveSection(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Aktif bölüm değiştiğinde gösterge stilini güncelle
  useEffect(() => {
    if (activeSection && activeButtonRef.current) {
      const button = document.querySelector(`[data-section="${activeSection}"]`);
      if (button) {
        const rect = button.getBoundingClientRect();
        const navRect = navRef.current ? navRef.current.getBoundingClientRect() : { left: 0 };
        
        setIndicatorStyle({
          width: `${rect.width}px`,
          transform: `translateX(${rect.left - navRect.left}px)`,
          opacity: 1
        });
      }
    } else {
      setIndicatorStyle({ opacity: 0 });
    }
  }, [activeSection]);

  const scrollToSection = (sectionId) => {
    const targetSection = document.querySelector(`#${sectionId}`);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: 'smooth',
      });
      setIsMobileMenuOpen(false);
      setActiveSection(sectionId);

      if (sectionId === 'footer') {
        const emailElement = document.querySelector('.email-link');
        if (emailElement) {
          emailElement.classList.add('animate-flash', 'text-red-500');
          setTimeout(() => {
            emailElement.classList.remove('animate-flash', 'text-red-500');
          }, 4000);
        }
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      (isScrolled || isMobileMenuOpen)
        ? 'bg-white/90 dark:bg-dark-200/90 backdrop-blur-md shadow-lg py-3'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-[85%] xl:max-w-8xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a 
              href="#" 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-300 transition-all duration-300 hover:scale-105 animate-glow"
            >
              TS
            </a>
            <div className="hidden md:flex space-x-8" ref={navRef}>
              {/* Aktif bölüm göstergesi */}
              <div 
                className="absolute bottom-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-300 ease-out"
                style={indicatorStyle}
              ></div>
              
              <button
                data-section="skills"
                ref={activeSection === 'skills' ? activeButtonRef : null}
                onClick={() => scrollToSection("skills")}
                className={`relative px-2 py-1 text-gray-600 dark:text-gray-300 font-medium transition-colors duration-300 ${
                  activeSection === 'skills' ? 'text-primary-700 dark:text-secondary-300' : 'hover:text-primary-600 dark:hover:text-secondary-400'
                }`}
              >
                {navbar.abilities}
              </button>
              <button
                data-section="projects"
                ref={activeSection === 'projects' ? activeButtonRef : null}
                onClick={() => scrollToSection("projects")}
                className={`relative px-2 py-1 text-gray-600 dark:text-gray-300 font-medium transition-colors duration-300 ${
                  activeSection === 'projects' ? 'text-primary-700 dark:text-secondary-300' : 'hover:text-primary-600 dark:hover:text-secondary-400'
                }`}
              >
                {navbar.works}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <label className="relative inline-flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onClick={toggleTheme}
                  checked={darkMode === "light"}
                />
                <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600 dark:peer-checked:bg-secondary-600 group-hover:shadow-md transition-all duration-300">
                  {/* Gece/Gündüz ikonları - Tamamen yeniden düzenlendi */}
                  <span className="absolute top-1/2 left-2 -translate-y-1/2 text-yellow-500 text-xs">☀️</span>
                  <span className="absolute top-1/2 left-8 -translate-y-1/2 text-indigo-300 text-xs">🌙</span>
                </div>
                <span className="ml-3 text-sm font-medium text-gray-600 dark:text-gray-300 md:block hidden group-hover:text-primary-600 dark:group-hover:text-secondary-400 transition-colors duration-300">
                  {darkMode === "light" ? navbar.themeDark : navbar.themeLight}
                </span>
              </label>

              <button
                onClick={toggleLanguage}
                className="text-sm font-medium text-primary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-secondary-400 transition-colors duration-300 hover:scale-105 relative group"
              >
                <span className="relative">
                  {navbar.lang}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
                </span>
              </button>
            </div>

            <button
              onClick={() => scrollToSection("footer")}
              className="hidden md:block px-6 py-2.5 bg-primary-700 dark:bg-secondary-300 text-white dark:text-slate-950 font-medium rounded-lg hover:bg-primary-600 dark:hover:bg-secondary-400 transition-all duration-300 hover:shadow-lg hover:scale-105 group relative overflow-hidden"
            >
              <span className="relative z-10">{navbar.contactMe}</span>
              {/* Hover efekti */}
              <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-secondary-200 dark:to-secondary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-secondary-300 transition-all duration-300 hover:scale-110"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
                <span className={`absolute h-0.5 w-full bg-current top-3 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
              </div>
            </button>
          </div>
        </div>

        <div className={`md:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
        } overflow-hidden`}>
          <div className="py-4 space-y-4 bg-white/50 dark:bg-dark-100/50 backdrop-blur-sm rounded-xl px-4">
            <button
              onClick={() => scrollToSection("skills")}
              className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                activeSection === 'skills' 
                ? 'bg-primary-50 dark:bg-dark-200 text-primary-700 dark:text-secondary-300' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-200/50'
              }`}
            >
              <div className="flex items-center">
                <span className="mr-3 text-xl opacity-70">💼</span>
                {navbar.abilities}
              </div>
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                activeSection === 'projects' 
                ? 'bg-primary-50 dark:bg-dark-200 text-primary-700 dark:text-secondary-300' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-200/50'
              }`}
            >
              <div className="flex items-center">
                <span className="mr-3 text-xl opacity-70">🚀</span>
                {navbar.works}
              </div>
            </button>
            <button
              onClick={() => scrollToSection("footer")}
              className="block w-full text-left px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-secondary-300 dark:to-secondary-400 text-white dark:text-slate-950 font-medium rounded-lg transition-all duration-300 hover:shadow-md transform hover:scale-[1.02]"
            >
              <div className="flex items-center">
                <span className="mr-3 text-xl">📧</span>
                {navbar.contactMe}
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Sayfa kaydırma göstergesi */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200/30 dark:bg-gray-700/30">
        <div 
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
          style={{ 
            width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`,
            transition: 'width 0.1s'
          }}
        ></div>
      </div>
    </nav>
  );
};

export default Navbar;
