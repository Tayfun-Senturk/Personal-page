import React, { useState, useEffect } from 'react';
import { useLocalization } from '../contexts/LanguageContext';
import ProjectModal from './ProjectModal';

const Projects = () => {
  const { serverData } = useLocalization();
  const project = serverData.portfolio;
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('projects');
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // İlk yükleme için kontrol
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  
  const closeProjectModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-dark-300 dark:to-dark-200 relative overflow-hidden">
      {/* Dekoratif arka plan öğeleri */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/5 dark:bg-primary-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/5 dark:bg-secondary-400/5 rounded-full blur-3xl"></div>
        
        {/* Animasyonlu geometrik şekiller */}
        <div className="absolute top-1/3 right-1/4 w-20 h-20 border-2 border-primary-500/10 dark:border-primary-400/10 rounded-lg transform rotate-12 animate-float"></div>
        <div className="absolute bottom-1/3 left-1/4 w-16 h-16 border-2 border-secondary-500/10 dark:border-secondary-400/10 rounded-full animate-pulse-slow"></div>
      </div>

      <div className="max-w-[85%] xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className={`text-4xl sm:text-5xl font-bold text-black dark:text-gray-300 mb-16 sm:mb-20 relative group transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {project.sectionTitle}
          <div className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {project.projectList.map((projectItem, index) => (
            <div
              key={index}
              className={`group perspective h-full transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div 
                className="bg-white dark:bg-dark-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 preserve-3d hover:rotate-y-1 h-full flex flex-col cursor-pointer"
                onClick={() => openProjectModal(projectItem)}
              >
                <div className="relative overflow-hidden">
                  {/* Paralax effect container */}
                  <div className="overflow-hidden">
                    <img
                      src={`./${projectItem.imageLink}`}
                      alt={projectItem.projectTitle}
                      className="w-full h-48 sm:h-64 object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Tech tags on hover */}
                  <div className="absolute inset-0 flex items-end p-6 sm:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="space-y-4 w-full">
                      <div className="flex flex-wrap gap-2">
                        {projectItem.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 text-sm font-medium text-white bg-primary-600/80 dark:bg-secondary-500/80 backdrop-blur-sm rounded-full transform hover:scale-110 transition-all duration-300"
                            style={{ transitionDelay: `${techIndex * 50}ms` }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* View details button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button className="px-4 py-2 bg-white/80 dark:bg-dark-100/80 text-primary-700 dark:text-secondary-300 font-medium rounded-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                      {serverData.lang === "TÜRKÇE" ? "Detayları Gör" : "View Details"}
                    </button>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-secondary-600 dark:from-primary-400 dark:to-secondary-300 mb-4 group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-secondary-500 dark:group-hover:from-primary-300 dark:group-hover:to-secondary-200 transition-colors duration-300">
                    {projectItem.projectTitle}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3 flex-grow">
                    {projectItem.projectDesc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6 hidden sm:flex">
                    {projectItem.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 sm:px-4 sm:py-2 text-sm font-medium text-primary-700 dark:text-secondary-300 bg-primary-50 dark:bg-secondary-900/30 rounded-full transition-all duration-300 group-hover:bg-primary-100 dark:group-hover:bg-secondary-900/50 transform hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                    <a
                      className="group/link text-primary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-secondary-200 font-semibold flex items-center transition-all duration-300 hover:translate-x-1"
                      href={projectItem.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover/link:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span className="relative">
                        {projectItem.repo}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover/link:w-full"></span>
                      </span>
                    </a>
                    {projectItem.siteLink && (
                      <a
                        className="group/link text-primary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-secondary-200 font-semibold flex items-center transition-all duration-300 hover:translate-x-1"
                        href={projectItem.siteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover/link:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                        <span className="relative">
                          {projectItem.siteLabel}
                          <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover/link:w-full"></span>
                        </span>
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Card accent elements */}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary-100/30 dark:bg-primary-900/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100"></div>
                <div className="absolute -top-1 -left-1 w-8 h-8 bg-secondary-100/30 dark:bg-secondary-900/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeProjectModal}
        />
      )}
    </section>
  );
};

export default Projects;
