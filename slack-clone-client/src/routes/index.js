import React from 'react';
import decode from 'jwt-decode';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../components/Home';
import Register from './Register'
import Login from './Login';
import CreateTeam from './CreateTeam';
import ViewTeam from './ViewTeam';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    return false;
  }

  return true;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            // state: { from: location }
          }}
        />
      ))
    }
  />
);

export default ( ) => (
  <BrowserRouter>
    <Switch>
      <Route path ="/" exact component={ Home } />
      <Route path ="/register" component={ Register } />
      <Route path ="/login" component={ Login } />
      <PrivateRoute path ="/view-team/:teamId?/:channelId?" component={ ViewTeam } />
      <PrivateRoute path ="/create-team" component={ CreateTeam } />
    </Switch>
  </BrowserRouter>
)