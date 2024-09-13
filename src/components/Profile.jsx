import { useLocalization } from "../contexts/LanguageContext";

const Profile = () => {

  const {serverData} = useLocalization();
  const profile=serverData.profile
  return (
    <div className="flex border-b border-purple-200 mt-5 flex-col gap-1 max-w-[85%] xl:max-w-8xl mx-auto py-3 justify-between text-l">
      <h1 className="text-5xl font-bold text-black dark:text-gray-400 mb-6">{profile.sectionTitle}</h1>
      <div className="flex flex-col gap-x-16 mb-4 lg:flex-row ">

        <div>
          <h2 className="text-3xl text-blue-800 dark:text-purple-300 font-bold mb-4">{profile.basicInfo.infoTitle}</h2>
          <div className="flex flex-col place-content-between">

            {profile?.basicInfo?.infoItems?.map((info)=>{
              return (<div className="flex">
                <span className="font-bold my-2 w-60">{info.key}</span>
                <span className="my-2 w-60">{info.value}</span>
              </div>)
              
            })}

          </div>
        </div>

        <div className="mx-auto">
          <h2 className="text-3xl text-blue-800 dark:text-purple-300 mb-2 font-bold">{profile.selfIntro.sectionTitle}</h2>
          {profile.selfIntro.content.map((content)=><p className="mb-4">
            {content}
          </p>)}
        </div>
      </div>
    </div>
  );
};

export default Profile;
