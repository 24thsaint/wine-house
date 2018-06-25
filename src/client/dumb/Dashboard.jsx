import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from '@material-ui/core';
import { AccountBalanceWallet } from '@material-ui/icons';
import UserStatus from '../helpers/userStatus';
import QRCode from 'qrcode.react';

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
        direction={'row'}
        justify={'center'}
        spacing={16}
      >
        <Grid item>
          <QRCode value={'0x' + this.props.address} />
        </Grid>

        <Grid item>
          <Typography align="center" variant="headline">Welcome, {this.props.user.fullClientName}!</Typography>
          <Typography align="center" variant="caption" align="center">{UserStatus.getDescription(this.props.userType)}</Typography>
          <Typography align="center" variant="subheading">Balance: {this.props.balance} ETH</Typography>
          <Typography align="center" variant="subheading">Address: {'0x' + this.props.address}</Typography>
          <Grid container item justify="center">
            <Button variant="outlined" onClick={() => {this.navigate('/wallet-tools');}}><AccountBalanceWallet style={{marginRight: 5}} /> Wallet Tools</Button>
          </Grid>
        </Grid>

        {/* <Grid
          item
          container
          direction={'column'}
        >
          
          
        </Grid> */}
      </Grid>
    );
  }
}

export default Dashboard;