import React from 'react';
// native-base
import {Center, Text, VStack, HStack, Button} from 'native-base';

function PaymentRegistration() {
  return (
    <>
      <HStack mt="8" flex={1} alignItems="center">
        <Text flex={2} fontSize="md" color="dark.100">
          수강 중인 과목
        </Text>
        <HStack flex={3}>
          <HStack space={4} flex={1}>
            <Text flex={1} textAlign={'right'} ml={'2'} color={'dark.100'}>
              음악
            </Text>
            <Text flex={1} textAlign={'right'} ml={'2'} color={'dark.100'}>
              미술
            </Text>
          </HStack>
        </HStack>
      </HStack>
      <VStack mt={6}>
        <HStack flex={1} alignItems="center" mb={4}>
          <Text flex={2} color="dark.100">
            교육비(음악)
          </Text>
          <Text flex={3} textAlign="right">
            160,000
          </Text>
        </HStack>
        <HStack flex={1} alignItems="center" mb={4}>
          <Text flex={2} color="dark.100">
            교육비(미술)
          </Text>
          <Text flex={3} textAlign="right">
            160,000
          </Text>
        </HStack>
        <HStack flex={1} alignItems="center" mb={4}>
          <Text flex={2} color="dark.100">
            기타비용
          </Text>
          <Text flex={3} textAlign="right">
            160,000
          </Text>
        </HStack>
        <HStack flex={1} alignItems="center" mb={4}>
          <Text flex={2} color="dark.100">
            합계
          </Text>
          <Text flex={3} textAlign="right">
            160,000
          </Text>
        </HStack>
        <HStack flex={1} alignItems="center" mb={4}>
          <Text flex={2} color="dark.100">
            원비납부일
          </Text>
          <Text flex={3} textAlign="right">
            160,000
          </Text>
        </HStack>
        <HStack flex={1} alignItems="center" mb={4}>
          <Text flex={2} color="dark.100">
            현금영수증
          </Text>
          <Text flex={3} textAlign="right">
            160,000
          </Text>
        </HStack>
        <HStack flex={1} alignItems="center" mb={4}>
          <Text flex={2} color="dark.100">
            계좌이체입금자명
          </Text>
          <Text flex={3} textAlign="right">
            160,000
          </Text>
        </HStack>
        <HStack flex={1} alignItems="center" mb={4}>
          <Text flex={2} color="dark.100">
            결제 카드사
          </Text>
          <Text flex={3} textAlign="right">
            160,000
          </Text>
        </HStack>
        <Center>
          <Button width={'30%'} my={4}>
            저장
          </Button>
        </Center>
      </VStack>
    </>
  );
}

export default PaymentRegistration;
