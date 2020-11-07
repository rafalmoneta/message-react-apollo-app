import React from 'react';
import { TeamWrapper, TeamList, TeamListItem } from './style';
import { Link } from 'react-router-dom';

export default ({teams}) => {
  return (
    <TeamWrapper>
      <TeamList>
        {teams.map(({ id, letter }) =>{
          return (
            <Link to={`/view-team/${id}`} key={`team-${id}`}>
              <TeamListItem>{letter}</TeamListItem>
            </Link>
          )
        })}
      </TeamList>
    </TeamWrapper>
  )
}