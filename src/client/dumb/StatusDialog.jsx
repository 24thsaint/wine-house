import React from 'react';
import { DialogContent, Dialog, DialogTitle, DialogContentText, DialogActions, Button, CircularProgress } from '@material-ui/core';
import { Check, Error } from '@material-ui/icons';

class StatusDialog extends React.Component {
  render() {
    return (
      <Dialog
        disableBackdropClick={true}
        open={this.props.dialog.open}
        onClose={this.props.handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {
            this.props.dialog.isDone ? (this.props.dialog.success ? <Check color="primary" /> : <Error color="error" />) : <CircularProgress />
          }
          <span style={{marginLeft: 20}}>{this.props.dialog.title}</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.props.dialog.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            this.props.dialog.isDone ? 
              <Button onClick={this.props.handleDialogClose} color="primary" autoFocus>
                Ok
              </Button>
              : undefined
          }
        </DialogActions>
      </Dialog>
    );
  }
}

export default StatusDialog;