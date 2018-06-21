import React from 'react';
import { DialogContent, Dialog, DialogTitle, DialogContentText, DialogActions, Button, CircularProgress, Grid } from '@material-ui/core';
import { Check } from '@material-ui/icons';

class StatusDialog extends React.Component {
  render() {
    return (
      <Dialog
        open={this.props.dialog.open}
        onClose={this.props.handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{this.props.dialog.title || ''}</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={6}>
              {
                this.props.dialog.isDone ? <Check /> : <CircularProgress />
              }
            </Grid>
            <Grid item xs={6}>
              <DialogContentText id="alert-dialog-description">
                {this.props.dialog.message}
              </DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleDialogClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default StatusDialog;