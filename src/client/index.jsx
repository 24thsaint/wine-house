/* global document */
import 'typeface-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginComponent from './smart/Login.smart';
import RegistrationComponent from './smart/Registration.smart';
import Error404 from './dumb/Error404';
import GlobalAppBar from './dumb/GlobalAppBar';
import { Grid } from '@material-ui/core';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffa4a2',
      main: '#e57373',
      dark: '#af4448',
      contrastText: '#000000',
    },
    secondary: {
      light: '#ff6f60',
      main: '#e53935',
      dark: '#ab000d',
      contrastText: '#000000',
    },
  },
});

const Index = () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <div>
        <Grid container style={{flexGrow: 1}}>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <GlobalAppBar />
            </Grid>
            <Grid item xs={12}>
              <Switch>
                <Route exact path="/" component={LoginComponent} />
                <Route path="/register" component={RegistrationComponent} />
                <Route component={Error404} />
              </Switch>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(
  <Index />, document.getElementById('app'));
