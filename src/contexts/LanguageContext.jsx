import { createContext, useContext, useEffect, useState } from 'react';
import {useLocalStorage} from '../hooks/useLocalStorage';
import axios from "axios"

const LocalizationContext = createContext();

export const useLocalization = () => {
  return useContext(LocalizationContext);
};

export const LocalizationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useLocalStorage('userLanguage', 'en');
  const [serverData, setServerData] = useState({});
  const [isFetching, setIsFetching] = useState(true);

  const retrieveData = async () => {
    setIsFetching(true);
    try {
      const languageMock = await import(`../mocks/${currentLanguage}.json`);
      const response = await axios.post('https://reqres.in/api/workintech', languageMock);
      setServerData(response.data);
    } catch (err) {
      console.error('Veri alırken hata oluştu:', err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    retrieveData();
  }, [currentLanguage]);

  const toggleLanguage = () => {
    setCurrentLanguage((prevLanguage) => (prevLanguage === 'en' ? 'tr' : 'en'));
  };

  if (isFetching) {
    return <div>Veriler yükleniyor...</div>;
  }

  return (
    <LocalizationContext.Provider value={{ currentLanguage, toggleLanguage, serverData }}>
      {children}
    </LocalizationContext.Provider>
  );
};
