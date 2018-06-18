import React from 'react';
import { Typography, Table, TableBody, TableRow, TableCell, Grid, Divider } from '@material-ui/core';

class WineDataDisplay extends React.Component {
  render() {
    return (
      <div>
        <Typography>This wine is legitimate if it is currently owned by: </Typography>
        <Typography variant="subheading">{this.props.wineOwner}</Typography>
        <Divider />
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

        {this.props.wine.ownerHistoryCount > 0 ? 
          <div><Typography>This wine was preivously owned by:</Typography>
            {
              this.props.wine.ownerHistory.map(owner => (
                <Typography key={owner.address}>{owner.address} - {owner.name}</Typography>
              ))
            }</div>
          : <Typography>This wine has not been transferred, yet!</Typography>
        }

        
      </div>
    );
  }
}

export default WineDataDisplay;