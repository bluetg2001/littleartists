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

function Stack(props) {
  const {hiddenTab, setHiddenTab, bottomTabIndex, setBottomTabIndex} = props;
  return (
    <>
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
        {/* <StackNavi.Screen name="Login" component={Login} /> */}
        <StackNavi.Screen
          name="Login"
          options={{
            headerShown: false,
          }}>
          {props => (
            <Login
              {...props}
              hiddenTab={hiddenTab}
              setHiddenTab={setHiddenTab}
            />
          )}
        </StackNavi.Screen>
        <StackNavi.Screen
          name="Main"
          options={{
            headerShown: false,
          }}>
          {props => (
            <Main
              {...props}
              hiddenTab={hiddenTab}
              setHiddenTab={setHiddenTab}
              bottomTabIndex={bottomTabIndex}
              setBottomTabIndex={setBottomTabIndex}
            />
          )}
        </StackNavi.Screen>
        <StackNavi.Screen
          name="Attendance"
          component={Attendance}
          options={{title: '출석'}}
        />
        <StackNavi.Screen
          name="Notice"
          component={Notice}
          options={{title: '공지사항'}}
        />
        <StackNavi.Screen
          name="NoticeDetail"
          component={NoticeDetail}
          options={{title: ''}}
        />
        <StackNavi.Screen
          name="Gallery"
          component={Gallery}
          options={{title: '갤러리'}}
        />
        <StackNavi.Screen
          name="GalleryDetail"
          component={GalleryDetail}
          options={{title: ''}}
        />
        <StackNavi.Screen
          name="BrandIntro"
          component={BrandIntro}
          options={{title: '어린음악대'}}
        />
        <StackNavi.Screen
          name="Intuition"
          component={Intuition}
          options={{title: '교육비'}}
        />
        <StackNavi.Screen
          name="PaymentHistoryDetail"
          component={PaymentHistoryDetail}
        />
        <StackNavi.Screen name="PianoGoGo" component={PianoGoGo} />
      </StackNavi.Navigator>
    </>
  );
}

export default Stack;
