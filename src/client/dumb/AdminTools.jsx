import React from 'react';
import { Button } from '@material-ui/core';

class AdminTools extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button variant="raised">Deploy Contract</Button>
      </div>
    );
  }
}

export default AdminTools;