import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button, InputAdornment, IconButton } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import { VerifiedUser } from '@material-ui/icons';
import QrScanner from './QRScanner';

class WineVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scanner: {
        open: false,
        field: ''
      }
    };
    this.handleScan = this.handleScan.bind(this);
    this.toggleScanner = this.toggleScanner.bind(this);
  }

  handleScan(data) {
    if (!data) {
      return;
    }

    if (!data.startsWith('0x')) {
      return;
    }
    const scanner = this.state.scanner;
    scanner.open = false;

    const newData = {
      target: {
        name: this.state.scanner.field,
        value: data
      }
    };

    this.props.handleInputChange(newData);

    this.setState({
      scanner
    });
  }

  toggleScanner(field) {
    const scanner = this.state.scanner;
    scanner.open = !scanner.open;
    scanner.field = field;

    this.setState({
      scanner
    });
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
                InputProps={{
                  endAdornment: 
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {this.toggleScanner('wineIdentifier');}}
                      >
                        <PhotoCamera />
                      </IconButton>
                    </InputAdornment>
                }}
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

        <QrScanner 
          scanner={this.state.scanner} 
          handleScan={this.handleScan} 
          toggleScanner={this.toggleScanner}
        />
      </Grid>
    );
  }
}

export default WineVerification;