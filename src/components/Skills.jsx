import React from 'react';
import { useLocalization } from '../contexts/LanguageContext';

const Skills = () => {
  const {serverData} = useLocalization();
  const skills=serverData.competencies
  return (
    <section id="skills" className=" border-b border-purple-200 py-16 place-content-between text-left max-w-[85%] xl:max-w-8xl m-auto ">
      <h2 className="text-black dark:text-gray-400 text-5xl font-bold">{skills.sectionTitle}</h2>
      <div className="flex justify-between mt-8 space-x-8">
      {skills?.skillsList?.map((skill) => (
        <div className="max-w-[30%] text-left">
          <h3 className="text-3xl font-bold dark:text-purple-300 text-blue-800">{skill.skillName}</h3>
          <p className="mt-2">{skill.skillDetails}</p>
        </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
