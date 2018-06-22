import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import authenticate from '../authenticator';
import client from '../client';
import { Drawer, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { Home, LibraryAdd, GroupAdd, VerifiedUser, Send, Settings, Star } from '@material-ui/icons';
import { Link } from 'react-router-dom';

class GlobalAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      open: false
    };

    client.on('authenticated', function(evt) {
      if (evt.accessToken) {
        this.setState({
          authenticated: true
        });
      }
    }.bind(this));

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  async componentDidMount() {
    const user = await authenticate();
    if (user.code === 401) {
      this.setState({
        authenticated: false
      });
    }
  }

  toggleDrawer() {
    this.setState({
      open: !this.state.open
    });
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
            {this.state.authenticated ? 
              <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
                <MenuIcon />
              </IconButton>
              : undefined
            }            
            <Typography variant="title" color="inherit">
              Wine House
            </Typography>
            {this.state.authenticated ? <Button color="inherit" onClick={this.logout}>Logout</Button> : undefined}
          </Toolbar>
        </AppBar>

        <Drawer open={this.state.open} onClose={this.toggleDrawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
          >
            <Link to="/dashboard">
              <ListItem button>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link to="/verify">
              <ListItem button>
                <ListItemIcon>
                  <Star />
                </ListItemIcon>
                <ListItemText primary="Upgrade Account" />
              </ListItem>
            </Link>
            <Link to="/wine/register">
              <ListItem button>
                <ListItemIcon>
                  <LibraryAdd />
                </ListItemIcon>
                <ListItemText primary="Register Wine" />
              </ListItem>
            </Link>
            <Link to="/wine/verify">
              <ListItem button>
                <ListItemIcon>
                  <VerifiedUser />
                </ListItemIcon>
                <ListItemText primary="Verify Wine" />
              </ListItem>
            </Link>
            <Link to="/wine/transfer">
              <ListItem button>
                <ListItemIcon>
                  <Send />
                </ListItemIcon>
                <ListItemText primary="Transfer Wine" />
              </ListItem>
            </Link>
            <Link to="/partner/register">
              <ListItem button>
                <ListItemIcon>
                  <GroupAdd />
                </ListItemIcon>
                <ListItemText primary="Register Partner" />
              </ListItem>
            </Link>
            <Link to="/owner/register">
              <ListItem button>
                <ListItemIcon>
                  <GroupAdd />
                </ListItemIcon>
                <ListItemText primary="Register Owner" />
              </ListItem>
            </Link>

            <Divider />

            <Link to="/admin/tools">
              <ListItem button>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </Link>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default GlobalAppBar;