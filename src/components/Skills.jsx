import React from 'react';

const Skills = () => {
  return (
    <section id="skills" className="py-16 bg-gray-100">
      <h2 className="text-center text-3xl font-bold">Skills</h2>
      <div className="flex justify-center mt-8 space-x-8">
        <div className="bg-white p-4 shadow-lg rounded-lg text-center">
          <h3 className="text-xl font-bold">JavaScript</h3>
          <p className="mt-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-lg text-center">
          <h3 className="text-xl font-bold">React.js</h3>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-lg text-center">
          <h3 className="text-xl font-bold">Node.js</h3>
          <p className="mt-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
