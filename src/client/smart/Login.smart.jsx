import React from 'react';
import { Redirect } from 'react-router-dom';

import HomeView from '../dumb/HomeView';
import InputHelper from '../helpers/inputHelper';
import client from '../client';
import { Typography, Grid } from '@material-ui/core';
class LoginSmartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: '',
        password: ''
      },
      isAuthenticated: null,
    };
    this.inputHelper = new InputHelper(this);
    this.loginAction = this.loginAction.bind(this);
  }

  async loginAction(evt) {
    evt.preventDefault();
    const authenticationDetails = this.state.formData;
    authenticationDetails.strategy = 'local';

    try {
      const result = await client.authenticate(authenticationDetails);
      const payload = await client.passport.verifyJWT(result.accessToken);
      const userData = await client.service('api/users').get(payload.userId);
      await client.set('user', userData);
      this.setState({
        isAuthenticated: true
      });
    } catch (e) {
      this.setState({ 
        isAuthenticated: false,
        error: e.message
      });
    }
  }

  render() {
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
      >
        {this.state.isAuthenticated === false ? 
          <Grid item style={ { padding: 20 } }>
            <Typography color="error" align="center" variant="headline">Login failed: {this.state.error}</Typography>
          </Grid>
          : undefined
        }
        <Grid item>
          <HomeView 
            handleLogin={this.loginAction} 
            handleInputChange={this.inputHelper.handleInputChange}
            formData={this.state.formData} 
          />
        </Grid>
        {this.state.isAuthenticated ? <Redirect to="/dashboard" /> : undefined}
      </Grid>
    );
  }
}

export default LoginSmartComponent;