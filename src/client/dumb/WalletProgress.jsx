import React from 'react';
import { Typography, LinearProgress } from '@material-ui/core';

class WalletProgress extends React.Component {
  constructor(props) {
    super(props);
    this.getProgress = this.getProgress.bind(this);
  }

  getProgress() {
    return parseInt(this.props.progress * 100);
  }

  render() {
    return (
      <div>
        {
          this.props.progress > 0 && this.props.progress < 1 ? 
            <div>
              <Typography>Creating wallet, please wait...</Typography>
              <LinearProgress color="secondary" variant="determinate" value={this.getProgress()} />
            </div> 
            : undefined
        }
      </div>
    );
  }
}

export default WalletProgress;