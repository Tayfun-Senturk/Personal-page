import React, { useState } from 'react';
import { useLocalization } from '../contexts/LanguageContext';

const Projects = () => {
  const { serverData } = useLocalization();
  const project = serverData.portfolio;
  const [expandedProject, setExpandedProject] = useState(null);

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-[#1a1a1f] dark:to-[#242128]">
      <div className="max-w-[85%] xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-black dark:text-gray-400 mb-12 sm:mb-16 relative group">
          {project.sectionTitle}
          <div className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {project.projectList.map((project, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-[#2a2a32] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={`./${project.imageLink}`}
                  alt={project.projectTitle}
                  className="w-full h-48 sm:h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute inset-0 flex items-end p-6 sm:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-sm font-medium text-white bg-blue-500/80 dark:bg-purple-500/80 backdrop-blur-sm rounded-full transform hover:scale-110 transition-transform duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-blue-800 dark:text-purple-200 mb-4 group-hover:text-blue-600 dark:group-hover:text-purple-100 transition-colors duration-300">
                  {project.projectTitle}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3">
                  {project.projectDesc}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 sm:px-4 sm:py-2 text-sm font-medium text-blue-800 dark:text-purple-300 bg-blue-50 dark:bg-purple-900/30 rounded-full transition-colors duration-300 group-hover:bg-blue-100 dark:group-hover:bg-purple-900/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <a
                    className="group/link text-blue-800 hover:text-blue-600 dark:text-purple-200 dark:hover:text-purple-100 font-semibold flex items-center transition-colors duration-300"
                    href={project.repoLink}
                  >
                    <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover/link:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="relative">
                      {project.repo}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover/link:w-full"></span>
                    </span>
                  </a>
                  {project.siteLink && (
                    <a
                      className="group/link text-blue-800 hover:text-blue-600 dark:text-purple-200 dark:hover:text-purple-100 font-semibold flex items-center transition-colors duration-300"
                      href={project.siteLink}
                    >
                      <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover/link:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                      <span className="relative">
                        {project.siteLabel}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover/link:w-full"></span>
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
