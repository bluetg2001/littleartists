import React from 'react';
// native-base
import {VStack, ScrollView, Text, Box} from 'native-base';

function NoticeDetail() {
  return (
    <VStack bgColor={'white'} alignItems="center" flex={1}>
      <VStack width="90%" flex={1}>
        <Box flex={1}>
          <Text
            mt={8}
            textAlign={'left'}
            color="dark.50"
            fontSize={'lg'}
            fontWeight="semibold">
            세천원에서 알려드립니다.
          </Text>
          <Text mt={4} color="dark.100" textAlign={'right'}>
            3시간 전
          </Text>
        </Box>
        <Box flex={5}>
          <ScrollView>
            <Text ml={4} mt={4} color="dark.50" fontSize={'sm'}>
              {`텍스트필드입니다.\n 블라블라~`}
            </Text>
          </ScrollView>
        </Box>
      </VStack>
    </VStack>
  );
}

export default NoticeDetail;
