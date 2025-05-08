import { useLocalization } from "../contexts/LanguageContext";

const Profile = () => {
  const {serverData} = useLocalization();
  const profile = serverData.profile;

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-[#242128] dark:to-[#1a1a1f]">
      <div className="max-w-[85%] xl:max-w-8xl mx-auto">
        <h1 className="text-5xl font-bold text-black dark:text-gray-400 mb-16 relative group">
          {profile.sectionTitle}
          <div className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="bg-white dark:bg-[#2a2a32] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
            <h2 className="text-3xl font-bold text-blue-800 dark:text-purple-300 mb-8 relative group">
              {profile.basicInfo.infoTitle}
              <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </h2>
            <div className="space-y-6">
              {profile?.basicInfo?.infoItems?.map((info, index) => (
                <div key={index} className="group flex items-center">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-100 dark:group-hover:bg-purple-900/50 transition-colors duration-300">
                    {index === 0 && (
                      <svg className="w-6 h-6 text-blue-800 dark:text-purple-300 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg className="w-6 h-6 text-blue-800 dark:text-purple-300 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg className="w-6 h-6 text-blue-800 dark:text-purple-300 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    )}
                    {index === 3 && (
                      <svg className="w-6 h-6 text-blue-800 dark:text-purple-300 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="block font-bold text-gray-900 dark:text-gray-200 group-hover:text-blue-800 dark:group-hover:text-purple-300 transition-colors duration-300">
                      {info.key}
                    </span>
                    <span className="block text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                      {info.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#2a2a32] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
            <h2 className="text-3xl font-bold text-blue-800 dark:text-purple-300 mb-8 relative group">
              {profile.selfIntro.sectionTitle}
              <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </h2>
            <div className="space-y-6">
              {profile.selfIntro.content.map((content, index) => (
                <div key={index} className="group">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {content}
                  </p>
                  {index < profile.selfIntro.content.length - 1 && (
                    <div className="w-full h-px bg-gradient-to-r from-blue-500/20 to-purple-500/20 my-6 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
