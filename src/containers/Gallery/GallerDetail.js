/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
// native-base
import {Center, VStack, Box, AspectRatio, HStack} from 'native-base';
// react-native components
import {Image, Dimensions} from 'react-native';
// carousel
import Carousel from 'react-native-snap-carousel';

function GallerDetail() {
  const [activeIndex, setActivateIndex] = useState(0);
  const [carouselState, setCarouselState] = useState([
    {
      img: require('../../../assets/images/backgrounds/brand-intro-deco-background.png'),
    },
    {
      img: require('../../../assets/images/backgrounds/brand-intro-deco-background.png'),
    },
    {
      img: require('../../../assets/images/backgrounds/brand-intro-deco-background.png'),
    },
    {
      img: require('../../../assets/images/backgrounds/brand-intro-deco-background.png'),
    },
    {
      img: require('../../../assets/images/backgrounds/brand-intro-deco-background.png'),
    },
  ]);

  const RenderItem = ({item, index}) => {
    return (
      <AspectRatio
        ratio={{base: 1 / 1}}
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 50,
        }}>
        <Box flex={1}>
          <Image
            borderRadius={20}
            flex={1}
            resizeMethod="contain"
            style={{aspectRatio: 1}}
            source={item.img}
          />
        </Box>
      </AspectRatio>
    );
  };

  return (
    <VStack flex={1} alignItems="center" bgColor={'white'}>
      <VStack flex={1} width="90%">
        <Box flex={1}>
          <Center flex={1}>
            <Image
              style={{width: 125, height: 60}}
              source={require('../../../assets/images/logos/littleband-logo.png')}
            />
          </Center>
          <HStack flex={5} alignItems="center">
            <Carousel
              layout={'default'}
              layoutCardOffset={18}
              data={carouselState}
              sliderWidth={Dimensions.get('screen').width * 0.9}
              itemWidth={Dimensions.get('screen').width * 0.7}
              renderItem={RenderItem}
              useScrollView
              onSnapToItem={index => setActivateIndex(index)}
              activeSlideAlignment="center"
            />
          </HStack>
        </Box>
      </VStack>
    </VStack>
  );
}

export default GallerDetail;
