import { gql } from 'apollo-server-express';
 
export default gql `

  extend type Query {
    allTeams: [Team!]!
    inviteTeams: [Team!]!
  }

  extend type Mutation {
    createTeam(input: NewTeamInput!): CreateTeamResponse!
    addTeamMember(email: String!, teamId: Int!): VoidResponse!
  }

  type Team {
    id: Int!
    name: String!
    owner: Int!
    members: [User!]!
    channels: [Channel!]!
  }

  type CreateTeamResponse {
    ok: Boolean!
    team: Team
    errors: [Error!]
  }

  type VoidResponse {
    ok: Boolean!
    errors: [Error!]
  }

  input NewTeamInput {
    name: String!
  }

`