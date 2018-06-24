import React from 'react';
import ViewVerificationItem from '../dumb/ViewVerificationItem';
import VerificationsHelper from '../helpers/verification';
import authenticate from '../authenticator';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Grid } from '@material-ui/core';
import PartnerRegistration from './PartnerRegistration.smart';
import OwnerRegistration from './OwnerRegistration.smart';
import client from '../client';

class ViewVerificationsSmartComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      verifications: [],
      executeAcceptedEvent: false,
      executeAcceptedEventData: {},
      dialog: {
        title: 'User Verification',
      },
      isError: false,
      errorMsg: '',
      isLoading: true,
      action: {
        requestId: '',
        status: ''
      }
    };

    this.verificationsHelper = new VerificationsHelper();
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.executeSave = this.executeSave.bind(this);
  }

  async componentDidMount() {
    try {
      await authenticate();
      const verifications = await this.verificationsHelper.getAllPending();
      this.setState({
        verifications,
        isLoading: false
      });
    } catch (e) {
      this.setState({
        isLoading: false,
        isError: true,
        errorMsg: 'Unable to retrieve pending requests: ' + e.message
      });
    }
  }

  async handleAccept(data) {
    this.setState({
      executeAcceptedEvent: true,
      executeAcceptedEventData: data
    });
  }
  
  async executeSave(status, id) {
    const action = this.state.action;
    action.requestId = id;

    try {
      if (status) {
        await this.verificationsHelper.accept(id);
        const result = await this.verificationsHelper.find(id);
        const queryResult = await client.service('/api/users').find({
          query: {
            address: result.userAddress
          }
        });
        const userResult = queryResult.data[0];
        await client.service('/api/users').patch(userResult._id, {status: result.applicationType});
  
        action.status = 'Application ACCEPTED';
        this.setState({
          action
        });
      } else {
        action.status = 'Accept ERROR: Internal server error';
        this.setState({
          action
        });
      }
    } catch (e) {
      action.status = 'Accept ERROR: ' + e.message;
      this.setState({
        action
      });
    }
  }

  async handleReject(data) {
    const action = this.state.action;
    action.requestId = data._id;
    try {
      await this.verificationsHelper.reject(data._id);

      action.status = 'Application REJECTED';
      this.setState({
        action
      });
    } catch (e) {
      action.status = 'Rejection ERROR: ' + e.message;
      this.setState({
        action
      });
    }
  }

  handleDialogClose() {
    this.setState({
      executeAcceptedEvent: false
    });
  }
 
  render() {
    return (
      <div>
        {
          this.state.isLoading ? 
            <Grid container item justify="center">
              <CircularProgress />
            </Grid>
            :
            <div>
              <Typography align="center" variant="title">Pending Verification Requests</Typography>
              {
                this.state.verifications.map(data => (
                  <ViewVerificationItem 
                    key={data._id} 
                    data={data}
                    handleAccept={() => {this.handleAccept(data);}}
                    handleReject={() => {this.handleReject(data);}}
                    action={this.state.action}
                  />
                ))
              }

              <Dialog
                open={this.state.executeAcceptedEvent}
                onClose={this.handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {this.state.dialog.title}
                </DialogTitle>
                <DialogContent style={{padding: 40}}>
                  {
                    this.state.executeAcceptedEventData.applicationType === 'partner' ?
                      <PartnerRegistration 
                        partnerAddress={this.state.executeAcceptedEventData.userAddress}
                        partnerName={this.state.executeAcceptedEventData.name}
                        identificationFile={this.state.executeAcceptedEventData.identificationFile}
                        requestId={this.state.executeAcceptedEventData._id}
                        executeSaveCallback={this.executeSave}
                        executeCloseCallback={this.handleDialogClose}
                      />
                      : undefined
                  }
                  {
                    this.state.executeAcceptedEventData.applicationType === 'owner' ?
                      <OwnerRegistration 
                        ownerAddress={this.state.executeAcceptedEventData.userAddress}
                        ownerName={this.state.executeAcceptedEventData.name}
                        identificationFile={this.state.executeAcceptedEventData.identificationFile}
                        requestId={this.state.executeAcceptedEventData._id}
                        executeSaveCallback={this.executeSave}
                        executeCloseCallback={this.handleDialogClose}
                      />
                      : undefined
                  }
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleDialogClose} color="default">
                Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
        }
      </div>
    );
  }
}

export default ViewVerificationsSmartComponent;