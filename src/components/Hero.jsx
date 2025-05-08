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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToFooter = () => {
    const footerSection = document.querySelector('#footer');
    if (footerSection) {
      footer.scrollIntoView({ behavior: "smooth" });
      const emailElement = document.querySelector('.email-link');
      if (emailElement) {
        emailElement.classList.add('animate-flash', 'text-red-500');
        setTimeout(() => {
          emailElement.classList.remove('animate-flash', 'text-red-500');
        }, 4000);
      }
    }
  };

  return (
    <section className="min-h-screen flex flex-col lg:flex-row gap-8 max-w-[85%] xl:max-w-8xl mx-auto py-32 justify-between items-center">
      <div className="text-left space-y-8 animate-fade-in w-full lg:w-1/2">
        <div className="space-y-6">
          <div className="inline-block">
            <span className="text-purple-800 dark:text-purple-200 text-lg sm:text-xl font-semibold tracking-wider relative group">
              ————— {bio.fullName}
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </span>
          </div>
          
          <h1 className="text-gray-900 dark:text-gray-400 font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-tight">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-purple-600 dark:from-blue-400 dark:to-purple-300 animate-gradient">
              {bio.tagline1}
            </span>
            <span className="block mt-2 relative group">
              {bio.tagline2}
              <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </span>
          </h1>
          
          <p className="mt-6 text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:max-w-2xl leading-relaxed group">
            {bio.introText}
            <div className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 mt-2"></div>
          </p>
        </div>

        <nav className="flex flex-wrap gap-4 mt-8">
          <button
            onClick={scrollToFooter}
            className="group relative w-full sm:w-auto px-8 py-3 bg-blue-800 dark:bg-purple-200 text-white dark:text-slate-950 font-bold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <span className="relative z-10">{bio.workWithMe}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900 dark:from-purple-300 dark:to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>

          <a
            href={bio.socialLinks.github}
            className="group flex items-center justify-center w-full sm:w-auto px-8 py-3 border-2 border-blue-800 dark:border-purple-200 text-blue-800 dark:text-purple-200 font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-blue-50 dark:hover:bg-purple-900/20"
          >
            {darkMode === 'dark' ? (
              <img src={githubNight} className="w-6 h-6 mr-3 transition-transform group-hover:scale-110 group-hover:rotate-12" />
            ) : (
              <img src={githubLight} className="w-6 h-6 mr-3 transition-transform group-hover:scale-110 group-hover:rotate-12" />
            )}
            <span className="relative">
              {bio.codeRepo}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-800 dark:bg-purple-200 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </a>

          <a
            href={bio.socialLinks.linkedin}
            className="group flex items-center justify-center w-full sm:w-auto px-8 py-3 border-2 border-blue-800 dark:border-purple-200 text-blue-800 dark:text-purple-200 font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-blue-50 dark:hover:bg-purple-900/20"
          >
            {darkMode === 'dark' ? (
              <img src={LinkedInNight} className="w-6 h-6 mr-3 transition-transform group-hover:scale-110 group-hover:rotate-12" />
            ) : (
              <img src={LinkedInLight} className="w-6 h-6 mr-3 transition-transform group-hover:scale-110 group-hover:rotate-12" />
            )}
            <span className="relative">
              {bio.socialProfile}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-800 dark:bg-purple-200 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </a>

          <div className="relative w-full sm:w-auto" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="group flex items-center justify-center w-full px-8 py-3 border-2 border-blue-800 dark:border-purple-200 text-blue-800 dark:text-purple-200 font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-blue-50 dark:hover:bg-purple-900/20"
            >
              <span className="mr-2 transition-transform duration-300 group-hover:rotate-12">📄</span>
              <span className="relative">
                {serverData.lang === "TÜRKÇE" ? "CV'yi İndir" : "Download CV"}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-800 dark:bg-purple-200 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </button>
            {isDropdownOpen && (
              <div className="absolute w-full sm:w-48 bg-white dark:bg-slate-800 shadow-xl border border-gray-200 dark:border-slate-700 rounded-lg z-10 mt-2 left-0 animate-fade-in">
                <div className="p-1">
                  <a
                    href="/cv-tr.pdf"
                    download
                    className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200 rounded-md group"
                  >
                    
                    <span className="relative">
                      Türkçe CV
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-800 dark:bg-purple-200 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                  <a
                    href="/cv-en.pdf"
                    download
                    className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200 rounded-md group"
                  >
                    
                    <span className="relative">
                      English CV
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-800 dark:bg-purple-200 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className="relative mt-12 lg:mt-0 group w-full lg:w-1/2 flex justify-center lg:justify-end lg:pr-8">
        <div className="relative">
          <img
            className="rounded-2xl w-full max-w-[450px] max-h-[375px] object-cover shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1"
            src="../image.png"
            alt="Hero image"
          />
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-2xl -z-10 blur-xl transition-all duration-500 group-hover:blur-2xl"></div>
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-2xl -z-20 blur-2xl transition-all duration-500 group-hover:blur-3xl"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/10 dark:bg-purple-500/10 rounded-full blur-2xl transition-all duration-500 group-hover:scale-120"></div>
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-500/10 dark:bg-blue-500/10 rounded-full blur-2xl transition-all duration-500 group-hover:scale-120"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
