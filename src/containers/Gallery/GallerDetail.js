/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
// native-base
import {
  Center,
  VStack,
  Box,
  AspectRatio,
  HStack,
  View,
  Text,
  AlertDialog,
  useToast,
  Alert,
} from 'native-base';
// react-native components
import {Image, Dimensions, TouchableOpacity, Platform} from 'react-native';
// carousel
import Carousel from 'react-native-snap-carousel';
// graphql stuff
import {GET_HAKWON_GALLERIES} from '../../graphQL/galleries';
import {useQuery} from '@apollo/client';
// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// RNFetchBlob
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';
// icons
import Icon from 'react-native-vector-icons/AntDesign';

function GallerDetail({route}) {
  const imageIndex = route.params.imageIndex;
  const [hakwonId, setHakwonId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toast = useToast();

  const [howToUseIsOpen, setHowToUseIsOpen] = useState(false);
  const cancelRef = useRef(null);

  const {loading, error, data} = useQuery(GET_HAKWON_GALLERIES, {
    variables: {
      hakwonId: hakwonId,
    },
  });

  const onClose = () => setHowToUseIsOpen(false);

  const getHakwonId = async () => {
    try {
      setHakwonId(await AsyncStorage.getItem('hakwonId'));
    } catch (e) {
      console.log('read error');
    }
  };

  const imageDownload = url => {
    if (Platform.OS === 'android') {
      RNFetchBlob.config({
        addAndroidDownloads: {
          useDownloadManager: true, // <-- this is the only thing required
          // Optional, override notification setting (default to true)
          notification: true,
          // Optional, but recommended since android DownloadManager will fail when
          // the url does not contains a file extension, by default the mime type will be text/plain
          // mime: 'text/plain',
          description: 'File downloaded by download manager.',
        },
      })
        .fetch(
          'GET',
          url,
          // 'https://www.howtogeek.com/wp-content/uploads/2021/10/1-red-apple.png?trim=1,1&bg-color=000&pad=1,1',
        )
        .then(resp => {
          // the path of downloaded file
          resp.path();
        });
    } else {
      // iOS
      CameraRoll.save(
        url,
        // 'https://www.howtogeek.com/wp-content/uploads/2021/10/1-red-apple.png?trim=1,1&bg-color=000&pad=1,1',
      );
    }
  };

  useEffect(() => {
    getHakwonId();
  }, []);

  if (loading) {
    return (
      <View flex={1}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View flex={1}>
        <Text>error...</Text>
      </View>
    );
  }

  const RenderItem = ({item, index}) => {
    console.log(item, 'hi');
    return (
      <AspectRatio
        ratio={{base: 1 / 1}}
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 50,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            imageDownload(item.url);
            toast.show({
              render: () => {
                return (
                  <Box bg="primary.500" px="2" py="1" rounded="sm" mb={5}>
                    <Text color="white">사진 저장 완료!</Text>
                  </Box>
                );
              },
            });
          }}>
          <Box flex={1}>
            <Image
              borderRadius={20}
              flex={1}
              style={{aspectRatio: 1 / 1}}
              source={{uri: item.url}}
            />
          </Box>
        </TouchableOpacity>
      </AspectRatio>
    );
  };

  const AlertFromQuestion = () => {
    return (
      <AlertDialog
        shadow={9}
        leastDestructiveRef={cancelRef}
        isOpen={howToUseIsOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton
            onPress={() => setHowToUseIsOpen(!howToUseIsOpen)}
          />
          <AlertDialog.Header>갤러리 사용법</AlertDialog.Header>
          <AlertDialog.Body>
            사진을 좌우로 밀어 여러 사진을 감상하고, 원하는 사진을 터치하여
            저장해보세요.
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>
    );
  };

  if (data) {
    return (
      <VStack flex={1} alignItems="center" bgColor="white">
        <VStack flex={1} width="90%">
          <Box flex={1}>
            <Center flex={1}>
              <Image
                style={{width: 125, height: 60}}
                source={require('../../../assets/images/logos/littleband-logo.png')}
              />
            </Center>
            {/* <Icon
                    {...triggerProps}
                    name="questioncircleo"
                    size={24}
                    color="#009fe8"
                    style={{textAlign: 'right'}}
                  /> */}
            <TouchableOpacity
              onPress={() => {
                setHowToUseIsOpen(!howToUseIsOpen);
              }}>
              <Icon
                name="questioncircleo"
                size={24}
                color="#009fe8"
                style={{textAlign: 'right'}}
              />
            </TouchableOpacity>
            <AlertFromQuestion />

            <HStack flex={5} alignItems="center">
              <Carousel
                firstItem={imageIndex === null ? 0 : imageIndex}
                layout={'default'}
                data={data.hakwonGalleries}
                sliderWidth={Dimensions.get('screen').width * 0.9}
                itemWidth={Dimensions.get('screen').width * 0.7}
                renderItem={RenderItem}
                useScrollView
                activeSlideAlignment="center"
              />
            </HStack>
          </Box>
        </VStack>
      </VStack>
    );
  }
}

export default GallerDetail;
