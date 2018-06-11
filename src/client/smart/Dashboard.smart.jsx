import React from 'react';
import Dashboard from '../dumb/Dashboard';
import AdminTools from '../dumb/AdminTools';
import { Grid, Divider } from '@material-ui/core';

class DashboardSmartComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <Dashboard history={this.props.history} />
        <Divider style={{ marginTop: '10px', marginBottom: '10px' }}/>
        <AdminTools />
      </Grid>
    );
  }
}

export default DashboardSmartComponent;