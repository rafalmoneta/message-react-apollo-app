import React, { useState } from 'react';
import decode from 'jwt-decode';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';
import InvitePeopleModal from '../components/InvitePeopleModal';

const Sidebar = ({teams, team}) => {
  const [openAddChannelModal, setAddChannelModal] = useState(false);
  const [openInvitePeopleModal, setInvitePeopleModal] = useState(false);
  let username = 'username';
  let isOwner = false;

  const handleCloseAddChannelModal = () => {
    setAddChannelModal(false);
  }

  const handleAddChannelClick = () => {
    setAddChannelModal(!openAddChannelModal);
  }

  const handleCloseInvitePeopleModal = () => {
    setInvitePeopleModal(false);
  }

  const handleInvitePeopleClick = () => {
    setInvitePeopleModal(!openInvitePeopleModal);
  }

  try {
    const token = localStorage.getItem('token');
    const { user } = decode(token);
    username = user.username;
    isOwner = user.id === team.owner
  } catch(err) {}

  return (
    <>
      <Teams 
        teams={teams} 
      />
      <Channels
        teamId={team.id}
        teamName={team.name}
        username={username}
        channels={team.channels}
        isOwner={isOwner}
        users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
        onAddChannelClick={handleAddChannelClick}
        onInvitePeopleClick={handleInvitePeopleClick}

      />
      <AddChannelModal
        teamId={team.id}
        open={openAddChannelModal} 
        onClose={handleCloseAddChannelModal}
        key='sidebar-add-channel-modal'
      />
      <InvitePeopleModal
        teamId={team.id}
        open={openInvitePeopleModal} 
        onClose={handleCloseInvitePeopleModal}
        key='sidebar-invite-people-modal'
      />
    </>
  )

}

export default Sidebar;