import React from 'react';
// native-base
import {
  Text,
  Box,
  HStack,
  ScrollView,
  ChevronRightIcon,
  View,
  VStack,
} from 'native-base';
// react-native components
import {TouchableOpacity} from 'react-native';
// graphql stuff
import {HAKWON_BOARDS} from '../../graphQL/boards';
import {useQuery} from '@apollo/client';
// components
import Loading from '../../components/Loading';
import {useNavigation} from '@react-navigation/native';

function BrandNotice(props) {
  const {hakwonId} = props;
  const navigation = useNavigation();

  const {loading, error, data} = useQuery(HAKWON_BOARDS, {
    variables: {
      id: hakwonId,
      type: 'hakwon',
    },
  });

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
        <Text>Error...</Text>
      </View>
    );
  }

  if (data) {
    const boardLists = data.hakwonBoards.filter(
      value => value.openToApp === true,
    );

    return (
      <>
        {boardLists.length === 0 ? (
          <VStack flex={1} mt="36" alignItems="center">
            <Text>아직 게시물이 게시되지 않았습니다.</Text>
          </VStack>
        ) : (
          <ScrollView>
            <Box mt={36} />
            {boardLists.map((value, key) => (
              <LinkToDetailPage
                key={key}
                title={value.title}
                contents={value.contents}
              />
            ))}
          </ScrollView>
        )}
      </>
    );
  }
}

export default BrandNotice;
