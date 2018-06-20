import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

class TransferWine extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid
        container
        alignItems={'center'}
        justify={'center'}
        direction={'column'}
      >
        <h1>Wine Ownership Transfer</h1>
        <form onSubmit={this.props.handleSubmit}>
          <Paper style={{ padding: 20 }} elevation={5}>
            <Grid item>
              <TextField
                id="newOwner"
                name="newOwner"
                label="New Owner"
                value={this.props.formData.newOwner}
                onChange={this.props.handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item>
              <TextField
                id="transferWineIdentifier"
                name="transferWineIdentifier"
                label="Wine Identifier"
                value={this.props.formData.transferWineIdentifier}
                onChange={this.props.handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={this.props.handleSubmit}
                type="submit"
              >
                Transfer
              </Button>
            </Grid>
          </Paper>
        </form>
      </Grid>
    );
  }
}

export default TransferWine;