/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
// react-native components
import {Image, TouchableOpacity} from 'react-native';
// native-base
import {Box, Center, View, Text, AspectRatio} from 'native-base';
// grid system
import {FlatGrid} from 'react-native-super-grid';

function Main({navigation}) {
  const [menus, setMenus] = useState([
    {
      title: '출석',
      img: require('../../assets/images/logos/main-attendance.png'),
      link: 'Attendance',
    },
    {
      title: '공지사항',
      img: require('../../assets/images/logos/main-notice.png'),
    },
    {
      title: 'e피아노고고',
      img: require('../../assets/images/logos/main-littleband-logo.png'),
    },
    {
      title: '갤러리',
      img: require('../../assets/images/logos/main-gallery.png'),
    },
    {
      title: '소개',
      img: require('../../assets/images/logos/main-pianogogo.png'),
    },
    {
      title: '교육비',
      img: require('../../assets/images/logos/main-intuition.png'),
    },
  ]);

  const MenuBox = props => {
    return (
      <AspectRatio ratio={{base: 1 / 1}}>
        <TouchableOpacity onPress={() => navigation.navigate('Attendance')}>
          <Box
            flex={1}
            rounded="3xl"
            bgColor="#ffffff"
            shadowColor="#000"
            shadowOpacity={0.35}
            shadowRadius={10}
            elevation={4}
            style={{
              color: ('rgba(84,73,120,1)', 'rgba(28,20,56,1)'),
              backgroundColor: '#ffffff',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}>
            <Center flex={2} display="flex" flexDirection="row">
              <Center flex={1}>
                <Center flex={1}>
                  <Image
                    resizeMethod="contain"
                    style={{aspectRatio: 0.4, resizeMode: 'contain'}}
                    source={props.img}
                  />
                </Center>
              </Center>
            </Center>
            <Center flex={1}>
              <Text color="dark.50">{props.title}</Text>
            </Center>
          </Box>
        </TouchableOpacity>
      </AspectRatio>
    );
  };

  return (
    <View flex={1} bgColor="gray.100">
      <Box flex={1}>
        <Center flex={1}>
          <Image
            style={{width: 125, height: 60}}
            source={require('../../assets/images/logos/littleband-logo.png')}
          />
        </Center>
      </Box>
      <Box flex={5}>
        <FlatGrid
          itemDimension={130}
          data={menus}
          spacing={32}
          style={{flex: 1}}
          renderItem={({item}) => <MenuBox img={item.img} title={item.title} />}
        />
      </Box>
    </View>
  );
}
export default Main;
