import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import client from '../client';
import EthereumWallet from '../ethereumWallet';
import WalletProgress from '../dumb/WalletProgress';
import InputHelper from '../helpers/inputHelper';

class WalletUnlockModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // 0 - neutral, 1 - authorizing, 2 - success, 3 - fail
      progressStage: 0,
      formData: {
        password: ''
      },
      message: '',
      progress: 0
    };

    this.inputHelper = new InputHelper(this);
    this.progressHandler = this.progressHandler.bind(this);
    this.unlockWallet = this.unlockWallet.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  progressHandler(progress) {
    this.setState({
      progress
    });

    if (progress === 1) {
      this.setState({
        progressStage: 2
      });
    }
  }

  async unlockWallet() {
    this.setState({
      progressStage: 1
    });
    const user = client.get('user');
    const wallet = user.wallet;
    try {
      const unlockedWallet = await EthereumWallet.unlockWallet(wallet, this.state.formData.password, this.progressHandler);
      this.props.handleWallet(unlockedWallet);
      if (this.props.autoClose) {
        this.handleClose();
      }
    } catch (e) {
      this.setState({
        progressStage: 3,
        message: e.message
      });
    }
  }

  handleClose() {
    this.props.handleClose();
    setTimeout(function() {
      this.setState({
        formData: {
          password: ''
        },
        progressStage: 0
      });
    }.bind(this), 1000);
  }

  render() {
    return (
      <div>
        <Dialog
          disableBackdropClick={true}
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Unlock Wallet</DialogTitle>

          {
            this.state.progressStage === 0 ? 
              <DialogContent>
                <DialogContentText>
                  To proceed with this transaction, please supply your wallet password:
                </DialogContentText>
                <TextField
                  autoFocus
                  onChange={this.inputHelper.handleInputChange}
                  value={this.state.formData.password}
                  name="password"
                  margin="dense"
                  id="password"
                  label="Wallet Password"
                  type="password"
                  fullWidth
                />
              </DialogContent>
              : undefined
          }

          {
            this.state.progressStage === 1 ?
              <DialogContent>
                <DialogContentText>
                  Processing...
                </DialogContentText>
                <WalletProgress progress={this.state.progress} />
              </DialogContent>
              : undefined
          }

          {
            this.state.progressStage === 2 ? 
              <DialogContent>
                <DialogContentText>
                  SUCCESSFUL!
                </DialogContentText>
              </DialogContent>
              : undefined
          }

          {
            this.state.progressStage === 3 ?
              <DialogContent>
                <DialogContentText>
                  FAILED: {this.state.message}!
                </DialogContentText>
              </DialogContent>
              : undefined
          }
          
          {
            this.state.progressStage === 0 ? 
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
              Cancel
                </Button>
                <Button onClick={this.unlockWallet} color="primary">
              Confirm
                </Button>
              </DialogActions>
              : undefined
          }

          {
            this.state.progressStage === 2 || this.state.progressStage === 3 ? 
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  OK
                </Button>
              </DialogActions>
              : undefined
          }
        </Dialog>
      </div>
    );
  }
}

export default WalletUnlockModal;