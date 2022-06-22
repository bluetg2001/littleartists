/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
// react-native components
import {Image, TouchableOpacity} from 'react-native';
// native-base
import {Center, Text, AspectRatio, VStack} from 'native-base';
// navigation
import {useNavigation} from '@react-navigation/native';
// context
import TabContext from '../../utils/TabContext';

function MenuBox(props) {
  const {index, img, title, link, parentId, hakwonId} = props;

  const navigation = useNavigation();
  const {TabIndex, setTabIndex} = useContext(TabContext);

  return (
    <VStack flex={1} m={2}>
      <AspectRatio ratio={{base: 1 / 1}}>
        <TouchableOpacity
          onPress={() => {
            setTabIndex(index);
            navigation.navigate(String(link), {
              hakwonId: hakwonId,
              parentId: parentId,
            });
            // setBottomTabIndex(index);
          }}>
          <VStack
            justifyContent="center"
            maxHeight="100%"
            // flex={1}
            rounded="3xl"
            bgColor="#ffffff"
            shadowColor="#000"
            shadowOpacity={0.35}
            shadowRadius={10}
            elevation={4}
            style={{
              // margin: 10,
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
                  aspectRatio: 1,
                  maxHeight: '50%',
                  resizeMode: 'contain',
                }}
                source={img}
              />
              <Text color="dark.50">{title}</Text>
            </Center>
          </VStack>
        </TouchableOpacity>
      </AspectRatio>
    </VStack>
  );
}

export default MenuBox;
