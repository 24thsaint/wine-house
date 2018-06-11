import React from 'react';
import { SHA256 } from 'crypto-js';
import WineRegistrationForm from '../dumb/WineRegistrationForm';
import InputHelper from '../helpers/inputHelper';
import WalletUnlockModal from '../dumb/WalletUnlockModal';
import EthereumContractClient from '../ethereumContractClient';
import settings from '../helpers/settings';
import authenticate from '../authenticator';

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
      open: false
    };
    this.inputHelper = new InputHelper(this);
    this.ethereumContractClient = new EthereumContractClient();

    this.registrationFormHandler = this.registrationFormHandler.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleWallet = this.handleWallet.bind(this);
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

  handleOpen() {
    this.setState({
      open: true
    });
  }

  async handleWallet(wallet) {
    const contract = await this.ethereumContractClient.loadContractPrivate(this.state.contractAddress, wallet.privateKey);
    const { cork, capsule, glass, frontLabel, backLabel, bottle } = this.state.formData;
    const uniqueIdentifier = SHA256(this.state.formData).toString();

    console.log(cork, capsule, glass, frontLabel, backLabel, bottle, uniqueIdentifier);

    const transaction = await contract.createWine(cork, capsule, glass, frontLabel, backLabel, bottle, uniqueIdentifier);
    const confirmation = await contract.provider.waitForTransaction(transaction.hash);
    console.log(confirmation);
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
        />
      </div>
    );
  }
}

export default WineRegistrationSmartComponent;