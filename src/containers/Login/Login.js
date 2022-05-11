/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
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

function Login({navigation, hiddenTab, setHiddenTab}) {
  // state
  const [resend, setResend] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');
  const [authKey, setAuthKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // useMutation
  const [parentLogin, {data, loading, error}] = useMutation(PARENT_LOGIN);

  const checkLogInfo = (_phoneNum, _authKey) => {
    setErrorMessage('');
    parentLogin({
      variables: {
        phone: _phoneNum,
        authKey: _authKey,
      },
    })
      .then(res => {
        console.log(res.data);
        if (res.data) {
          const {success, message, parent} = res.data.parentLogin;
          if (success) {
            console.log(parent.id, '테스트');
            navigation.navigate('Main', {
              parentId: parent.id,
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
  };

  useFocusEffect(
    useCallback(() => {
      setHiddenTab(true);
    }, [setHiddenTab]),
  );

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
          style={{aspectRatio: 1, resizeMode: 'contain'}}
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
