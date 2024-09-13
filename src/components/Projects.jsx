import React from 'react';
import { useLocalization } from '../contexts/LanguageContext';

const Projects = () => {
  const { serverData } = useLocalization();
  const project = serverData.portfolio;

  return (
    <section id="projects" className="mx-auto max-w-[85%] xl:max-w-8xl space-y-12">
      <h2 className="text-5xl font-bold text-left text-black dark:text-gray-400 my-6">
        {project.sectionTitle}
      </h2>
      <div className="flex flex-col gap-12 lg:gap-16 lg:flex-row flex-wrap justify-between">
        {project.projectList.map((project, index) => (
          <div key={index} className="w-full lg:w-1/4">
            <img
              src={`./${project.imageLink}`}
              alt={project.projectTitle}
              className="w-full h-auto object-cover mb-4"
            />
            <h3 className="text-3xl font-medium  text-blue-800 dark:text-purple-200 my-3">
              {project.projectTitle}
            </h3>
            <p className="mb-4">{project.projectDesc}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 text- font-medium text-blue-800 border border-blue-800 dark:text-purple-300 dark:border-purple-300 rounded-md  "
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex justify-between">
              <a
                className="text-blue-800 hover:text-blue-600 font-semibold dark:text-purple-200 dark:hover:text-purple-400 underline"
                href={project.repoLink}
              >
                {project.repo}
              </a>
              <a
                className="text-blue-800 font-semibold hover:text-blue-600 dark:text-purple-200 dark:hover:text-purple-400 underline"
                href={project.siteLink}
              >
                {project.siteLabel}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
