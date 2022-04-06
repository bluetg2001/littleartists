import React from 'react';
// native-base
import {Center, VStack, View, Box, ScrollView, AspectRatio} from 'native-base';
// react-native components
import {Image, TouchableOpacity} from 'react-native';

function GallerDetail() {
  return (
    <VStack flex={1} alignItems="center">
      <VStack flex={1} width="90%">
        <Box flex={1}>
          <Center flex={1}>
            <Image
              style={{width: 125, height: 60}}
              source={require('../../../assets/images/logos/littleband-logo.png')}
            />
          </Center>
        </Box>
      </VStack>
    </VStack>
  );
}

export default GallerDetail;
