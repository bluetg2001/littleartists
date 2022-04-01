import React from 'react';
// navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// pages
import Login from '../containers/Login/Login';
import Main from '../containers/Main';
import Attendance from '../containers/Attendance';

const StackNavi = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Stack() {
  return (
    <NavigationContainer>
      <StackNavi.Navigator initialRouteName="Login">
        <StackNavi.Screen name="Login" component={Login} />
        <StackNavi.Screen name="Main" component={Main} />
        <StackNavi.Screen name="Attendance" component={Attendance} />
      </StackNavi.Navigator>
      {/* <Tab.Navigator initialRouteName="Attendance">
        <Tab.Screen name="Attendance" component={Attendance} />
      </Tab.Navigator> */}
    </NavigationContainer>
  );
}

export default Stack;
