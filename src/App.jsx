import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Profile from './components/Profile';
import Projects from './components/Projects';
import Footer from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import "./App.css"
import { LocalizationProvider } from './contexts/LanguageContext';

const App = () => {
  return (
    <LocalizationProvider>
    <ThemeProvider>
      <div className="bg-white text-gray-600 dark:bg-[#242128] dark:text-gray-400">
        <Navbar />
        <Hero />
        <Skills />
        <Profile />
        <Projects />
        <Footer />
      </div>
    </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
