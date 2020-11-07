import React from 'react';
// import { GridContainer, LeftContent, CenterContent, RightContent } from './style';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const Home = () => {

  const {data, loading} = useQuery(GET_USERS);

  console.log(data);

  return (
    <div>
      {!loading && 
        data.users.map(u => <h1>{u.username}</h1>)
      }
    </div>
  );
}

const GET_USERS = gql`
{
  users {
    id
    username
  }
}
`
 
export default Home;