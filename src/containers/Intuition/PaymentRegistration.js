import React from 'react';
// native-base
import {Text, VStack, HStack, View, Center} from 'native-base';
// graphQL stuff
import {GET_STUDENT_FEE} from '../../graphQL/students';
import {useQuery} from '@apollo/client';
import Loading from '../../components/Loading';

function PaymentRegistration(props) {
  const {studentId} = props;

  const {data, loading, error} = useQuery(GET_STUDENT_FEE, {
    variables: {
      studentId: studentId,
    },
  });

  const studentInfo = data ? data.getStudentFee : null;

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
    if (studentInfo === null || undefined) {
      return (
        <Center mt={5}>
          <Text color="dark.100">자녀(학생)를 선택해 주세요.</Text>
        </Center>
      );
    } else {
      return (
        <VStack mt={6} flex={1}>
          <HStack flex={1} alignItems="center" mb={4}>
            <Text flex={2} color="dark.100">
              교육비(음악)
            </Text>
            <Text flex={3} textAlign="right">
              {studentInfo.tuitionMusic
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </HStack>
          <HStack flex={1} alignItems="center" mb={4}>
            <Text flex={2} color="dark.100">
              교육비(미술)
            </Text>
            <Text flex={3} textAlign="right">
              {studentInfo.tuitionArt
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </HStack>
          <HStack flex={1} alignItems="center" mb={4}>
            <Text flex={2} color="dark.100">
              교육비(특강)
            </Text>
            <Text flex={3} textAlign="right">
              {studentInfo.tuitionSpecial
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </HStack>
          <HStack flex={1} alignItems="center" mb={4}>
            <Text flex={2} color="dark.100">
              기타비용
            </Text>
            <Text flex={3} textAlign="right">
              {studentInfo.tuitionOthers
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </HStack>
          <HStack flex={1} alignItems="center" mb={4}>
            <Text flex={2} color="dark.100">
              합계
            </Text>
            <Text flex={3} textAlign="right">
              {(
                studentInfo.tuitionSpecial +
                studentInfo.tuitionMusic +
                studentInfo.tuitionArt +
                studentInfo.tuitionOthers
              )
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </HStack>
          <HStack flex={1} alignItems="center" mb={4}>
            <Text flex={2} color="dark.100">
              원비납부일
            </Text>
            <Text flex={3} textAlign="right">
              {studentInfo.payDayOfMonth} 일
            </Text>
          </HStack>
        </VStack>
      );
    }
  }
}

export default PaymentRegistration;
