import React from 'react';
import InputHelper from '../helpers/inputHelper';
import { TextField, Grid, Button, Paper } from '@material-ui/core';
import WalletUnlockModal from '../dumb/WalletUnlockModal';
import EthereumContractClient from '../ethereumContractClient';
import StatusDialog from '../dumb/StatusDialog';
import settings from '../helpers/settings';
import authenticate from '../authenticator';
import { PersonAdd } from '@material-ui/icons';

const ethereumContractClient = new EthereumContractClient();

class OwnerRegistrationSmartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        ownerAddress: this.props.ownerAddress || '',
        ownerName: this.props.ownerName || '',
        identificationFile: this.props.identificationFile || 'VOUCHED BY MASTER',
        password: ''
      },
      open: false,
      dialog: {
        open: false,
        isDone: false,
        success: null,
        title: 'Wine Owner Registration',
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
      const result = await contract.registerWineOwner(this.state.formData.ownerAddress, this.state.formData.ownerName, this.state.formData.identificationFile);
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
        <h1>Owner Registration</h1>
        <Paper style={{ padding: 20 }} elevation={5}>
          <form onSubmit={this.handleOpen}>
            <Grid item>
              <TextField
                name="ownerAddress"
                id="ownerAddress"
                label="Owner Address"
                value={this.state.formData.ownerAddress}
                onChange={this.inputHelper.handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                name="ownerName"
                id="ownerName"
                label="Owner Name"
                value={this.state.formData.ownerName}
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
                <PersonAdd style={{marginRight: 5}} /> Register
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

export default OwnerRegistrationSmartComponent;