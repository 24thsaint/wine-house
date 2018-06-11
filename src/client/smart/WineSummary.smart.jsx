import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import EthereumContractClient from '../ethereumContractClient';
import settings from '../helpers/settings';
import authenticate from '../authenticator';

class WineSummarySmartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wineCount: 0
    };
    this.ethereumContractClient = new EthereumContractClient();
  }

  async componentDidMount() {
    await authenticate();
    const contractAddress = await settings.get('contractAddress');
    this.setState({
      contractAddress
    });

    const contract = await this.ethereumContractClient.loadContractPublic(contractAddress);
    const wineCount = await contract.getWineCount();
    this.setState({
      wineCount: wineCount.toNumber()
    });
  }

  render() {
    return(
      <div>
        <Grid item>
          <Typography>Total Wines: {this.state.wineCount}</Typography>
        </Grid>
      </div>
    );
  }
}

export default WineSummarySmartComponent;