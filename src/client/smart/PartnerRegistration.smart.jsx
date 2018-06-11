import React from 'react';
import InputHelper from '../helpers/inputHelper';
import { TextField, Grid, Button } from '@material-ui/core';
import WalletUnlockModal from '../dumb/WalletUnlockModal';
import EthereumContractClient from '../ethereumContractClient';
import EthereumWallet from '../ethereumWallet';
import WalletProgress from '../dumb/WalletProgress';
import client from '../client';

const ethereumContractClient = new EthereumContractClient();

class PartnerRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        partnerAddress: '',
        partnerName: '',
        password: ''
      },
      open: false
    };
    this.inputHelper = new InputHelper(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setProgress = this.setProgress.bind(this);

    this.settingsService = client.service('/api/settings');
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  handleOpen(evt) {
    evt.preventDefault();
    this.setState({
      open: true
    });
  }

  setProgress(progress) {
    this.setState({
      progress
    });
  }

  async handleSubmit() {
    this.handleClose();
    const encryptedWallet = client.get('user').wallet;
    this.setState({
      progressMessage: 'Authorizing...'
    });
    try {
      const wallet = await EthereumWallet.unlockWallet(encryptedWallet, this.state.formData.password, this.setProgress);

      this.setState({
        progressMessage: 'Initializing Contract...'
      });
      const settings = await this.settingsService.find({ key: 'contractAddress' });
      const contractAddress = settings.data[0].value;
      const contract = await ethereumContractClient.loadContract(contractAddress, wallet.privateKey);
      this.setState({
        progressMessage: 'Sending Transaction...'
      });
      const result = await contract.addTrustedPartner(this.state.formData.partnerAddress, this.state.formData.partnerName);
      this.setState({
        progressMessage: 'Waiting for Confirmation...'
      });
      const transaction = await contract.provider.waitForTransaction(result.hash);
      console.log(transaction);
    } catch (e) {
      console.log(e);
    }
    this.setProgress(0);
  }

  render() {
    return (
      <div>
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

        <WalletUnlockModal 
          open={this.state.open} 
          handleClose={this.handleClose}
          password={this.state.formData.password} 
          handleInputChange={this.inputHelper.handleInputChange}
          handleSubmit={this.handleSubmit}
        />

        <WalletProgress progress={this.state.progress} message={this.state.progressMessage} />
      </div>
    );
  }
}

export default PartnerRegistration;