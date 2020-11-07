import gql from "graphql-tag";

export default gql`
  type Error {
    path: String!
    message: String
  }
`