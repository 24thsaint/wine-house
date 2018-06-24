import React from 'react';
import Dashboard from '../dumb/Dashboard';
import { Grid, Divider, CircularProgress } from '@material-ui/core';
import authenticate from '../authenticator';
import client from '../client';
import EthereumContract from '../ethereumContractClient';
import WineGallery from './WineGallery';

class DashboardSmartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        fullClientName: ''
      },
      balance: 0,
      userType: 'Unverified User'
    };
    this.ethereumContract = new EthereumContract();
    this.getBalance = this.getBalance.bind(this);
  }

  async componentDidMount() {
    await authenticate();
    this.setState({
      user: client.get('user'),
      userType: client.get('user').status
    });
    try {
      await this.getBalance();
    } catch (e) {
      this.setState({
        address: 'Network Error',
        balance: 'Not Connected'
      });
    }
  } 

  async getBalance() {
    const wallet = client.get('wallet');
    try {
      const balance = await this.ethereumContract.getBalance(wallet.address);

      this.setState({
        address: wallet.address,
        balance
      });
      return balance;
    } catch(e) {
      this.setState({
        address: 'Network Error',
        balance: 'Not Connected'
      });
      return null;
    }
  }

  render() {
    return (
      <Grid style={{margin: 20}}>
        {
          this.state.address && this.state.balance ? 
            <div>
              <Dashboard 
                user={this.state.user} 
                address={this.state.address || 'Network Error'}
                balance={this.state.balance || 'Not Connected'} 
                history={this.props.history} 
                userType={this.state.userType}
              />
              <Divider style={{ marginTop: '20px', marginBottom: '20px' }}/>
              <WineGallery />
            </div>
            : <Grid item container justify="center"><CircularProgress /></Grid>
        }
      </Grid>
    );
  }
}

export default DashboardSmartComponent;