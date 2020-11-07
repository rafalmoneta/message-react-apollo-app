import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

export const GET_ALL_TEAMS = gql`
  {
    allTeams {
      id
      name
      owner
      channels {
        id
        name
      }
    }
    inviteTeams {
      id
      name
      owner
      channels {
        id
        name
      }
    }
  }
`

export default () => {
  return useQuery(GET_ALL_TEAMS);
}