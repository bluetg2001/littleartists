import React, {useCallback, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import ProviderMain from '../components/main/ProviderMain';
// context
import TabContext from '../utils/TabContext';

function Main({route}) {
  const isConsent = route?.params?.isConsent ?? true;

  const {hiddenTab, setHiddenTab} = useContext(TabContext);

  useFocusEffect(
    useCallback(() => {
      setHiddenTab(true);
      return () => {
        setHiddenTab(false);
      };
    }, [setHiddenTab]),
  );

  return <ProviderMain isConsent={isConsent} />;
}

export default Main;
