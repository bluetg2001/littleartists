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
            source={require('../../../assets/images/logos/littleband-border-logo.png')}
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
            source={require('../../../assets/images/logos/littleband-border-logo.png')}
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
            fontSize="lg">{`달라진 어린음악대! \n 아이에게 가장 알맞는 \n 교육환경과 음악적 경험을 \n 만들어 드립니다.`}</Text>
        </Box>
      </VStack>

      <HStack mt={220} alignItems="center">
        <Image
          style={{
            width: 63,
            height: 78,
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
            }>{`스마트한 음악교육의 시작! \n 새로운 차원의 피아노레슨 \n 어린음악대!`}</Text>
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
          {` 어린음악대만의 디지털 콘텐츠를 대폭 강화하여\n 언제 어디서나 비대면 수업이 가능합니다. \n 체계적인 레슨과 관리, 전문교구와 \n 통합형 피아노레슨 프로그램의 \n 도입으로 최상의 교육서비스를 \n 제공합니다. `}
        </Text>
        <Box
          alignItems="flex-end"
          position={'absolute'}
          style={{right: 0, top: 30, zIndex: -1}}>
          <Image
            source={require('../../../assets/images/characters/half-rest.png')}
            style={{
              marginTop: 32,
              width: 118,
              height: 125,
              resizeMode: 'cover',
            }}
          />
        </Box>
      </Box>
    </>
  );
}

export default Introduction;
