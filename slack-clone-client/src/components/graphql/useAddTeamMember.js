import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
// import { GET_ALL_TEAMS } from './useGetTeamsQuery';

// export const CREATE_CHANNEL = gql`
//   mutation createChannel($teamId: Int!, $name: String!) {
//     createChannel(teamId: $teamId, name: $name) {
//       ok
//       channel {
//         id
//         name
//       }
//       errors {
//         path
//         message
//       }
//     }
//   }
// `

export const ADD_TEAM_MEMBER = gql`
  mutation addTeamMember($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`

export default () => {
  const [addTeamMember] = useMutation(ADD_TEAM_MEMBER);

  return input => {
    return addTeamMember({
      variables: input,
      // update(cache, {data: {addTeamMember}}) {
      //   const {ok, errors} = addTeamMember;
      //   if(!ok) {
      //     return;
      //   }
        // const { allTeams } = cache.readQuery({query: GET_ALL_TEAMS});
        // const teamIndex = allTeams.findIndex(team => team.id === input.teamId);
        // allTeams[teamIndex].channels.push(channel);
        // cache.writeQuery({
        //   query: GET_ALL_TEAMS,
        //   data: { allTeams }
        // })
      // }
    })
  }
}