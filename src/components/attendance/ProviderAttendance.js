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

function ProviderAttendance() {
  const [parentId, setParentId] = useState(null);
  const [hakwonId, setHakwonId] = useState(null);

  const currentYear = dayjs().format('YYYY');
  const myAttend = [];

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
  const [attendInfo, setAttendInfo] = useState([]);

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
          // setAttendInfo([]);
          // setAttendInfo(res.data.getStudentAttendHistory);
          const entireAttendInfo = res.data.getStudentAttendHistory;
          entireAttendInfo.map((value, key) =>
            value.date.split('-')[0] === selectYear &&
            value.date.split('-')[1] === selectMonth
              ? setAttendInfo(...attendInfo, value)
              : // myAttend.push(value)
                null,
          );
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
      <View flex={6} bgColor="white">
        <Box flex={1}>
          <Center flex={1}>
            <Image
              style={{width: 125, height: 60}}
              source={require('../../../assets/images/logos/littleband-logo.png')}
            />
          </Center>
        </Box>
        <Box flex={5}>
          <Box flex={1} alignItems={'center'}>
            <Center
              flexDirection={'row'}
              flex={1}
              bgColor="trueGray.100"
              borderRadius={'lg'}
              padding="2"
              style={{width: '90%'}}>
              {/* 학생 선택 */}
              <Select
                flex={1.5}
                bgColor="white"
                accessibilityLabel="김태균"
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
              {/* gap */}
              <View flex={0.1} />
              {/* 년도 입력 */}
              <Select
                flex={1.5}
                bgColor={'white'}
                accessibilityLabel="김태균"
                placeholder="년도 입력"
                _selectedItem={{
                  bg: 'primary.500',
                }}
                // mt={1}
                // 선택하는 벨류값에 대해서 변화 관리
                onValueChange={itemValue => setSelectYear(itemValue)}>
                <Select.Item
                  label={(currentYear - 1).toString()}
                  value={(currentYear - 1).toString()}
                />
                <Select.Item
                  label={currentYear}
                  value={currentYear.toString()}
                />
              </Select>
              {/* gap */}
              <View flex={0.1} />
              {/* 월 입력 */}
              <Select
                flex={1.5}
                bgColor="white"
                accessibilityLabel="김태균"
                placeholder="월 입력"
                _selectedItem={{
                  bgColor: 'primary.500',
                }}
                // mt={1}
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
              {/* gap */}
              <View flex={0.1} />
              <Button
                size="md"
                onPress={() => {
                  searchAttendInfo();
                  // console.log(selectStudent, selectYear, selectMonth);
                }}>
                조회
              </Button>
            </Center>
          </Box>
          <Box flex={7}>
            <Box mt="4" style={{width: '100%'}} alignItems="center">
              <Box style={{width: '90%'}}>
                <Box flexDirection={'row'}>
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
                </Box>
                <Divider my={4} bgColor={'gray.50'} />
                <ScrollView>
                  {console.log(myAttend)}
                  {/* {attendInfo.length === 0 ? (
                    <></>
                  ) : (
                    attendInfo.map((value, key) => (
                      <AttendanceInfo
                        key={key}
                        arrivedAt={value.arrivedAt}
                        leftAt={value.leftAt}
                        date={value.date}
                      />
                    ))
                  )} */}
                </ScrollView>
              </Box>
            </Box>
          </Box>
        </Box>
      </View>
    );
  }
}

export default ProviderAttendance;
