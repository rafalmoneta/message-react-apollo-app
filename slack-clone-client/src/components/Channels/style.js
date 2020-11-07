import styled from 'styled-components';

export const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`;

export const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

export const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`;

export const paddingLeft = 'padding-left: 10px';

export const SideBarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background: #3e313c;
  }
`;

export const SideBarListHeader = styled.li`${paddingLeft};`;

export const PushLeft = styled.div`${paddingLeft};`;

export const Green = styled.span`color: #38978d;`;