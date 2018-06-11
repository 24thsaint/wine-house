import React from 'react';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import EthereumContract from '../ethereumContractClient';
import WalletUnlockModal from '../dumb/WalletUnlockModal';
import EthereumWallet from '../ethereumWallet';
import client from '../client';
import InputHelper from '../helpers/inputHelper';
import WalletProgress from '../dumb/WalletProgress';

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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setProgress = this.setProgress.bind(this);
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

  setProgress(progress) {
    this.setState({
      progress: progress
    });
  } 

  setDeployProgressMessage(status, message) {
    this.setState({
      deployProgressMessage: status
    });
  }

  async handleSubmit() {
    this.handleClose();
    const encryptedWallet = client.get('user').wallet;
    this.setDeployProgressMessage('Unlocking wallet...');
    const result = await EthereumWallet.unlockWallet(encryptedWallet, this.state.formData.password, this.setProgress);
    const contractAddress = await this.ethereumContract.deployContract(result.privateKey, this.setDeployProgressMessage);

    let setting;
    const extSetting = await this.settingsService.find({ value: 'contractAddress' });
    if (extSetting.data.length > 0) {
      setting = await this.settingsService.patch(extSetting[0]._id, { value: contractAddress });
    } else {
      setting = await this.settingsService.create({
        key: 'contractAddress',
        value: contractAddress
      });
    }
    
    this.setProgress(0);
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
          handleSubmit={this.handleSubmit}
          password={this.state.formData.password} 
          handleInputChange={this.inputHelper.handleInputChange}
        />
        <WalletProgress 
          progress={this.state.progress} 
          message={this.state.deployProgressMessage}
        />

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