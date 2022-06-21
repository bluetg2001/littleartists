import React, {useState, useEffect} from 'react';
// native base
import {
  Modal,
  Text,
  Checkbox,
  HStack,
  Divider,
  Button,
  VStack,
} from 'native-base';
// graphql stuff
import {EDIT_PARENT} from '../../graphQL/parents';
import {useMutation} from '@apollo/client';
// navigation
import {useNavigation} from '@react-navigation/native';

function ConsentModal(props) {
  const {isConsent, parentId} = props;
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [isMarketingChecked, setIsMarketingChecked] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(!isConsent);

  const navigation = useNavigation();

  const [editParent] = useMutation(EDIT_PARENT);

  const checkConsentInfo = () => {
    editParent({
      variables: {
        editParentId: parentId,
        isConsent: isConsentChecked,
        isMarketing: isMarketingChecked,
      },
    })
      .then(res => {
        setIsModalOpen(!isModalOpen);
        navigation.navigate('Main', {isConsent: true});
      })
      .catch(console.log('에러'));
  };

  return (
    <Modal isOpen={isModalOpen}>
      <Modal.Content>
        <Modal.Header>약관 동의</Modal.Header>
        <Modal.Body>
          {console.log(isConsentChecked)}
          <VStack>
            <Text fontWeight="semibold" mb="1">
              -개인정보 수집 및 이용 동의
            </Text>
            <VStack pl={1} space={2}>
              <VStack>
                <Text fontWeight="normal">1. 수집하는 개인정보의 항목</Text>
                <Text ml={2} fontWeight="light">
                  성명, 전화번호, 거래내용
                </Text>
              </VStack>
              <VStack>
                <Text fontWeight="normal">2. 개인정보 수집 및 이용목적</Text>
                <Text ml={2} fontWeight="light">
                  회원 식별, 고객 상담 및 AS관리, 서비스 변경사항 및 고지사항
                  전달
                </Text>
              </VStack>
              <VStack>
                <Text fontWeight="normal">3.개인정보의 보유 및 이용기간</Text>
                <Text ml={2} fontWeight="light">
                  교육 신청 시 부터 교육 종료 때 까지 사용 후 폐기
                </Text>
              </VStack>
            </VStack>
          </VStack>
          <HStack
            justifyContent="flex-end"
            alignItems="center"
            space="2"
            mt={2}>
            <Checkbox
              isChecked={isConsentChecked}
              onChange={() => setIsConsentChecked(!isConsentChecked)}>
              필수 동의
            </Checkbox>
          </HStack>
          <Divider
            my="2"
            _light={{
              bg: 'gray.200',
            }}
          />
          <VStack>
            <Text fontWeight="semibold" mb="1">
              -마케팅 정보 수신 동의
            </Text>
            <VStack space={1} pl={1}>
              <Text fontWeight="light">
                마케팅 정보 수신 동의 하시면 할인 및 리워드, 프로모션 및 상품
                정보를 받으실 수 있습니다.
              </Text>
              <Text fontWeight="light">(이메일&문자메세지&App push)</Text>
            </VStack>
          </VStack>
          <HStack
            justifyContent="flex-end"
            alignItems="center"
            space="2"
            mt={2}>
            <Checkbox
              isChecked={isMarketingChecked}
              onChange={() => setIsMarketingChecked(!isMarketingChecked)}>
              선택 동의
            </Checkbox>
          </HStack>
          <Divider
            my="2"
            _light={{
              bg: 'gray.200',
            }}
          />
          <Button
            color="primary.500"
            isDisabled={!isConsentChecked}
            onPress={() => checkConsentInfo()}>
            <Text>확인</Text>
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

export default ConsentModal;
