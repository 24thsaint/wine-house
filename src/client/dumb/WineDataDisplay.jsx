import React from 'react';
import { Typography, Table, TableBody, TableRow, TableCell, Grid, Divider, TableHead, Tooltip } from '@material-ui/core';
import IPFSClient from '../ipfsClient';

class WineDataDisplay extends React.Component {
  render() {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        style={{ marginTop: 30 }}
      >
        <Grid item style={{ marginBottom: 35 }}>
          <Grid item>
            <Typography align="center">This wine is legitimate if it is currently owned by: </Typography>
          </Grid>
          <Grid item style={{ marginTop: 10, marginBottom: 10 }}>
            <Typography align="center" variant="subheading">
              {
                this.props.wineOwner.proofOfIdentity
                  && this.props.wineOwner.proofOfIdentity !== 'VOUCHED BY MASTER' ?
                  <a href={IPFSClient.path(this.props.wineOwner.proofOfIdentity)} target="blank">
                    <b>{this.props.wineOwner.name}</b>
                  </a>
                  : undefined
              }

              {
                this.props.wineOwner.proofOfIdentity === 'VOUCHED BY MASTER' ?
                  <Tooltip id="tooltip-fab" title="This user has been vouched by master">
                    <b>★ {this.props.wineOwner.name} ★</b>
                  </Tooltip>
                  : undefined
              }

              {
                !this.props.wineOwner.proofOfIdentity ?
                  <b>{this.props.wineOwner.address}</b>
                  : undefined
              }
            </Typography>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Cork</TableCell>
                <TableCell>{this.props.wine.cork}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Capsule</TableCell>
                <TableCell>{this.props.wine.capsule}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bottle</TableCell>
                <TableCell>{this.props.wine.bottle}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Glass</TableCell>
                <TableCell>{this.props.wine.glass}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Front Label</TableCell>
                <TableCell>{this.props.wine.frontLabel}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Back Label</TableCell>
                <TableCell>{this.props.wine.backLabel}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>

        <Grid item style={{ marginLeft: 20 }}>
          {this.props.wine.ownerHistoryCount > 0 ?
            <Grid item>
              <Typography align="center">This wine was previously owned by:</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell>Official Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    this.props.wine.ownerHistory.map(owner => (
                      <TableRow key={owner.address}>
                        <TableCell>
                          {owner.address}
                        </TableCell>
                        <TableCell>
                          {
                            owner.proofOfIdentity !== 'VOUCHED BY MASTER' ?
                              <a href={IPFSClient.path(owner.proofOfIdentity)}>
                                <b>{owner.name}</b>
                              </a>
                              : <Tooltip id="tooltip-fab" title="This user has been vouched by master">
                                <b>★ {owner.name} ★</b>
                              </Tooltip>
                          }
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </Grid>
            : <Grid item><Typography>This wine has not been transferred, yet!</Typography></Grid>
          }
        </Grid>


      </Grid>
    );
  }
}

export default WineDataDisplay;