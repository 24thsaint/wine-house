import React from 'react';
import InputHelper from '../helpers/inputHelper';
import { TextField, Grid, Button, Paper } from '@material-ui/core';
import WalletUnlockModal from '../dumb/WalletUnlockModal';
import EthereumContractClient from '../ethereumContractClient';
import StatusDialog from '../dumb/StatusDialog';
import settings from '../helpers/settings';
import authenticate from '../authenticator';

const ethereumContractClient = new EthereumContractClient();

class PartnerRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        partnerAddress: this.props.partnerAddress || '',
        partnerName: this.props.partnerName || '',
        identificationFile: this.props.identificationFile || 'VOUCHED BY MASTER',
        password: ''
      },
      open: false,
      dialog: {
        open: false,
        success: null,
        isDone: false,
        title: 'Partner Registration',
        message: ''
      },
      contractAddress: ''
    };
    this.inputHelper = new InputHelper(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleWallet = this.handleWallet.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  async componentDidMount() {
    await authenticate();
    const contractAddress = await settings.get('contractAddress');
    this.setState({
      contractAddress
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
    if (this.props.executeCloseCallback) {
      this.props.executeCloseCallback();
    }
  }

  handleOpen(evt) {
    evt.preventDefault();
    this.setState({
      open: true
    });
  }

  async handleWallet(wallet) {
    const dialog = this.state.dialog;

    try {
      dialog.open = true;
      dialog.message = 'Initializing Contract...';
      this.setState({
        dialog
      });
      const contractAddress = this.state.contractAddress;
      const contract = await ethereumContractClient.loadContractPrivate(contractAddress, wallet.privateKey);
      
      dialog.message = 'Registering Trusted Partner...';
      this.setState({
        dialog
      });
      const result = await contract.addTrustedPartner(this.state.formData.partnerAddress, this.state.formData.partnerName, this.state.formData.identificationFile);
      await contract.provider.waitForTransaction(result.hash);
      if (this.props.executeSaveCallback) {
        await this.props.executeSaveCallback(true, this.props.requestId);
      }

      dialog.isDone = true;
      dialog.success = true;
      dialog.message = 'Partner successfully registered!';
      this.setState({
        dialog
      });
    } catch (e) {
      dialog.isDone = true;
      dialog.success = false;
      dialog.message = 'Registration failed: ' + e.message;
      this.setState({
        dialog
      });
    }
  }

  render() {
    return (
      <Grid
        container
        alignItems={'center'}
        justify={'center'}
        direction={'column'}
      >
        <h1>Partner Registration</h1>
        <Paper style={{ padding: 20 }} elevation={5}>
          <form onSubmit={this.handleOpen}>
            <Grid item>
              <TextField
                name="partnerAddress"
                id="partnerAddress"
                label="Partner Address"
                value={this.state.formData.partnerAddress}
                onChange={this.inputHelper.handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                name="partnerName"
                id="partnerName"
                label="Partner Name"
                value={this.state.formData.partnerName}
                onChange={this.inputHelper.handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </form>
        </Paper>

        <WalletUnlockModal 
          open={this.state.open} 
          handleClose={this.handleClose}
          handleWallet={this.handleWallet}
          autoClose={true}
        />

        <StatusDialog dialog={this.state.dialog} handleDialogClose={this.handleDialogClose} />
      </Grid>
    );
  }
}

export default PartnerRegistration;