import React, {useCallback, useState, useEffect} from 'react';
// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// components
import ProviderAttendance from '../components/attendance/ProviderAttendance';

function Attendance() {
  // const parentId = route.params.parentId;
  // const hakwonId = route.params.hakwonId;

  // 로컬스토로지에 저장된 parentID를 먼저 불러온 후에 useQuery의 data에 저장하기 위해 한 번 더 ProviderAttendance라는 컴포넌트로 뺐음.
  return (
    <ProviderAttendance
    // parentId={parentId} hakwonId={hakwonId}
    />
  );
}
export default Attendance;
