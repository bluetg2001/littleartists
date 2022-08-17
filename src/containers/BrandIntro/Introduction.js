/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
// react-native-components
import {Image, Platform} from 'react-native';
// native-base
import {Text, Box, VStack, HStack} from 'native-base';

function Introduction() {
  return (
    <>
      <VStack mt="5" alignItems="center" style={{position: 'relative'}}>
        {Platform.OS === 'android' ? (
          <Image
            style={{
              width: 125,
              height: 65,
              position: 'absolute',
              // zIndex: 2,
              elevation: 2,
            }}
            source={require('../../../assets/images/logos/littleartists-border-logo.png')}
          />
        ) : (
          <Image
            style={{
              width: 125,
              height: 65,
              position: 'absolute',
              zIndex: 2,
              // elevation: 2,
            }}
            source={require('../../../assets/images/logos/littleartists-border-logo.png')}
          />
        )}

        <Box
          mt="8"
          width="100%"
          borderRadius="3xl"
          bgColor="primary.500"
          paddingTop="6"
          paddingBottom="6"
          paddingLeft={4}
          style={{position: 'absolute', zIndex: 1, elevation: 1}}>
          <Text
            color="white"
            fontSize="lg">{` 어린화가들의 프로그램은 \n 한국아동예술창의 연구소의 \n 검증된 과정을 통해 만들어진 전문적인 \n 예술 프로그램입니다.`}</Text>
        </Box>
      </VStack>

      <HStack mt={220} alignItems="center">
        <Image
          style={{
            width: 69,
            height: 75,
          }}
          source={require('../../../assets/images/characters/brand-intro-deco.png')}
        />
        <Box width="6" />
        <VStack>
          <Text
            fontWeight="500"
            fontSize="lg"
            color={
              'primary.500'
            }>{`아이들은 감각을 통해 사물을 배우고 \n그 자극이 뇌에 전달되어 \n기억으로 축적됩니다.`}</Text>
        </VStack>
      </HStack>
      <Image
        style={{
          marginTop: 32,
          width: '100%',
          height: 328,
          resizeMode: 'cover',
        }}
        source={require('../../../assets/images/backgrounds/brand-intro-deco-background.png')}
      />
      <Box mt={36}>
        <Text
          letterSpacing="md"
          lineHeight="xl"
          fontSize="md"
          color="dark.100"
          mb={16}
          position="relative"
          zIndex="1">
          {` 유 아동 시기의 풍부한 감성 경험은 뇌의 성장에\n 커다란 영향을 미치고, 직접 만지고 \n 만들어보는 감각적인 수업은 창의적 \n 지능 발달에 크게 도움을 줍니다. \n 뿐만 아니라 다양한 경험과 \n 성취를 통한 만족감은 긍정적인 \n 자아 발달을 이루어 \n 건강하고 바른 인성을 길러줍니다. `}
        </Text>
        <Box
          alignItems="flex-end"
          position={'absolute'}
          style={{right: 0, top: 25, zIndex: -1}}>
          <Image
            source={require('../../../assets/images/characters/artist-char.png')}
            style={{
              marginTop: 32,
              width: 178,
              height: 141,
              resizeMode: 'cover',
            }}
          />
        </Box>
      </Box>
    </>
  );
}

export default Introduction;
