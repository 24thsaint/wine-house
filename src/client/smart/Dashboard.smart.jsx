import React from 'react';
import Dashboard from '../dumb/Dashboard';

class DashboardSmartComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Dashboard />
    );
  }
}

export default DashboardSmartComponent;