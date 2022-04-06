import React from 'react';
// native-base
import {NativeBaseProvider, View, Text} from 'native-base';
import theme from './src/utils/theme';
// navigate
import Stack from './src/navigation/Stack';
import BottomTabNavigation from './src/components/BottomTabNavigation';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <View flex={1}>
          <View flex={6}>
            <Stack />
          </View>

          <BottomTabNavigation />
        </View>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
export default App;
