import React, { useState, useEffect } from 'react';
import { useLocalization } from "../contexts/LanguageContext";

const Profile = () => {
  const { serverData } = useLocalization();
  const profile = serverData.profile;
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('profile');
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getIcon = (key) => {
    const k = key.toLowerCase();
    if (k.includes('doğum') || k.includes('date')) {
      return (
        <svg className="w-6 h-6 text-primary-700 dark:text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    }
    if (k.includes('ikamet') || k.includes('city')) {
      return (
        <svg className="w-6 h-6 text-primary-700 dark:text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    }
    if (k.includes('eğitim') || k.includes('educational')) {
      return (
        <svg className="w-6 h-6 text-primary-700 dark:text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      );
    }
    if (k.includes('yüksek') || k.includes('msc')) {
      return (
        <svg className="w-6 h-6 text-primary-700 dark:text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13l-3 7 6-3 6 3-3-7" />
        </svg>
      );
    }
    if (k.includes('rol') || k.includes('preferred')) {
      return (
        <svg className="w-6 h-6 text-primary-700 dark:text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6M9 8h6M5 6h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
        </svg>
      );
    }
    if (k.includes('ingilizce') || k.includes('english')) {
      return (
        <svg className="w-6 h-6 text-primary-700 dark:text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6" />
        </svg>
      );
    }
    if (k.includes('uyruk') || k.includes('citizenship')) {
      return (
        <svg className="w-6 h-6 text-primary-700 dark:text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zm0 2c-3.33 0-10 1.67-10 5v1h20v-1c0-3.33-6.67-5-10-5z" />
        </svg>
      );
    }
    if (k.includes('telefon') || k.includes('phone')) {
      return (
        <svg className="w-6 h-6 text-primary-700 dark:text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3l2 4-2 1a11 11 0 005 5l1-2 4 2v3a2 2 0 01-2 2h-1C9.82 18 6 14.18 6 9V8a2 2 0 00-2-2H3z" />
        </svg>
      );
    }
    return (
      <svg className="w-6 h-6 text-primary-700 dark:text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
      </svg>
    );
  };

  const highlights = [
    'React', 'Spring Boot', 'Laravel', 'RESTful API', 'Test Automation', 'SOLID', 'Clean Code'
  ];

  return (
    <section id="profile" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-dark-200 dark:to-dark-300 relative overflow-hidden">
      {/* Dekoratif arka plan öğeleri */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/5 dark:bg-primary-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/5 dark:bg-secondary-400/5 rounded-full blur-3xl"></div>
        {/* Animasyonlu geometrik şekiller */}
        <div className="absolute top-1/3 right-1/4 w-20 h-20 border-2 border-primary-500/10 dark:border-primary-400/10 rounded-lg transform rotate-12 animate-float"></div>
        <div className="absolute bottom-1/3 left-1/4 w-16 h-16 border-2 border-secondary-500/10 dark:border-secondary-400/10 rounded-full animate-pulse-slow"></div>
      </div>

      <div className="max-w-[85%] xl:max-w-8xl mx-auto relative z-10">
        <h1 className={`text-5xl font-bold text-black dark:text-gray-300 mb-16 relative group transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {profile.sectionTitle}
          <div className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div 
            className={`bg-white dark:bg-dark-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-700 transform hover:-translate-y-1 perspective hover:rotate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-secondary-600 dark:from-primary-400 dark:to-secondary-300 mb-8 relative group">
              {profile.basicInfo.infoTitle}
              <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </h2>
            <div className="space-y-6">
              {profile?.basicInfo?.infoItems?.map((info, index) => (
                <div key={index} className="group flex items-start hover:bg-gray-50 dark:hover:bg-dark-200/50 p-3 rounded-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mr-4 shadow-md group-hover:shadow-lg transition-all duration-300">
                    {getIcon(info.key)}
                  </div>
                  <div className="flex-1">
                    <span className="block font-bold text-gray-900 dark:text-gray-200 group-hover:text-primary-700 dark:group-hover:text-secondary-300 transition-colors duration-300">
                      {info.key}
                    </span>
                    <span className="block text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                      {info.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-100/30 dark:bg-primary-900/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100"></div>
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-secondary-100/30 dark:bg-secondary-900/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-200"></div>
          </div>

          <div 
            className={`bg-white dark:bg-dark-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-700 transform hover:-translate-y-1 perspective hover:rotate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-secondary-600 dark:from-primary-400 dark:to-secondary-300 mb-8 relative group">
              {profile.selfIntro.sectionTitle}
              <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </h2>
            <div className="space-y-6">
              {profile.selfIntro.content.map((content, index) => (
                <div key={index} className="group">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 p-3 hover:bg-gray-50 dark:hover:bg-dark-200/50 rounded-xl">
                    {content}
                  </p>
                  {index < profile.selfIntro.content.length - 1 && (
                    <div className="w-full h-px bg-gradient-to-r from-primary-500/20 to-secondary-500/20 my-6 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  )}
                </div>
              ))}
            </div>
            {/* Highlights chips to reduce empty space */}
            <div className="mt-8 flex flex-wrap gap-2">
              {highlights.map((h) => (
                <span key={h} className="px-3 py-1 text-sm font-medium text-primary-700 dark:text-secondary-300 bg-primary-50 dark:bg-secondary-900/30 rounded-full">
                  {h}
                </span>
              ))}
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-primary-100/30 dark:bg-primary-900/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100"></div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary-100/30 dark:bg-secondary-900/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-200"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
