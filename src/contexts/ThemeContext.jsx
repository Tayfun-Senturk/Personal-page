import React, { createContext, useContext, useEffect } from 'react';
import  {useLocalStorage}  from '../hooks/useLocalStorage';


const ThemeContext = createContext();


export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {

  const [darkMode, setDarkMode] = useLocalStorage('theme', 'light');

  const toggleTheme = () => {
    setDarkMode(darkMode === 'dark' ? 'light' : 'dark');
  };


  useEffect(() => {
    if (darkMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
