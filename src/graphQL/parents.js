import {gql} from '@apollo/client';

export const PARENT = gql`
  query Parent($id: ID!) {
    parent(id: $id) {
      students {
        id
        brandId
        hakwonId
        status
        displayName
        name
      }
    }
  }
`;

export const PARENT_LOGIN = gql`
  mutation ParentLogin($phone: ID!, $authKey: String!) {
    parentLogin(phone: $phone, authKey: $authKey) {
      success
      message
      parent {
        id
        brandId
        hakwonId
        studentId
        name
        relation
        isMain
        phone
        tel
        status
        authKey
        isConsent
        isMarketing
        isKeySent
        createdAt
        changedAt
        tokens
      }
    }
  }
`;

export const EDIT_PARENT = gql`
  mutation EditParent(
    $editParentId: ID!
    $isConsent: Boolean
    $isMarketing: Boolean
  ) {
    editParent(
      id: $editParentId
      isConsent: $isConsent
      isMarketing: $isMarketing
    ) {
      success
      message
    }
  }
`;

export const SAVE_TOKEN_TO_DATABASE = gql`
  mutation SaveTokenToDatabase($parentId: ID!, $token: String!) {
    saveTokenToDatabase(parentId: $parentId, token: $token) {
      success
      message
    }
  }
`;

export const SEND_AUTHKEY = gql`
  mutation SendAuthKey($phoneNumber: String!) {
    sendAuthKey(phoneNumber: $phoneNumber) {
      success
      message
    }
  }
`;
