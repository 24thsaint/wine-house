import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Divider } from '@material-ui/core';
import FileUpload from '@material-ui/icons/FileUpload';

class SubmitVerification extends React.Component {
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
        <h1>Submit Proof of Identity</h1>
        <form encType="multipart/form-data" onSubmit={this.props.handleSubmit}>
          <Paper style={{ padding: 20 }} elevation={5}>
            <Grid item>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">Application Type</FormLabel>
                <RadioGroup
                  aria-label="applicationType"
                  name="applicationType"
                  value={this.props.formData.applicationType}
                  onChange={this.props.handleInputChange}
                >
                  <FormControlLabel value="owner" control={<Radio />} label="Wine Owner" />
                  <FormControlLabel value="partner" control={<Radio />} label="Partner" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                id="name"
                name="name"
                label="Name"
                value={this.props.formData.name}
                onChange={this.props.handleInputChange}
                margin="normal"
              />
            </Grid>
            <Divider style={{margin: 10}} />
            <Grid item>
              <FormControl component="fieldset" required>
                <FormLabel>Verification Proof</FormLabel>
                <Button variant="contained" color="default">
                  <input type="file" onChange={this.props.handleFileInputChange } />
                  <FileUpload />
                </Button>
              </FormControl>
            </Grid>
            <Divider style={{margin: 10}} />
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Paper>
        </form>
      </Grid>
    );
  }
}

export default SubmitVerification;