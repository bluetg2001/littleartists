import React, {useState} from 'react';
// react-native components
import {Image, Dimensions} from 'react-native';
// native-base
import {
  NativeBaseProvider,
  Box,
  Center,
  View,
  Text,
  AspectRatio,
} from 'native-base';
import theme from './src/utils/theme';
// grid system
import {FlatGrid} from 'react-native-super-grid';

function Main() {
  const [menus, setMenus] = useState([
    {title: '출석', img: require('./assets/images/logos/main-attendance.png')},
    {title: '공지사항', img: require('./assets/images/logos/main-notice.png')},
    {
      title: 'e피아노고고',
      img: require('./assets/images/logos/main-pianogogo.png'),
    },
    {title: '갤러리', img: require('./assets/images/logos/main-gallery.png')},
    {title: '소개', img: require('./assets/images/logos/littleband-logo.png')},
    {title: '교육비', img: require('./assets/images/logos/main-intuition.png')},
  ]);

  const MenuBox = props => {
    return (
      <AspectRatio ratio={{base: 1 / 1}}>
        <Box flex={1} rounded="xl" bgColor="#ffffff">
          <Center flex={1}>
            <Image
              // resizeMethod="contain"
              // eslint-disable-next-line react-native/no-inline-styles
              style={{aspectRatio: 0.35, resizeMode: 'contain'}}
              source={props.img}
            />
            <Text>{props.title}</Text>
          </Center>
        </Box>
      </AspectRatio>
    );
  };

  return (
    <View flex={1} bgColor="gray.100">
      {/* <Center> */}
      <Box bgColor="pink.500" flex={1}>
        <Center flex={1}>
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{width: 125, height: 60}}
            source={require('./assets/images/logos/littleband-logo.png')}
          />
        </Center>
      </Box>
      <Box flex={3} bgColor="amber.400">
        <FlatGrid
          itemDimension={130}
          data={menus}
          spacing={32}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{flex: 1}}
          renderItem={({item}) => <MenuBox img={item.img} title={item.title} />}
        />
      </Box>
      {/* </Center> */}
    </View>
  );
}
export default Main;
