import React from 'react';
import authenticate from '../authenticator';
import client from '../client';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        fullClientName: ''
      }
    };
  }

  async componentDidMount() {
    await authenticate();
    this.setState({
      user: client.get('user')
    });
  }

  render() {
    return (
      <h1>Welcome, {this.state.user.fullClientName}</h1>
    );
  }
}

export default Dashboard;