import React from 'react';
import { HeaderWrapper } from './style';
import { Header } from 'semantic-ui-react';

export default ({channelName}) => {
  return (
    <HeaderWrapper>
      <Header textAlign="center">#{channelName}</Header>
    </HeaderWrapper>
  )
}