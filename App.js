import React, {useState} from 'react';
// native-base
import {NativeBaseProvider, View} from 'native-base';
import theme from './src/utils/theme';
// navigate
import Stack from './src/navigation/Stack';
import BottomTabNavigation from './src/components/BottomTabNavigation';
import {NavigationContainer} from '@react-navigation/native';
// graphQL stuff
import {ApolloProvider, ApolloClient, InMemoryCache, gql} from '@apollo/client';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
`;

const App = () => {
  // 로그인, 메인 부분 하단탭 숨기기 위한 state
  const [hiddenTab, setHiddenTab] = useState(false);
  const [bottomTabIndex, setBottomTabIndex] = useState(null);

  //apollo

  const client = new ApolloClient({
    // 실서버
    // uri: 'https://asia-northeast3-piano-server.cloudfunctions.net/api',
    // 로컬서버 - 실기기에서 돌리면 안됨
    uri: 'http://localhost:5001/piano-server/asia-northeast3/api',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <NativeBaseProvider theme={theme}>
          <View flex={1}>
            <View flex={6}>
              <Stack
                hiddenTab={hiddenTab}
                setHiddenTab={setHiddenTab}
                bottomTabIndex={bottomTabIndex}
                setBottomTabIndex={setBottomTabIndex}
              />
            </View>
            <BottomTabNavigation
              hiddenTab={hiddenTab}
              bottomTabIndex={bottomTabIndex}
              setBottomTabIndex={setBottomTabIndex}
            />
          </View>
        </NativeBaseProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
};
export default App;
