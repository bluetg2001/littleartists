import React from 'react';
// native-base
import {NativeBaseProvider} from 'native-base';
import theme from './src/utils/theme';
// navigate
import Stack from './src/navigation/Stack';

const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <Stack />
    </NativeBaseProvider>
  );
};
export default App;
