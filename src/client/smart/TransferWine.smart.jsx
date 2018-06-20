import React from 'react';

import TransferWine from '../dumb/TransferWine';
import InputHelper from '../helpers/inputHelper';
import WallWetUnlockModal from '../dumb/WalletUnlockModal';
import EthereumContractClient from '../ethereumContractClient';
import settings from '../helpers/settings';
import authenticate from '../authenticator';

class TransferWineSmartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        newOwner: '',
        transferWineIdentifier: ''
      },
      open: false
    };
    this.inputHelper = new InputHelper(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleWallet = this.handleWallet.bind(this);
    this.ethereumClient = new EthereumContractClient();
  }

  async componentDidMount() {
    await authenticate();
    const contractAddress = await settings.get('contractAddress');
    this.setState({
      contractAddress
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault(); 
    this.setState({
      open: true
    });
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  async handleWallet(wallet) {
    console.log(wallet);
    const contract = await this.ethereumClient.loadContractPrivate(this.state.contractAddress, wallet.privateKey);
    const transaction = await contract.transferWine(this.state.formData.newOwner, this.state.formData.transferWineIdentifier);
    console.log(transaction);
  }

  render() {
    return (
      <div>
        <TransferWine 
          handleSubmit={this.handleSubmit} 
          handleInputChange={this.inputHelper.handleInputChange}
          formData={this.state.formData} 
        />
        <WallWetUnlockModal 
          open={this.state.open}
          handleClose={this.handleClose}
          handleWallet={this.handleWallet}
        />
      </div>
    );
  }
}

export default TransferWineSmartComponent;