import React, {useState, useCallback, useEffect} from 'react';
// react-native components
import {TouchableOpacity} from 'react-native';
// native-base
import {
  Center,
  View,
  Select,
  ScrollView,
  Text,
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
// components
import AttendanceInfo from './AttendanceInfo';
import Loading from '../Loading';
import Logo from '../Logo';
// icons
import Icon from 'react-native-vector-icons/AntDesign';

function ProviderAttendance(props) {
  const {parentId, hakwonId} = props;
  // 출석 날짜 정렬
  const [isReverseSort, setIsReverseSort] = useState(false);

  const currentYear = dayjs().format('YYYY');
  // graphql stuff
  const {loading, error, data} = useQuery(PARENT, {
    variables: {
      id: parentId,
    },
    //fetchPolicy: 'network-only',
  });
  const [getStudentAttendHistory] = useMutation(GET_STUDENT_ATTEND_HISTORY, {
    onError: err => {
      console.log(err);
    },
  });

  // 학부모의 모든 자녀 불러오기
  const students = data ? data.parent.students : null;

  // state
  const [selectStudent, setSelectStudent] = useState('');
  const [selectYear, setSelectYear] = useState('전체');
  const [selectMonth, setSelectMonth] = useState('전체');
  const [AttendInfo, setAttendInfo] = useState([]);

  // functions
  const searchAttendInfo = useCallback(() => {
    getStudentAttendHistory({
      variables: {
        studentId: selectStudent,
        hakwonId: hakwonId,
      },
    })
      .then(res => {
        if (res.data) {
          const entireAttendInfo = res.data.getStudentAttendHistory;
          const myAttend = [];

          if (selectYear === '전체' && selectMonth === '전체') {
            // console.log('둘다 전체로 선택', selectYear, selectMonth);
            entireAttendInfo.map((value, key) => myAttend.push(value));
          } else if (selectYear === '전체' && selectMonth !== '전체') {
            // console.log('년도 전체로 선택, ');
            entireAttendInfo.map((value, key) =>
              value.date.split('-')[1] === selectMonth
                ? myAttend.push(value)
                : null,
            );
          } else if (selectMonth === '전체' && selectYear !== '전체') {
            // console.log('월은 전체로 선택', selectYear, selectMonth);
            entireAttendInfo.map((value, key) =>
              value.date.split('-')[0] === selectYear
                ? myAttend.push(value)
                : null,
            );
          } else {
            // console.log('모두 전체로 선택 안함', selectYear, selectMonth);
            entireAttendInfo.map((value, key) =>
              value.date.split('-')[0] === selectYear &&
              value.date.split('-')[1] === selectMonth
                ? myAttend.push(value)
                : null,
            );
          }

          setAttendInfo(myAttend);
        } else {
          console.log('data를 불러오지 못하였습니다.');
        }
      })
      .catch(console.log);
  }, [
    getStudentAttendHistory,
    hakwonId,
    selectMonth,
    selectStudent,
    selectYear,
  ]);

  const switchReverseSort = () => {
    setIsReverseSort(() => !isReverseSort);
  };

  useEffect(() => {
    if (data) {
      // setSelectStudent(students[0].id);
      searchAttendInfo();
    }
  }, [data, searchAttendInfo, students]);

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
          <Logo />
        </Center>

        <HStack
          shadow="1"
          space="3"
          justifyContent="center"
          alignItems="center"
          bgColor="trueGray.100"
          borderRadius="lg"
          padding="4"
          width="95%">
          {/* 학생 선택 */}
          <Select
            placeholder="자녀 선택"
            selectedValue={selectStudent}
            minWidth="35%"
            bgColor="white"
            _selectedItem={{
              bg: 'primary.500',
              endIcon: <CheckIcon size="4" />,
            }}
            // 선택하는 벨류값에 대해서 변화 관리
            onValueChange={itemValue => {
              setSelectStudent(itemValue);
            }}>
            {students.map((student, key) => (
              <Select.Item
                key={key}
                label={student.displayName}
                value={student.id}
              />
            ))}
          </Select>
          {/* 년도 입력 */}
          <Select
            selectedValue={selectYear}
            minWidth="29%"
            bgColor="white"
            _selectedItem={{
              bg: 'primary.500',
            }}
            // 선택하는 벨류값에 대해서 변화 관리
            onValueChange={itemValue => setSelectYear(itemValue)}>
            <Select.Item label="전체" value="전체" />
            <Select.Item
              label={(currentYear - 1).toString()}
              value={(currentYear - 1).toString()}
            />
            <Select.Item label={currentYear} value={currentYear.toString()} />
          </Select>
          {/* 월 입력 */}
          <Select
            selectedValue={selectMonth}
            minWidth="25%"
            bgColor="white"
            // accessibilityLabel="김태균"
            placeholder="월 입력"
            _selectedItem={{
              bgColor: 'primary.500',
            }}
            // 선택하는 벨류값에 대해서 변화 관리
            onValueChange={itemValue => setSelectMonth(itemValue)}>
            <Select.Item label="전체" value="전체" />
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
          {/* <Button
            h="100%"
            size="xs"
            onPress={() => {
              searchAttendInfo();
            }}>
            조회
          </Button> */}
        </HStack>

        <VStack flex={7} alignItems="center" mt="4">
          <VStack width="90%">
            <HStack width="100%">
              <HStack
                flex={1}
                justifyContent="center"
                alignItems="center"
                space="2"
                mb="3">
                <Text fontSize="lg" color="dark.100">
                  날짜
                </Text>
                <TouchableOpacity onPress={switchReverseSort}>
                  <Icon name="up" size={12} color="#27272a" />
                </TouchableOpacity>
              </HStack>
              <Text fontSize="lg" color="#f55858" textAlign="center" flex={1}>
                등원
              </Text>
              <Text fontSize="lg" color="#009fe8" textAlign="center" flex={1}>
                하원
              </Text>
            </HStack>

            {/* 등하원 정보 없을 때  */}
            <ScrollView mb={20}>
              {isReverseSort
                ? AttendInfo.reverse().map((value, key) => (
                    <AttendanceInfo
                      key={key}
                      arrivedAt={value.arrivedAt}
                      leftAt={value.leftAt}
                      date={value.date}
                    />
                  ))
                : AttendInfo.map((value, key) => (
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
