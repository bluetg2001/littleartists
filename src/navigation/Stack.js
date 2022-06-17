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
import PianoGoGoDetail from '../containers/PianoGoGo/PianoGoGoDetail';
import PaymentHistoryDetail from '../containers/Intuition/PaymentHistoryDetail';
import ProviderMain from '../components/main/ProviderMain';

const StackNavi = createNativeStackNavigator();

function Stack() {
  return (
    <>
      <StackNavi.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ffcc43',
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
            headerShown: false,
          }}
        />
        <StackNavi.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
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
          options={{title: '납입 상세'}}
        />
        <StackNavi.Screen
          name="PianoGoGo"
          component={PianoGoGo}
          options={{title: 'e피아노고고'}}
        />
        <StackNavi.Screen
          name="PianoGoGoDetail"
          component={PianoGoGoDetail}
          options={{title: 'e피아노고고'}}
        />
      </StackNavi.Navigator>
    </>
  );
}

export default Stack;
