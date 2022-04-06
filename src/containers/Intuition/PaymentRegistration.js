import React, {useState} from 'react';
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
} from 'native-base';
// react-native components
import {Image} from 'react-native';

function PaymentRegistration() {
  return (
    <>
      <HStack mt="8" flex={1} alignItems="center">
        <Text flex={2} fontSize="md" color="dark.100">
          과목
        </Text>
        <HStack flex={3}>
          <Radio.Group defaultValue="1">
            <HStack space={4}>
              <Radio colorScheme={'primary'} value="one" my={1}>
                <Text ml={'2'} color={'dark.100'}>
                  음악
                </Text>
              </Radio>
              <Radio colorScheme={'primary'} value="two" my={1}>
                <Text ml={'2'} color={'dark.100'}>
                  미술
                </Text>
              </Radio>
            </HStack>
          </Radio.Group>
        </HStack>
      </HStack>
      <VStack mt={6}>
        <HStack flex={1} alignItems="center" mb={4}>
          <Text flex={2} color="dark.100">
            교육비(음악)
          </Text>
          <Input flex={3} />
        </HStack>
        <HStack flex={1} alignItems="center" mb={4}>
          <Text flex={2} color="dark.100">
            교육비(미술)
          </Text>
          <Input flex={3} />
        </HStack>
        <HStack flex={1} alignItems="center" mb={4}>
          <Text flex={2} color="dark.100">
            기타비용
          </Text>
          <Input flex={3} />
        </HStack>
        <HStack flex={1} alignItems="center" mb={4}>
          <Text flex={2} color="dark.100">
            합계
          </Text>
          <Input flex={3} />
        </HStack>
        <HStack flex={1} alignItems="center" mb={4}>
          <Text flex={2} color="dark.100">
            원비납부일
          </Text>
          <Select flex={3} placeholder="납부일을 입력하세요">
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
        </HStack>
        <HStack flex={1} alignItems="center" mb={4}>
          <Text flex={2} color="dark.100">
            현금영수증
          </Text>
          <Input flex={3} />
        </HStack>
        <HStack flex={1} alignItems="center" mb={4}>
          <Text flex={2} color="dark.100">
            계좌이체입금자명
          </Text>
          <Input flex={3} />
        </HStack>
        <HStack flex={1} alignItems="center" mb={4}>
          <Text flex={2} color="dark.100">
            결제 카드사
          </Text>
          <Select flex={3} placeholder="카드사를 입력하세요">
            <Select.Item label="삼성" value="삼성" />
            <Select.Item label="현대" value="현대" />
            <Select.Item label="농협" value="농협" />
          </Select>
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
