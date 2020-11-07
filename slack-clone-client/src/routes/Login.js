import React, { useState } from 'react';
import { observer} from 'mobx-react';
import { Button, Input, Container, Header, Form, Message } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useLoginStore } from '../context/LoginStoreContext';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';


const LOGIN_USER = gql`
  mutation login($loginUser: LoginUserInput!) {
    login(input: $loginUser) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
` 

const Login = observer(() => {
  const loginStore = useLoginStore();
  const [loginErrors, setLoginErrors] = useState({emailError: '', })
  const [loginUser] = useMutation(LOGIN_USER)
  let history = useHistory();

  const { email, password } = loginStore;
  const { emailError, passwordError} = loginErrors;

  const onChange = (e) => {
    const { name, value } = e.target;
    loginStore[name] = value;
  }

  const onSubmit = () => {
    loginUser({
      variables: {loginUser: {email, password}}
    })
    .then(({data}) => {
      const {ok, token, refreshToken, errors} = data.login;
      
      if(ok) {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        history.push('/view-team');
      } else {
        const err = {};
        errors.forEach(({ path, message }) => {
          err[`${path}Error`] = message
        })
        setLoginErrors(err);
      }
    })
  }

  return (
    <Container text>
      <Header as='h2'>Login</Header>
      <Form>
        <Form.Field error={!!emailError}>
          <Input 
          onChange={onChange}
          name="email"
          value={email} 
          placeholder="Email" 
          fluid />
        </Form.Field>
        <Form.Field error={!!passwordError}>
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
      {(emailError || passwordError) && 
        <Message 
          error
          header="There was some errors with your submission"
          list={[emailError, passwordError].filter(errorText => errorText)}
        />
      }
    </Container>
  ) 
})

export default Login;