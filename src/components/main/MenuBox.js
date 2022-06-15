/* eslint-disable react-native/no-inline-styles */
import React from 'react';
// react-native components
import {Image, TouchableOpacity} from 'react-native';
// native-base
import {Box, Center, Text, AspectRatio} from 'native-base';
import {useNavigation} from '@react-navigation/native';

function MenuBox(props) {
  const {img, title, link, parentId, hakwonId} = props;

  const navigation = useNavigation();

  return (
    <AspectRatio ratio={{base: 1 / 1}} width="50%">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(String(link), {
            hakwonId: hakwonId,
            parentId: parentId,
          });
          // setBottomTabIndex(index);
        }}>
        <Box
          flex={1}
          rounded="3xl"
          bgColor="#ffffff"
          shadowColor="#000"
          shadowOpacity={0.35}
          shadowRadius={10}
          elevation={4}
          style={{
            margin: 10,
            aspectRatio: 1 / 1,
            color: ('rgba(84,73,120,1)', 'rgba(28,20,56,1)'),
            backgroundColor: '#ffffff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}>
          <Center flex={1}>
            <Image
              style={{
                flex: 1,
                aspectRatio: 85 / 85,
                maxHeight: '50%',
                resizeMode: 'contain',
              }}
              source={img}
            />
            <Text color="dark.50">{title}</Text>
          </Center>
        </Box>
      </TouchableOpacity>
    </AspectRatio>
  );
}

export default MenuBox;
