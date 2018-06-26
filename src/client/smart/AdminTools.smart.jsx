import React from 'react';
import { Button, Grid, Typography, TextField, Divider } from '@material-ui/core';

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
        newContractAddress: ''
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
    this.handleNewContract = this.handleNewContract.bind(this);
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

  async handleNewContract() {
    const newContractAddress = this.state.formData.newContractAddress;
    const dialog = this.state.dialog;

    try {
      dialog.open = true;
      dialog.message = 'Setting contract address...';
      this.setState({
        dialog
      });
      await settings.set('contractAddress', newContractAddress);

      dialog.isDone = true;
      dialog.success = true;
      dialog.message = 'Contract address successfully changed to: ' + newContractAddress;
      this.setState({
        dialog
      });
    } catch (e) {
      dialog.isDone = true;
      dialog.success = false;
      dialog.message = 'Error changing contract address: ' + e.message;
      this.setState({
        dialog
      });
    }
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
        
        <Grid 
          container
          direction="column"
          spacing={40}
        >
          <Grid container item direction="row" spacing={40}>
            <Grid item>
              <Typography>Deploy new contract to the network</Typography>
            </Grid>
            <Grid item>
              <Button variant="raised" onClick={this.deployContract}>Deploy Contract</Button>
            </Grid>
          </Grid>
          <Divider />
          <Grid container item direction="row" spacing={40}>
            <Grid item>
              <TextField 
                label="New Contract Address"
                name="newContractAddress"
                onChange={this.inputHelper.handleInputChange}
              >
              </TextField>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={this.handleNewContract}>Overwrite Contract Address</Button>
            </Grid>
          </Grid>
        </Grid>

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