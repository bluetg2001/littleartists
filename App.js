/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
// native-base
import {
  Box,
  NativeBaseProvider,
  View,
  Center,
  Text,
  VStack,
  FormControl,
  Input,
} from 'native-base';
import theme from './src/utils/theme';
// react-native
import {Image} from 'react-native';

const App = () => {
  const [resend, setResend] = useState(false);

  // 추후 유효성 검사 로직 추가
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

  return (
    <NativeBaseProvider theme={theme}>
      <View flex={1} bgColor="gray.100">
        <Box flex={1} bgColor="amber.500">
          <Center flex={1} justifyContent="flex-end">
            <Image
              // eslint-disable-next-line react-native/no-inline-styles
              style={{width: 125, height: 60}}
              source={require('./assets/images/logos/littleband-logo.png')}
            />
          </Center>
        </Box>
        <Center flex={2} bgColor="blueGray.300">
          <Box
            marginTop={8}
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}>
            <Text fontSize={'md'} color="primary.500" fontWeight={'bold'}>
              국내 최초{' '}
            </Text>
            <Text>두뇌밸런스 음악교육 프랜차이즈</Text>
          </Box>

          <Image
            flex={5}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{aspectRatio: 1, resizeMode: 'contain'}}
            source={require('./assets/images/characters/with-piano.png')}
          />
        </Center>
        <Center flex={1} bgColor="primary.50">
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
        <Box flex={2} bgColor="amber.300">
          <Center>
            <Image
              // flex={5}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{width: '40%', resizeMode: 'contain'}}
              source={require('./assets/images/btns/login-btn.png')}
            />
          </Center>
        </Box>
      </View>
    </NativeBaseProvider>
  );
};
export default App;
