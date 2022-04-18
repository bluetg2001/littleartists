/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
// react-native components
import {Image} from 'react-native';
// native-base
import {Box, Text, HStack, Center, Pressable} from 'native-base';
import {useNavigation} from '@react-navigation/native';

function BottomTabNavigation(props) {
  const {hiddenTab, bottomTabIndex, setBottomTabIndex} = props;
  // const [selected, setSelected] = useState();
  const navigation = useNavigation();

  const [menus, setMenus] = useState([
    {
      index: 1,
      title: '출석',
      img: require('../../assets/images/icons/tab-attendance.png'),
      clickedImg: require('../../assets/images/icons/tab-clicked-attendance.png'),
      link: 'Attendance',
    },
    {
      index: 2,
      title: '공지사항',
      img: require('../../assets/images/icons/tab-notice.png'),
      clickedImg: require('../../assets/images/icons/tab-clicked-notice.png'),
      link: 'Notice',
    },
    {
      index: 3,
      title: '교육비',
      img: require('../../assets/images/icons/tab-intuition.png'),
      clickedImg: require('../../assets/images/icons/tab-clicked-intuition.png'),
      link: 'Intuition',
    },
    {
      index: 4,
      title: '어린음악대',
      img: require('../../assets/images/icons/tab-littleband.png'),
      clickedImg: require('../../assets/images/icons/tab-clicked-littleband.png'),
      link: 'BrandIntro',
    },
    {
      index: 5,
      title: '갤러리',
      img: require('../../assets/images/icons/tab-gallery.png'),
      clickedImg: require('../../assets/images/icons/tab-clicked-gallery.png'),
      link: 'Gallery',
    },
  ]);

  const onClickNavigate = useCallback(
    (index, link) => {
      // setSelected(index);
      setBottomTabIndex(index);
      navigation.navigate(String(link));
    },
    [navigation, setBottomTabIndex],
  );

  const TabItem = props => {
    const {index, title, img, clickedImg, link} = props;

    return (
      <Pressable
        flex={1}
        onPress={() => {
          onClickNavigate(index, link);
        }}>
        <Center flex={1}>
          <Image
            flex={1}
            resizeMethod="contain"
            style={{aspectRatio: 1, resizeMode: 'contain'}}
            source={bottomTabIndex === index ? clickedImg : img}
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
    <Box bg="white" flex={1} width="100%" display={hiddenTab ? 'none' : 'flex'}>
      <HStack flex={1} safeAreaBottom paddingTop="4">
        {menus.map(menu => (
          <TabItem
            key={menu.index}
            index={menu.index}
            title={menu.title}
            img={menu.img}
            clickedImg={menu.clickedImg}
            link={menu.link}
          />
        ))}
      </HStack>
    </Box>
  );
}
export default BottomTabNavigation;
