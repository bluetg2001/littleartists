import React from 'react';
// native-base
import {Text, HStack, ChevronRightIcon, Box} from 'native-base';

function PaymentHistory({navigation}) {
  return (
    <Box onTouchEnd={() => navigation.navigate('PaymentHistoryDetail')}>
      <HStack justifyContent={'space-between'} alignItems={'center'} mt={36}>
        <Text fontSize={'md'} color="dark.50">
          2022년 5월 교육비
        </Text>
        <ChevronRightIcon />
      </HStack>
      <Text color="dark.100" fontSize={'xs'}>
        220,000원
      </Text>
    </Box>
  );
}

export default PaymentHistory;
