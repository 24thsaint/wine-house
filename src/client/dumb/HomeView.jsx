/* global window */
import React from 'react';
import { Typography } from '@material-ui/core';

import Login from './Login';
import authenticate from '../authenticator';

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false
    };
  }

  async componentDidMount() {
    const result = await authenticate();
    if (result.code === 401) {
      this.setState({
        hasLoaded: true
      });
    }
  }
 
  render() {
    return (
      <div>
        {
          this.state.hasLoaded === true ? 
            <Login 
              handleLogin={this.props.handleLogin} 
              handleInputChange={this.props.handleInputChange}
              formData={this.props.formData}
            /> 
            : <Typography>Loading...</Typography>
        }
      </div>
    );
  }
}

export default HomeView;