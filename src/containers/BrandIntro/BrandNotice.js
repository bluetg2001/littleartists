import React from 'react';
// native-base
import {Text, Box, HStack, ScrollView, ChevronRightIcon} from 'native-base';

function BrandNotice() {
  return (
    <ScrollView>
      <Box mt={36} />
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        <Text fontSize={'md'} color="dark.50">
          신학기 이벤트가 열리고 있습니다.
        </Text>
        <ChevronRightIcon />
      </HStack>
      <Text color="dark.100" fontSize={'xs'}>
        3시간 전
      </Text>
    </ScrollView>
  );
}

export default BrandNotice;
