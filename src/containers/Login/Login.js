/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect} from 'react';
// native-base
import {
  Box,
  View,
  Center,
  Text,
  VStack,
  HStack,
  FormControl,
  Input,
  Spinner,
  Heading,
  Button,
} from 'native-base';
// native-base checkbox는 v3 버전 기준, 하자가 있음 -> react-native의 checkbox 사용
import CheckBox from '@react-native-community/checkbox';
// react-native components
import {
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// react-navigation
import {useFocusEffect} from '@react-navigation/native';
// graphQL stuff
import {PARENT_LOGIN, SEND_AUTHKEY} from '../../graphQL/parents';
import {useMutation} from '@apollo/client';
// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({navigation, hiddenTab, setHiddenTab}) {
  // state
  const [resend, setResend] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');
  const [authKey, setAuthKey] = useState('');
  const [sendAuthKeyInfoMessage, setSendAuthKeyInfoMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // useMutation
  const [parentLogin, {data, loading, error}] = useMutation(PARENT_LOGIN);
  const [sendAuthKey] = useMutation(SEND_AUTHKEY);

  // Async Storage
  const storeData = useCallback(
    async (_phoneNum, _authKey, _parentId, _hakwonId, _isConsent) => {
      try {
        // const jsonValue = JSON.stringify({phone: _phoneNum, authKey: _authKey});
        console.log(_isConsent, 'hihi');
        await AsyncStorage.setItem('phoneNum', _phoneNum);
        await AsyncStorage.setItem('authKey', _authKey);
        await AsyncStorage.setItem('parentId', _parentId);
        await AsyncStorage.setItem('hakwonId', _hakwonId);

        // storage에는 null값은 받지 않아 string값 null을 저장시킴
        if (_isConsent === null) {
          await AsyncStorage.setItem('consent', 'null111');
        }
      } catch (e) {
        console.log('로컬 스토로지 저장 실패.');
      }
    },
    [],
  );

  const sendAuthKeyToParent = _phoneNum => {
    sendAuthKey({
      variables: {
        phoneNumber: _phoneNum,
      },
    }).then(res => {
      if (res.data) {
        const {success, message} = res.data.sendAuthKey;
        if (success) {
          setResend(true);
          setSendAuthKeyInfoMessage(message);
        } else {
          console.log(message);
          setSendAuthKeyInfoMessage(message);
        }
      } else {
        setSendAuthKeyInfoMessage('네트워크를 확인하세요.');
      }
    });
  };

  const getData = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        const viewValue = JSON.parse(value);
        // 휴대폰과 인증키 스토로지에 저장❗️
        setPhoneNum(viewValue.phone);
        setAuthKey(viewValue.authKey);
        checkLogInfo(phoneNum, authKey);
      } else {
        console.log('else로 빠졌습니다.');
      }
    } catch (e) {
      console.log('데이터 불러오는 것에 실패했습니다.');
    }
  }, [authKey, checkLogInfo, phoneNum]);

  // 로그인 정보 체크 후 Main 페이지 이동
  const checkLogInfo = useCallback(
    (_phoneNum, _authKey) => {
      setErrorMessage('');
      parentLogin({
        variables: {
          phone: _phoneNum,
          authKey: _authKey,
        },
      })
        .then(res => {
          if (res.data) {
            const {success, message, parent} = res.data.parentLogin;
            if (success) {
              storeData(
                phoneNum,
                authKey,
                parent.id,
                parent.hakwonId,
                parent.isConsent,
              );
              navigation.navigate('Main');
            } else {
              setErrorMessage('전화번호나 인증번호를 확인하세요.');
              console.log(errorMessage);
            }
          } else {
            setErrorMessage('네트워크를 확인하세요.');
          }
        })
        .catch(console.log);
    },
    [authKey, errorMessage, navigation, parentLogin, phoneNum, storeData],
  );

  useFocusEffect(
    useCallback(() => {
      setHiddenTab(true);
    }, [setHiddenTab]),
  );

  useEffect(() => {
    getData();
    return () => {};
  }, [getData, authKey, phoneNum]);

  const LoginButton = () => {
    if (loading) {
      return (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            로그인 중...
          </Heading>
        </HStack>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => checkLogInfo(phoneNum, authKey)}>
          <Image
            style={{
              aspectRatio: 178 / 62,
              maxHeight: '50%',
              resizeMode: 'contain',
            }}
            source={require('../../../assets/images/btns/login-btn.png')}
          />
        </TouchableOpacity>
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      flex={1}>
      <View flex={1} bgColor="gray.100">
        <Box flex={1}>
          <Center flex={1} justifyContent="flex-end">
            <Image
              style={{width: 125, height: 60}}
              source={require('../../..//assets/images/logos/littleband-logo.png')}
            />
          </Center>
        </Box>
        <Center flex={2}>
          <Box
            marginTop={8}
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center">
            <Text fontSize="md" color="primary.500" fontWeight="bold">
              국내 최초{' '}
            </Text>
            <Text color="dark.50">두뇌밸런스 음악교육 프랜차이즈</Text>
          </Box>

          <Image
            flex={5}
            style={{aspectRatio: 290 / 218}}
            source={require('../../../assets/images/characters/with-piano.png')}
          />
        </Center>
        <Center flex={1}>
          <VStack width="90%" mx="3" maxW="300px">
            <FormControl>
              <Input
                onChangeText={value => setPhoneNum(value)}
                marginBottom={3}
                placeholder="학부모 번호 (- 제외)"
                InputRightElement={
                  <Text
                    onPress={() => sendAuthKeyToParent(phoneNum)}
                    mr={2}
                    fontSize={'xs'}
                    color="primary.500">
                    {resend ? '인증번호 재전송' : '인증번호 전송'}
                  </Text>
                }
              />
              <FormControl.ErrorMessage
                _text={{
                  fontSize: 'xs',
                }}>
                Error Name
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl>
              <Input
                onChangeText={value => setAuthKey(value)}
                placeholder="인증번호"
              />
            </FormControl>
          </VStack>
        </Center>
        <Box flex={2}>
          <VStack flex={1} alignItems="center">
            <Text textAlign="center" color="error.500" my={2}>
              {errorMessage}
            </Text>
            <Text textAlign="center" color="success.500" my={2}>
              {sendAuthKeyInfoMessage}
            </Text>
            <LoginButton />
          </VStack>
        </Box>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Login;
