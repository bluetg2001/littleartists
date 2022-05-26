import React from 'react';
// native-base
import {Text, HStack, ChevronRightIcon, Box, View, Center} from 'native-base';
// graphQL stuff
import {GET_STUDENT_BILLS} from '../../graphQL/paymints';
import {useQuery} from '@apollo/client';
import Loading from '../../components/Loading';

function PaymentHistory(props) {
  const {studentId, navigation} = props;

  const {loading, error, data} = useQuery(GET_STUDENT_BILLS, {
    variables: {
      studentId: studentId,
    },
  });

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
    const bills =
      data.paymintBillsByStudent !== null || undefined
        ? data.paymintBillsByStudent
        : null;

    if (data === null || undefined) {
      return (
        <Center mt={5}>
          <Text color="dark.100">자녀(학생)를 선택해 주세요.</Text>
        </Center>
      );
    } else {
      return (
        <>
          {bills.map((bill, key) => (
            <Box
              key={key}
              onTouchEnd={() =>
                navigation.navigate('PaymentHistoryDetail', {
                  product_nm: bill.product_nm,
                  appr_origin_dt: bill.payment.appr_origin_dt,
                  appr_price: bill.payment.appr_price,
                  appr_pay_type: bill.payment.appr_pay_type,
                  appr_issuer_cd: bill.payment.appr_issuer_cd,
                  appr_state: bill.payment.appr_state,
                  hakwonId: bill.hakwonId,
                })
              }>
              <HStack
                justifyContent={'space-between'}
                alignItems={'center'}
                mt={36}>
                <Text fontSize={'md'} color="dark.50">
                  {bill.product_nm}
                </Text>
                <ChevronRightIcon />
              </HStack>
              <Text color="dark.100" fontSize={'xs'}>
                {bill.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </Text>
            </Box>
          ))}
        </>
      );
    }
  }
}

export default PaymentHistory;
