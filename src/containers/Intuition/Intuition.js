import React, {useState, useEffect} from 'react';
// native-base
import {
  Center,
  Text,
  VStack,
  HStack,
  ScrollView,
  Select,
  View,
  Divider,
} from 'native-base';
// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// graphQL stuff
import {PARENT} from '../../graphQL/parents';
import {useQuery} from '@apollo/client';
// components
import PaymentRegistration from './PaymentRegistration';
import PaymentHistory from './PaymentHistory';
import Loading from '../../components/Loading';
import Logo from '../../components/Logo';

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
    return <Loading />;
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
          <VStack width="80%" flex={1}>
            <Center>
              <Logo />
            </Center>
            <VStack>
              <HStack mt="16" space="6">
                <VStack>
                  <Text
                    onPress={() => setPageSwitch(true)}
                    fontSize="lg"
                    fontWeight="bold"
                    color={pageSwitch ? 'primary.500' : 'dark.100'}>
                    교육비
                  </Text>
                  <Divider
                    bg={pageSwitch ? 'primary.500' : 'white'}
                    thickness="1.5"
                  />
                </VStack>
                <VStack>
                  <Text
                    onPress={() => setPageSwitch(false)}
                    fontSize="lg"
                    fontWeight="bold"
                    color={pageSwitch ? 'dark.100' : 'primary.500'}>
                    납입이력
                  </Text>
                  <Divider
                    bg={pageSwitch ? 'white' : 'primary.500'}
                    thickness="1.5"
                  />
                </VStack>
              </HStack>
              <HStack mt={4} justifyContent="space-between" alignItems="center">
                <Text fontSize="md">이름</Text>

                {/* 학생 선택 */}
                <Select
                  flex={0.7}
                  // flex={1}
                  bgColor="white"
                  placeholder="학생 선택"
                  _selectedItem={{
                    bg: 'primary.500',
                  }}
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
