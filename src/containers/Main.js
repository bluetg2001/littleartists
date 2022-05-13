/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect} from 'react';
// rnfirebase
import messaging from '@react-native-firebase/messaging';
// react-native components
import {Image, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
// native-base
import {
  Box,
  Center,
  View,
  Text,
  InfoIcon,
  Modal,
  Button,
  Avatar,
  HStack,
  VStack,
  Spacer,
} from 'native-base';
// react-navigation
import {useFocusEffect} from '@react-navigation/native';
// Alert Page - swipe func
import {SwipeListView} from 'react-native-swipe-list-view';
// graqlQL sutff
import {useMutation} from '@apollo/client';
import {SAVE_TOKEN_TO_DATABASE} from '../graphQL/parents';
// components
import MenuBox from '../components/main/MenuBox';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Main({
  navigation,
  hiddenTab,
  setHiddenTab,
  bottomTabIndex,
  setBottomTabIndex,
  route,
}) {
  const parentId = route.params.parentId;
  console.log(parentId);

  const [menus, setMenus] = useState([
    {
      index: 1,
      title: '출석',
      img: require('../../assets/images/logos/main-attendance.png'),
      link: 'Attendance',
    },
    {
      index: 2,
      title: '공지사항',
      img: require('../../assets/images/logos/main-notice.png'),
      link: 'Notice',
    },
    {
      title: 'e피아노고고',
      img: require('../../assets/images/logos/main-pianogogo.png'),
      link: 'PianoGoGo',
    },
    {
      index: 5,
      title: '갤러리',
      img: require('../../assets/images/logos/main-gallery.png'),
      link: 'Gallery',
    },
    {
      index: 4,
      title: '소개',
      img: require('../../assets/images/logos/main-littleband-logo.png'),
      link: 'BrandIntro',
    },
    {
      index: 3,
      title: '교육비',
      img: require('../../assets/images/logos/main-intuition.png'),
      link: 'Intuition',
    },
  ]);

  const [saveTokenToDatabase] = useMutation(SAVE_TOKEN_TO_DATABASE);

  const removeUserDataAndLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      navigation.navigate('Login');
    } catch (e) {
      console.log('로그아웃에 실패했습니다.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      setHiddenTab(true);
      return () => setHiddenTab(false);
    }, [setHiddenTab]),
  );

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        // mutation
        console.log(token, '토큰입니다');
        saveTokenToDatabase({
          variables: {
            parentId: parentId,
            token: token,
          },
        });
      });
    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase({
        variables: {
          parentId: parentId,
          token: token,
        },
      });
    });
  }, [parentId, saveTokenToDatabase]);

  return (
    <View flex={1} bgColor="gray.100" alignItems={'center'}>
      <Box flex={1} width="90%" safeArea>
        <Center flex={1}>
          <Image
            style={{width: 127, height: 62}}
            source={require('../../assets/images/logos/littleband-logo.png')}
          />
          <Box style={{position: 'absolute', right: 0}}>
            <Button
              onPress={() => {
                removeUserDataAndLogout();
              }}>
              로그아웃
            </Button>
            {/* <InfoIcon
              size="xl"
              color="primary.500"
              onPress={() => {
                handleSizeClick();
              }}
            /> */}
          </Box>
        </Center>
      </Box>
      <Box flex={5}>
        <FlatList
          scrollEnabled="false"
          data={menus}
          renderItem={({item}) => (
            <MenuBox
              bottomTabIndex={bottomTabIndex}
              setBottomTabIndex={setBottomTabIndex}
              navigation={navigation}
              img={item.img}
              title={item.title}
              link={item.link}
              index={item.index}
            />
          )}
          keyExtractor={(item, index) => index}
          numColumns={2}
        />
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
  },
  actionButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  deleteBtn: {
    backgroundColor: 'red',
    right: 0,
  },
});
export default Main;
