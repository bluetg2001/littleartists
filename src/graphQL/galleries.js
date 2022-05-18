import {gql} from '@apollo/client';

export const GET_HAKWON_GALLERIES = gql`
  query HakwonGalleries($hakwonId: ID!) {
    hakwonGalleries(hakwonId: $hakwonId) {
      id
      brandId
      hakwonId
      url
      fileName
      createdAt
      createdBy
    }
  }
`;
