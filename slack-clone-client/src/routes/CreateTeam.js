import React, { useState } from 'react';
import {Button, Input, Container, Header, Message, Form } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom';


import gql from 'graphql-tag';
import useCreateTeam from '../components/graphql/useCreateTeam';

export const CREATE_TEAM = gql`
mutation createTeam($newTeam: NewTeamInput!) {
  createTeam(input: $newTeam) {
    ok
    team {
      id
    }
    errors {
      path
      message
    }
  }
}
`

const CreateTeam = () => {
  const [teamInfo, setTeam] = useState({ name: '' })
  const [createTeamErrors, setCreateTeamErrors] = useState({ nameError: '' })
  const createTeam = useCreateTeam();
  let history = useHistory();

  const { name } = teamInfo;
  const { nameError } = createTeamErrors;

  const onChange = (e) => {
    const { name, value } = e.target;
    setTeam({...teamInfo, [name]: value});
  }

  const onSubmit = async () => {
    let response;
    //checking if user is logged
    try {
      response = await createTeam(teamInfo);
    } catch (err) {
      console.log(err)
      history.push('/login');
      return;
    }

    //if user is logged but there is valid input
    const {ok, errors, team} = response.data.createTeam;
    
    if(ok) {
      history.push(`/view-team/${team.id}`) //after user create new team, redirect him to view-team/teamId
    } else {
      const err = {}; 
      errors.forEach(({ path, message}) => {
        err[`${path}Error`] = message
      })
      setCreateTeamErrors(err);
    }
  }

  return (
    
    <Container text>
      <Header as='h2'>Create a team</Header>
      <Form>
        <Form.Field error={!!nameError}>
          <Input
            onChange={onChange} 
            name="name"
            value={name} 
            placeholder="Name" 
            fluid />
        </Form.Field>
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
      {nameError &&
          <Message 
            error 
            header="There was some errors with your submission" 
            list={[nameError].filter(errorText => errorText)}   
          />
        }
    </Container>
  )

}

export default CreateTeam