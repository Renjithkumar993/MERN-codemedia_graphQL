import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;




export const SAVE_SNIPPET = gql`
  mutation SaveSnippet($title: String!, $code: String!, $description: String!, $language: String!) {
    saveSnippet(title: $title, code: $code, description: $description language: $language) {
      _id
      username
      email
      snippetCount
      savedSnippets {
        title
        code
        description
        language
        createdAt
        _id
      }
    }
  }
`;

export const REMOVE_SNIPPET = gql`
  mutation RemoveSnippet($snippetID: String!) {
    removeSnippet(snippetID: $snippetID) {
      _id
      username
      snippetCount
      savedSnippets {
        title
        code
        description
        _id
        language
        createdAt
      }
    }
  }
`;

export const EDIT_SNIPPET = gql`
  mutation EditSnippet($snippetID: String!, $code: String!) {
    editSnippet(snippetID: $snippetID, code: $code) {
      _id
      username
      snippetCount
      savedSnippets {
        title

      }
    }
  }`;

