/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// firebase messaging
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log(
    'Message handle in background!',
    remoteMessage.notification.title,
  );
  // console.log(remoteMessage);
  // console.log('HEADLESS BACKGROUND: ' + JSON.stringify(remoteMessage));
});

AppRegistry.registerComponent(appName, () => App);
