/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// firebase messaging
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  // console.log('Message handle in background!', remoteMessage);
  console.log('HEADLESS BACKGROUND: ' + JSON.stringify(remoteMessage));
});

// function HeadlessCheck({isHeadless}) {
//   if (isHeadless) {
//     console.log('Headless');
//     return null;
//   }
//   return <App />;
// }

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => HeadlessCheck);
