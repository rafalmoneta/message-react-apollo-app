import React from 'react';
import { graphql, useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { Comment } from 'semantic-ui-react';
import Messages from '../Messages';

const GET_MESSAGES = gql`
  query messages($channelId: Int!) {
    messages(channelId: $channelId) {
      id
      text
      user {
        username
      }
      createdAt
    }
  }
`;


const MessageContainer = ({channelId}) => {
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { channelId }
  })
  console.log(data , channelId);
  if(loading) return null;

  return (
    <Messages>
    {/* {!loading &&  */}
      <Comment.Group>
        {data.messages.map(m => (
          <Comment key={`${m.id}-message`}>
            <Comment.Content>
              <Comment.Author as="a">{m.user.username}</Comment.Author>
              <Comment.Metadata>
                <div>{m.createdAt}</div>
              </Comment.Metadata>
              <Comment.Text>{m.text}</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        ))
        }
      </Comment.Group>
    {/* } */}
    </Messages>
  );
}



export default MessageContainer;