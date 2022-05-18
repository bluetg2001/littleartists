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
} from 'native-base';
// react-native components
import {Image, TouchableOpacity} from 'react-native';
// react-navigation
import {useFocusEffect} from '@react-navigation/native';
// graphQL stuff
import {PARENT_LOGIN} from '../../graphQL/parents';
import {useMutation} from '@apollo/client';
// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({navigation, hiddenTab, setHiddenTab}) {
  // state
  const [resend, setResend] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');
  const [authKey, setAuthKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // useMutation
  const [parentLogin, {data, loading, error}] = useMutation(PARENT_LOGIN);

  // Async Storage
  const storeData = async (_phoneNum, _authKey) => {
    try {
      const jsonValue = JSON.stringify({phone: _phoneNum, authKey: _authKey});
      await AsyncStorage.setItem('userData', jsonValue);
    } catch (e) {
      console.log('로컬 스토로지 저장 실패.');
    }
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
              storeData(phoneNum, authKey);
              navigation.navigate('Main', {
                parentId: parent.id,
                hakwonId: parent.hakwonId,
              });
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
    [authKey, errorMessage, navigation, parentLogin, phoneNum],
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
              width: 162,
              height: 78,
              resizeMode: 'contain',
            }}
            source={require('../../../assets/images/btns/login-btn.png')}
          />
        </TouchableOpacity>
      );
    }
  };

  return (
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
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'center'}
          alignItems={'center'}>
          <Text fontSize={'md'} color="primary.500" fontWeight={'bold'}>
            국내 최초{' '}
          </Text>
          <Text color="dark.50">두뇌밸런스 음악교육 프랜차이즈</Text>
        </Box>

        <Image
          flex={5}
          resizeMode="contain"
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
                  onPress={() => setResend(true)}
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
          <Text textAlign="center" color="error.500" my={4}>
            {errorMessage}
          </Text>
          <LoginButton />
        </VStack>
      </Box>
    </View>
  );
}

export default Login;
