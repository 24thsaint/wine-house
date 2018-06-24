import React from 'react';

import TransferWine from '../dumb/TransferWine';
import InputHelper from '../helpers/inputHelper';
import WalletUnlockModal from '../dumb/WalletUnlockModal';
import EthereumContractClient from '../ethereumContractClient';
import settings from '../helpers/settings';
import authenticate from '../authenticator';
import StatusDialog from '../dumb/StatusDialog';

class TransferWineSmartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        newOwner: '',
        transferWineIdentifier: this.props.match.params.wineId || ''
      },
      open: false,
      dialog: {
        open: false,
        isDone: false,
        success: null,
        title: 'Transfer Wine',
        message: ''
      }
    };
    this.inputHelper = new InputHelper(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleWallet = this.handleWallet.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
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

  handleDialogClose() {
    const dialog = this.state.dialog;
    dialog.open = false;
    this.setState({
      dialog
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

      const contract = await this.ethereumClient.loadContractPrivate(this.state.contractAddress, wallet.privateKey);

      dialog.message = 'Transferring wine...';
      this.setState({
        dialog
      });

      const transaction = await contract.transferWine(this.state.formData.newOwner, this.state.formData.transferWineIdentifier);
      await contract.provider.waitForTransaction(transaction.hash);

      dialog.isDone = true;
      dialog.success = true;
      dialog.message = 'Wine transfer successful!';
      this.setState({
        dialog
      });
    } catch (e) {
      dialog.isDone = true;
      dialog.success = false;
      dialog.message = 'Wine transfer failed: ' + e.message;
      this.setState({
        dialog
      });
    }
  }

  render() {
    return (
      <div>
        <TransferWine 
          handleSubmit={this.handleSubmit} 
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

export default TransferWineSmartComponent;