import React, {useState, useEffect, createContext, useContext} from 'react';
// native-base
import {NativeBaseProvider, View} from 'native-base';
import theme from './src/utils/theme';
// navigate
import Stack from './src/navigation/Stack';
import BottomTabNavigation from './src/components/BottomTabNavigation';
import {NavigationContainer} from '@react-navigation/native';
// graphQL stuff
import {ApolloProvider, ApolloClient, InMemoryCache, gql} from '@apollo/client';
// firebase messaging
import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';
import context from './src/utils/context';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
`;

const App = () => {
  // 로그인, 메인 부분 하단탭 숨기기 위한 state
  const StateContext = createContext();
  const stateContext = useContext(context);
  const [hiddenTab, setHiddenTab] = useState(stateContext.hiddenTab);
  // const [bottomTabIndex, setBottomTabIndex] = useState(null);

  // fcm 승인 함수
  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
    }
  }

  useEffect(() => {
    requestUserPermission();

    // firebase messaging
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });

    // return unsubscribe;
  }, []);

  useEffect(() => {
    context._currentValue.hiddenTab === true;
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000); //스플래시 활성화 시간 2초
    } catch (e) {
      console.log(e.message);
    }
  });

  //apollo
  const client = new ApolloClient({
    // 실서버
    uri: 'https://asia-northeast3-piano-server.cloudfunctions.net/api',
    // 로컬서버 - 실기기에서 돌리면 안됨
    // uri: 'http://localhost:5001/piano-server/asia-northeast3/api',
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
    //defaultOptions: {watchQuery: {fetchPolicy: 'cache-and-network'}},
  });

  return (
    <ApolloProvider client={client}>
      <StateContext.Provider value={context}>
        <NavigationContainer>
          <NativeBaseProvider theme={theme}>
            {console.log(context._currentValue.hiddenTab, '야 이거 나오냐')}
            <View flex={1}>
              <View flex={6}>
                <Stack
                // hiddenTab={hiddenTab}
                // setHiddenTab={setHiddenTab}
                // bottomTabIndex={bottomTabIndex}
                // setBottomTabIndex={setBottomTabIndex}
                />
              </View>
              <BottomTabNavigation
              // hiddenTab={hiddenTab}
              // bottomTabIndex={bottomTabIndex}
              // setBottomTabIndex={setBottomTabIndex}
              />
            </View>
          </NativeBaseProvider>
        </NavigationContainer>
      </StateContext.Provider>
    </ApolloProvider>
  );
};
export default App;
