import React from 'react';
// navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// pages
import Login from '../containers/Login/Login';
import Main from '../containers/Main';
import Attendance from '../containers/Attendance';
import Notice from '../containers/Notice/Notice';
import NoticeDetail from '../containers/Notice/NoticeDetail';
import Gallery from '../containers/Gallery/Gallery';
import GalleryDetail from '../containers/Gallery/GallerDetail';
import BrandIntro from '../containers/BrandIntro/BrandIntro';
import Intuition from '../containers/Intuition/Intuition';
import PianoGoGo from '../containers/PianoGoGo/PianoGoGo';
import PaymentHistoryDetail from '../containers/Intuition/PaymentHistoryDetail';

const StackNavi = createNativeStackNavigator();

function Stack() {
  return (
    // <NavigationContainer>
    <StackNavi.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009fe8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <StackNavi.Screen name="Login" component={Login} />
      <StackNavi.Screen name="Main" component={Main} />
      <StackNavi.Screen name="Attendance" component={Attendance} />
      <StackNavi.Screen name="Notice" component={Notice} />
      <StackNavi.Screen name="NoticeDetail" component={NoticeDetail} />
      <StackNavi.Screen name="Gallery" component={Gallery} />
      <StackNavi.Screen name="GalleryDetail" component={GalleryDetail} />
      <StackNavi.Screen name="BrandIntro" component={BrandIntro} />
      <StackNavi.Screen name="Intuition" component={Intuition} />
      <StackNavi.Screen
        name="PaymentHistoryDetail"
        component={PaymentHistoryDetail}
      />
      <StackNavi.Screen name="PianoGoGo" component={PianoGoGo} />
    </StackNavi.Navigator>

    // </NavigationContainer>
  );
}

export default Stack;
