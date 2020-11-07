 import React from 'react';

import Header from '../components/Header';
import SendMessage from '../components/SendMessage';
import Layout from '../components/Layout';
import Sidebar from '../containers/Sidebar';
import useGetTeamsQuery from '../components/graphql/useGetTeamsQuery';
import { Redirect } from 'react-router-dom';
import MessageContainer from '../components/MessageContainer';

const ViewTeam = ({ match: { params: {teamId, channelId} }}) => {
  const {data, loading} = useGetTeamsQuery();

  if(loading) return null;
  if(!data.allTeams.length) return (<Redirect to='/create-team' />);

  const { allTeams, inviteTeams } = data;
  const teams = [...allTeams, ...inviteTeams];

  const teamIdInteger = parseInt(teamId, 10);
  const teamIndex = teamIdInteger ? teams.findIndex((t) => t.id === teamIdInteger) : 0;
  const team = teamIndex === -1 ? teams[0] : teams[teamIndex]

  const channelIdInteger = parseInt(channelId, 10);
  const channelIndex = channelIdInteger ? team.channels.findIndex((c) => c.id === channelIdInteger): 0;
  const channel = channelIndex === -1 ? team.channels[0] : team.channels[channelIndex];

  return (
    <Layout>
      <Sidebar 
        teams={teams.map(team => ({
          id: team.id, 
          letter: team.name.charAt(0).toUpperCase(),
        }))} 
        team={team}
      />
      {channel && <Header channelName={channel.name} />}
      {channel && <MessageContainer channelId={channel.id} />}
      {channel && <SendMessage channelName={channel.name} channelId={channel.id} />}
    </Layout>
  );
};

export default ViewTeam;