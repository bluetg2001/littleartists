/* eslint-disable react-native/no-inline-styles */
import React from 'react';
// react native
import {Image, TouchableOpacity} from 'react-native';
// navigation
import {useNavigation} from '@react-navigation/native';

function Logo() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Main')}>
      <Image
        style={{
          width: 125,
          height: 60,
          marginTop: 16,
        }}
        source={require('../../assets/images/logos/littleband-logo.png')}
      />
    </TouchableOpacity>
  );
}

export default Logo;
