import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLocalization } from '../contexts/LanguageContext';

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { toggleLanguage, serverData } = useLocalization();
  const navbar = serverData.navbar;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const targetSection = document.querySelector(`#${sectionId}`);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: 'smooth',
      });
      setIsMobileMenuOpen(false);

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      (isScrolled || isMobileMenuOpen)
        ? 'bg-white/80 dark:bg-[#242128]/80 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
    }`}>
      <div className="max-w-[85%] xl:max-w-8xl mx-auto">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <a href="#" className="text-2xl font-bold text-blue-800 dark:text-purple-200">
              TS
            </a>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("skills")}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-800 dark:hover:text-purple-200 font-medium transition-colors duration-300"
              >
                {navbar.abilities}
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-800 dark:hover:text-purple-200 font-medium transition-colors duration-300"
              >
                {navbar.works}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onClick={toggleTheme}
                  checked={darkMode === "light"}
                />
                <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-600 dark:text-gray-300 md:block hidden">
                  {darkMode === "light" ? navbar.themeDark : navbar.themeLight}
                </span>
              </label>

              <button
                onClick={toggleLanguage}
                className="text-sm font-medium text-blue-800 dark:text-purple-200 hover:text-blue-600 dark:hover:text-purple-100 transition-colors duration-300"
              >
                {navbar.lang}
              </button>
            </div>

            <button
              onClick={() => scrollToSection("footer")}
              className="hidden md:block px-6 py-2.5 bg-blue-800 dark:bg-purple-200 text-white dark:text-slate-950 font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-purple-300 transition-colors duration-300"
            >
              {navbar.contactMe}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blue-800 dark:hover:text-purple-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobil Menü */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="py-4 space-y-4">
            <button
              onClick={() => scrollToSection("skills")}
              className="block w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-800 dark:hover:text-purple-200 font-medium transition-colors duration-300"
            >
              {navbar.abilities}
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="block w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-800 dark:hover:text-purple-200 font-medium transition-colors duration-300"
            >
              {navbar.works}
            </button>
            <button
              onClick={() => scrollToSection("footer")}
              className="block w-full text-left px-4 py-2 bg-blue-800 dark:bg-purple-200 text-white dark:text-slate-950 font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-purple-300 transition-colors duration-300"
            >
              {navbar.contactMe}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
