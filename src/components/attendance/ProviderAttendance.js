/* eslint-disable react-native/no-inline-styles */
import React from 'react';
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
import {useQuery} from '@apollo/client';
// dayjs
import dayjs from 'dayjs';
// components
import AttendanceInfo from './AttendanceInfo';

function ProviderAttendance(props) {
  const {parentId} = props;

  const {loading, error, data} = useQuery(PARENT, {
    variables: {
      id: parentId,
    },
    //fetchPolicy: 'network-only',
  });
  const row = data ? data.parent : null;
  //   console.log(parentId, 'parentId 잘 들어왔는지 확인.');
  console.log(row, 'parentId 잘 들어왔는지 확인.');

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
        {/* {console.log(parentId, 'parentId 잘 넘어왔나?')} */}
        {console.log(data.parent, '이건 데이터값')}
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
                // onValueChange={itemValue => setService(itemValue)}
              >
                <Select.Item label="김태균" value="김태균" />
                <Select.Item label="김영탁" value="김영탁" />
                <Select.Item label="장수현" value="장수현" />
                <Select.Item label="김미영" value="김미영" />
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
                // onValueChange={itemValue => setService(itemValue)}
              >
                <Select.Item label="2021" value="2021" />
                <Select.Item label="2022" value="2022" />
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
                // onValueChange={itemValue => setService(itemValue)}
              >
                <Select.Item label="1월" value="1월" />
                <Select.Item label="2월" value="2월" />
                <Select.Item label="3월" value="3월" />
                <Select.Item label="4월" value="4월" />
                <Select.Item label="5월" value="5월" />
                <Select.Item label="6월" value="6월" />
                <Select.Item label="7월" value="7월" />
                <Select.Item label="8월" value="8월" />
                <Select.Item label="9월" value="9월" />
                <Select.Item label="10월" value="10월" />
                <Select.Item label="11월" value="11월" />
                <Select.Item label="12월" value="12월" />
              </Select>
              {/* gap */}
              <View flex={0.1} />
              <Button size="md">조회</Button>
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
                  <AttendanceInfo />
                  <AttendanceInfo />
                  <AttendanceInfo />
                  <AttendanceInfo />
                  <AttendanceInfo />
                  <AttendanceInfo />
                  <AttendanceInfo />
                  <AttendanceInfo />
                  <AttendanceInfo />
                  <AttendanceInfo />
                  <AttendanceInfo />
                  <AttendanceInfo />
                  <AttendanceInfo />
                  <AttendanceInfo />
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
