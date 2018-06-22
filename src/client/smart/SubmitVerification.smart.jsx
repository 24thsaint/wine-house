import React from 'react';
import SubmitVerification from '../dumb/SubmitVerification';
import InputHelper from '../helpers/inputHelper';
import IpfsClient from '../ipfsClient';
import Verfication from '../helpers/verification';
import client from '../client';
import StatusDialog from '../dumb/StatusDialog';

const ipfsClient = new IpfsClient();

class SubmitVerificationSmartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        applicationType: '',
        name: '',
        identificationFile: ''
      },
      dialog: {
        open: false,
        isDone: false,
        title: 'Verification',
        message: ''
      }
    };

    this.inputHelper = new InputHelper(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileInputChange = this.handleFileInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const dialog = this.state.dialog;
    dialog.open = true;
    dialog.message = 'Uploading document...';
    this.setState({
      dialog
    });
    ipfsClient.upload(this.state.formData.identificationFile, this.handleSave);
  }

  async handleSave(status, hash) {
    const dialog = this.state.dialog;
    const user = client.get('user');
    const data = this.state.formData;
    data.identificationFile = hash;
    data.userAddress = user.address;

    const verification = new Verfication();

    dialog.message = 'Submitting verification...';

    this.setState({
      dialog
    });

    const result = await verification.save(data);
    
    dialog.message = 'Verification successfully sent! \nVerification ID: ' + result._id;
    dialog.isDone = true;

    this.setState({
      dialog
    });
  }

  handleFileInputChange(evt) {
    const formData = this.state.formData;
    formData.identificationFile = evt.target.files[0];
    this.setState({
      formData
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
        <SubmitVerification 
          formData={this.state.formData} 
          handleSubmit={this.handleSubmit} 
          handleInputChange={this.inputHelper.handleInputChange}
          handleFileInputChange={this.handleFileInputChange}
        />
        <StatusDialog dialog={this.state.dialog} handleDialogClose={this.handleDialogClose} />
      </div>
    );
  }
}

export default SubmitVerificationSmartComponent;