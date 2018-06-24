import React from 'react';
import { Button } from '@material-ui/core';

import EthereumContract from '../ethereumContractClient';
import WalletUnlockModal from '../dumb/WalletUnlockModal';
import client from '../client';
import InputHelper from '../helpers/inputHelper';
import settings from '../helpers/settings';
import StatusDialog from '../dumb/StatusDialog';

class AdminTools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      formData: {
        password: ''
      },
      unlockProgress: 0,
      dialog: {
        open: false,
        isDone: false,
        title: 'Contract Deployment',
        message: '',
        success: null
      }
    };
    this.deployContract = this.deployContract.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleWallet = this.handleWallet.bind(this);
    this.setDeployProgressMessage = this.setDeployProgressMessage.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.ethereumContract = new EthereumContract();
    this.inputHelper = new InputHelper(this);
  }

  async deployContract() {
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

  handleDialogClose() {
    const dialog = this.state.dialog;
    dialog.open = false;

    this.setState({
      dialog
    });
  }

  setDeployProgressMessage(status, message) {
    const dialog = this.state.dialog;  
    dialog.message = status;
    console.log(message);

    this.setState({
      dialog
    });
  }

  async handleWallet(wallet) {
    this.handleClose();
    const dialog = this.state.dialog;

    try {
      dialog.message = 'Deploying contract...';
      dialog.open = true;
      this.setState({
        dialog
      });

      const contractAddress = await this.ethereumContract.deployContract(wallet.privateKey, this.setDeployProgressMessage);

      dialog.message = 'Saving contract address...';      
      this.setState({
        dialog
      });

      let setting = await settings.set('contractAddress', contractAddress);
      const user = client.get('user');
      await client.service('/api/users').patch(user._id, {status: 'master'});

      dialog.message = 'Contract deploy successful! \nAddress: ' + setting.value;
      dialog.isDone = true;
      dialog.success = true;
      this.setState({
        dialog
      });
    } catch (e) {
      dialog.message = 'Contract creation failed: ' + e.message;
      dialog.isDone = true;
      dialog.success = false;
      this.setState({
        dialog
      });
    }
  }

  render() {
    return (
      <div style={{margin: 100}}>
        <Button variant="raised" onClick={this.deployContract}>Deploy Contract</Button>
        <WalletUnlockModal 
          open={this.state.open} 
          handleClose={this.handleClose}
          handleWallet={this.handleWallet}
        />

        <StatusDialog dialog={this.state.dialog} handleDialogClose={this.handleDialogClose} />
      </div>
    );
  }
}

export default AdminTools;