import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

class WineRegistration extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid
        container
        alignItems={'center'}
        justify={'center'}
        direction={'column'}
      >
        <h1>Wine Registration</h1>
        <form onSubmit={this.props.handleRegister}>
          <Paper style={{padding: 20}} elevation={5}>
            <Grid item>
              <TextField
                id="cork"
                name="cork"
                label="Cork"
                value={this.props.formData.cork}
                onChange={this.props.handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item>
              <TextField
                id="capsule"
                name="capsule"
                label="Capsule"
                value={this.props.formData.capsule}
                onChange={this.props.handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item>
              <TextField
                id="glass"
                name="glass"
                label="Glass"
                value={this.props.formData.glass}
                onChange={this.props.handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item>
              <TextField
                id="frontLabel"
                name="frontLabel"
                label="Front Label"
                value={this.props.formData.frontLabel}
                onChange={this.props.handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item>
              <TextField
                id="backLabel"
                name="backLabel"
                label="Back Label"
                value={this.props.formData.backLabel}
                onChange={this.props.handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item>
              <TextField
                id="bottle"
                name="bottle"
                label="Bottle"
                value={this.props.formData.bottle}
                onChange={this.props.handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={this.props.handleRegister}
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Paper>
        </form>
      </Grid>
    );
  }
}

export default WineRegistration;