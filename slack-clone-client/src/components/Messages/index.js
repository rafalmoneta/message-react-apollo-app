import React from 'react';
import { InnerBox, OuterBox, ContentBox } from './style';

const Messages = ({children}) => {
  return (
    <ContentBox>
      {/* <OuterBox> */}
        {/* <InnerBox> */}
          {children}
        {/* </InnerBox> */}
      {/* </OuterBox> */}
    </ContentBox>
  );
}
 
export default Messages;