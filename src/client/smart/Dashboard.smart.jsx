import React from 'react';
import Dashboard from '../dumb/Dashboard';
import AdminTools from './AdminTools.smart';
import { Grid, Divider } from '@material-ui/core';
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
      balance: 0
    };
    this.ethereumContract = new EthereumContract();
    this.getBalance = this.getBalance.bind(this);
  }

  async componentDidMount() {
    await authenticate();
    this.setState({
      user: client.get('user')
    });
    await this.getBalance();
  } 

  async getBalance() {
    const wallet = client.get('wallet');
    const balance = await this.ethereumContract.getBalance(wallet.address);
    this.setState({
      address: wallet.address,
      balance
    });
    return balance;
  } 

  render() {
    return (
      <Grid>
        <Dashboard 
          user={this.state.user} 
          address={this.state.address}
          balance={this.state.balance} 
          history={this.props.history} 
        />
        <Divider style={{ marginTop: '10px', marginBottom: '10px' }}/>
        <WineGallery />
      </Grid>
    );
  }
}

export default DashboardSmartComponent;