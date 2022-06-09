/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect} from 'react';
// rnfirebase
import messaging from '@react-native-firebase/messaging';
// react-native components
import {Image, FlatList} from 'react-native';
// native-base
import {Box, Center, View, Button} from 'native-base';
// react-navigation
import {useFocusEffect} from '@react-navigation/native';
// graqlQL sutff
import {useMutation} from '@apollo/client';
import {
  SAVE_TOKEN_TO_DATABASE,
  EDIT_PARENT,
  PARENT_LOGIN,
} from '../graphQL/parents';
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
      img: require('../../assets/images/logos/littleband-border-logo.png'),
      link: 'BrandIntro',
    },
    {
      index: 3,
      title: '교육비',
      img: require('../../assets/images/logos/main-intuition.png'),
      link: 'Intuition',
    },
  ]);

  const [parentId, setParentId] = useState(null);
  const [hakwonId, setHakwonId] = useState(null);

  const [saveTokenToDatabase] = useMutation(SAVE_TOKEN_TO_DATABASE);
  const [parentLogin, {data, loading, error}] = useMutation(PARENT_LOGIN);
  const [editParent] = useMutation(EDIT_PARENT);

  // functions
  const removeUserDataAndLogout = async () => {
    try {
      await AsyncStorage.removeItem('phoneNum');
      await AsyncStorage.removeItem('authKey');
      await AsyncStorage.removeItem('parentId');
      await AsyncStorage.removeItem('hakwonId');
      await AsyncStorage.removeItem('consent');
      navigation.navigate('Login');
    } catch (e) {
      console.log('로그아웃에 실패했습니다.');
    }
  };

  const getParentIdAndHakwonId = useCallback(async () => {
    try {
      setParentId(await AsyncStorage.getItem('parentId'));
      setHakwonId(await AsyncStorage.getItem('hakwonId'));
    } catch (e) {
      console.log('read error');
    }
  }, []);

  const checkConsentInfo = useCallback(async () => {
    // const isConsent = await AsyncStorage.getItem('isConsent');
    const isConsent = await AsyncStorage.getItem('consent');
    console.log(isConsent);
    if (isConsent === 'null') {
      parentLogin(
        {
          variables: {
            phone: await AsyncStorage.getItem('phoneNum'),
            authKey: await AsyncStorage.getItem('authKey'),
          },
        }.then(res => {
          if (res.data) {
            const {success, message} = res.data.parentLogin;
            console.log(message, 'hihi');
          } else {
            console.log('네트워크를 확인하세요.');
          }
        }),
      );
    }
  }, [parentLogin]);

  // useEffects

  useFocusEffect(
    useCallback(() => {
      setHiddenTab(true);
      return () => setHiddenTab(false);
    }, [setHiddenTab]),
  );

  useEffect(() => {
    // 스토로지 저장
    // saveParentData(parentId);
    getParentIdAndHakwonId();
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
      })
      .catch('messaging error');
    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase({
        variables: {
          parentId: parentId,
          token: token,
        },
      });
    });
  }, [getParentIdAndHakwonId, hakwonId, parentId, saveTokenToDatabase]);

  useEffect(() => {
    checkConsentInfo();
  }, [checkConsentInfo]);

  // useEffect(() => {
  //   // 동의 항목 수정

  //   if (isConsent !== undefined || null) {
  //     editParent({
  //       variables: {
  //         editParentId: parentId,
  //         isConsent: isConsent,
  //       },
  //     }).then(res => {
  //       if (res.data) {
  //         const {success, message} = res.data.editParent;
  //         if (success) {
  //           console.log(success, message, '수정 성공!');
  //         } else {
  //           console.log('동의 항목 수정에 실패하였습니다. DB를 확인해주세요.');
  //         }
  //       } else {
  //         console.log('네트워크를 확인하세요.');
  //       }
  //     });
  //   }
  // }, [editParent, isConsent, parentId]);

  return (
    <View flex={1} bgColor="gray.100" alignItems={'center'}>
      <Box flex={1} width="90%" safeArea>
        <Center flex={1}>
          <Image
            style={{width: 127, height: 62}}
            source={require('../../assets/images/logos/littleband-logo.png')}
          />

          <Button
            variant="outline"
            size="xs"
            position="absolute"
            right="0"
            onPress={() => {
              removeUserDataAndLogout();
            }}>
            로그아웃
          </Button>
        </Center>
      </Box>
      <Box flex={5}>
        <FlatList
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
