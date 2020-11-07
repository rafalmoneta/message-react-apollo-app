import React from 'react';
import { ChannelWrapper, Green, PushLeft, TeamNameHeader, SideBarList, SideBarListHeader, SideBarListItem } from './style';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○');

export default ({teamName, username, channels, users, onAddChannelClick, teamId, onInvitePeopleClick, isOwner }) => {
  return (
    <ChannelWrapper>
      <PushLeft>
        <TeamNameHeader>{teamName}</TeamNameHeader>
        {username}
      </PushLeft>
      <div>
        <SideBarList>
          <SideBarListHeader>
            Channels {isOwner && <Icon onClick={onAddChannelClick} name="add circle" />}
          </SideBarListHeader>
          {channels.map(({id, name}) => {
            return (
              <Link key={`channel-${id}`} to={`/view-team/${teamId}/${id}`}>
                <SideBarListItem># {name}</SideBarListItem>
              </Link>
            )
          })}
        </SideBarList>
      </div>
      <div>
        <SideBarList>
          <SideBarListHeader>Direct Messages</SideBarListHeader>
          {users.map(({ id, name }) => {
            return (
              <SideBarListItem key={`user-${id}`}>
              <Bubble /> {name}
              </SideBarListItem>
            )
          })}
        </SideBarList>
      </div>
      {isOwner && 
        <div>
          <a href='#invite-people' onClick={onInvitePeopleClick}>
            + Invite People
          </a>
        </div>
      }
    </ChannelWrapper>
  )
}