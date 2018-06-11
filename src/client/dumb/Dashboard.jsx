import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import authenticate from '../authenticator';
import client from '../client';
import WineRegistrationComponent from '../smart/WineRegistration.smart';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        fullClientName: ''
      },
      expanded: false
    };
  }

  async componentDidMount() {
    await authenticate();
    this.setState({
      user: client.get('user')
    });
  }

  handlePanelChange(panelName) {
    this.setState({
      expanded: !this.state.expanded ? panelName : false
    });
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
          <Typography variant="headline">Welcome, {this.state.user.fullClientName}</Typography>
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
              <Typography>Todo Implementation</Typography>
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