/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useContext} from 'react';
// react-native components
import {Image} from 'react-native';
// native-base
import {Box, Text, HStack, Center, Pressable} from 'native-base';
// navigation
import {useNavigation} from '@react-navigation/native';
// context
import TabContext from '../utils/TabContext';

function BottomTabNavigation(props) {
  const navigation = useNavigation();
  const {TabIndex, setTabIndex} = useContext(TabContext);

  const [menus, setMenus] = useState([
    {
      index: 1,
      aspectRatio: 1,
      title: '출석',
      img: require('../../assets/images/icons/tab-attendance.png'),
      clickedImg: require('../../assets/images/icons/tab-clicked-attendance.png'),
      link: 'Attendance',
    },
    {
      index: 2,
      aspectRatio: 1,
      title: '공지사항',
      img: require('../../assets/images/icons/tab-notice.png'),
      clickedImg: require('../../assets/images/icons/tab-clicked-notice.png'),
      link: 'Notice',
    },
    {
      index: 3,
      aspectRatio: 1,
      title: '교육비',
      img: require('../../assets/images/icons/tab-intuition.png'),
      clickedImg: require('../../assets/images/icons/tab-clicked-intuition.png'),
      link: 'Intuition',
    },
    {
      index: 4,
      aspectRatio: 1.5,
      title: '어린화가들',
      img: require('../../assets/images/icons/tab-littleband.png'),
      clickedImg: require('../../assets/images/icons/tab-clicked-littleband.png'),
      link: 'BrandIntro',
    },
    {
      index: 5,
      aspectRatio: 1,
      title: '갤러리',
      img: require('../../assets/images/icons/tab-gallery.png'),
      clickedImg: require('../../assets/images/icons/tab-clicked-gallery.png'),
      link: 'Gallery',
    },
  ]);

  const onClickNavigate = useCallback(
    (index, link) => {
      setTabIndex(index);
      // setBottomTabIndex(index);
      navigation.navigate(String(link));
    },
    [navigation, setTabIndex],
  );

  const TabItem = props => {
    const {title, img, clickedImg, link, index, aspectRatio} = props;
    return (
      <Pressable
        flex={1}
        onPress={() => {
          onClickNavigate(index, link);
        }}>
        <Center flex={1}>
          <Image
            flex={1}
            style={{
              aspectRatio: aspectRatio,
            }}
            source={index === TabIndex ? clickedImg : img}
          />
          <Box flex={1} mt={2}>
            <Text color={'dark.100'} fontSize="12">
              {title}
            </Text>
          </Box>
        </Center>
      </Pressable>
    );
  };

  return (
    <Box bg="white" flex={1} width="100%">
      <HStack flex={1} safeAreaBottom paddingTop="4">
        {menus.map((menu, index) => (
          <TabItem
            key={index}
            index={menu.index}
            title={menu.title}
            img={menu.img}
            clickedImg={menu.clickedImg}
            link={menu.link}
            aspectRatio={menu.aspectRatio}
          />
        ))}
      </HStack>
    </Box>
  );
}
export default BottomTabNavigation;
