import React from 'react';
import { TextField, Typography, Button } from '@material-ui/core';
import InputHelper from '../helpers/inputHelper';
import client from '../client';
import EthereumWallet from '../ethereumWallet';
import WalletProgress from '../dumb/WalletProgress';
import authenticate from '../authenticator';

class WalletImportSmartComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        privateKey: '',
        password: ''
      },
      progress: 0,
      success: {
        status: null,
        message: ''
      }
    };
    this.inputHelper = new InputHelper(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
  }

  async componentDidMount() {
    await authenticate();
  }

  handleProgress(percent) {
    this.setState({
      progress: percent
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    try {
      const ethereumWallet = new EthereumWallet('0x' + this.state.formData.privateKey);
      const encryptedWallet = await ethereumWallet.wallet.encrypt(this.state.formData.password, this.handleProgress);
      const user = client.get('user');
      const result = await client.service('/api/users').patch(user._id, { wallet: encryptedWallet, address: ethereumWallet.wallet.address });
      client.set('user', result);
      this.setState({
        success: {
          status: true,
          message: result
        }
      }); 
    } catch (e) {
      this.setState({
        success: {
          status: false,
          message: e
        }
      });
    }
  }

  render() {
    return (
      <div>
        <Typography variant="headline">Import an existing wallet from a private key</Typography>

        {
          this.state.success.status ===  true ?
            <Typography variant="headline">Wallet Successfully Imported!</Typography>
            : undefined
        }

        {
          this.state.success.status ===  false ?
            <Typography variant="headline">Wallet Import Failed: {this.state.success.message}</Typography>
            : undefined
        }

        <form onSubmit={this.handleSubmit}>
          <TextField
            id="privateKey"
            name="privateKey"
            label="Private Key"
            value={this.state.formData.privateKey}
            onChange={this.inputHelper.handleInputChange}
            margin="normal"
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            value={this.state.formData.password}
            onChange={this.inputHelper.handleInputChange}
            margin="normal"
          />
          <WalletProgress progress={this.state.progress} />
          <Button variant="raised" type="submit" onClick={this.handleSubmit}>Import</Button>
        </form>
      </div>
    );
  }
}

export default WalletImportSmartComponent;