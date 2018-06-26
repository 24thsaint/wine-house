/* global window */
import React from 'react';
import { Typography, CircularProgress } from '@material-ui/core';

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
    let result;
    
    try {
      result = await authenticate();
    
      if (result.code === 401) {
        this.setState({
          hasLoaded: true
        });
      }
    } catch (e) {
      console.log(e);
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
            : <CircularProgress />
        }
      </div>
    );
  }
}

export default HomeView;