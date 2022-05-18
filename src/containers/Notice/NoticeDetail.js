import React from 'react';
// native-base
import {VStack, ScrollView, Text, Box} from 'native-base';

function NoticeDetail({route}) {
  const title = route.params.title;
  const contents = route.params.contents;

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
            {title}
          </Text>
          <Text mt={4} color="dark.100" textAlign={'right'}>
            3시간 전
          </Text>
        </Box>
        <Box flex={5}>
          <ScrollView>
            <Text ml={4} mt={4} color="dark.50" fontSize={'sm'}>
              {contents}
            </Text>
          </ScrollView>
        </Box>
      </VStack>
    </VStack>
  );
}

export default NoticeDetail;
