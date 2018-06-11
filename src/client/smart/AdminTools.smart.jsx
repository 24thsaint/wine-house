import React from 'react';
import { Button } from '@material-ui/core';
import EthereumContract from '../ethereumContractClient';
import WalletUnlockModal from '../dumb/WalletUnlockModal';

class AdminTools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.deployContract = this.deployContract.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.ethereumContract = new EthereumContract();
  }

  deployContract() {
    this.handleOpen();
  }

  handleOpen() {
    this.setState({
      open: true
    });
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  render() {
    return (
      <div>
        <Button variant="raised" onClick={this.deployContract}>Deploy Contract</Button>
        <WalletUnlockModal open={this.state.open} handleClose={this.handleClose} />
      </div>
    );
  }
}

export default AdminTools;