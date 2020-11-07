import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { GET_ALL_TEAMS } from './useGetTeamsQuery';

export const CREATE_CHANNEL = gql`
  mutation createChannel($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        id
        name
      }
      errors {
        path
        message
      }
    }
  }
`

export default () => {
  const [createChannel] = useMutation(CREATE_CHANNEL);

  return input => {
    return createChannel({
      variables: input,
      update(cache, {data: {createChannel}}) {
        const {ok, channel} = createChannel;
        if(!ok) {
          return;
        }
        const { allTeams } = cache.readQuery({query: GET_ALL_TEAMS});
        const teamIndex = allTeams.findIndex(team => team.id === input.teamId);
        allTeams[teamIndex].channels.push(channel);
        cache.writeQuery({
          query: GET_ALL_TEAMS,
          data: { allTeams }
        })
      }
    })
  }
}