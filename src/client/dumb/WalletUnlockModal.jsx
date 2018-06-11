import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class WalletUnlockDialog extends React.Component {
  constructor(props) {
    super(props);    
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Unlock Wallet</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To proceed with this transaction, please supply your wallet password:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Wallet Password"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.handleClose} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default WalletUnlockDialog;