import React from 'react';
// native-base
import {
  Center,
  Text,
  VStack,
  HStack,
  ScrollView,
  Box,
  Radio,
  Input,
  Select,
  Button,
  ChevronRightIcon,
} from 'native-base';

function PaymentHistory() {
  return (
    <>
      <HStack justifyContent={'space-between'} alignItems={'center'} mt={36}>
        <Text fontSize={'md'} color="dark.50">
          2022년 5월 교육비
        </Text>
        <ChevronRightIcon />
      </HStack>
      <Text color="dark.100" fontSize={'xs'}>
        220,000원
      </Text>
    </>
  );
}

export default PaymentHistory;
