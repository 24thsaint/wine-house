import React from 'react';
import ViewVerificationItem from '../dumb/ViewVerificationItem';
import VerificationsHelper from '../helpers/verification';
import authenticate from '../authenticator';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
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
      }
    };

    this.verificationsHelper = new VerificationsHelper();
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.executeSave = this.executeSave.bind(this);
  }

  async componentDidMount() {
    await authenticate();
    const verifications = await this.verificationsHelper.getAllPending();
    this.setState({
      verifications
    });
  }

  async handleAccept(data) {
    this.setState({
      executeAcceptedEvent: true,
      executeAcceptedEventData: data
    });
  }
  
  async executeSave(status, id) {
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
    }
  }

  async handleReject(data) {
    await this.verificationsHelper.reject(data._id);
  }

  handleDialogClose() {
    this.setState({
      executeAcceptedEvent: false
    });
  }
 
  render() {
    return (
      <div>
        <Typography align="center" variant="title">Pending Verification Requests</Typography>
        {
          this.state.verifications.map(data => (
            <ViewVerificationItem 
              key={data._id} 
              data={data}
              handleAccept={() => {this.handleAccept(data);}}
              handleReject={() => {this.handleReject(data);}}
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
    );
  }
}

export default ViewVerificationsSmartComponent;