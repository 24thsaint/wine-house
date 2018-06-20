import React from 'react';
import EthereumContractClient from '../ethereumContractClient';
import settings from '../helpers/settings';
import authenticate from '../authenticator';
import WineGalleryItem from '../dumb/WineGalleryItem';
import { Typography } from '@material-ui/core';

class WineGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wines: []
    };
    this.ethereumClient = new EthereumContractClient();
  }

  async componentDidMount() {
    const user = await authenticate();
    const contractAddress = await settings.get('contractAddress');
    const contract = await this.ethereumClient.loadContractPublic(contractAddress);
    let wineCount = await contract.getOwnedWineCountOf(user.address);
    wineCount = wineCount.toNumber();
    const wineIdentifiers = [];
    const wines = [];

    for (let index = 0; index < wineCount; index++) {
      const wine = await contract.getWineIdentifierAt(user.address, index);
      wineIdentifiers.push(wine);
    }

    for (let index = 0; index < wineIdentifiers.length; index++) {
      const wine = await contract.retrieveWineData(wineIdentifiers[index]);
      const wineDataObject = {
        backLabel: wine['backLabel'],
        frontLabel: wine['frontLabel'],
        bottle: wine['bottle'],
        capsule: wine['capsule'],
        cork: wine['cork'],
        glass: wine['glass'],
        key: wineIdentifiers[index]
      };

      wines.push(wineDataObject);
    }

    this.setState({
      wines
    });
  }

  render() {
    return (
      <div>
        <Typography variant="title">Wine Gallery ({this.state.wines.length})</Typography>
        <Typography variant="caption">These are the wines you own...</Typography>
        {
          this.state.wines.map(wine => (
            <WineGalleryItem key={wine.key} wine={wine} />
          ))
        }
      </div>
    );
  }
}

export default WineGallery;