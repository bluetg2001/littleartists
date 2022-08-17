/* eslint-disable react-native/no-inline-styles */
import React from 'react';
// native-base
import {VStack, Text, ScrollView} from 'native-base';
// react-native-components
import {Image, Linking, TouchableOpacity} from 'react-native';

function MusicGoGo() {
  return (
    <ScrollView>
      <VStack backgroundColor="#ffffff" alignItems="center">
        <Image
          style={{
            marginTop: 32,
            width: 108,
            height: 51,
          }}
          source={require('../../../assets/images/logos/musicgogo.png')}
        />

        <VStack mt={10} mb={5}>
          <Text
            fontSize="md"
            color="#e33706"
            textAlign="center">{`우리 아이 음악성을 어떻게 키워주지?`}</Text>
          <Text
            fontSize="md"
            fontWeight="bold"
            color="#e33706"
            textAlign="center">{`정답은 뮤직고고!`}</Text>
          <Text
            fontSize="md"
            color="#e33706"
            textAlign="center">{`디지털 음악체험 통합놀이 교육을 원한다면`}</Text>
          <Text
            fontSize="md"
            fontWeight="bold"
            color="#e33706"
            textAlign="center">{`뮤직고고를 신청해보세요.`}</Text>
        </VStack>
        {/* <VStack width="90%"> */}
        <Image
          style={{
            aspectRatio: 388 / 262,
            maxWidth: '90%',
            maxHeight: 262,
            resizeMode: 'contain',
          }}
          source={require('../../../assets/images/backgrounds/musicgogo-background.png')}
        />
        {/* </VStack> */}
        <Text
          mt={10}
          fontSize="lg"
          fontWeight="bold"
          color="#e33706"
          textAlign="center">
          {`연령별 맞춤 커리큘럼으로 \n유치부부터 초등까지!`}
        </Text>

        <VStack mt={10}>
          <Text
            fontSize="md"
            color="dark.100"
            textAlign="center">{`전문교육교사의 영상과 다양한 디지털 콘텐츠로`}</Text>
          <Text
            fontSize="md"
            fontWeight="bold"
            color="dark.100"
            textAlign="center">{`수업의 몰입도 UP!`}</Text>
          <Text
            fontSize="md"
            color="dark.100"
            textAlign="center">{`교사와 함께하는 워크북 심화활동으로`}</Text>
          <Text
            fontSize="md"
            fontWeight="bold"
            color="dark.100"
            textAlign="center">{`수업의 이해도 UP!`}</Text>
        </VStack>

        <TouchableOpacity
          onPress={async () =>
            await Linking.openURL('https://musicgogo.co.kr/')
          }>
          <Image
            style={{
              aspectRatio: 225 / 58,
              maxWidth: '50%',
              resizeMode: 'contain',
            }}
            source={require('../../../assets/images/btns/musicgogo-btn.png')}
          />
        </TouchableOpacity>
      </VStack>
    </ScrollView>
  );
}

export default MusicGoGo;
