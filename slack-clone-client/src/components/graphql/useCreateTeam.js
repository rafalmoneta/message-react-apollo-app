import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
// import { GET_ALL_TEAMS } from './useGetTeamsQuery';

export const CREATE_TEAM = gql`
mutation createTeam($newTeam: NewTeamInput!) {
  createTeam(input: $newTeam) {
    ok
    team {
      id
    }
    errors {
      path
      message
    }
  }
}
`

export default () => {
  const [createTeam] = useMutation(CREATE_TEAM);

  return input => {
    return createTeam({
      variables: {newTeam: input}})
  }
}