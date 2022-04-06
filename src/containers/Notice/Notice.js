/* eslint-disable react-native/no-inline-styles */
import React from 'react';
// native-base
import {
  Center,
  Box,
  Text,
  VStack,
  HStack,
  ScrollView,
  ChevronRightIcon,
} from 'native-base';
// react-native components
import {Image} from 'react-native';

function Notice({navigation}) {
  return (
    <ScrollView>
      <VStack alignItems="center" bgColor="white">
        <VStack width="90%">
          <Center>
            <Image
              style={{
                width: 125,
                height: 60,
                marginTop: 16,
              }}
              source={require('../../../assets/images/logos/littleband-logo.png')}
            />
          </Center>
          <Text mt={8} fontSize="lg" color="dark.50">
            학원 소식
          </Text>
          <VStack mt={4}>
            <Box onTouchEnd={() => navigation.navigate('NoticeDetail')}>
              <HStack
                justifyContent={'space-between'}
                alignItems={'center'}
                mt={36}>
                <Text fontSize={'md'} color="dark.50">
                  세천원에서 알려드립니다.
                </Text>
                <ChevronRightIcon />
              </HStack>
              <Text color="dark.100" fontSize={'xs'}>
                3시간 전
              </Text>
            </Box>
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
export default Notice;
