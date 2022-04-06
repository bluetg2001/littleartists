/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
// native-base
import {Center, Text, VStack, HStack, ScrollView, Box} from 'native-base';
// react-native components
import {Image} from 'react-native';
// components
import PaymentRegistration from './PaymentRegistration';
import PaymentHistory from './PaymentHistory';

function Intuition({navigation}) {
  const [pageSwitch, setPageSwitch] = useState(true);

  return (
    <ScrollView>
      <VStack bgColor={'white'} alignItems="center">
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
          <VStack>
            <HStack mt="16">
              <Text
                onPress={() => setPageSwitch(true)}
                ml="2"
                fontSize={'lg'}
                color={pageSwitch ? 'primary.500' : 'dark.100'}>
                교육비
              </Text>
              <Box width="4" />
              <Text
                onPress={() => setPageSwitch(false)}
                fontSize={'lg'}
                color={pageSwitch ? 'dark.100' : 'primary.500'}>
                납입이력
              </Text>
            </HStack>
            {pageSwitch ? (
              <PaymentRegistration />
            ) : (
              <PaymentHistory navigation={navigation} />
            )}
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
export default Intuition;
