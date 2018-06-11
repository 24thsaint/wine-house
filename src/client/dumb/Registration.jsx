import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

import WalletProgress from '../dumb/WalletProgress';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastValue: -1
    };
  }

  getProgress() {
    return Math.ceil(this.props.walletProgress * 100);
  }

  render() {
    return (
      <Grid
        container
        alignItems={'center'}
        justify={'center'}
        direction={'column'}
      >
        <h1>Register!</h1>
        <form onSubmit={this.props.handleRegister}>
          <Paper style={{padding: 20}} elevation={5}>
            <Grid item>
              <TextField
                id="fullClientName"
                name="fullClientName"
                label="Full Name"
                value={this.props.formData.fullClientName}
                onChange={this.props.handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item>
              <TextField
                id="username"
                name="username"
                label="Username"
                value={this.props.formData.username}
                onChange={this.props.handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                value={this.props.formData.password}
                onChange={this.props.handleInputChange}
                margin="normal"
              />
            </Grid>

            <Grid item>
              <WalletProgress progress={this.props.walletProgress} message={'Creating wallet, please wait...'} />
            </Grid>

            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={this.props.handleRegister}
                type="submit"
                disabled={this.props.walletProgress > 0 && this.props.walletProgress < 1}
              >
                Register
              </Button>
            </Grid> 
          </Paper>
        </form>
      </Grid>
    );
  }
}

export default Login;