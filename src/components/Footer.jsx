import React, { useState } from 'react';
import { useLocalization } from '../contexts/LanguageContext';

const Footer = () => {
  const { serverData } = useLocalization();
  const footer = serverData.footer;
  const [isCopied, setIsCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(footer.email);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Email kopyalanamadı:', err);
    }
  };

  return (
    <footer id="footer" className="bg-gradient-to-b from-gray-50 to-white dark:from-[#1a1a1f] dark:to-[#242128] py-24">
      <div className="max-w-[85%] xl:max-w-8xl mx-auto">
        <div className="bg-white dark:bg-[#2a2a32] rounded-2xl p-12 shadow-xl">
          <h2 className="text-4xl lg:text-5xl font-bold text-black dark:text-gray-400 mb-12 max-w-2xl group">
            {footer.collabHeader}
            <div className="w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 mt-4"></div>
          </h2>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="group">
              <button
                onClick={copyEmail}
                className="flex items-center text-left transition-all duration-300 hover:scale-105"
              >
                <span className="text-2xl transition-transform duration-300 group-hover:rotate-12">👉</span>
                <div className="ml-2">
                  <span className="email-link text-xl font-bold text-pink-600 dark:text-purple-200 underline decoration-2 underline-offset-4 hover:text-pink-500 dark:hover:text-purple-100 transition-colors duration-300">
                    {footer.email}
                  </span>
                  <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {isCopied ? footer.copiedText : footer.copyText}
                  </span>
                </div>
              </button>
            </div>

            <nav className="flex flex-wrap gap-6">
              <a
                href={footer.links.blogLink}
                className="group flex items-center text-black dark:text-purple-200 hover:text-blue-600 dark:hover:text-purple-100 transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-gray-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 group-hover:bg-blue-50 dark:group-hover:bg-purple-900/50 group-hover:scale-110">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <span className="font-bold relative">
                  {footer.blog}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>

              <a
                href={footer.links.gitRepoLink}
                className="group flex items-center text-green-600 hover:text-green-500 transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-gray-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 group-hover:bg-green-50 dark:group-hover:bg-green-900/50 group-hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <span className="font-bold relative">
                  {footer.gitRepo}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>

              <a
                href={footer.links.linkedinProfileLink}
                className="group flex items-center text-blue-600 hover:text-blue-500 transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-gray-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/50 group-hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <span className="font-bold relative">
                  {footer.linkedinProfile}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
