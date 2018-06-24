import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from '@material-ui/core';
import UserStatus from '../helpers/userStatus';

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
          <Typography variant="headline">Welcome, {this.props.user.fullClientName}!</Typography>
          <Typography variant="caption" align="center">{UserStatus.getDescription(this.props.userType)}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subheading">Balance: {this.props.balance} ETH</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subheading">Address: {'0x' + this.props.address}</Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => {this.navigate('/import-wallet');}}>Import Wallet</Button>
        </Grid>
      </Grid>
    );
  }
}

export default Dashboard;