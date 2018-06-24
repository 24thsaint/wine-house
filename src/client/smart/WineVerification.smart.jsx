import React from 'react';
import WineVerification from '../dumb/WineVerification';
import InputHelper from '../helpers/inputHelper';
import EthereumContract from '../ethereumContractClient';
import settings from '../helpers/settings';
import WineDataDisplay from '../dumb/WineDataDisplay';
import { Grid, Typography } from '@material-ui/core';

class WineVerificationSmartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        wineIdentifier: ''
      },
      wine: {},
      isWineDataRetrieved: false,
      isError: false,
      errorMsg: ''
    };
    this.inputHelper = new InputHelper(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.ethereumContract = new EthereumContract();
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    try {
      const wineIdentifier = this.state.formData.wineIdentifier;
      const contractAddress = await settings.get('contractAddress');
      const contract = await this.ethereumContract.loadContractPublic(contractAddress);

      const response = await contract.retrieveWineData(wineIdentifier);
      
      const wine = {
        backLabel: response.backLabel,
        bottle: response.bottle,
        capsule: response.capsule,
        cork: response.cork,
        frontLabel: response.frontLabel,
        glass: response.glass,
      };

      const emptyWineSchema = {
        backLabel: '',
        bottle: '',
        capsule: '',
        cork: '',
        frontLabel: '',
        glass: ''
      };

      if (JSON.stringify(wine) === JSON.stringify(emptyWineSchema)) {
        throw new Error('Wine not found');
      }

      const currentWineOwner = await contract.getWineOwner(response.currentOwner);
      const ownerHistoryCount = await contract.getOwnerHistoryCountOf(wineIdentifier);
      wine.ownerHistoryCount = ownerHistoryCount;
      const ownerHistory = [];

      for (let index = 0; index < ownerHistoryCount; index++) {
        const ownerAddress = await contract.getOwnerHistoryAt(wineIdentifier, index);
        const owner = await contract.getWineOwner(ownerAddress);
        ownerHistory.push({address: owner[0], name: owner[1]});
      }
    
      wine.ownerHistory = ownerHistory;

      this.setState({
        isWineDataRetrieved: true,
        wine,
        wineOwner: currentWineOwner[1],
      });
    } catch (e) {
      this.setState({
        isWineDataRetrieved: true,
        isError: true,
        errorMsg: 'Verification failed: ' + e.message
      });
    }
  }

  render() {
    return (
      <div>
        <Grid
          container
          alignItems={'center'}
          justify={'center'}
          direction={'column'}
        >
          { !this.state.isWineDataRetrieved ? 
            <Grid item>
              <WineVerification 
                handleInputChange={this.inputHelper.handleInputChange} 
                formData={this.state.formData}
                handleSubmit={this.handleSubmit}
              /> 
            </Grid>
            : undefined
          }

          {
            this.state.isWineDataRetrieved && !this.state.isError ?
              <Grid item>
                <WineDataDisplay 
                  wine={this.state.wine} 
                  wineOwner={this.state.wineOwner}
                />
              </Grid>
              : 
              <Grid item style={{marginTop: 50}}>
                <Typography color="error">{this.state.errorMsg}</Typography>
              </Grid>
          }
        </Grid>
      </div>
    );
  }
}

export default WineVerificationSmartComponent;