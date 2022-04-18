/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
// native-base
import {Box, View, Center, Text, VStack, FormControl, Input} from 'native-base';
// react-native components
import {Image, TouchableOpacity} from 'react-native';
// react-navigation
import {useFocusEffect} from '@react-navigation/native';

function Login({navigation, hiddenTab, setHiddenTab}) {
  // state
  const [resend, setResend] = useState(false);
  // const {hiddenTab, setHiddenTab} = props;

  // 유효성 검사 로직 추가
  // const validate = () => {
  //   if (formData.name === undefined) {
  //     setErrors({...errors, name: 'Name is required'});
  //     return false;
  //   } else if (formData.name.length < 3) {
  //     setErrors({...errors, name: 'Name is too short'});
  //     return false;
  //   }

  //   return true;
  // };

  useFocusEffect(
    useCallback(() => {
      setHiddenTab(true);
    }, [setHiddenTab]),
  );

  return (
    <View flex={1} bgColor="gray.100">
      {console.log(hiddenTab)}
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
            <Input placeholder="인증번호" />
          </FormControl>
        </VStack>
      </Center>
      <Box flex={2}>
        <Center>
          <TouchableOpacity
            style={{width: '40%'}}
            onPress={() => navigation.navigate('Main')}>
            <Image
              style={{width: '100%', resizeMode: 'contain'}}
              source={require('../../../assets/images/btns/login-btn.png')}
            />
          </TouchableOpacity>
        </Center>
      </Box>
    </View>
  );
}

export default Login;
