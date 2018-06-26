/* global Blob, document */
import React from 'react';
import { TextField, Typography, Button, FormControl, Paper, Grid, InputAdornment, IconButton } from '@material-ui/core';
import InputHelper from '../helpers/inputHelper';
import client from '../client';
import EthereumWallet from '../ethereumWallet';
import WalletProgress from '../dumb/WalletProgress';
import authenticate from '../authenticator';
import WalletUnlockModal from '../dumb/WalletUnlockModal';
import { FileDownload, FileUpload, Visibility, PhotoCamera } from '@material-ui/icons';
import QRCode from 'qrcode.react';

class WalletImportSmartComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scanner: {
        open: false,
        field: ''
      },
      formData: {
        privateKey: '',
        password: ''
      },
      progress: 0,
      success: {
        status: null,
        message: ''
      },
      open: false,
      privateKey: ''
    };
    this.inputHelper = new InputHelper(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleExport = this.handleExport.bind(this);
    this.handleShowPrivateKey = this.handleShowPrivateKey.bind(this);
    this.handleWallet = this.handleWallet.bind(this);
  }

  async componentDidMount() {
    await authenticate();
  }

  handleScan(data) {
    if (!data) {
      return;
    }

    if (!data.startsWith('0x')) {
      return;
    }
    const scanner = this.state.scanner;
    scanner.open = false;

    const newData = {
      target: {
        name: this.state.scanner.field,
        value: data
      }
    };

    this.inputHelper.handleInputChange(newData);

    this.setState({
      scanner
    });
  }

  toggleScanner(field) {
    const scanner = this.state.scanner;
    scanner.open = !scanner.open;
    scanner.field = field;

    this.setState({
      scanner
    });
  }

  handleProgress(percent) {
    this.setState({
      progress: percent
    });
  }

  handleExport() {
    const wallet = client.get('wallet');

    const blob = new Blob([JSON.stringify(wallet)], {
      'type': 'application/json'
    });

    const fileDownloader = document.createElement('a');

    fileDownloader.download = `UTC--${new Date().toUTCString()}--${wallet.address}`;
    fileDownloader.href = URL.createObjectURL(blob);
    document.body.appendChild(fileDownloader);

    fileDownloader.click();

    document.body.removeChild(fileDownloader);
  }

  handleShowPrivateKey() {
    this.setState({
      open: !this.state.open
    });
  }

  handleWallet(wallet) {
    this.setState({
      privateKey: wallet.privateKey
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
          message: e.message
        }
      });
    }
  }

  render() {
    return (
      <div style={{ margin: 100 }}>
        <Paper elevation={5} style={{ padding: 20 }}>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="headline">Import an existing wallet from a private key</Typography>

              {
                this.state.success.status === true ?
                  <Typography variant="headline">Wallet Successfully Imported!</Typography>
                  : undefined
              }

              {
                this.state.success.status === false ?
                  <Typography variant="headline">Wallet Import Failed: {this.state.success.message}</Typography>
                  : undefined
              }
            </Grid>

            <form onSubmit={this.handleSubmit}>
              <Grid item style={{overflowX: 'auto'}}>
                <FormControl>
                  <TextField
                    id="privateKey"
                    name="privateKey"
                    label="Private Key"
                    value={this.state.formData.privateKey}
                    onChange={this.inputHelper.handleInputChange}
                    margin="normal"
                    InputProps={{
                      endAdornment:
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => { this.toggleScanner('privateKey'); }}
                        >
                          <PhotoCamera />
                        </IconButton>
                      </InputAdornment>
                    }}
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
                  <Button variant="raised" color="primary" type="submit" onClick={this.handleSubmit}>
                    <FileUpload style={{ marginRight: 5 }} /> Import
                  </Button>
                </FormControl>
              </Grid>
            </form>
          </Grid>
        </Paper>

        <Paper style={{ marginTop: 20, padding: 20 }} elevation={5}>
          <Grid container direction="column" alignItems="flex-start" spacing={24}>
            {
              this.state.privateKey ?
                <Grid container item direction="row" spacing={24}>
                  <Grid item>
                    <QRCode value={this.state.privateKey} />
                  </Grid>
                  <Grid item>
                    <TextField style={{ marginBottom: 10 }} fullWidth label="Private Key" value={this.state.privateKey} contentEditable={false}></TextField>
                  </Grid>
                </Grid>
                : undefined
            }

            <Grid container item direction="row" spacing={24}>
              <Grid item>
                <Button variant="contained" color="primary" onClick={this.handleExport}>
                  <FileDownload style={{ marginRight: 5 }} /> Download current wallet
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={this.handleShowPrivateKey}>
                  <Visibility style={{ marginRight: 5 }} /> Show current wallet private key
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        <WalletUnlockModal
          open={this.state.open}
          handleWallet={this.handleWallet}
          handleClose={this.handleShowPrivateKey}
        />
      </div>
    );
  }
}

export default WalletImportSmartComponent;