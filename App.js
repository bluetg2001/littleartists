import React, {useState} from 'react';
// native-base
import {NativeBaseProvider, View, Text} from 'native-base';
import theme from './src/utils/theme';
// navigate
import Stack from './src/navigation/Stack';
import BottomTabNavigation from './src/components/BottomTabNavigation';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  // 로그인, 메인 부분 하단탭 숨기기 위한 state
  const [hiddenTab, setHiddenTab] = useState(false);

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <View flex={1}>
          <View flex={6}>
            <Stack hiddenTab={hiddenTab} setHiddenTab={setHiddenTab} />
          </View>
          <BottomTabNavigation hiddenTab={hiddenTab} />
        </View>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
export default App;
