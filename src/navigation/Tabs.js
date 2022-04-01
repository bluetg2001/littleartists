import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// pages
import Attendance from '../containers/Attendance';
import Notice from '../containers/Notice/Notice';
import BrandIntro from '../containers/BrandIntro/BrandIntro';
import Gallery from '../containers/Gallery/Gallery';
import Intuition from '../containers/Intuition/Intuition';

const Tab = createBottomTabNavigator();

function Tabs() {
  <Tab.Navigator initialRouteName="Attendance">
    <Tab.Screen name="Attendance" component={Attendance} />
  </Tab.Navigator>;
}

export default Tabs;
