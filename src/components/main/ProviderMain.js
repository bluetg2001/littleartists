/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect, useContext} from 'react';
// rnfirebase
import messaging from '@react-native-firebase/messaging';
// react-native components
import {Image, FlatList} from 'react-native';
// native-base
import {Box, Center, View, Button, Text} from 'native-base';
// react-navigation
import {useNavigation} from '@react-navigation/native';
// graqlQL sutff
import {useMutation} from '@apollo/client';
import {
  SAVE_TOKEN_TO_DATABASE,
  EDIT_PARENT,
  PARENT_LOGIN,
  //   props,
} from '../../graphQL/parents';
// components
import MenuBox from './MenuBox';

// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import context from '../../utils/context';

function ProviderMain({
  hiddenTab,
  setHiddenTab,
  bottomTabIndex,
  setBottomTabIndex,
  //   props,
}) {
  const [menus, setMenus] = useState([
    {
      title: '출석',
      img: require('../../../assets/images/logos/main-attendance.png'),
      link: 'Attendance',
    },
    {
      title: '공지사항',
      img: require('../../../assets/images/logos/main-notice.png'),
      link: 'Notice',
    },
    {
      title: 'e피아노고고',
      img: require('../../../assets/images/logos/main-pianogogo.png'),
      link: 'PianoGoGo',
    },
    {
      title: '갤러리',
      img: require('../../../assets/images/logos/main-gallery.png'),
      link: 'Gallery',
    },
    {
      title: '소개',
      img: require('../../../assets/images/logos/littleband-border-logo.png'),
      link: 'BrandIntro',
    },
    {
      title: '교육비',
      img: require('../../../assets/images/logos/main-intuition.png'),
      link: 'Intuition',
    },
  ]);

  const navigation = useNavigation();
  const stateContext = useContext(context);

  //   const isConsent = props;
  const [parentId, setParentId] = useState(null);
  const [hakwonId, setHakwonId] = useState(null);

  const [saveTokenToDatabase] = useMutation(SAVE_TOKEN_TO_DATABASE);

  // functions
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

  const getParentIdAndHakwonId = useCallback(async () => {
    try {
      setParentId(await AsyncStorage.getItem('parentId'));
      setHakwonId(await AsyncStorage.getItem('hakwonId'));
    } catch (e) {
      console.log('read error');
    }
  }, []);

  // useEffects

  //   useFocusEffect(
  //     useCallback(() => {
  //       setHiddenTab(true);
  //       return () => setHiddenTab(false);
  //     }, [setHiddenTab]),
  //   );

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

  return (
    <View flex={1} bgColor="gray.100" alignItems={'center'}>
      <Box flex={1} width="90%" safeArea>
        <Center flex={1}>
          <Image
            style={{width: 127, height: 62}}
            source={require('../../../assets/images/logos/littleband-logo.png')}
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
              img={item.img}
              title={item.title}
              link={item.link}
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

export default ProviderMain;
