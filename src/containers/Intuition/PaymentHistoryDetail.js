import React from 'react';
// native-base
import {VStack, Text, HStack, Box, Divider} from 'native-base';

function PaymentHistoryDetail({route}) {
  const {
    product_nm,
    appr_origin_dt,
    appr_price,
    appr_pay_type,
    appr_issuer_cd,
    appr_state,
    hakwonId,
  } = route.params;
  return (
    <VStack flex={1} bgColor="white" alignItems="center">
      <VStack flex={1} width="90%">
        <HStack flex={1} alignItems="flex-end">
          <Text fontSize="xl" color="dark.100" ml={2}>
            {product_nm}
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
                {appr_origin_dt === null ? 'null' : appr_origin_dt}
              </Text>
            </HStack>
          </Box>
          <Box mt={4}>
            <HStack>
              <Text flex={2} color="dark.100" fontSize="md">
                결제금액
              </Text>
              <Text flex={3} color="dark.50" fontSize="md">
                {appr_price === null
                  ? 'null'
                  : appr_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
            </HStack>
          </Box>
          <Box mt={4}>
            <HStack>
              <Text flex={2} color="dark.100" fontSize="md">
                결제방법
              </Text>
              <Text flex={3} color="dark.50" fontSize="md">
                {appr_pay_type === null ? 'null' : appr_pay_type}
              </Text>
            </HStack>
          </Box>
          <Box mt={4}>
            <HStack>
              <Text flex={2} color="dark.100" fontSize="md">
                카드사
              </Text>
              <Text flex={3} color="dark.50" fontSize="md">
                {appr_issuer_cd === null ? 'null' : appr_issuer_cd}
              </Text>
            </HStack>
          </Box>
          <Box>
            <HStack mt={4}>
              <Text flex={2} color="dark.100" fontSize="md">
                상태
              </Text>
              <Text flex={3} color="dark.50" fontSize="md">
                {appr_state === null ? 'null' : appr_state}
              </Text>
            </HStack>
          </Box>
          <Box mt={4}>
            <HStack>
              <Text flex={2} color="dark.100" fontSize="md">
                납입이력
              </Text>
              <Text flex={3} color="dark.50" fontSize="md">
                {hakwonId === null ? 'null' : hakwonId}
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
