import React from 'react';
import { Redirect } from 'react-router-dom';

import HomeView from '../dumb/HomeView';
import InputHelper from '../helpers/inputHelper';
import client from '../client';
class LoginSmartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: '',
        password: ''
      },
      isAuthenticated: false
    };
    this.inputHelper = new InputHelper(this);
    this.loginAction = this.loginAction.bind(this);
  }

  componenWillMount() {
    this.inputHelper = new InputHelper(this);
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
        error: e
      });
    }
  }

  render() {
    return (
      <div>
        <HomeView 
          handleLogin={this.loginAction} 
          handleInputChange={this.inputHelper.handleInputChange}
          formData={this.state.formData} 
        />
        {this.state.isAuthenticated ? <Redirect to="/dashboard" /> : undefined}
      </div>
    );
  }
}

export default LoginSmartComponent;