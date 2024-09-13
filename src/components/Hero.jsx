import React from 'react';
import { useLocalization } from '../contexts/LanguageContext';
import githubLight from '../assets/githubLight.svg';
import LinkedInLight from '../assets/linkedinLight.svg';
import githubNight from '../assets/githubNight.svg';
import LinkedInNight from '../assets/linkedinNight.svg';
import { useTheme } from '../contexts/ThemeContext';



const Hero = () => {
  const { darkMode } = useTheme();
  const { serverData } = useLocalization();
  const bio = serverData.bio;

 const scrollToFooter = () => {
      const footerSection = document.querySelector('#footer');
        if (footerSection) {
            footer.scrollIntoView({ behavior: "smooth" });
            const emailElement = document.querySelector('.email-link');
            if (emailElement) {
                emailElement.classList.add('animate-flash', 'text-red-500');
              
                setTimeout(() => {
                    emailElement.classList.remove('animate-flash', 'text-red-500');
                }, 4000);
            }
        }
    };

  return (
    <section className="flex flex-col lg:flex-row gap-8 max-w-[85%] xl:max-w-8xl mx-auto py-10 justify-between">
      <div className="text-left">
        <p className="mb-6 font-semibold text-purple-800 dark:text-purple-200 text-xl">————— {bio.fullName}</p>
        <h1 className=" text-gray-900 flex-nowrap font-extrabold text-4xl lg:text-7xl dark:text-gray-400">
          {bio.tagline1} <br /> {bio.tagline2}
        </h1>
        <p className="mt-6 font-medium text-gray-400 text-lg lg:max-w-2xl">{bio.introText}</p>
        <nav className="flex flex-wrap justify-start xl:justify-between max-w-lg mt-10">
          <button onClick={scrollToFooter}
            className="bg-blue-900 m-2 pt-2.5   h-12 flex w-36 xl:w-40 border place-content-center border-blue-900 text-white font-bold rounded-lg r dark:border-purple-200 dark:bg-purple-200 dark:text-slate-950"
          >
            {bio.workWithMe}
          </button>
          <a
            href={bio.socialLinks.github}
            className=" flex  m-2 xl:m-1 py-3 px-6 h-12 lg:pl-7 w-36 xl:w-40 border rounded-lg border-blue-900 text-blue-900 font-bold   dark:text-purple-200 dark:border-purple-200"
          >
            {darkMode === 'dark' ? (
              <img src={githubNight} className="inline-block mr-3 " />
            ) : (
              <img src={githubLight} className="inline-block mr-3 " />
            )}
            {bio.codeRepo}
          </a>
          <a
            href={bio.socialLinks.linkedin}
            className="flex  m-2 xl:m-1 py-3 px-6 h-12 lg:pl-7 w-36 xl:w-40 border rounded-lg border-blue-900 text-blue-900 font-bold  dark:text-purple-200 dark:border-purple-200"
          >
            {darkMode === 'dark' ? (
              <img src={LinkedInNight} className="inline-block mr-3" />
            ) : (
              <img src={LinkedInLight} className="inline-block mr-3 " />
            )}
            {bio.socialProfile}
          </a>
        </nav>
      </div>
      <img className="rounded-lg mt-8 lg:mt-0 max-w-[550px] max-h-[375px]" src="../image.png" alt="Hero image" />
    </section>
  );
};

export default Hero;
