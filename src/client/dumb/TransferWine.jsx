import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button, InputAdornment, IconButton, Input } from '@material-ui/core';
import { Send, PhotoCamera } from '@material-ui/icons';
import QrScanner from './QRScanner';

class TransferWine extends React.Component {
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
                InputProps={{
                  endAdornment: 
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {this.toggleScanner('newOwner');}}
                      >
                        <PhotoCamera />
                      </IconButton>
                    </InputAdornment>
                }}
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
                InputProps={{
                  endAdornment: 
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {this.toggleScanner('transferWineIdentifier');}}
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
                <Send style={{marginRight: 5}} /> Transfer
              </Button>
            </Grid>
          </Paper>

          <QrScanner 
            scanner={this.state.scanner} 
            handleScan={this.handleScan} 
            toggleScanner={this.toggleScanner}
          />
        </form>
      </Grid>
    );
  }
}

export default TransferWine;