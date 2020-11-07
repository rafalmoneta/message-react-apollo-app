import { gql } from 'apollo-server-express';
 
export default gql `
  extend type Query {
    user(id: Int!): User!
    users: [User!]!
  }
  
  extend type Mutation {
    register(input: NewUserInput!): RegisterResponse!
    login(input: LoginUserInput!): LoginResponse!
  }

  type User {
    id: Int!
    username: String!
    email: String!
  }

  type RegisterResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }

  input NewUserInput {
    username: String!
    email: String!
    password: String!
  }

  type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
  }

  input LoginUserInput {
    email: String!
    password: String!
  }
`