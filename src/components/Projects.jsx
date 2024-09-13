import React from 'react';

const Projects = () => {
  return (
    <section id="projects" className="py-16">
      <h2 className="text-center text-3xl font-bold">Projects</h2>
      <div className="flex justify-center mt-8 space-x-8">
        <div className=" p-4 shadow-lg rounded-lg">
          <h3 className="text-xl font-bold">Workintech</h3>
          <p className="mt-2">Project description...</p>
          <button className="border px-4 py-2 mt-4 rounded-lg">Github</button>
        </div>
        <div className=" p-4 shadow-lg rounded-lg">
          <h3 className="text-xl font-bold">Random Jokes</h3>
          <p className="mt-2">Project description...</p>
          <button className="border px-4 py-2 mt-4 rounded-lg">Github</button>
        </div>
        <div className=" p-4 shadow-lg rounded-lg">
          <h3 className="text-xl font-bold">Journey</h3>
          <p className="mt-2">Project description...</p>
          <button className="border px-4 py-2 mt-4 rounded-lg">Github</button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
