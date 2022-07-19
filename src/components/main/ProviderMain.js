/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect} from 'react';
// rnfirebase
import messaging from '@react-native-firebase/messaging';
// react-native components
import {Image, FlatList} from 'react-native';
// native-base
import {Box, Center, Button, VStack} from 'native-base';
// react-navigation
import {useNavigation} from '@react-navigation/native';
// graqlQL sutff
import {useMutation} from '@apollo/client';
import {SAVE_TOKEN_TO_DATABASE} from '../../graphQL/parents';
// components
import MenuBox from './MenuBox';
import ConsentModal from './ConsentAlert';
// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProviderMain(props) {
  const {isConsent} = props;

  const [menus, setMenus] = useState([
    {
      index: 1,
      title: '출석',
      img: require('../../../assets/images/logos/main-attendance.png'),
      link: 'Attendance',
    },
    {
      index: 2,
      title: '공지사항',
      img: require('../../../assets/images/logos/main-notice.png'),
      link: 'Notice',
    },
    {
      index: 6,
      title: 'e피아노고고',
      img: require('../../../assets/images/logos/main-pianogogo.png'),
      link: 'PianoGoGo',
    },
    {
      index: 5,
      title: '갤러리',
      img: require('../../../assets/images/logos/main-gallery.png'),
      link: 'Gallery',
    },
    {
      index: 4,
      title: '소개',
      img: require('../../../assets/images/logos/littleband-border-logo.png'),
      link: 'BrandIntro',
    },
    {
      index: 3,
      title: '교육비',
      img: require('../../../assets/images/logos/main-intuition.png'),
      link: 'Intuition',
    },
  ]);

  const navigation = useNavigation();

  //   const isConsent = props;
  const [parentId, setParentId] = useState(null);
  const [hakwonId, setHakwonId] = useState(null);

  const [saveTokenToDatabase] = useMutation(SAVE_TOKEN_TO_DATABASE, {
    onError: err => {
      console.log(err);
    },
  });

  // functions
  const removeUserDataAndLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('hakwonId');
      await AsyncStorage.removeItem('parentId');
      await AsyncStorage.removeItem('isConsent');
      await AsyncStorage.removeItem('isMarketing');
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
    <VStack flex={1} bgColor="gray.100" alignItems="center">
      <ConsentModal isConsent={isConsent} parentId={parentId} />
      <Box flex={1} width="90%" safeArea>
        <Center flex={1}>
          <Image
            resizeMode="contain"
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
      <VStack flex={5} width="95%" p={2}>
        <FlatList
          data={menus}
          itemDimension={120}
          renderItem={({item}) => (
            <MenuBox
              index={item.index}
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
      </VStack>
    </VStack>
  );
}

export default ProviderMain;
