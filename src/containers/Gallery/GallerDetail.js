/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
// native-base
import {
  Center,
  VStack,
  Box,
  AspectRatio,
  HStack,
  View,
  Text,
  Button,
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

function GallerDetail({route}) {
  const imageIndex = route.params.imageIndex;
  const [hakwonId, setHakwonId] = useState(null);

  const {loading, error, data} = useQuery(GET_HAKWON_GALLERIES, {
    variables: {
      hakwonId: hakwonId,
    },
  });

  const getHakwonId = async () => {
    try {
      setHakwonId(await AsyncStorage.getItem('hakwonId'));
    } catch (e) {
      console.log('read error');
    }
  };

  const imageDownload = () => {
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
          'https://www.howtogeek.com/wp-content/uploads/2021/10/1-red-apple.png?trim=1,1&bg-color=000&pad=1,1',
        )
        .then(resp => {
          // the path of downloaded file
          resp.path();
        });
    } else {
      // iOS
      CameraRoll.save(
        'https://www.howtogeek.com/wp-content/uploads/2021/10/1-red-apple.png?trim=1,1&bg-color=000&pad=1,1',
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
            imageDownload();
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

  if (data) {
    return (
      <VStack flex={1} alignItems="center" bgColor={'white'}>
        <VStack flex={1} width="90%">
          <Box flex={1}>
            <Center flex={1}>
              <Image
                style={{width: 125, height: 60}}
                source={require('../../../assets/images/logos/littleband-logo.png')}
              />
            </Center>
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
