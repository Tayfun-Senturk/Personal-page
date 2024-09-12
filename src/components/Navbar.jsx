import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme(); //
  return (
    <div className='flex relative flex-col max-w-[88%] mx-auto mt-2'>
    <div className="flex items-center space-x-2 justify-end mr-6">
        <label for="toggleSwitch" class="relative inline-block w-14 h-8 cursor-pointer">
           <input type="checkbox" id="toggleSwitch" class="sr-only peer" onClick={toggleTheme} checked={darkMode==="light"}/> 
           <div class="absolute inset-0 bg-[#28096b] rounded-full transition-colors duration-500 peer-checked:bg-[#522ba7]"></div> 
           <div class="absolute left-[10%] bottom-[15%] w-5 h-5 bg-[#28096b] rounded-full shadow-[inset_8px_-4px_0_0_#fff000] transition-all duration-500 transform peer-checked:translate-x-6 peer-checked:shadow-[inset_15px_-4px_0_15px_#fff000]"></div> 
        </label>
        <label for="toggleSwitch" class="cursor-pointer">{darkMode=="light"?"Dark Mode": "Light Mode"}</label>
        <span>|</span>
        <span><span className="text-fuchsia-800 font-bold	">TÜRKÇE</span>'YE GEÇ</span>
    </div>
    <nav className="flex p-4 justify-end">
      <div className="flex space-x-4 items-center">
        <a href="#skills" className="hover:underline">Skills</a>
        <a href="#projects" className="hover:underline">Projects</a>
        <button className="border px-4 py-2 rounded-lg">Hire me</button>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
