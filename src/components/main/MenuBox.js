/* eslint-disable react-native/no-inline-styles */
import React from 'react';
// react-native components
import {Image, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
// native-base
import {
  Box,
  Center,
  View,
  Text,
  AspectRatio,
  InfoIcon,
  Modal,
  Button,
  Avatar,
  HStack,
  VStack,
  Spacer,
} from 'native-base';

function MenuBox(props) {
  const {
    index,
    img,
    title,
    link,
    navigation,
    setBottomTabIndex,
    bottomTabIndex,
  } = props;
  return (
    <AspectRatio ratio={{base: 1 / 1}} width="50%">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(String(link));
          // setHiddenTab(false);
          setBottomTabIndex(index);
          console.log(bottomTabIndex);
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
          <Center flex={2} display="flex" flexDirection="row">
            <Center flex={1}>
              <Center flex={1}>
                <Image
                  resizeMethod="contain"
                  style={{aspectRatio: 0.4, resizeMode: 'contain'}}
                  source={img}
                />
              </Center>
            </Center>
          </Center>
          <Center flex={1}>
            <Text color="dark.50">{title}</Text>
          </Center>
        </Box>
      </TouchableOpacity>
    </AspectRatio>
  );
}

export default MenuBox;
