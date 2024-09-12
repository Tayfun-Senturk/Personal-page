import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Profile from './components/Profile';
import Projects from './components/Projects';
import Footer from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import "./app.css"

const App = () => {
  return (
    <ThemeProvider>
      <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200">
        <Navbar />
        <Hero />
        <Skills />
        <Profile />
        <Projects />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
