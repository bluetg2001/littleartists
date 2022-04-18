/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
// react-native components
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
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
// grid system
import {FlatGrid} from 'react-native-super-grid';
// react-navigation
import {useFocusEffect} from '@react-navigation/native';
// Alert Page - swipe func
import {SwipeListView} from 'react-native-swipe-list-view';

function Main({
  navigation,
  hiddenTab,
  setHiddenTab,
  bottomTabIndex,
  setBottomTabIndex,
}) {
  const [menus, setMenus] = useState([
    {
      index: 1,
      title: '출석',
      img: require('../../assets/images/logos/main-attendance.png'),
      link: 'Attendance',
    },
    {
      index: 2,
      title: '공지사항',
      img: require('../../assets/images/logos/main-notice.png'),
      link: 'Notice',
    },
    {
      title: 'e피아노고고',
      img: require('../../assets/images/logos/main-pianogogo.png'),
      link: 'PianoGoGo',
    },
    {
      index: 5,
      title: '갤러리',
      img: require('../../assets/images/logos/main-gallery.png'),
      link: 'Gallery',
    },
    {
      index: 4,
      title: '소개',
      img: require('../../assets/images/logos/main-littleband-logo.png'),
      link: 'BrandIntro',
    },
    {
      index: 3,
      title: '교육비',
      img: require('../../assets/images/logos/main-intuition.png'),
      link: 'Intuition',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const handleSizeClick = () => {
    setModalVisible(!modalVisible);
  };

  const [listData, setListData] = useState([
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      fullName: 'Aafreen Khan',
      timeStamp: '12:47 PM',
      recentText: 'Good Day!',
      avatarUrl:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      fullName: 'Sujitha Mathur',
      timeStamp: '11:11 PM',
      recentText: 'Cheer up, there!',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      fullName: 'Anci Barroco',
      timeStamp: '6:22 PM',
      recentText: 'Good Day!',
      avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg',
    },
    {
      id: '68694a0f-3da1-431f-bd56-142371e29d72',
      fullName: 'Aniket Kumar',
      timeStamp: '8:56 PM',
      recentText: 'All the best',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU',
    },
    {
      id: '28694a0f-3da1-471f-bd96-142456e29d72',
      fullName: 'Kiara',
      timeStamp: '12:47 PM',
      recentText: 'I will call today.',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
    },
  ]);

  useFocusEffect(
    useCallback(() => {
      setHiddenTab(true);
      return () => setHiddenTab(false);
    }, [setHiddenTab]),
  );

  const deleteItem = (rowMap, rowKey) => {
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onItemOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const renderHiddenItem = (data, rowMap) => (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 5,
      }}>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteBtn]}
        onPress={() => deleteItem(rowMap, data.item.key)}>
        <Text style={styles.btnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  const Example = data => {
    return (
      <Box
        bgColor={'gray.100'}
        borderBottomWidth="1"
        _dark={{
          borderColor: 'gray.600',
        }}
        borderColor="coolGray.200"
        pl="4"
        pr="5"
        py="2">
        <HStack space={3} justifyContent="space-between">
          <Avatar
            size="48px"
            source={{
              uri: data.item.avatarUrl,
            }}
          />
          <VStack>
            <Text
              _dark={{
                color: 'dark.50',
              }}
              color="coolGray.800"
              bold>
              {data.item.fullName}
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              {data.item.recentText}
            </Text>
          </VStack>
          <Spacer />
          <Text
            fontSize="xs"
            _dark={{
              color: 'warmGray.50',
            }}
            color="coolGray.800"
            alignSelf="flex-start">
            {data.item.timeStamp}
          </Text>
        </HStack>
      </Box>
    );
  };

  const AlertModal = () => {
    return (
      <Modal isOpen={modalVisible} onClose={setModalVisible} size="xl">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>알림</Modal.Header>
          {/* <ScrollView> */}
          <Modal.Body>
            <SwipeListView
              data={listData}
              renderItem={Example}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={75}
              rightOpenValue={-75}
              previewRowKey={'0'}
              previewOpenValue={-10}
              previewOpenDelay={0}
              onRowDidOpen={onItemOpen}
              tension={100}
            />
          </Modal.Body>
          {/* </ScrollView> */}
          <Modal.Footer>
            <Button
              onPress={() => {
                setModalVisible(false);
              }}>
              확인
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  };

  const MenuBox = props => {
    const {index, img, title, link} = props;
    return (
      <AspectRatio ratio={{base: 1 / 1}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(String(link));
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
  };

  return (
    <View flex={1} bgColor="gray.100" alignItems={'center'}>
      <AlertModal />
      <Box flex={1} width="90%" safeArea>
        <Center flex={1}>
          <Image
            style={{width: 127, height: 62}}
            source={require('../../assets/images/logos/littleband-logo.png')}
          />
          <Box style={{position: 'absolute', right: 0}}>
            <InfoIcon
              color="primary.500"
              onPress={() => {
                handleSizeClick();
              }}
            />
          </Box>
        </Center>
      </Box>
      <Box flex={5}>
        <FlatGrid
          itemDimension={130}
          data={menus}
          spacing={32}
          style={{flex: 1}}
          renderItem={({item}) => (
            <MenuBox
              img={item.img}
              title={item.title}
              link={item.link}
              index={item.index}
            />
          )}
        />
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
  },
  actionButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  deleteBtn: {
    backgroundColor: 'red',
    right: 0,
  },
});
export default Main;
