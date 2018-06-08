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
import WineRegistrationComponent from './smart/WineRegistration.smart';
import DashboardSmartComponent from './smart/Dashboard.smart';

import './client';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#d4996a',
      main: '#aa6b39',
      dark: '#552600',
      contrastText: '#ffd0aa',
    },
    secondary: {
      light: '#41817f',
      main: '#226765',
      dark: '#003432',
      contrastText: '#679b99',
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
                <Route path="/wine-registration" component={WineRegistrationComponent} />
                <Route path="/dashboard" component={DashboardSmartComponent} />
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
