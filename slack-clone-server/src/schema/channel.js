import { gql } from 'apollo-server-express';
 
export default gql `

  extend type Mutation {
    createChannel(teamId: Int!, name: String!): CreateChannelResponse!
  }

  type Channel {
    id: Int!
    name: String!
    public: Boolean
    messages: [Message!]!
    users: [User!]!
  }

  input NewChannelInput {
    name: String!
    public: Boolean!
    teamId: Int!
  }

  type CreateChannelResponse {
    ok: Boolean!
    channel: Channel
    errors: [Error!]
  }

`