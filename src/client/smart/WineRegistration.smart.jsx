import React from 'react';
import { SHA256 } from 'crypto-js';
import WineRegistrationForm from '../dumb/WineRegistrationForm';
import InputHelper from '../helpers/inputHelper';
import WalletUnlockModal from '../dumb/WalletUnlockModal';
import EthereumContractClient from '../ethereumContractClient';
import settings from '../helpers/settings';
import authenticate from '../authenticator';
import StatusDialog from '../dumb/StatusDialog';

class WineRegistrationSmartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        cork: '',
        capsule: '',
        glass: '',
        frontLabel: '',
        backLabel: '',
        bottle: ''
      },
      open: false,
      dialog: {
        open: false,
        success: null,
        isDone: false,
        title: 'Wine Registration',
        message: ''
      }
    };
    this.inputHelper = new InputHelper(this);
    this.ethereumContractClient = new EthereumContractClient();

    this.registrationFormHandler = this.registrationFormHandler.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
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

  registrationFormHandler(evt) {
    evt.preventDefault();
    this.handleOpen();
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

  handleOpen() {
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
      const contract = await this.ethereumContractClient.loadContractPrivate(this.state.contractAddress, wallet.privateKey);
      const { cork, capsule, glass, frontLabel, backLabel, bottle } = this.state.formData;
      const uniqueIdentifier = SHA256(JSON.stringify(this.state.formData)).toString();
  
      dialog.message = 'Creating wine...';
      this.setState({
        dialog
      });
  
      const transaction = await contract.createWine(cork, capsule, glass, frontLabel, backLabel, bottle, uniqueIdentifier);
      await contract.provider.waitForTransaction(transaction.hash);
      
      dialog.message = 'Wine created!\nUnique identifier: ' + uniqueIdentifier;
      dialog.isDone = true;
      dialog.success = true;
      
      this.setState({
        dialog
      });
    } catch (e) {
      dialog.isDone = true;
      dialog.success = false;
      dialog.message = 'Wine registration failed: ' + e.message;
      this.setState({
        dialog
      });
    }
  }

  render() {
    return (
      <div>
        <WineRegistrationForm
          handleRegister={this.registrationFormHandler}
          handleInputChange={this.inputHelper.handleInputChange}
          formData={this.state.formData}
        />
        <WalletUnlockModal 
          open={this.state.open}
          handleClose={this.handleClose}
          handleWallet={this.handleWallet}
          autoClose={true}
        />
        <StatusDialog dialog={this.state.dialog} handleDialogClose={this.handleDialogClose} />
      </div>
    );
  }
}

export default WineRegistrationSmartComponent;