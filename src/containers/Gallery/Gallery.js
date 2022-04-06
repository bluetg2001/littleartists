/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
// native-base
import {Center, VStack, View, Box, ScrollView, AspectRatio} from 'native-base';
// react-native components
import {Image, TouchableOpacity} from 'react-native';
// grid system
import {FlatGrid} from 'react-native-super-grid';

function Gallery({navigation}) {
  const [menus, setMenus] = useState([
    {
      title: '출석',
      img: require('../../../assets/images/backgrounds/brand-intro-deco-background.png'),
      link: 'GalleryDetail',
    },
    {
      title: '공지사항',
      img: require('../../../assets/images/backgrounds/brand-intro-deco-background.png'),
      link: 'GalleryDetail',
    },
    {
      title: 'e피아노고고',
      img: require('../../../assets/images/backgrounds/brand-intro-deco-background.png'),
      link: 'GalleryDetail',
    },
    {
      title: '갤러리',
      img: require('../../../assets/images/backgrounds/brand-intro-deco-background.png'),
      link: 'GalleryDetail',
    },
    {
      title: '소개',
      img: require('../../../assets/images/backgrounds/brand-intro-deco-background.png'),
      link: 'GalleryDetail',
    },
    {
      title: '교육비',
      img: require('../../../assets/images/backgrounds/brand-intro-deco-background.png'),
      link: 'GalleryDetail',
    },
    {
      title: '교육비',
      img: require('../../../assets/images/backgrounds/brand-intro-deco-background.png'),
      link: 'GalleryDetail',
    },
    {
      title: '교육비',
      img: require('../../../assets/images/backgrounds/brand-intro-deco-background.png'),
      link: 'GalleryDetail',
    },
  ]);

  return (
    <VStack flex={1} alignItems={'center'}>
      <VStack flex={1} width="90%">
        <Box flex={1}>
          <Center flex={1}>
            <Image
              style={{width: 125, height: 60}}
              source={require('../../../assets/images/logos/littleband-logo.png')}
            />
          </Center>
        </Box>
        <Box flex={5}>
          {/* <ScrollView flex={1}> */}
          <FlatGrid
            itemDimension={120}
            data={menus}
            spacing={10}
            renderItem={({item}) => (
              <View flex={1}>
                <AspectRatio ratio={{base: 1 / 1}}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(String(item.link))}>
                    <Box flex={1}>
                      <Image
                        borderRadius={8}
                        flex={1}
                        img={item.img}
                        title={item.title}
                        resizeMode="contain"
                        link={item.link}
                        style={{aspectRatio: 1}}
                        source={item.img}
                      />
                    </Box>
                  </TouchableOpacity>
                </AspectRatio>
              </View>
            )}
          />
          {/* </ScrollView> */}
        </Box>
      </VStack>
    </VStack>
  );
}
export default Gallery;
