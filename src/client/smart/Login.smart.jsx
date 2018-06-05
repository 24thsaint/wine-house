import React from 'react';

import HomeView from '../dumb/HomeView';
import InputHelper from '../helpers/inputHelper';

class LoginSmartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: '',
        password: ''
      },
    };
    this.inputHelper = new InputHelper(this);
    this.loginAction = this.loginAction.bind(this);
  }

  componenWillMount() {
    this.inputHelper = new InputHelper(this);
  }

  loginAction(evt) {
    evt.preventDefault();
    console.log(this.state.formData);
  }

  render() {
    return (
      <div>
        <HomeView 
          handleLogin={this.loginAction} 
          handleInputChange={this.inputHelper.handleInputChange}
          formData={this.state.formData} 
        />
      </div>
    );
  }
}

export default LoginSmartComponent;