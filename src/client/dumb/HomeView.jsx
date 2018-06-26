import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

import Login from './Login';
import authenticate from '../authenticator';

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      isAuthenticated: false
    };
  }

  async componentDidMount() {
    let result;
    
    try {
      result = await authenticate();
    
      if (!result) {
        this.setState({
          isAuthenticated: false,
          hasLoaded: true
        });
      } else {
        this.setState({
          isAuthenticated: true,
          hasLoaded: true
        });
      }
    } catch (e) {
      this.setState({
        hasLoaded: true,
        isAuthenticated: false
      });
    }
  }
 
  render() {
    return (
      <div>
        {
          this.state.hasLoaded === false ?
            <CircularProgress />
            : undefined
        }
        {
          this.state.isAuthenticated === false && this.state.hasLoaded === true ? 
            <Login 
              handleLogin={this.props.handleLogin} 
              handleInputChange={this.props.handleInputChange}
              formData={this.props.formData}
            /> 
            : undefined
        }
        {
          this.state.isAuthenticated === true && this.state.hasLoaded === true ?
            <Redirect to="/dashboard" />
            : undefined
        }
      </div>
    );
  }
}

export default HomeView;