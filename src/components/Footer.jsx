import React, { useState, useEffect } from 'react';
import { useLocalization } from '../contexts/LanguageContext';

const Footer = () => {
  const { serverData } = useLocalization();
  const footer = serverData.footer;
  const [isCopied, setIsCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('footer');
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.85) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // İlk yükleme için kontrol
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(footer.email);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Email kopyalanamadı:', err);
    }
  };

  return (
    <footer id="footer" className="bg-gradient-to-b from-gray-50 to-white dark:from-dark-300 dark:to-dark-200 py-16 sm:py-24 relative overflow-hidden">
      {/* Dekoratif arka plan öğeleri */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 dark:bg-primary-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/5 dark:bg-secondary-400/5 rounded-full blur-3xl"></div>
        
        {/* Animasyonlu geometrik şekiller */}
        <div className="absolute bottom-1/4 right-1/4 w-20 h-20 border-2 border-primary-500/10 dark:border-primary-400/10 rounded-lg transform rotate-12 animate-float"></div>
        <div className="absolute top-1/3 left-1/4 w-16 h-16 border-2 border-secondary-500/10 dark:border-secondary-400/10 rounded-full animate-pulse-slow"></div>
      </div>
      
      <div className="max-w-[85%] xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`glass bg-white/80 dark:bg-dark-100/80 backdrop-blur-md rounded-2xl p-6 sm:p-12 shadow-xl border border-white/20 dark:border-white/5 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-secondary-600 dark:from-primary-400 dark:to-secondary-300 mb-8 sm:mb-12 max-w-2xl group">
            {footer.collabHeader}
            <div className="w-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 mt-4"></div>
          </h2>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="group w-full lg:w-auto perspective">
              <button
                onClick={copyEmail}
                className="flex items-center text-left transition-all duration-300 hover:scale-105 w-full lg:w-auto preserve-3d hover:rotate-y-1"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-50 dark:bg-dark-100 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 mr-4">
                  <span className="text-2xl sm:text-3xl transition-transform duration-300 group-hover:rotate-12 animate-pulse-slow">
                    {isCopied ? '✓' : '📧'}
                  </span>
                </div>
                <div className="ml-2">
                  <span className="email-link text-sm sm:text-lg md:text-xl font-bold text-primary-600 dark:text-secondary-300 underline decoration-2 underline-offset-4 hover:text-primary-500 dark:hover:text-secondary-200 transition-colors duration-300">
                    {footer.email}
                  </span>
                  <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {isCopied ? (
                      <span className="inline-flex items-center text-green-500 dark:text-green-400">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        {footer.copiedText}
                      </span>
                    ) : footer.copyText}
                  </span>
                </div>
              </button>
            </div>

            <nav className="flex flex-wrap gap-4 sm:gap-6 w-full lg:w-auto justify-center lg:justify-end">
              <a
                href={footer.links.blogLink}
                className="group flex items-center text-black dark:text-secondary-300 hover:text-primary-600 dark:hover:text-secondary-200 transition-all duration-300 hover:translate-x-1"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-dark-200 rounded-lg flex items-center justify-center mr-3 sm:mr-4 transition-all duration-300 group-hover:bg-primary-50 dark:group-hover:bg-secondary-900/30 group-hover:scale-110 group-hover:shadow-md">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <span className="font-bold relative text-sm sm:text-base">
                  {footer.blog}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>

              <a
                href={footer.links.gitRepoLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center text-green-600 hover:text-green-500 transition-all duration-300 hover:translate-x-1"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mr-3 sm:mr-4 transition-all duration-300 group-hover:bg-green-50 dark:group-hover:bg-green-900/30 group-hover:scale-110 group-hover:shadow-md">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <span className="font-bold relative text-sm sm:text-base">
                  {footer.gitRepo}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>

              <a
                href={footer.links.linkedinProfileLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center text-primary-600 hover:text-primary-500 transition-all duration-300 hover:translate-x-1"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mr-3 sm:mr-4 transition-all duration-300 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:scale-110 group-hover:shadow-md">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <span className="font-bold relative text-sm sm:text-base">
                  {footer.linkedinProfile}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            </nav>
          </div>
          
          <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>© {new Date().getFullYear()} Tayfun Şentürk. {serverData.lang === "TÜRKÇE" ? "Tüm hakları saklıdır." : "All rights reserved."}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
