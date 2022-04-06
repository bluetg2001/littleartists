import React, {useState} from 'react';
// native-base
import {Text, Box, VStack, HStack, ScrollView} from 'native-base';
// components
import Introduction from './Introduction';
import BrandNotice from './BrandNotice';

function BrandIntro() {
  const [pageSwitch, setPageSwitch] = useState(true);

  return (
    <ScrollView>
      <VStack flex={1} alignItems="center" bgColor={'white'}>
        <VStack width="90%">
          <HStack mt="8">
            <Text
              fontSize={'lg'}
              ml="8"
              onPress={() => setPageSwitch(true)}
              color={pageSwitch ? 'primary.500' : 'dark.100'}>
              소개
            </Text>
            <Box width={'8'} />
            <Text
              fontSize={'lg'}
              onPress={() => setPageSwitch(false)}
              color={pageSwitch ? 'dark.100' : 'primary.500'}>
              소식
            </Text>
          </HStack>
          {pageSwitch ? <Introduction /> : <BrandNotice />}
        </VStack>
      </VStack>
    </ScrollView>
  );
}
export default BrandIntro;
