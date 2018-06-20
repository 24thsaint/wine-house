/* global document */
import 'typeface-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import './client';

import LoginComponent from './smart/Login.smart';
import RegistrationComponent from './smart/Registration.smart';
import Error404 from './dumb/Error404';
import GlobalAppBar from './dumb/GlobalAppBar';

import WineRegistrationComponent from './smart/WineRegistration.smart';
import DashboardSmartComponent from './smart/Dashboard.smart';
import WalletImportSmartComponent from './smart/WalletImport.smart';
import PartnerRegistration from './smart/PartnerRegistration.smart';
import WineVerificationSmartComponent from './smart/WineVerification.smart';
import TransferWineSmartComponent from './smart/TransferWine.smart';
import AdminTools from './smart/AdminTools.smart';

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
                <Route path="/wine/register" component={WineRegistrationComponent} />
                <Route path="/wine/verify" component={WineVerificationSmartComponent} />
                <Route path="/wine/transfer" component={TransferWineSmartComponent} />
                <Route path="/admin/tools" component={AdminTools} />
                <Route path="/dashboard" component={DashboardSmartComponent} />
                <Route path="/import-wallet" component={WalletImportSmartComponent} />
                <Route path="/partner/register" component={PartnerRegistration} />
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
