/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
// native-base
import {Center, VStack, View, Box, AspectRatio, Text} from 'native-base';
// react-native components
import {Image, TouchableOpacity} from 'react-native';
// grid system
import {FlatGrid} from 'react-native-super-grid';
// graphql stuff
import {GET_HAKWON_GALLERIES} from '../../graphQL/galleries';
import {useQuery} from '@apollo/client';
// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/Loading';

function Gallery({navigation}) {
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

  const linkToGalleryDetail = _url => {
    navigation.navigate('GalleryDetail', {
      imageIndex: data.hakwonGalleries.findIndex(obj => obj.url === _url),
    });
  };

  useEffect(() => {
    getHakwonId();
  }, []);

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
      <VStack flex={1} alignItems={'center'}>
        <VStack flex={1} width="90%">
          <Box flex={1}>
            <Center flex={1}>
              <Image
                style={{width: 125, height: 60}}
                source={require('../../../assets/images/logos/littleband-logo.png')}
              />
            </Center>
          </Box>
          <Box flex={5}>
            <FlatGrid
              itemDimension={120}
              data={data.hakwonGalleries}
              spacing={10}
              renderItem={({item}) => (
                <View flex={1}>
                  <AspectRatio ratio={{base: 1 / 1}}>
                    <TouchableOpacity
                      onPress={() => linkToGalleryDetail(item.url)}>
                      <Box flex={1}>
                        <Image
                          borderRadius={8}
                          flex={1}
                          title={item.title}
                          source={{
                            uri: item.url,
                          }}
                          resizeMode="contain"
                          style={{aspectRatio: 1}}
                        />
                      </Box>
                    </TouchableOpacity>
                  </AspectRatio>
                </View>
              )}
            />
          </Box>
        </VStack>
      </VStack>
    );
  }
}
export default Gallery;
