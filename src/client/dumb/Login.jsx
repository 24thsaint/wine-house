import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Lock } from '@material-ui/icons';

class Login extends React.Component {
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
        <h1>Login!</h1>
        <form onSubmit={this.props.handleLogin}>
          <Paper style={{ padding: 20 }} elevation={5}>
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
              <Button
                color="primary"
                variant="contained"
                onClick={this.props.handleLogin}
                type="submit"
              >
                <Lock style={{marginRight: 5}} /> Login
              </Button>
            </Grid>
            <Grid item>
              <p>No account yet? <Link to="/register">Click here!</Link></p>
            </Grid>
          </Paper>
        </form>
      </Grid>
    );
  }
}

export default Login;