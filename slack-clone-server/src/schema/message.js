import { gql } from 'apollo-server-express';
 
export default gql`
  extend type Query {
    message(id: ID!): Message!
    messages(channelId: Int!): [Message!]
  }

  extend type Mutation {
    createMessage(channelId: Int!, text: String!): createMessageResponse!
  }

  type createMessageResponse {
    ok: Boolean!
    message: Message
    errors: [Error!]
  }

  type Message {
    id: Int!
    text: String!
    user: User
    channel: Channel!
    createdAt: String!
  }

  input NewMessageInput {
    channelId: Int!
    text: String!
  }
`;