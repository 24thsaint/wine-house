import React from 'react';
import { LinearProgress } from '@material-ui/core';

class WalletProgress extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const progress = Math.ceil(this.props.progress * 100);

    return (
      <div>
        {
          this.props.progress > 0 && this.props.progress < 1 ? 
            <div>
              <LinearProgress color="secondary" variant="determinate" value={progress} />
            </div> 
            : undefined
        }

        {
          this.props.progress === 1 ? 
            <div>
              <LinearProgress color="secondary" />
            </div> 
            : undefined
        }
      </div>
    );
  }
}

export default WalletProgress;