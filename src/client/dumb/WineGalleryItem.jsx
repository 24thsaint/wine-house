import React from 'react';
import {Paper, Table, TableBody, TableRow, TableCell, Button, Grid } from '@material-ui/core';
import {Link} from 'react-router-dom';

class WineGalleryItem extends React.Component {
  render() {
    const wine = this.props.wine;

    return (
      <Grid item xs>
        <Paper style={{margin: 10, padding: 20, overflowX: 'auto', width: '100%'}}>
          <Table>
            <TableBody>
              
              <TableRow>
                <TableCell>Wine ID</TableCell>
                <TableCell>{wine.key}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Back Label</TableCell>
                <TableCell>{wine.backLabel}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Front Label</TableCell>
                <TableCell>{wine.frontLabel}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Bottle</TableCell>
                <TableCell>{wine.bottle}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Capsule</TableCell>
                <TableCell>{wine.capsule}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Cork</TableCell>
                <TableCell>{wine.cork}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Glass</TableCell>
                <TableCell>{wine.glass}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>
                  <Link to={`/wine/verify/${wine.key}`}>
                    <Button variant="flat" color="primary">Verify</Button>
                  </Link>
                  <Link to={`/wine/transfer/${wine.key}`}>
                    <Button variant="flat" color="primary">Transfer</Button>
                  </Link>
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </Paper>
      </Grid>
    );
  }
}

export default WineGalleryItem;