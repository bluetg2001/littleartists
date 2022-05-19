/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
// native-base
import {
  VStack,
  HStack,
  ZStack,
  ScrollView,
  Text,
  Center,
  Menu,
  Button,
  Icon,
} from 'native-base';
// react-native-components
import {Image} from 'react-native';
// icons

function PianoGoGo() {
  // state
  const [shouldOverlapWithTrigger, setShouldOverlapWithTrigger] =
    useState(false);
  const [position, setPosition] = useState('auto');

  const SelectStudent = () => {
    return (
      <Menu
        w="160"
        shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
        placement={position === 'auto' ? undefined : position}
        trigger={triggerProps => {
          return (
            <Button alignSelf="center" variant="solid" {...triggerProps}>
              Menu
            </Button>
          );
        }}>
        <Menu.Item>Arial</Menu.Item>
        <Menu.Item>Nunito Sans</Menu.Item>
        <Menu.Item>Roboto</Menu.Item>
      </Menu>
    );
  };

  return (
    <ScrollView flex={1} bgColor="white">
      <VStack flex={1} alignItems="center">
        <ZStack flex={1} alignItems="center">
          <Image
            resizeMode="stretch"
            style={{width: '100%', height: 'auto', aspectRatio: 474 / 282}}
            source={require('../../../assets/images/backgrounds/pianogogo-top-background.png')}
          />
          <VStack
            width="80%"
            aspectRatio={362 / 293}
            mt="8"
            bgColor="white"
            borderRadius="2xl"
            shadow="8">
            <Center>
              <Image
                style={{width: '30%', height: 'auto', aspectRatio: 1 / 1}}
                source={require('../../../assets/images/characters/tempoary-profile-icon.png')}
              />
              <HStack alignItems="center">
                <Text>김미영</Text>
                <SelectStudent />
                {/* <Icon as={Ionicons} name="home" /> */}
              </HStack>
            </Center>
          </VStack>
        </ZStack>
      </VStack>
    </ScrollView>
  );
}

export default PianoGoGo;
