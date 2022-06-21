import React, {useState, useEffect} from 'react';
// native-base
import {
  View,
  Center,
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
// graphql stuff
import {HAKWON_BOARDS} from '../../graphQL/boards';
import {useQuery} from '@apollo/client';
// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// components
import Loading from '../../components/Loading';
import Logo from '../../components/Logo';

function Notice({navigation}) {
  const [parentId, setParentId] = useState(null);
  const [hakwonId, setHakwonId] = useState(null);

  const {loading, error, data} = useQuery(HAKWON_BOARDS, {
    variables: {
      id: hakwonId,
      // type을 학원으로 고정
      type: 'hakwon',
    },
  });

  const getParentIdAndHakwonId = async () => {
    try {
      setParentId(await AsyncStorage.getItem('parentId'));
      setHakwonId(await AsyncStorage.getItem('hakwonId'));
    } catch (e) {
      console.log('read error');
    }
  };

  useEffect(() => {
    getParentIdAndHakwonId();
  }, []);

  const LinkToDetailPage = props => {
    const {title, contents} = props;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('NoticeDetail', {
            title: title,
            contents: contents,
          })
        }>
        <Box>
          <HStack justifyContent="space-between" alignItems="center" mt={36}>
            <Text fontSize="md" color="dark.50" mr={4}>
              {title}
            </Text>
            <ChevronRightIcon />
          </HStack>
          {/* <Text color="dark.100" fontSize="xs">
            3시간 전
          </Text> */}
        </Box>
      </TouchableOpacity>
    );
  };

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

  if (data) {
    return (
      <>
        {data.hakwonBoards.length === 0 ? (
          <VStack flex={1} mt="36" alignItems="center">
            <Text>아직 게시물이 게시되지 않았습니다.</Text>
          </VStack>
        ) : (
          <ScrollView>
            <VStack alignItems="center" bgColor="white">
              <VStack width="90%">
                <Center>
                  <Logo />
                </Center>
                <VStack w="85">
                  <Text
                    mt={8}
                    fontSize="lg"
                    fontWeight="bold"
                    color="primary.500"
                    ml="2"
                    mb="2">
                    학원 소식
                  </Text>
                  <Divider bg="primary.500" thickness="1.5" />
                </VStack>
                <VStack mt={4}>
                  {data.hakwonBoards.map((value, key) => (
                    <LinkToDetailPage
                      key={key}
                      title={value.title}
                      contents={value.contents}
                    />
                  ))}
                </VStack>
              </VStack>
            </VStack>
          </ScrollView>
        )}
      </>
    );
  }
}
export default Notice;
