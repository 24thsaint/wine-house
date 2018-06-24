import React from 'react';
import { Typography, Table, TableBody, TableRow, TableCell, Grid, Divider, TableHead } from '@material-ui/core';

class WineDataDisplay extends React.Component {
  render() {
    return (
      <Grid container direction="row" style={{marginTop: 30}}>
        <Grid item>
          <Grid item>
            <Typography align="center">This wine is legitimate if it is currently owned by: </Typography>
          </Grid>
          <Grid item style={{ marginTop: 10, marginBottom: 10 }}>
            <Typography align="center" variant="subheading">
              <b>{this.props.wineOwner || 'Unverified User'}</b>
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

        <Grid item style={{marginLeft: 20}}>
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
                          {owner.name}
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