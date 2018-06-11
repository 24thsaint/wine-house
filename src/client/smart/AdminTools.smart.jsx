import React from 'react';
import { Button, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import EthereumContract from '../ethereumContractClient';
import WalletUnlockModal from '../dumb/WalletUnlockModal';
import client from '../client';
import InputHelper from '../helpers/inputHelper';
import settings from '../helpers/settings';

class AdminTools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      formData: {
        password: ''
      },
      unlockProgress: 0,
      notificationOpen: false,
      notificationMessage: ''
    };
    this.deployContract = this.deployContract.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleWallet = this.handleWallet.bind(this);
    this.setDeployProgressMessage = this.setDeployProgressMessage.bind(this);
    this.handleCloseNotification = this.handleCloseNotification.bind(this);

    this.ethereumContract = new EthereumContract();
    this.inputHelper = new InputHelper(this);

    this.settingsService = client.service('/api/settings');
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

  handleCloseNotification() {
    this.setState({
      notificationOpen: false
    });
  }

  setDeployProgressMessage(status, message) {
    this.setState({
      deployProgressStatus: status,
      deployProgressMessage: message
    });
  }

  async handleWallet(wallet) {
    this.handleClose();
    const contractAddress = await this.ethereumContract.deployContract(wallet.privateKey, this.setDeployProgressMessage);

    let setting = await settings.set('contractAddress', contractAddress);

    this.setState({
      notificationOpen: true,
      notificationMessage: 'Contract deploy successful! Address: ' + setting.value
    });
  }

  render() {
    return (
      <div>
        <Button variant="raised" onClick={this.deployContract}>Deploy Contract</Button>
        <WalletUnlockModal 
          open={this.state.open} 
          handleClose={this.handleClose}
          handleWallet={this.handleWallet}
        />

        <Typography>{this.state.deployProgressStatus}</Typography>

        <Dialog
          open={this.state.notificationOpen}
          onClose={this.handleCloseNotification}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Success!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.notificationMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseNotification} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AdminTools;