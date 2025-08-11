import React, { useState, useEffect } from 'react';
import { useLocalization } from '../contexts/LanguageContext';
import InteractiveSkillCard from './InteractiveSkillCard';

const Skills = () => {
  const { serverData } = useLocalization();
  const skills = serverData.competencies;
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('skills');
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-dark-200 dark:to-dark-300 relative overflow-hidden">
      {/* Dekoratif arka plan öğeleri */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 dark:bg-primary-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/5 dark:bg-secondary-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-24 h-24 border-2 border-primary-500/10 dark:border-primary-400/10 rounded-lg transform rotate-45 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-16 h-16 border-2 border-secondary-500/10 dark:border-secondary-400/10 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-3/4 right-1/3 w-12 h-12 bg-primary-500/5 dark:bg-primary-400/5 rounded-md transform rotate-12 animate-bounce-slow"></div>
      </div>

      <div className="max-w-[85%] xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className={`text-4xl sm:text-5xl font-bold text-black dark:text-gray-300 mb-16 sm:mb-20 relative group transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {skills.sectionTitle}
          <div className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {Object.entries(skills.categories).map(([key, category], categoryIndex) => (
            <div key={key} className={`space-y-8 sm:space-y-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${categoryIndex * 200}ms` }}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-50 dark:bg-dark-100 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                  <span className="text-3xl sm:text-4xl animate-pulse-slow" style={{ animationDelay: `${categoryIndex * 0.5}s` }}>
                    {category.icon}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-secondary-600 dark:from-primary-400 dark:to-secondary-300">
                  {category.title}
                </h3>
              </div>
              <div className="grid gap-6 sm:gap-8">
                {category.skills.map((skill, index) => (
                  <InteractiveSkillCard key={index} skill={skill} index={index} categoryIndex={categoryIndex} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
