import React, {useState, useEffect} from 'react';
// components
import ProviderAttendance from '../components/attendance/ProviderAttendance';
// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// 스토로지에서 parentID, hakwonID를 먼저 받아온 후 출결 DB(useQuery)를 불러 주기 위해 컴포넌트 deps 나눔
function Attendance() {
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

  return <ProviderAttendance parentId={parentId} hakwonId={hakwonId} />;
}
export default Attendance;
