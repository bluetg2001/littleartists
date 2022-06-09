import React, {useState, useEffect} from 'react';
// components
import ProviderPianoGoGo from '../../components/pianogogo/ProviderPianoGoGo';
// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

function PianoGoGo() {
  const [parentId, setParentId] = useState(null);
  const [hakwonId, setHakwonId] = useState(null);

  const getParentIdAndHakwonId = async () => {
    try {
      setParentId(await AsyncStorage.getItem('parentId'));
      setHakwonId(await AsyncStorage.getItem('hakwonId'));
    } catch (e) {
      console.log('read error');
    }
  };

  useEffect(() => {
    getParentIdAndHakwonId();
  }, []);

  return <ProviderPianoGoGo parentId={parentId} hakwonId={hakwonId} />;
}

export default PianoGoGo;
