import React from 'react';
import EthereumContractClient from '../ethereumContractClient';
import settings from '../helpers/settings';
import authenticate from '../authenticator';
import WineGalleryItem from '../dumb/WineGalleryItem';
import { Typography, Badge, Grid } from '@material-ui/core';
import { Collections } from '@material-ui/icons';

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
      <Grid item>
        <Typography variant="title" align="center">
            Wine Gallery 
          <Badge badgeContent={this.state.wines.length} color="primary">
            <Collections style={{marginLeft: 10}} />
          </Badge>
        </Typography>
        <Typography variant="caption" align="center">These are the wines you own...</Typography>
        {
          this.state.wines.map(wine => (
            <WineGalleryItem key={wine.key} wine={wine} />
          ))
        }
      </Grid>
    );
  }
}

export default WineGallery;