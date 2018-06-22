import React from 'react';
import { Typography, Table, TableBody, TableRow, TableCell, Grid, Divider } from '@material-ui/core';

class WineDataDisplay extends React.Component {
  render() {
    return (
      <Grid item>
        <Grid item>
          <Typography align="center">This wine is legitimate if it is currently owned by: </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subheading">{this.props.wineOwner}</Typography>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
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

        {this.props.wine.ownerHistoryCount > 0 ? 
          <Grid item>
            <Typography>This wine was previously owned by:</Typography>
            {
              this.props.wine.ownerHistory.map(owner => (
                <div key={owner.address}>
                  {owner.address} - {owner.name}
                </div>
              ))
            }
          </Grid>
          : <Grid item><Typography>This wine has not been transferred, yet!</Typography></Grid>
        }

        
      </Grid>
    );
  }
}

export default WineDataDisplay;