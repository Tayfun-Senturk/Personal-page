import React from 'react';
import { useLocalization } from '../contexts/LanguageContext';

const Footer = () => {
  const { serverData } = useLocalization();
  const footer = serverData.footer;

  return (
    <footer id="footer" className="bg-gray-100 w-full dark:bg-[#141414] mt-20">
      <div className="py-12 container mx-auto max-w-[85%] xl:max-w-8xl ">
        <h2 className="max-w-[35%] text-left font-bold text-5xl text-black dark:text-gray-400">
          {footer.collabHeader}
        </h2>
        <div className="flex flex-col items-start justify-between mt-10 lg:flex-row lg:items-center">
          <a
            href={`mailto:${footer.email}?subject=Bizimle%20Çalışmak%20İster%20Misiniz%20?`}
            className="text-left mb-10 text-mail-red lg:mb-0 dark:text-lilac transition hover:opacity-80"
          >
            👉 <span className="email-link underline font-bold text-pink-600 dark:text-purple-200">{footer.email}</span>
          </a>
          <nav className="space-x-5 flex lg:space-x-10">
            <a
              href={footer.links.blogLink}
              className="hover:underline font-bold  text-black dark:text-purple-200"
            >
              {footer.blog}
            </a>
            <a
              href={footer.links.gitRepoLink}
              className="hover:underline font-bold text-green-600 "
            >
              {footer.gitRepo}
            </a>
            <a
              href={footer.links.linkedinProfileLink}
              className="hover:underline font-bold text-blue-600 "
            >
              {footer.linkedinProfile}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
