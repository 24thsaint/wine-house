import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography, Button, Divider } from '@material-ui/core';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  navigate(route) {
    this.props.history.push(route);
  }

  render() {
    return (
      <Grid
        container
        alignItems={'center'}
        justify={'center'}
        direction={'column'}
      >
        <Grid item>
          <Typography variant="headline">Welcome, {this.props.user.fullClientName}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subheading">Balance ({'0x' + this.props.address}): {this.props.balance}</Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => {this.navigate('/import-wallet');}}>Import Wallet</Button>
        </Grid>
        <Grid item>
          <Divider style={{ marginTop: '10px', marginBottom: '10px' }}/>
        </Grid>
        <Grid item>
          Navigate to continue...
          <br />
          ** Insert Wine Gallery **
        </Grid>
      </Grid>
    );
  }
}

export default Dashboard;