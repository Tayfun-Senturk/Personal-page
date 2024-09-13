import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLocalization } from '../contexts/LanguageContext';

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const {toggleLanguage, serverData} = useLocalization();
  const navbar=serverData.navbar
  return (
    <div className='flex flex-col gap-1 max-w-[85%] xl:max-w-7xl mx-auto py-3 justify-between'>
    <div className="flex items-center space-x-2 justify-end mr-6">
        <label for="toggleSwitch" class="relative inline-block w-14 h-8 cursor-pointer">
           <input type="checkbox" id="toggleSwitch" class="sr-only peer" onClick={toggleTheme} checked={darkMode==="light"}/> 
           <div class="absolute inset-0 bg-purple-400 rounded-full transition-colors duration-500 peer-checked:bg-blue-900"></div> 
           <div class="absolute left-[10%] bottom-[15%] w-5 h-5 bg-bg-purple-200 rounded-full shadow-[inset_8px_-4px_0_0_#fff000] transition-all duration-500 transform peer-checked:translate-x-6 peer-checked:shadow-[inset_15px_-4px_0_15px_#fff000]"></div> 
        </label>
        <label for="toggleSwitch" class="cursor-pointer font-semibold">{darkMode=="light"?navbar.themeDark: navbar.themeLight}</label>
        <span>|</span>
        {navbar.lang === "ENGLISH" ? <span onClick={toggleLanguage} className="text-purple-900 dark:text-purple-300 font-bold cursor-pointer	">{navbar.lang}</span>: <span><span onClick={toggleLanguage} className="text-purple-900 dark:text-purple-300 font-bold	cursor-pointer">{navbar.lang}</span>'YE GEÇ</span> }
    </div>
    <nav className="flex p-4 justify-end">
      <div className="flex space-x-10 items-center">
        <a href="#skills" className="hover:underline font-semibold">{navbar.abilities}</a>
        <a href="#projects" className="hover:underline font-semibold">{navbar.works}</a>
        <button className="border px-4 py-2 rounded-lg font-semibold border-blue-900 text-blue-900 dark:border-purple-200 dark:bg-purple-200">{navbar.contactMe}</button>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
