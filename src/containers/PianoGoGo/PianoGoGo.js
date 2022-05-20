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
  Divider,
  Progress,
} from 'native-base';
// react-native-components
import {Image, TouchableOpacity} from 'react-native';
// icons
import Icon from 'react-native-vector-icons/AntDesign';

function PianoGoGo() {
  // state
  const [shouldOverlapWithTrigger, setShouldOverlapWithTrigger] =
    useState(false);
  const [position, setPosition] = useState('auto');

  const SelectStudent = () => {
    return (
      <Menu
        shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
        placement={position === 'auto' ? undefined : position}
        trigger={triggerProps => {
          return (
            <TouchableOpacity {...triggerProps} style={{marginLeft: 10}}>
              <Icon name="caretdown" size={12} color="#009fe8" />
            </TouchableOpacity>
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
      {/*  container1 */}
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
            <Center flex={1}>
              <Image
                style={{width: '30%', height: 'auto', aspectRatio: 1 / 1}}
                source={require('../../../assets/images/characters/tempoary-profile-icon.png')}
              />
              <HStack alignItems="center" ml={4} mt={1}>
                <Text fontSize="2xl">김미영</Text>
                <SelectStudent />
              </HStack>
              <Text>9세</Text>
              <HStack mt={6} space={3}>
                <VStack>
                  <Text>커리큘럼</Text>
                  <Text>초등기초</Text>
                </VStack>
                <Divider orientation="vertical" />
                <VStack>
                  <Text>커리큘럼</Text>
                  <Text>초등기초</Text>
                </VStack>
                <Divider orientation="vertical" />
                <VStack>
                  <Text>커리큘럼</Text>
                  <Text>초등기초</Text>
                </VStack>
              </HStack>
            </Center>
          </VStack>
        </ZStack>
        <VStack mt={320} width="80%">
          <Text textAlign="left">리포트 발송일</Text>
          <HStack
            px={2}
            py={2}
            borderStyle="solid"
            borderWidth="1"
            borderRadius="sm"
            style={{
              borderColor: '#d5d8d9',
            }}>
            <Text>2022년 5월 2일 월요일</Text>
          </HStack>
        </VStack>
      </VStack>
      {/*  container2 */}
      <VStack
        py={8}
        flex={1}
        mt="10"
        alignItems="center"
        style={{backgroundColor: '#f0faff'}}>
        <VStack width="80%" flex={1} space={7}>
          <VStack>
            <Text>피아노고고</Text>
            <Progress
              mt={2}
              bg="coolGray.100"
              _filledTrack={{
                bg: 'lime.500',
              }}
              value={75}
            />
            <Text mt={3} textAlign="right">
              26/45
            </Text>
          </VStack>
          <VStack>
            <Text>피아노고고</Text>
            <Progress
              mt={2}
              bg="coolGray.100"
              _filledTrack={{
                bg: 'lime.500',
              }}
              value={75}
            />
            <Text mt={3} textAlign="right">
              26/45
            </Text>
          </VStack>
          <VStack>
            <Text>피아노고고</Text>
            <Progress
              mt={2}
              bg="coolGray.100"
              _filledTrack={{
                bg: 'lime.500',
              }}
              value={75}
            />
            <Text mt={3} textAlign="right">
              26/45
            </Text>
          </VStack>
        </VStack>
      </VStack>
      {/* container3 */}
      <VStack bgColor="white" alignItems="center">
        <VStack width="80%" py="8">
          <VStack>
            <Text>학원생활</Text>
            <HStack
              mt={1}
              px={2}
              pt={1}
              pb={5}
              borderStyle="solid"
              borderWidth="1"
              borderRadius="sm"
              style={{
                borderColor: '#d5d8d9',
              }}>
              <Text>여기에 내용을 적습니다</Text>
            </HStack>
          </VStack>
          <VStack mt={5}>
            <Text>학원생활</Text>
            <HStack
              mt={1}
              px={2}
              pt={1}
              pb={5}
              borderStyle="solid"
              borderWidth="1"
              borderRadius="sm"
              style={{
                borderColor: '#d5d8d9',
              }}>
              <Text>여기에 내용을 적습니다</Text>
            </HStack>
          </VStack>
          <VStack mt={5}>
            <Text>학원생활</Text>
            <HStack
              mt={1}
              px={2}
              pt={1}
              pb={5}
              borderStyle="solid"
              borderWidth="1"
              borderRadius="sm"
              style={{
                borderColor: '#d5d8d9',
              }}>
              <Text>여기에 내용을 적습니다</Text>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
}

export default PianoGoGo;
