import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      snippetCount
      savedSnippets {
        _id
        code
        language
        description
        title
        createdAt
       
      }
    }
  }
`;
