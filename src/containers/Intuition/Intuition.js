/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
// native-base
import {
  Center,
  Text,
  VStack,
  HStack,
  ScrollView,
  Box,
  Select,
  View,
} from 'native-base';
// react-native components
import {Image} from 'react-native';
// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// graphQL stuff
import {PARENT} from '../../graphQL/parents';
import {useQuery} from '@apollo/client';
// components
import PaymentRegistration from './PaymentRegistration';
import PaymentHistory from './PaymentHistory';

function Intuition({navigation}) {
  const [pageSwitch, setPageSwitch] = useState(true);
  const [parentId, setParentId] = useState(null);
  const [hakwonId, setHakwonId] = useState(null);
  const [selectStudent, setSelectStudent] = useState('');

  // 학부모의 모든 자녀 불러오기

  // graphql stuff
  const {loading, error, data} = useQuery(PARENT, {
    variables: {
      id: parentId,
    },
    //fetchPolicy: 'network-only',
  });

  const students = data ? data.parent.students : null;

  const getParentIdAndHakwonId = async () => {
    try {
      setParentId(await AsyncStorage.getItem('parentId'));
      setHakwonId(await AsyncStorage.getItem('hakwonId'));
    } catch (e) {
      console.log('read error');
    }
  };

  useEffect(() => {
    getParentIdAndHakwonId();
  }, []);

  if (loading) {
    return (
      <View flex={1}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View flex={1}>
        <Text>Error...</Text>
      </View>
    );
  }

  if (data) {
    return (
      <ScrollView bgColor="white">
        <VStack alignItems="center">
          <VStack width="90%" flex={1}>
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

                {/* 학생 선택 */}
                <Select
                  flex={1.5}
                  bgColor="white"
                  // accessibilityLabel=""
                  placeholder="학생 선택"
                  _selectedItem={{
                    bg: 'primary.500',
                  }}
                  // mt={1}
                  // 선택하는 벨류값에 대해서 변화 관리
                  onValueChange={itemValue => {
                    setSelectStudent(itemValue);
                  }}>
                  {students.map((student, key) => (
                    <Select.Item
                      key={key}
                      label={student.name}
                      value={student.id}
                    />
                  ))}
                </Select>
              </HStack>

              {pageSwitch ? (
                <PaymentRegistration studentId={selectStudent} />
              ) : (
                <PaymentHistory
                  navigation={navigation}
                  studentId={selectStudent}
                />
              )}
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    );
  }
}
export default Intuition;
