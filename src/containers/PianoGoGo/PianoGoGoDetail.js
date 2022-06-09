/* eslint-disable react-native/no-inline-styles */
import React from 'react';
// native-base
import {
  VStack,
  HStack,
  ZStack,
  ScrollView,
  Text,
  Center,
  Divider,
  Progress,
} from 'native-base';
// react-native-components
import {Image} from 'react-native';
import {imagePath} from '../../components/pianogogo/imagePath';

function PianoGoGoDetail({route}) {
  const {
    profileCharacter,
    name,
    age,
    curriculumName,
    classroomName,
    weekday,
    sendDate,
    textLife,
    textLesson,
    textToParents,
    reportProgress,
  } = route.params;

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
                style={{
                  maxHeight: '40%',
                  aspectRatio: 1,
                  resizeMode: 'contain',
                }}
                source={imagePath[profileCharacter].uri}
              />
              <HStack alignItems="center" mt={1}>
                <Text fontSize="2xl" color="dark.100">
                  {name}
                </Text>
              </HStack>
              <Text fontSize="md" color="#bab8b8">
                {age}세
              </Text>
              <HStack mt={4} space={3}>
                <VStack>
                  <Text textAlign="center" fontSize="xs" color="#bab8b8">
                    커리큘럼
                  </Text>
                  <Text color="dark.100" fontSize="sm" textAlign="center">
                    {curriculumName}
                  </Text>
                </VStack>
                <Divider orientation="vertical" />
                <VStack>
                  <Text fontSize="xs" color="#bab8b8" textAlign="center">
                    소속반
                  </Text>
                  <Text color="dark.100" fontSize="sm" textAlign="center">
                    {classroomName}
                  </Text>
                </VStack>
                <Divider orientation="vertical" />
                <VStack>
                  <Text fontSize="xs" color="#bab8b8" textAlign="center">
                    등원일
                  </Text>
                  <Text textAlign="center" color="dark.100" fontSize="sm">
                    {[...weekday].join(',')}
                  </Text>
                </VStack>
              </HStack>
            </Center>
          </VStack>
        </ZStack>
        <VStack mt={320} width="80%">
          <Text
            ml={2}
            textAlign="left"
            color="primary.500"
            fontWeight="semibold"
            fontSize="md">
            리포트 발송일
          </Text>
          <HStack
            mt={1}
            px={2}
            py={1}
            borderStyle="solid"
            borderWidth="1"
            borderRadius="sm"
            style={{
              borderColor: '#d5d8d9',
            }}>
            <Text color="dark.100">{sendDate}</Text>
          </HStack>
        </VStack>
      </VStack>
      {/*  container2 */}
      <VStack
        // py={8}
        mt="10"
        alignItems="center"
        style={{backgroundColor: '#f0faff'}}>
        <VStack width="80%" flex={1}>
          {reportProgress.map((value, key) => (
            <VStack style={{position: 'relative'}} key={key} my={4}>
              <Text color="dark.100">{value.bookName}</Text>
              <Progress
                mt={2}
                bg="#dbdbdb"
                _filledTrack={{
                  // bg: '#4986fc',
                  bg:
                    (key + 1) % 3 === 1
                      ? '#4986fc'
                      : (key + 1) % 3 === 2
                      ? '#599513'
                      : '#ab3efd',
                }}
                value={(value.chapterNumber / value.numOfChapters) * 100}
              />
              <Text color="dark.100" mt={3} textAlign="right">
                {value.chapterNumber}/{value.numOfChapters}
              </Text>
              <Image
                resizeMode="stretch"
                style={{
                  width: 25,
                  height: 'auto',
                  aspectRatio: 1,
                  position: 'absolute',
                  top: '28%',
                  left: (value.chapterNumber / value.numOfChapters) * 100,
                }}
                source={
                  (key + 1) % 3 === 1
                    ? require('../../../assets/images/icons/note-blue.png')
                    : (key + 1) % 3 === 2
                    ? require('../../../assets/images/icons/note-green.png')
                    : require('../../../assets/images/icons/note-purple.png')
                }
              />
            </VStack>
          ))}
        </VStack>
      </VStack>
      {/* container3 */}
      <VStack bgColor="white" alignItems="center">
        <VStack width="80%" py="8">
          <VStack>
            <Text color="primary.500" fontWeight="semibold" fontSize="md">
              학원 생활
            </Text>
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
              <Text color="dark.100" fontSize="sm">
                {textLife}
              </Text>
            </HStack>
          </VStack>
          <VStack mt={5}>
            <Text color="primary.500" fontWeight="semibold" fontSize="md">
              학습 평가
            </Text>
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
              <Text color="dark.100" fontSize="sm">
                {textLesson}
              </Text>
            </HStack>
          </VStack>
          <VStack mt={5}>
            <Text color="primary.500" fontWeight="semibold" fontSize="md">
              부모님께
            </Text>
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
              <Text color="dark.100" fontSize="sm">
                {textToParents}
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
}

export default PianoGoGoDetail;
