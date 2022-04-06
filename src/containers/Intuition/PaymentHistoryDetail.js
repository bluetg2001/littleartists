import React from 'react';
// native-base
import {VStack, Text, HStack, Box, Divider} from 'native-base';

function PaymentHistoryDetail() {
  return (
    <VStack flex={1} bgColor="white" alignItems="center">
      <VStack flex={1} width="90%">
        <HStack flex={1} alignItems="flex-end">
          <Text fontSize="xl" color="dark.100" ml={2}>
            2022년 4월 교육비
          </Text>
        </HStack>
        <Box flex={0.5} />
        <VStack flex={5}>
          <Divider height="0.5" />
          <Box mt={8}>
            <HStack>
              <Text flex={2} color="dark.100" fontSize="md">
                수납일자
              </Text>
              <Text flex={3} color="dark.50" fontSize="md">
                2022-04-02 13:12
              </Text>
            </HStack>
          </Box>
          <Box mt={4}>
            <HStack>
              <Text flex={2} color="dark.100" fontSize="md">
                결제금액
              </Text>
              <Text flex={3} color="dark.50" fontSize="md">
                220,000원
              </Text>
            </HStack>
          </Box>
          <Box mt={4}>
            <HStack>
              <Text flex={2} color="dark.100" fontSize="md">
                결제방법
              </Text>
              <Text flex={3} color="dark.50" fontSize="md">
                신용카드 결제
              </Text>
            </HStack>
          </Box>
          <Box mt={4}>
            <HStack>
              <Text flex={2} color="dark.100" fontSize="md">
                카드사
              </Text>
              <Text flex={3} color="dark.50" fontSize="md">
                삼성
              </Text>
            </HStack>
          </Box>
          <Box>
            <HStack mt={4}>
              <Text flex={2} color="dark.100" fontSize="md">
                상태
              </Text>
              <Text flex={3} color="dark.50" fontSize="md">
                결제
              </Text>
            </HStack>
          </Box>
          <Box mt={4}>
            <HStack>
              <Text flex={2} color="dark.100" fontSize="md">
                납입이력
              </Text>
              <Text flex={3} color="dark.50" fontSize="md">
                세천원
              </Text>
            </HStack>
          </Box>
          <Divider mt={4} height="0.5" />
        </VStack>
      </VStack>
    </VStack>
  );
}

export default PaymentHistoryDetail;
