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
      open: false
    };
    this.inputHelper = new InputHelper(this);
    this.registrationFormHandler = this.registrationFormHandler.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  async componentDidMount() {
    this.userService = await client.service('api/users');
  }

  async registrationFormHandler(evt) {
    evt.preventDefault();
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