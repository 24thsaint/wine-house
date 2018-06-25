import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { VerifiedUser } from '@material-ui/icons';

class WineVerification extends React.Component {
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
        <h1>Verify Wine!</h1>
        <form onSubmit={this.props.handleSubmit}>
          <Paper style={{ padding: 20 }} elevation={5}>
            <Grid item>
              <TextField
                id="wineIdentifier"
                name="wineIdentifier"
                label="Wine Identifier"
                value={this.props.formData.wineIdentifier}
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
                <VerifiedUser style={{marginRight: 5}} /> Verify
              </Button>
            </Grid>
          </Paper>
        </form>
      </Grid>
    );
  }
}

export default WineVerification;