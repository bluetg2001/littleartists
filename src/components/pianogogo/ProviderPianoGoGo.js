import React from 'react';
// native-base
import {
  View,
  Box,
  Text,
  VStack,
  HStack,
  ScrollView,
  ChevronRightIcon,
  Divider,
} from 'native-base';
// react-native components
import {TouchableOpacity} from 'react-native';
// graphQL stuff
import {useQuery} from '@apollo/client';
import {GET_STUDENT_REPORTS_FOR_PARENT} from '../../graphQL/reports';
// components
import Loading from '../Loading';
// navigation
import {useNavigation} from '@react-navigation/native';

function ProviderPianoGoGo(props) {
  const navigation = useNavigation();
  const {parentId, hakwonId} = props;

  const {loading, error, data} = useQuery(GET_STUDENT_REPORTS_FOR_PARENT, {
    variables: {
      parentId: parentId,
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View flex={1}>
        <Text>error...</Text>
      </View>
    );
  }

  const LinkToDetailPage = props => {
    const {
      name,
      age,
      classroomName,
      curriculumName,
      weekday,
      sendDate,
      textLife,
      textLesson,
      textToParents,
      reportProgress,
      profileCharacter,
    } = props;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PianoGoGoDetail', {
            name: name,
            age: age,
            sendDate: sendDate,
            classroomName: classroomName,
            curriculumName: curriculumName,
            weekday: weekday,
            textLife: textLife,
            textLesson: textLesson,
            textToParents: textToParents,
            reportProgress: reportProgress,
            profileCharacter: profileCharacter,
          })
        }>
        <Box>
          <HStack justifyContent="space-between" alignItems="center" mt={36}>
            <Text fontSize="md" color="dark.50" mr={4}>
              {sendDate} {name} 학습 리포트
            </Text>
            <ChevronRightIcon />
          </HStack>
        </Box>
      </TouchableOpacity>
    );
  };

  if (data) {
    return (
      <ScrollView>
        <VStack alignItems="center" bgColor="white">
          <VStack width="90%">
            <VStack w="110">
              <Text
                mt={8}
                fontSize="lg"
                fontWeight="bold"
                color="primary.500"
                ml="2"
                mb="2">
                학습 리포트
              </Text>
              <Divider bg="primary.500" thickness="1.5" />
            </VStack>
            <VStack mt={4}>
              {data.studentReportsForParent.map((value, key) => (
                <LinkToDetailPage
                  key={key}
                  profileCharacter={value.profileCharacter}
                  sendDate={value.sendDate}
                  name={value.name}
                  age={value.age}
                  curriculumName={value.curriculumName}
                  classroomName={value.classroomName}
                  weekday={value.weekday}
                  textLife={value.textLife}
                  textLesson={value.textLesson}
                  textToParents={value.textToParents}
                  reportProgress={value.reportProgress}
                />
              ))}
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    );
  }
}

export default ProviderPianoGoGo;
