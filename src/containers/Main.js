import React, {useState, useEffect, useCallback} from 'react';
import ProviderMain from '../components/main/ProviderMain';
// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

function Main() {
  const [isConsent, setIsConsent] = useState(null);

  const getConsentsData = async () => {
    setIsConsent(await AsyncStorage.getItem('isConsent'));
  };

  useEffect(() => {
    getConsentsData();
  }, []);

  return <ProviderMain isConsent={isConsent} />;
}

export default Main;
