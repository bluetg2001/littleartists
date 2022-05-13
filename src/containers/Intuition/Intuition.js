/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
// native-base
import {
  Center,
  Text,
  VStack,
  HStack,
  ScrollView,
  Box,
  Select,
} from 'native-base';
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
            <HStack>
              <Text>이름</Text>
              <Select
                // size={'md'}
                flex={1.5}
                bgColor="white"
                accessibilityLabel="김태균"
                placeholder="학생 선택"
                _selectedItem={{
                  bg: 'primary.500',
                }}
                // mt={1}
                // 선택하는 벨류값에 대해서 변화 관리
                // onValueChange={itemValue => setService(itemValue)}
              >
                <Select.Item label="김태균" value="김태균" />
                <Select.Item label="김영탁" value="김영탁" />
                <Select.Item label="장수현" value="장수현" />
                <Select.Item label="김미영" value="김미영" />
              </Select>
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
