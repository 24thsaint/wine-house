import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import authenticate from '../authenticator';
import client from '../client';

class GlobalAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true
    };

    client.on('authenticated', function(evt) {
      if (evt.accessToken) {
        this.setState({
          authenticated: true
        });
      }
    }.bind(this));
  }

  async componentDidMount() {
    const user = await authenticate();
    if (user.code === 401) {
      this.setState({
        authenticated: false
      });
    }
  }

  logout() {
    client.logout();
    window.location.replace(window.location.origin);
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Wine House
            </Typography>
            {this.state.authenticated ? <Button color="inherit" onClick={this.logout}>Logout</Button> : undefined}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default GlobalAppBar;