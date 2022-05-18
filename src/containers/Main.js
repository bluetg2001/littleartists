/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect} from 'react';
// rnfirebase
import messaging from '@react-native-firebase/messaging';
// react-native components
import {Image, StyleSheet, FlatList} from 'react-native';
// native-base
import {Box, Center, View, Button} from 'native-base';
// react-navigation
import {useFocusEffect} from '@react-navigation/native';
// graqlQL sutff
import {useMutation} from '@apollo/client';
import {SAVE_TOKEN_TO_DATABASE} from '../graphQL/parents';
// components
import MenuBox from '../components/main/MenuBox';
// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

function Main({
  navigation,
  hiddenTab,
  setHiddenTab,
  bottomTabIndex,
  setBottomTabIndex,
  route,
}) {
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

  const parentId = route.params.parentId;
  const hakwonId = route.params.hakwonId;

  const [saveTokenToDatabase] = useMutation(SAVE_TOKEN_TO_DATABASE);

  const removeUserDataAndLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('parentId');
      await AsyncStorage.removeItem('hakwonId');
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
    // 스토로지 저장
    // saveParentData(parentId);
    // getParentData();
    // 푸시 관련
    messaging()
      .getToken()
      .then(token => {
        // mutation
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
              parentId={parentId}
              hakwonId={hakwonId}
            />
          )}
          keyExtractor={(item, index) => index}
          numColumns={2}
        />
      </Box>
    </View>
  );
}

export default Main;
