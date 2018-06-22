import React from 'react';
import SubmitVerification from '../dumb/SubmitVerification';
import InputHelper from '../helpers/inputHelper';
import IpfsClient from '../ipfsClient';
const ipfsClient = new IpfsClient();

class SubmitVerificationSmartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        applicationType: '',
        name: '',
        identificationFile: ''
      }
    };

    this.inputHelper = new InputHelper(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileInputChange = this.handleFileInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    ipfsClient.upload(this.state.formData.identificationFile, this.handleSave);
  }

  handleSave(status, hash) {
    console.log(status, hash);
  }

  handleFileInputChange(evt) {
    const formData = this.state.formData;
    formData.identificationFile = evt.target.files[0];
    this.setState({
      formData
    });
  }

  render() {
    return (
      <SubmitVerification 
        formData={this.state.formData} 
        handleSubmit={this.handleSubmit} 
        handleInputChange={this.inputHelper.handleInputChange}
        handleFileInputChange={this.handleFileInputChange}
      />
    );
  }
}

export default SubmitVerificationSmartComponent;