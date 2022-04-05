/* eslint-disable react-native/no-inline-styles */
import React from 'react';
// react-native-components
import {Image} from 'react-native';
// native-base
import {Center, Text, View, Box} from 'native-base';

function BrandIntro() {
  return (
    <View flex={1} bgColor="white">
      <Box flex={1}>
        <Center flex={1}>
          <Box
            position="relative"
            style={{width: 125, height: 60}}
            bgColor="amber.400">
            <Image
              style={{width: 125, height: 60}}
              source={require('../../../assets/images/logos/littleband-logo.png')}
            />
          </Box>
        </Center>
      </Box>
      <Box flex={6} bgColor={'amber.400'}>
        1
      </Box>
    </View>
  );
}
export default BrandIntro;
