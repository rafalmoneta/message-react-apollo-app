import React, { useState } from 'react';
import {Button, Input, Container, Header, Message, Form } from 'semantic-ui-react'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

const REGISTER_USER = gql`
  mutation register($newUser: NewUserInput!) {
    register(input: $newUser) {
      ok
      errors {
        path
        message
      }
    }
  }
`

const Register = () => {
  const [user, setUser] = useState({username: '', email: '', password: ''})
  const [registerErrors, setRegisterErrors] = useState({usernameError: '', passwordError: '', emailError: ''})
  const [registerUser] = useMutation(REGISTER_USER);
  let history = useHistory();

  const {username, email, password} = user;
  const {usernameError, passwordError, emailError} = registerErrors;

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({...user, [name]: value})
  }

  const onSubmit = () => {
    registerUser({
      variables: {newUser: user}
    })
    .then(({data}) => {
      const {ok, errors} = data.register;
      
      if(ok) {
        history.push('/')
      } else {
        const err = {}; 
        errors.forEach(({ path, message}) => {
          err[`${path}Error`] = message
        })
        setRegisterErrors(err);
      }
    })
  }

  return (
    
    <Container text>
      <Header as='h2'>Register</Header>
      <Form>
        <Form.Field
          error={!!usernameError} 
        >
          <Input
            onChange={onChange} 
            name="username"
            value={username} 
            placeholder="Username" 
            fluid />
        </Form.Field>
        <Form.Field
          error={!!emailError}
        >
          <Input
            onChange={onChange}
            name="email"
            value={email} 
            placeholder="Email" 
            fluid />
        </Form.Field>
        <Form.Field 
          error={!!passwordError}
        > 
          <Input 
            onChange={onChange}
            name="password"
            value={password} 
            type="password" 
            placeholder="Password" 
            fluid />
        </Form.Field>
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
      {(usernameError || emailError || passwordError) &&
          <Message 
            error 
            header="There was some errors with your submission" 
            list={[usernameError, emailError, passwordError].filter(errorText => errorText)}   
          />
        }
    </Container>
  )

}

export default Register