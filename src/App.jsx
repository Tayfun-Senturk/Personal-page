import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Profile from './components/Profile';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import SmoothScroll from './components/SmoothScroll';
import { ThemeProvider } from './contexts/ThemeContext';
import { Analytics } from '@vercel/analytics/react';
import "./App.css"
import { LocalizationProvider } from './contexts/LanguageContext';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [useSmoothScroll, setUseSmoothScroll] = useState(false); // Varsayılan olarak devre dışı
  
  useEffect(() => {
    // Sayfa yüklenme animasyonu
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // SmoothScroll'u etkinleştirmek için bu fonksiyonu kullanabilirsiniz
  const enableSmoothScroll = () => {
    setUseSmoothScroll(true);
  };
  
  // Ana içerik bileşeni
  const MainContent = () => (
    <>
      <ParticleBackground />
      <div className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-dark-200 dark:via-dark-300 dark:to-dark-200 text-gray-600 dark:text-gray-300 min-h-screen relative z-10">
        <Navbar />
        <div className="page-container">
          <Hero />
          <Skills />
          <Profile />
          <Projects />
          <Footer />
        </div>
        <Analytics />
      </div>
    </>
  );
  
  return (
    <LocalizationProvider>
      <ThemeProvider>
        <div className={`min-h-screen transition-all duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          {useSmoothScroll ? (
            <SmoothScroll>
              <MainContent />
            </SmoothScroll>
          ) : (
            <MainContent />
          )}
          
          {/* Sayfa yüklenme animasyonu */}
          <div className={`fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-dark-300 transition-opacity duration-700 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary-200 dark:border-dark-100 border-t-primary-600 dark:border-t-secondary-400 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-600 dark:text-secondary-400">TS</span>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
