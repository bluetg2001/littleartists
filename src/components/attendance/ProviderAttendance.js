/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
// react-native components
import {Image} from 'react-native';
// native-base
import {
  Center,
  View,
  Box,
  Select,
  Button,
  ScrollView,
  Text,
  Divider,
  VStack,
  HStack,
  CheckIcon,
} from 'native-base';
// graphQL stuff
import {PARENT} from '../../graphQL/parents';
import {GET_STUDENT_ATTEND_HISTORY} from '../../graphQL/attendances';
import {useQuery, useMutation} from '@apollo/client';
// dayjs
import dayjs from 'dayjs';
// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// components
import AttendanceInfo from './AttendanceInfo';
import Loading from '../Loading';

function ProviderAttendance() {
  const [parentId, setParentId] = useState(null);
  const [hakwonId, setHakwonId] = useState(null);

  const currentYear = dayjs().format('YYYY');
  // graphql stuff
  const {loading, error, data} = useQuery(PARENT, {
    variables: {
      id: parentId,
    },
    //fetchPolicy: 'network-only',
  });
  const [getStudentAttendHistory] = useMutation(GET_STUDENT_ATTEND_HISTORY);

  // 학부모의 모든 자녀 불러오기
  const students = data ? data.parent.students : null;

  // state
  const [selectStudent, setSelectStudent] = useState('');
  const [selectYear, setSelectYear] = useState(null);
  const [selectMonth, setSelectMonth] = useState(null);
  const [AttendInfo, setAttendInfo] = useState([]);

  // functions
  const searchAttendInfo = () => {
    getStudentAttendHistory({
      variables: {
        studentId: selectStudent,
        hakwonId: hakwonId,
      },
    })
      .then(res => {
        console.log(hakwonId);
        if (res.data) {
          const entireAttendInfo = res.data.getStudentAttendHistory;
          const myAttend = [];

          entireAttendInfo.map((value, key) =>
            value.date.split('-')[0] === selectYear &&
            value.date.split('-')[1] === selectMonth
              ? myAttend.push(value)
              : null,
          );
          setAttendInfo(myAttend);
        } else {
          console.log('data를 불러오지 못하였습니다.');
        }
      })
      .catch(console.log);
  };

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
      <VStack alignItems="center" bgColor="white" flex={1}>
        <Center my={4}>
          <Image
            style={{width: 125, height: 60}}
            source={require('../../../assets/images/logos/littleband-logo.png')}
          />
        </Center>

        <HStack
          space="1"
          alignItems="center"
          bgColor="trueGray.100"
          borderRadius="lg"
          padding="4"
          width="95%">
          {/* 학생 선택 */}
          <Select
            minWidth="29%"
            bgColor="white"
            accessibilityLabel="김태균"
            placeholder="학생 선택"
            _selectedItem={{
              bg: 'primary.500',
              endIcon: <CheckIcon size="4" />,
            }}
            // 선택하는 벨류값에 대해서 변화 관리
            onValueChange={itemValue => {
              setSelectStudent(itemValue);
            }}>
            {students.map((student, key) => (
              <Select.Item key={key} label={student.name} value={student.id} />
            ))}
          </Select>
          {/* 년도 입력 */}
          <Select
            minWidth="29%"
            bgColor={'white'}
            accessibilityLabel="김태균"
            placeholder="년도 입력"
            _selectedItem={{
              bg: 'primary.500',
            }}
            // 선택하는 벨류값에 대해서 변화 관리
            onValueChange={itemValue => setSelectYear(itemValue)}>
            <Select.Item
              label={(currentYear - 1).toString()}
              value={(currentYear - 1).toString()}
            />
            <Select.Item label={currentYear} value={currentYear.toString()} />
          </Select>
          {/* 월 입력 */}
          <Select
            minWidth="27%"
            bgColor="white"
            accessibilityLabel="김태균"
            placeholder="월 입력"
            _selectedItem={{
              bgColor: 'primary.500',
            }}
            // 선택하는 벨류값에 대해서 변화 관리
            onValueChange={itemValue => setSelectMonth(itemValue)}>
            <Select.Item label="1월" value="01" />
            <Select.Item label="2월" value="02" />
            <Select.Item label="3월" value="03" />
            <Select.Item label="4월" value="04" />
            <Select.Item label="5월" value="05" />
            <Select.Item label="6월" value="06" />
            <Select.Item label="7월" value="07" />
            <Select.Item label="8월" value="08" />
            <Select.Item label="9월" value="09" />
            <Select.Item label="10월" value="10" />
            <Select.Item label="11월" value="11" />
            <Select.Item label="12월" value="12" />
          </Select>
          <Button
            size="xs"
            onPress={() => {
              searchAttendInfo();
            }}>
            조회
          </Button>
        </HStack>

        <VStack flex={7} alignItems="center" mt="4">
          <VStack style={{width: '90%'}}>
            <HStack width="100%">
              <Text
                fontSize={'lg'}
                color={'dark.100'}
                textAlign={'center'}
                flex={1}>
                날짜
              </Text>
              <Text
                fontSize={'lg'}
                color={'#f55858'}
                textAlign={'center'}
                flex={1}>
                등원
              </Text>
              <Text
                fontSize={'lg'}
                color={'#009fe8'}
                textAlign={'center'}
                flex={1}>
                하원
              </Text>
            </HStack>

            <Divider my={4} />
            <ScrollView>
              {AttendInfo.map((value, key) => (
                <AttendanceInfo
                  key={key}
                  arrivedAt={value.arrivedAt}
                  leftAt={value.leftAt}
                  date={value.date}
                />
              ))}
            </ScrollView>
          </VStack>
        </VStack>
      </VStack>
    );
  }
}

export default ProviderAttendance;
