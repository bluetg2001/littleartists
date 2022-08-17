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
import PaymentHistoryDetail from '../containers/Intuition/PaymentHistoryDetail';
import MusicGoGo from '../containers/MusicGoGo/MusicGoGo';

const StackNavi = createNativeStackNavigator();

function Stack() {
  return (
    <>
      <StackNavi.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#acdd5c',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <StackNavi.Screen
          name="Login"
          component={Login}
          options={{
            title: '로그인',
            headerShown: false,
          }}
        />
        <StackNavi.Screen
          name="Main"
          options={{
            title: '',
            headerShown: false,
          }}
          component={Main}
        />
        <StackNavi.Screen
          name="Attendance"
          options={{title: '출석'}}
          component={Attendance}
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
          options={{title: '어린화가들'}}
        />
        <StackNavi.Screen
          name="Intuition"
          component={Intuition}
          options={{title: '교육비'}}
        />
        <StackNavi.Screen
          name="PaymentHistoryDetail"
          component={PaymentHistoryDetail}
          options={{title: '납입 상세'}}
        />

        <StackNavi.Screen
          name="MusicGoGo"
          component={MusicGoGo}
          options={{title: '뮤직고고 소개'}}
        />
      </StackNavi.Navigator>
    </>
  );
}

export default Stack;
