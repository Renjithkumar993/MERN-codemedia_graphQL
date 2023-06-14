const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    savedSnippets: [Snippet]
    snippetCount: Int
  }

  type Snippet {
    _id: ID!
    title: String
    code: String
    description: String
    language: String!
    createdAt: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveSnippet(title: String!, code: String!, description: String!, language: String!): User
    removeSnippet(snippetID: String!): User
    editSnippet(snippetID: String! ,code :String!): User
  }
`;

module.exports = typeDefs;
