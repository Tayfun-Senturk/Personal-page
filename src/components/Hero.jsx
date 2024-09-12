import React from 'react';

const Hero = () => {
  return (
    <section className="text-center py-20">
      <h1 className="text-4xl font-bold">Creative Thinker <br /> Minimalism Lover</h1>
      <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab maiores praesentium magnam!</p>
      <div className="mt-6 space-x-4">
        <button className="bg-purple-700 text-white px-4 py-2 rounded-lg">Hire me</button>
        <button className="border px-4 py-2 rounded-lg">Github</button>
        <button className="border px-4 py-2 rounded-lg">LinkedIn</button>
      </div>
    </section>
  );
};

export default Hero;
