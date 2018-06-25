import React from 'react';
import QrReader from 'react-qr-reader';
import { Dialog, DialogContent, DialogActions, Button } from '@material-ui/core';
 
class QrScanner extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      delay: 300,
      result: 'No result',
      facingMode: 'environment'
    };
    this.handleError = this.handleError.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
  }

  handleError(err){
    console.error(err);
  }

  switchCamera() {
    const facingMode = this.state.facingMode;

    if (facingMode === 'environment') {
      this.setState({
        facingMode: 'user'
      });
    } else {
      this.setState({
        facingMode: 'environment'
      });
    }
  }

  render(){
    return(
      <div>
        <Dialog 
          onClose={this.props.toggleScanner}
          open={this.props.scanner.open} 
          fullWidth
        >
          <DialogContent>
            <QrReader
              delay={this.state.delay}
              onError={this.handleError}
              onScan={this.props.handleScan}
              style={{ width: '100%' }}
              facingMode={this.state.facingMode}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.switchCamera}>Switch Camera</Button>
            <Button onClick={this.props.toggleScanner}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default QrScanner;