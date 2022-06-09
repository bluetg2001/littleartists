import {gql} from '@apollo/client';

export const HAKWON_BOARDS = gql`
  query HakwonBoards($id: ID!, $type: String!) {
    hakwonBoards(hakwonId: $id, type: $type) {
      id
      subject
      title
      contents
      createdAt
      openToApp
    }
  }
`;
