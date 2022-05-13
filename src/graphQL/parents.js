import {gql} from '@apollo/client';

export const PARENT = gql`
  query Parent($parentId: ID!) {
    parent(id: $parentId) {
      students {
        id
        brandId
        hakwonId
        status
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
        isKeySent
        createdAt
        changedAt
        tokens
      }
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
