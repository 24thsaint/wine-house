import React from 'react';
import { Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@material-ui/core';
import IPFSClient from '../ipfsClient';

class ViewVerificationItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: {
        open: false,
        title: '',
        message: ''
      }
    };
    this.handleOpenDocument = this.handleOpenDocument.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  handleOpenDocument(name, hash) {
    const dialog = this.state.dialog;
    dialog.open = true;
    dialog.title = name;
    dialog.content = IPFSClient.path(hash);
    this.setState({
      dialog
    });
  }

  handleDialogClose() {
    const dialog = this.state.dialog;
    dialog.open = false;
    this.setState({
      dialog
    });
  }

  render() {
    return (
      <div>
        <Paper elevation={4} style={{margin: 30, marginLeft: 50, marginRight: 50}}>
          <Grid item style={{padding: 20, paddingBottom: 0}}>
            <Typography>Application type: { this.props.data.applicationType.toUpperCase() }</Typography>
            <Typography>Name: { this.props.data.name }</Typography>
          </Grid>
          <Grid item style={{margin: 20}}>
            <Button 
              variant="raised" 
              onClick={() => {this.handleOpenDocument(this.props.data.name, this.props.data.identificationFile);}}
            >
              View submitted identification proof
            </Button>
          </Grid>
          <Grid item style={{ padding: 20, backgroundColor: '#EFE0B9'}}>
            <Button color="secondary" variant="outlined" style={{marginRight: 10}} onClick={this.props.handleAccept}>
              Accept
            </Button>
            <Button color="primary" variant="outlined" onClick={this.props.handleReject}>
              Reject
            </Button>
          </Grid>
        </Paper>

        <Dialog
          open={this.state.dialog.open}
          onClose={this.handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {this.state.dialog.title}
          </DialogTitle>
          <DialogContent>
            <img id={this.state.dialog.title} src={this.state.dialog.content} style={{objectFit: 'contain'}} width="100%" />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="default" autoFocus>
                Close
            </Button>
            <Button variant="contained" color="primary" autoFocus>
              <a href={this.state.dialog.content} target="blank" style={{color: 'white'}} >
                Download
              </a>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ViewVerificationItem;