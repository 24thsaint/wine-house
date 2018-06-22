import React from 'react';
import Dashboard from '../dumb/Dashboard';
import { Grid, Divider } from '@material-ui/core';
import authenticate from '../authenticator';
import client from '../client';
import EthereumContract from '../ethereumContractClient';
import WineGallery from './WineGallery';
import settings from '../helpers/settings';

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
      user: client.get('user')
    });
    await this.getBalance();
    const userType = await this.getUserType();
    this.setState({
      userType
    });
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

  async getUserType() {
    const wallet = client.get('wallet');
    const contractAddress = await settings.get('contractAddress');
    const contract = await this.ethereumContract.loadContractPublic(contractAddress);
    const isPartner = await contract.getTrustedPartner(wallet.address);
    if (isMaster.toUpperCase() === '0X' + wallet.address.toUpperCase()) {
      return 'Contract Master';
    }
    if (isPartner[1]) {
      return 'Registered Partner';
    }
    const isOwner = await contract.getWineOwner(wallet.address);
    if (isOwner[2]) {
      return 'Registered Owner';
    }
    const isMaster = await contract.owner();
    return 'Unverified User';    
  }

  render() {
    return (
      <Grid style={{margin: 20}}>
        <Dashboard 
          user={this.state.user} 
          address={this.state.address}
          balance={this.state.balance} 
          history={this.props.history} 
          userType={this.state.userType}
        />
        <Divider style={{ marginTop: '20px', marginBottom: '20px' }}/>
        <WineGallery />
      </Grid>
    );
  }
}

export default DashboardSmartComponent;