import React, {useCallback, useState, useEffect} from 'react';
import {gql, useQuery} from '@apollo/client';
import axios from 'axios';
// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// components
import ProviderAttendance from '../components/attendance/ProviderAttendance';

function Attendance() {
  const [parentId, setParentId] = useState('');

  const getParentData = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('parentId');
      setParentId(value);
    } catch (e) {
      console.log('로컬 스토로지에 학부모 정보가 잘못 되었습니다.');
    }
  }, []);

  useEffect(() => {
    getParentData();
  }, [getParentData]);

  // 로컬스토로지에 저장된 parentID를 먼저 불러온 후에 useQuery의 data에 저장하기 위해 한 번 더 ProviderAttendance라는 컴포넌트로 뺐음.
  return <ProviderAttendance parentId={parentId} />;
}
export default Attendance;
