import React from 'react';
import { useLocalization } from '../contexts/LanguageContext';

const Skills = () => {
  const {serverData} = useLocalization();
  const skills = serverData.competencies;

  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-[#242128] dark:to-[#1a1a1f]">
      <div className="max-w-[85%] xl:max-w-8xl mx-auto">
        <h2 className="text-5xl font-bold text-black dark:text-gray-400 mb-16 relative group">
          {skills.sectionTitle}
          <div className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {Object.entries(skills.categories).map(([key, category]) => (
            <div key={key} className="space-y-8">
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{category.icon}</span>
                <h3 className="text-3xl font-bold text-blue-800 dark:text-purple-300">
                  {category.title}
                </h3>
              </div>
              
              <div className="grid gap-6">
                {category.skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="group perspective h-full"
                  >
                    <div className="relative p-8 bg-white dark:bg-[#2a2a32] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-y-2 h-full flex flex-col">
                      <div className="relative z-10 flex-1">
                        <div className="flex items-center mb-6">
                          <h3 className="text-2xl font-bold text-blue-800 dark:text-purple-300 group-hover:text-blue-600 dark:group-hover:text-purple-200 transition-colors duration-300">
                            {skill.skillName}
                          </h3>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed min-h-[4.5rem]">
                          {skill.skillDetails}
                        </p>

                        <div className="mt-6 h-1 w-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                        </div>
                      </div>

                    
                      <div className="absolute -top-2 -left-2 w-12 h-12 bg-blue-100/30 dark:bg-purple-900/30 rounded-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500"></div>
                      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-purple-100/30 dark:bg-blue-900/30 rounded-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-500"></div>
                      
                   
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
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
