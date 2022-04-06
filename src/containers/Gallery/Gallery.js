/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
// native-base
import {
  Center,
  Text,
  VStack,
  HStack,
  Box,
  ScrollView,
  AspectRatio,
} from 'native-base';
// react-native components
import {Image, TouchableOpacity} from 'react-native';
// grid system
import {FlatGrid} from 'react-native-super-grid';

function Gallery({navigation}) {
  const [menus, setMenus] = useState([
    {
      title: '출석',
      img: require('../../../assets/images/backgrounds/brand-intro-deco-background.png'),
      link: 'Attendance',
    },
    {
      title: '공지사항',
      img: require('../../../assets/images/backgrounds/brand-intro-deco-background.png'),
      link: 'Notice',
    },
    {
      title: 'e피아노고고',
      img: require('../../../assets/images/backgrounds/brand-intro-deco-background.png'),
      link: 'Attendance',
    },
    {
      title: '갤러리',
      img: require('../../../assets/images/backgrounds/brand-intro-deco-background.png'),
      link: 'Gallery',
    },
    {
      title: '소개',
      img: require('../../../assets/images/backgrounds/brand-intro-deco-background.png'),
      link: 'BrandIntro',
    },
    {
      title: '교육비',
      img: require('../../../assets/images/backgrounds/brand-intro-deco-background.png'),
      link: 'Intuition',
    },
  ]);

  return (
    <VStack flex={1} alignItems={'center'}>
      <VStack flex={1} width="90%" bgColor="amber.100">
        <Box flex={1}>
          <Center flex={1}>
            <Image
              style={{width: 125, height: 60}}
              source={require('../../../assets/images/logos/littleband-logo.png')}
            />
          </Center>
        </Box>
        <Box flex={5}>
          <ScrollView>
            <FlatGrid
              itemDimension={130}
              data={menus}
              spacing={32}
              style={{flex: 1}}
              renderItem={({item}) => (
                // <MenuBox img={item.img} title={item.title} link={item.link} />
                <AspectRatio ratio={{base: 1 / 1}}>
                  <Image
                    // img={item.img}
                    // title={item.title}
                    resizeMode="contain"
                    link={item.link}
                    style={{aspectRatio: 0.5, resizeMode: 'contain'}}
                    source={item.img}
                  />
                </AspectRatio>
              )}
            />
          </ScrollView>
        </Box>
      </VStack>
    </VStack>
  );
}
export default Gallery;
