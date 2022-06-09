import React, {useState, useEffect} from 'react';
// native-base
import {Text, Box, VStack, HStack, ScrollView, Divider} from 'native-base';
// components
import Introduction from './Introduction';
import BrandNotice from './BrandNotice';
// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

function BrandIntro() {
  const [pageSwitch, setPageSwitch] = useState(true);
  const [hakwonId, setHakwonId] = useState(null);

  const getHakwonId = async () => {
    try {
      setHakwonId(await AsyncStorage.getItem('hakwonId'));
    } catch (e) {
      console.log('read error');
    }
  };

  useEffect(() => {
    getHakwonId();
  }, []);

  return (
    <ScrollView>
      <VStack flex={1} alignItems="center" bgColor={'white'}>
        <VStack width="90%">
          <HStack mt="8" space="6" pl="2">
            <VStack>
              <Text
                fontSize="lg"
                fontWeight="bold"
                onPress={() => setPageSwitch(true)}
                color={pageSwitch ? 'primary.500' : 'dark.100'}>
                소개
              </Text>
              <Divider
                bg={pageSwitch ? 'primary.500' : 'white'}
                thickness="1.5"
              />
            </VStack>
            <VStack>
              <Text
                fontSize="lg"
                fontWeight="bold"
                onPress={() => setPageSwitch(false)}
                color={pageSwitch ? 'dark.100' : 'primary.500'}>
                소식
              </Text>
              <Divider
                bg={pageSwitch ? 'white' : 'primary.500'}
                thickness="1.5"
              />
            </VStack>
          </HStack>
          {pageSwitch ? <Introduction /> : <BrandNotice hakwonId={hakwonId} />}
        </VStack>
      </VStack>
    </ScrollView>
  );
}
export default BrandIntro;
