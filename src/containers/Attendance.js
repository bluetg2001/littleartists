/* eslint-disable react-native/no-inline-styles */
import React from 'react';
// react-native components
import {Image, TouchableOpacity} from 'react-native';

// native-base
import {Center, Text, View, Box} from 'native-base';

function Attendance() {
  return (
    <View flex={1} bgColor="white">
      <Box flex={1}>
        <Center flex={1}>
          <Image
            style={{width: 125, height: 60}}
            source={require('../../assets/images/logos/littleband-logo.png')}
          />
        </Center>
      </Box>
      <Box flex={5}>
        <Box flex={1} alignItems={'center'}>
          <Center
            flex={1}
            bgColor="trueGray.100"
            borderRadius={'lg'}
            style={{width: '90%'}}>
            1
          </Center>
        </Box>
        <Box flex={7}></Box>
      </Box>
    </View>
  );
}
export default Attendance;
