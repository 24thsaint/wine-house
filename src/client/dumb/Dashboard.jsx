import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import WineRegistrationComponent from '../smart/WineRegistration.smart';
import PartnerRegistration from '../smart/PartnerRegistration.smart';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handlePanelChange(panelName) {
    this.setState({
      expanded: !this.state.expanded ? panelName : false
    });
  }

  navigate(route) {
    this.props.history.push(route);
  }

  render() {
    const { expanded } = this.state;

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
        <Grid item style={{ width: '100%' }}>
          <ExpansionPanel
            expanded={expanded === 'wineRegistrationPanel'}
            onChange={() => { this.handlePanelChange('wineRegistrationPanel'); }}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Register a Wine</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <WineRegistrationComponent />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={expanded === 'partnerRegistrationPanel'}
            onChange={() => { this.handlePanelChange('partnerRegistrationPanel'); }}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Register a Partner</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <PartnerRegistration />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            expanded={expanded === 'verifyWinePanel'}
            onChange={() => { this.handlePanelChange('verifyWinePanel'); }}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Verify Wine</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>Todo Implementation</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
    );
  }
}

export default Dashboard;