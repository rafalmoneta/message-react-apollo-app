import React, { useState } from 'react';
import { SendMessageWrapper } from './style';
import { Input } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const CREATE_MESSAGE = gql`
  mutation createMessage($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text) {
      ok
    }
  }
`

export default ({ channelName, channelId }) => {
  const [message, setMessage] = useState({text: ''});
  const [createMessage] = useMutation(CREATE_MESSAGE);
  
  const handleMessageChange = (e) => {
    setMessage({...message, text: e.target.value})
  }

  const handleSubmit = async (e) => {

    const response = await createMessage({
      variables: { channelId: parseInt(channelId, 10), text: message.text }
    })
    console.log(response);
    //remember to edit in the future
    setMessage({text: ''});
  }

  return (
    <SendMessageWrapper>
      <Input 
        onKeyDown={(e) => {
          if(e.keyCode === 13) {
            handleSubmit(e);
          }
        }} 
        onChange={handleMessageChange} 
        fluid
        value={message.text}
        placeholder={`Message #${channelName}`} 
      />
    </SendMessageWrapper>
  )
};