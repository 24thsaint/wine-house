import React from 'react';
import { Redirect } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';

import Registration from '../dumb/Registration';
import InputHelper from '../helpers/inputHelper';
import client from '../client';

import EthereumWallet from '../ethereumWallet';

class RegistrationSmartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        fullClientName: '',
        username: '',
        password: ''
      },
      // 0 = neutral, 1 = error, 2 = successful, 3 = success redirect
      registrationStatus: 0,
      open: false,
      walletProgress: 0
    };
    this.inputHelper = new InputHelper(this);
    this.registrationFormHandler = this.registrationFormHandler.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setWalletProgress = this.setWalletProgress.bind(this);
  }

  async componentDidMount() {
    this.userService = await client.service('api/users');
  }

  setWalletProgress(progress) {
    this.setState({
      walletProgress: progress
    });
  }

  async registrationFormHandler(evt) {
    evt.preventDefault();
    const formData = this.state.formData;
    const ethereumWallet = new EthereumWallet();
    
    formData.wallet = await ethereumWallet.wallet.encrypt(formData.password, this.setWalletProgress);
    formData.address = '0x' + JSON.parse(formData.wallet).address;

    const result = await this.userService.create(this.state.formData);

    if (result._id) {
      this.setState({
        registrationStatus: 2,
        open: true
      });
    } else {
      this.setState({
        registrationStatus: 1
      });
    }
  }

  handleClose() {
    this.setState({
      registrationStatus: 3
    });
  } 

  render() {
    return (
      <div>
        <Registration
          handleRegister={this.registrationFormHandler}
          handleInputChange={this.inputHelper.handleInputChange}
          formData={this.state.formData}
          walletProgress={this.state.walletProgress}
        />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Registration Successful!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You may now login.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        {this.state.registrationStatus === 3 ? <Redirect to="/" /> : undefined}
      </div>
    );
  }
}

export default RegistrationSmartComponent;